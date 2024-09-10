const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../frontend')));

// Настройка прокси для PHP
app.use('/php', (req, res) => {
    const { spawn } = require('child_process');
    const php = spawn('php', [path.join(__dirname, '../php', req.path)]);
    
    php.stdout.pipe(res);
    php.stderr.pipe(process.stderr);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
