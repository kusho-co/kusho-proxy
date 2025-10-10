const express = require("express");
const multer = require("multer");
const app = express();
const upload = multer(); // In-memory storage

app.post("/upload", upload.any(), (req, res) => {
  console.log("Fields:", req.body); // JSON / string fields

  if (req.files) {
    req.files.forEach(file => {
      console.log(`File field name: ${file.fieldname}`);
      console.log(`Original filename: ${file.originalname}`);
      console.log(`MIME type: ${file.mimetype}`);
      console.log("Content:\n", file.buffer.toString("utf-8")); // <-- print XML content
      console.log("-----");
    });
  }

  res.send("Received multipart/form-data with XML!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
