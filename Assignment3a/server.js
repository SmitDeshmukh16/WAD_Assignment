const http = require('http'); // For creating the server
const url = require('url');   // For parsing the request URL
const fs = require('fs');     // For reading files
const path = require('path'); // For handling file paths

const PORT = 1800;

// Multipurpose Internet Mail Extension
const mimeType = {
    ".html": 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain'
};

// HTTP Server and listening on specified port

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath);

    // If the user visits the root ("/"), list all files in the directory
    if (parsedUrl.pathname === "/") {
        let filesList = fs.readdirSync(__dirname); // Get list of files
        let filesLink = "<ul>";

        filesList.forEach(file => {
            if (fs.statSync(file).isFile()) {
                filesLink += `<li><a href='./${file}'>${file}</a></li>`;
            }
        });

        filesLink += "</ul>";
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>List of files:<\h1> ${filesLink}`);
        return;
    }

    // Check if file exists
    if (!fs.existsSync(pathname)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`File ${pathname} not found`);
        return;
    }

    // Read the file and send it as a reponse
    fs.readFile(pathname, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Error reading file.");
        } else {
            const ext = path.extname(pathname);
            res.writeHead(200, { 'Content-Type': mimeType[ext] || 'application/octet-stream' });
            res.end(data);
        }
    });

}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});