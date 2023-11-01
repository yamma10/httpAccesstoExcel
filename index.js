// const express = require('express')
import express from 'express'
import fs from 'fs';
import path from 'path';
import downloadRoutes from './routes/download.js';
const port = 3000;

const app = express();
app.use(express.json());


app.get('/',(req,res) => {
    console.log("Hello World");
    res.send('Hello World');
})

app.use('/download', downloadRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

