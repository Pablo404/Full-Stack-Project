
const requestJson=require('request-json');
const mlabBaseURL="https://api.mlab.com/api/1/databases/proyectotechu/collections/";
const mlabAPIKey="apiKey="+process.env.MLAB_API_KEY;

const accountController=require('./AccountController');

function createTransaction (req,res){

  if (req.body.type=="Deposit Money" || req.body.type=="Take money"){
    var date=Date();
    var newTransaction={
      "date":date,
      "type":req.body.type,
      "IBAN":req.body.IBAN,
      "amount":req.body.amount
    };

    var httpClient=requestJson.createClient(mlabBaseURL);
    console.log("Client created");

    accountController.modifyAccount(req,res);
    if (res.status==500 || res.status==404){
      res.send(response);
    }else{
      httpClient.post("transaction?"+mlabAPIKey, newTransaction,
      function(err,resMlab,body) {
        console.log("Transacción guardada con éxito");
        res.status(201);
        res.send({"msg":"Transacción guardada con éxito"});
      }
    )
    }
  }else{
    var date=Date();
    var newTransaction={
      "date":date,
      "type":req.body.type,
      "IBAN1":req.body.IBAN1,
      "IBAN2":req.body.IBAN2,
      "amount":req.body.amount
    }
  }
}

module.exports.createTransaction=createTransaction;
