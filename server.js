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
  app.get('/veiculos', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/veiculos.html');
  })

  app.get('/placas/:placa', async (req, res) => {
   let pplaca = await database.getPlaca(req.params.placa);
   if(pplaca == ![]){
    let respostarobo = await robo(req.params.placa);
    res.send([{
      placa: req.params.placa,
      modelo: respostarobo.modelo,
      cliente: " ",
      telefone: " "
    }]);
   }else{
    res.send(pplaca);
   } })









  async function robo(placa) {
    let placaaux = placa.toUpperCase();
    var regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
    try {
    if (placaaux.match(regex)) {
      const browser = await puppeteer.launch({
        headless: true
      });
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0');
      await page.setViewport({
        width: 1280,
        height: 1800
      })
      await page.goto("https://www.tabelafipebrasil.com/placa/" + placa);
      const resultado = await page.evaluate(() => {
        let rmarca = document.querySelectorAll("td")[1].textContent;
        let rmodelo = document.querySelectorAll("td")[3].textContent;
  
        var campos = {
          "modelo": rmarca + " " + rmodelo
        };
  
        return campos;
  
      });
      await browser.close();
      return resultado;
    } else {
      var campos = {
        "modelo": ""
      };
  
      return campos;
    }
  } catch (error){
    var campos = {
      "modelo": ""
    };
  
    return campos;
  }}