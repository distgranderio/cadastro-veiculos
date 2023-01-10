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
  //  console.log(req.url);
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
  app.get('/vencidos', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/vencidos.html');
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

   app.get('/qtd', async (req, res) => {
    let qtdade = await database.getAll();
    res.send([{quantidade: qtdade.length}]);


   })

   app.get('/qtd1', async (req, res) => {
    let qtdade = await database.getAll1();
    res.send([{quantidade: qtdade.length}]);


   })
   app.get('/qtd1', async (req, res) => {
    let qtdade = await database.getAll1();
    res.send([{quantidade: qtdade.length}]);


   })
   app.get('/qtd2', async (req, res) => {
    let qtdade = await database.getAllh();
    res.send([{quantidade: qtdade.length}]);


   })
   app.get('/trocas', async (req, res) => {
   res.send(await database.getAll()); 
   })
   app.get('/trocasv', async (req, res) => {
    res.send(await database.getAllv()); 
    })

   app.post('/carros', async (req, res) => {
    let {placa, veiculo, itens, km, cliente, telefone} = req.body;
    res.status(201).send(await database.postCarro(placa, veiculo, itens, km, cliente, telefone))


   })
   app.get('/cardetalhe/:id', async (req, res) => {
    let placa = req.params.id;
    let respostarobo = await robo1(placa);
    res.send([{
      placa: placa,
      marca: respostarobo.marca,
      modelo: respostarobo.modelo,
      AnoModelo: respostarobo.AnoModelo,
      Combustivel: respostarobo.Combustivel,
      cilindradas: respostarobo.cilindradas,
      potencia: respostarobo.potencia,
      cor: respostarobo.cor
    }]);
  
  });

  app.get('/trocadetalhe/:id', async (req, res) => {
    let placa = req.params.id;
    res.send(await database.getPlaca1(placa))
    });

    app.get('/pesquisar/:id', async (req, res) => {
      let placa = req.params.id;
      res.send(await database.pesqcarro(placa))
      });

  async function robo1(placa) {
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
        let rAnoModelo = document.querySelectorAll("td")[5].textContent;
        let rcor = document.querySelectorAll("td")[9].textContent;
        let rcilindradas = document.querySelectorAll("td")[11].textContent;
        let rpotencia = document.querySelectorAll("td")[13].textContent;
        let rCombustivel = document.querySelectorAll("td")[15].textContent;
        if(rCombustivel.slice(0, 4) === "****") {
          let rCombustivel1 = document.querySelectorAll("td")[13].textContent;
          let rcilindradas1 = document.querySelectorAll("td")[9].textContent;
          let rpotencia1 = document.querySelectorAll("td")[11].textContent;
          let rcor1 = document.querySelectorAll("td")[7].textContent;

          var campos = {
            "marca": rmarca,
            "modelo": rmodelo,
            "AnoModelo": rAnoModelo,
            "cor": rcor1,
            "cilindradas": rcilindradas1,
            "potencia": rpotencia1,
            "Combustivel": rCombustivel1
          };
    
          return campos;
        }else if(rcor.slice(0, 4) === "****"){
          let rCombustivel2 = document.querySelectorAll("td")[7].textContent;
          let rcor2 = "N/A";
          let rcilindradas2 = "N/A";
          let rpotencia2 = "N/A";

          var campos = {
            "marca": rmarca,
            "modelo": rmodelo,
            "AnoModelo": rAnoModelo,
            "cor": rcor2,
            "cilindradas": rcilindradas2,
            "potencia": rpotencia2,
            "Combustivel": rCombustivel2
          };
    
          return campos;

        }else if(!isNaN(rcor)){
          let rcilindradas3 = "N/A";
          let rcor3 = document.querySelectorAll("td")[9].textContent;

          var campos = {
            "marca": rmarca,
            "modelo": rmodelo,
            "AnoModelo": rAnoModelo,
            "cor": rcor3,
            "cilindradas": rcilindradas3,
            "potencia": rpotencia,
            "Combustivel": rCombustivel
          };
    
          return campos;

        }else{

          var campos = {
            "marca": rmarca,
            "modelo": rmodelo,
            "AnoModelo": rAnoModelo,
            "cor": rcor,
            "cilindradas": rcilindradas,
            "potencia": rpotencia,
            "Combustivel": rCombustivel
          };
    
          return campos;
        }

  
      });
      await browser.close();
      return resultado;
    } else {
      var campos = {
        "marca": "---",
        "modelo": "---",
        "AnoModelo": "---",
        "cor": "---",
        "cilindradas": "---",
        "potencia": "---",
        "Combustivel": "---"
      };
  
      return campos;
    }
  } catch (error){
    var campos = {
      "marca": "---",
      "modelo": "---",
      "AnoModelo": "---",
      "cor": "---",
      "cilindradas": "---",
      "potencia": "---",
      "Combustivel": "---"
    };
  
    return campos;
  }}


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

  

  app.post('/aviso/', async (req, res) => {
    let {
      idag
    } = req.body;
    let respostaaviso = await database.getaviso(idag);
    res.status(201).send(await database.alteraraviso(respostaaviso[0].placa));
    if(respostaaviso[0].telefone != ""){
          let menssage = "📅 *FAZ UM TEMPINHO!*\n\n Que você não aparece para trocar o óleo do veículo: " + respostaaviso[0].placa.toUpperCase() + "\n\n Agende sua troca conosco para preservar a vida útil do seu motor!";
          let number = "55" + respostaaviso[0].telefone + "@c.us";
          mandarmsg(number, menssage)
    }
  })

  async function mandarmsg(telefone, mensagem){
    // client.sendText(telefone, mensagem)
    // .then((result) =>{console.log('Result: ', result);})
    // .catch((erro) => {
    //   console.error('Error when sending: ', erro);
    //   let aux = telefone.substr(0, 4);
    //   let aux1 = telefone.substr(5);
    //   let corrigido = aux + aux1;
    //   client.sendText(corrigido, mensagem)
    //   .then((result) =>{console.log('Result: ', result);})
    //   .catch((erro) => {
    //     console.error('Error when sending: ', erro)
    //     let aux = telefone.substr(0, 4);
    //     let aux1 = telefone.substr(5);
    //     let corrigido = aux + '9' + aux1;
    //     client.sendText(corrigido, mensagem)
    //   .then((result) =>{console.log('Result: ', result);})
    //   .catch((erro) => {
    //     console.error('Error when sending: ', erro)});
    //   });
    // });

}