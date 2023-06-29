const express = require('express');
const apiRoutes = require('./routes.js');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/view/home.html');
});

app.get('/editor', (req, res) => {
    res.sendFile(__dirname + '/public/view/editor.html');
});

app.get('/posts/:id', (req, res) => {
    res.sendFile(__dirname + '/public/view/reader.html');
});

app.use('/api/v1', apiRoutes);

app.use((err, _req, res, _next) => {
    console.error(err);
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode).json({
        'code': statusCode,
        'status': 'error',
        'message': err.message
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});