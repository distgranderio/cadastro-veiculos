import express from 'express';
import database from './database.js';
import url from 'url';
import path from 'path';
import fileupload from 'express-fileupload'
import venom from 'venom-bot';
import puppeteer from 'puppeteer'


const app = express();
var __filename = url.fileURLToPath(
  import.meta.url);
var __dirname = path.dirname(__filename) + "/views";
var caminhopadrao = path.dirname(__filename);

app.use((req, res, next) => {
    console.log(req.url);
    next();
  })

app.listen(8080, () => console.log('Servidor rodando!'));

app.use(fileupload());
app.use(express.json());
app.use(express.static('assets/css'));
app.use(express.static('assets/js'));
app.use(express.static('assets/img'));


app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/index.html');
  })

  app.get('/lista', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/lista.html');
  })

  app.get('/placas/:placa', (req, res) => {
    console.log("teste");
  })