require('dotenv').config();
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const app = express();
const userRoutes = require('./routes/userRoutes'); // Import the user routes

// app.use(bodyParser.json()); // Parse JSON request bodies
app.use('/', userRoutes)

const user = {
    id: 1,
    username: 'exampleUser',
    email: 'example@example.com',
  };


app.get('/', (req, res) => {
    res.send('yes');
})

app.get('/create-auth', (req, res) => {
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' })
    // const token = jwt.encrypt(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send(token);
})

app.get('/check-auth', (req, res) => {
    const createdToken =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJleGFtcGxlVXNlciIsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSIsImlhdCI6MTcyODk3MjkyOCwiZXhwIjoxNzI4OTc2NTI4fQ.dILnRXkjZZNJdIiEOwq8y6wYu6x8EGp9fUmFH2_x8pg";
    // const createdToken =  "";
    const data = jwt.verify(createdToken, process.env.JWT_SECRET);
    // const data = jwt.decrypt(createdToken, process.env.JWT_SECRET+"123");
    res.send(data);
})


app.get('/create-jwt-secret', (req, res) => {
    const secretKey = crypto.randomBytes(32).toString('base64')
    console.log(secretKey);
    res.send('success');
})

if (process.env.NODE_ENV  === "development") {
    const httpServer = http.createServer(app);
    httpServer.listen(process.env.HTTP_PORT, () => {
        console.log(`HTTP server listening on port ${process.env.HTTP_PORT}`);
    });

} else {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH)
      }
    const httpsServer = https.createServer(options, app);
    httpsServer.listen(process.env.HTTPS_PORT, () => {
        console.log(`HTTP server listening on port ${process.env.HTTPS_PORT}`);
    });
}