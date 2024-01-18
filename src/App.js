import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [size, setSize] = useState("250");
  const [text, setText] = useState("");
  const qrCodeRef = useRef(null);

  function downloadQrCode() {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current, { margin: 0, padding: 0 }).then(
        (canvas) => {
          const url = canvas.toDataURL("image/png");
          saveAs(url, "qrcode.png");
        }
      );
    }
  }
  function handleChange(e) {
    setText(e.target.value);
  }
  return (
    <>
      <div className="navbar">
        <h1>QR Code Generator</h1>
      </div>
      <div className="container">
        <div className="inputs">
          <div className="text-input">
            <label>Enter Your text here : </label>
            <>
              <input
                type="text"
                value={text}
                onChange={(e) => handleChange(e)}
              />
            </>
          </div>
          <div className="size-input">
            <label>Set size of QR code : </label>
            <select
              id="sizes"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="200">200</option>
              <option value="250" selected>
                250
              </option>
              <option value="300">300</option>
            </select>
          </div>
          <div className="download">
            <button onClick={downloadQrCode}>Download</button>
          </div>
        </div>
        <div className="qrcode">
          <div className="live">
            <h2>Live Preview</h2>
          </div>
          <div className="qr">
            <div ref={qrCodeRef}>
              <QRCode value={text} size={`${size}px`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
