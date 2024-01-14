import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
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
    <div className="App">
      <header className="App-header">
        <h1>QR Code Generator</h1>
        <div ref={qrCodeRef}>
          <QRCode value={text} size={"300px"} />
        </div>
        <div style={{ margin: "20px" }}>
          <label>Enter Your text here : </label>
          <input type="text" value={text} onChange={(e) => handleChange(e)} />
        </div>
        <button style={{ padding: "2.5px 10px" }} onClick={downloadQrCode}>
          Download
        </button>
      </header>
    </div>
  );
}
export default App;
