const express = require('express');
const app = express();
require('./crons')
app.get('/', (req, res) => {
    res.send("I'm running fine");
});

app.listen(3000, () => {
    console.log('Server is started');
});