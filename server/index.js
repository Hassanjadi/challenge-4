const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Menangani permintaan untuk Landing Page
  if (req.url === "/" || req.url === "/home.html") {
    const filePath = path.join(__dirname, "../public", "home.html");
    serveStaticFile(res, filePath, "text/html");
  }
  // Menangani permintaan untuk Cari Mobil
  else if (req.url === "/cars") {
    const filePath = path.join(__dirname, "../public", "cars.html");
    serveStaticFile(res, filePath, "text/html");
  }
  // Menangani permintaan untuk gambar di Folder Images
  else if (req.url.startsWith("/images")) {
    const imagePath = path.join(__dirname, "../public", req.url);
    serveStaticFile(res, imagePath, "image");
  }
  // Menangani permintaan untuk file statis di Folder Public
  else {
    const filePath = path.join(__dirname, "../public", req.url);
    const contentType = getContentType(filePath);
    serveStaticFile(res, filePath, contentType);
  }
});

const serveStaticFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("<h1>Halaman ini tidak ditemukan</h1>");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

const getContentType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
};

const port = 5000;
const host = "localhost";

server.listen(port, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
