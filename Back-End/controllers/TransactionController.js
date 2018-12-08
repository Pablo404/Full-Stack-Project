
const requestJson=require('request-json');
const mlabBaseURL="https://api.mlab.com/api/1/databases/proyectotechu/collections/";
const mlabAPIKey="apiKey="+process.env.MLAB_API_KEY;

const accountController=require('./AccountController');

function getTransactionsByIban (req,res){
  var query='q={"IBAN":"'+req.params.IBAN+'"}';
  var sort='s={"date": -1}'
  console.log(query);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("transaction?"+query+"&"+sort+"&"+mlabAPIKey,
    function(err,resMlab,body){
      if (err){
        var response={
          "msg":"Error obteniendo movimientos"
        };
        res.status(500);
      }else{
        if(body.length > 0){
          var response=body;
        }else{
          var response={
            "msg":"Transacciones no encontradas"
          };
          res.status(404);
          console.log(body);
        }
      }
      res.send(response);
    }
  )
}

function getTransactionsByIban1 (req,res){
  var query='q={"IBAN1":"'+req.params.IBAN+'"}';
  var sort='s={"date": -1}'
  console.log(query);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("transaction?"+query+"&"+sort+"&"+mlabAPIKey,
    function(err,resMlab,body){
      if (err){
        var response={
          "msg":"Error obteniendo movimientos"
        };
        res.status(500);
      }else{
        if(body.length > 0){
          var response=body;
        }else{
          var response={
            "msg":"Transacciones no encontradas"
          };
          res.status(404);
          console.log(body);
        }
      }
      res.send(response);
    }
  )
}

function getTransactionsByIban2 (req,res){
  var query='q={"IBAN2":"'+req.params.IBAN+'"}';
  var sort='s={"date": -1}'
  console.log(query);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("transaction?"+query+"&"+sort+"&"+mlabAPIKey,
    function(err,resMlab,body){
      if (err){
        var response={
          "msg":"Error obteniendo movimientos"
        };
        res.status(500);
      }else{
        if(body.length > 0){
          var response=body;
        }else{
          var response={
            "msg":"Transacciones no encontradas"
          };
          res.status(404);
          console.log(body);
        }
      }
      res.send(response);
    }
  )
}

function getTransactionsByDni (req,res){
  var query='q={"DNI":"'+req.params.DNI+'"}';
  var sort='s={"date": -1}'
  console.log(query);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("transaction?"+query+"&"+sort+"&"+mlabAPIKey,
    function(err,resMlab,body){
      if (err){
        var response={
          "msg":"Error obteniendo movimientos"
        };
        res.status(500);
      }else{
        if(body.length > 0){
          var response=body;
        }else{
          var response={
            "msg":"Transacciones no encontradas"
          };
          res.status(404);
          console.log(body);
        }
      }
      res.send(response);
    }
  )
}

function getTransactionsByDni1 (req,res){
  var query='q={"DNI1":"'+req.params.DNI+'"}';
  var sort='s={"date": -1}'
  console.log(query);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("transaction?"+query+"&"+sort+"&"+mlabAPIKey,
    function(err,resMlab,body){
      if (err){
        var response={
          "msg":"Error obteniendo movimientos"
        };
        res.status(500);
      }else{
        if(body.length > 0){
          var response=body;
        }else{
          var response={
            "msg":"Transacciones no encontradas"
          };
          res.status(404);
          console.log(body);
        }
      }
      res.send(response);
    }
  )
}

function getTransactionsByDni2 (req,res){
  var query='q={"DNI2":"'+req.params.DNI+'"}';
  var sort='s={"date": -1}'
  console.log(query);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("transaction?"+query+"&"+sort+"&"+mlabAPIKey,
    function(err,resMlab,body){
      if (err){
        var response={
          "msg":"Error obteniendo movimientos"
        };
        res.status(500);
      }else{
        if(body.length > 0){
          var response=body;
        }else{
          var response={
            "msg":"Transacciones no encontradas"
          };
          res.status(404);
          console.log(body);
        }
      }
      res.send(response);
    }
  )
}

function createTransaction (req,res){
  if (req.body.type=="Deposit Money"){
    var date=Date();
    var newTransaction={
      "date":date,
      "type":req.body.type,
      "name":"Ingreso",
      "IBAN":req.body.IBAN,
      "account":req.body.account,
      "DNI":req.body.DNI,
      "amount":req.body.amount
    };

    var httpClient=requestJson.createClient(mlabBaseURL);
    console.log("Client created");
      httpClient.post("transaction?"+mlabAPIKey, newTransaction,
      function(err,resMlab,body) {
        console.log("Transacción guardada con éxito");
        res.status(201);
        res.send({"msg":"Transacción guardada con éxito"});
        accountController.modifyAccount(req,res);
      }
    )
  }else if(req.body.type=="Take Money"){
    req.body.amount=(-1)*(req.body.amount);
    var query='q={"IBAN":"'+req.body.IBAN+'"}';
    var httpClient=requestJson.createClient(mlabBaseURL);
    console.log("Client created");

    httpClient.get("account?"+query + "&" + mlabAPIKey,
    function(err,resMlab,body){
      if(body[0].balance<(-1)*(req.body.amount)){
        res.send({"msg":"No hay saldo suficiente en la cuenta"});
      }else{
        var date=Date();
        var newTransaction={
          "date":date,
          "type":req.body.type,
          "name":"Reintegro",
          "IBAN":req.body.IBAN,
          "account":req.body.account,
          "DNI":req.body.DNI,
          "amount":req.body.amount
        };

          httpClient.post("transaction?"+mlabAPIKey, newTransaction,
          function(err,resMlab,body) {
            console.log("Transacción guardada con éxito");
            res.status(201);
            res.send({"msg":"Transacción guardada con éxito"});
            accountController.modifyAccount(req,res);
          }
        )
      }
    }
  )
  }else{
    var query1='q={"IBAN":"'+req.body.IBAN1+'"}';
    var query2='q={"IBAN":"'+req.body.IBAN2+'"}';
    var httpClient=requestJson.createClient(mlabBaseURL);
    console.log("Client created");

    httpClient.get("account?"+query1 + "&" + mlabAPIKey,
    function(err,resMlab,body){
      if(body.length>0){
        var DNI1=body[0].DNI;
        httpClient.get("account?"+query2 + "&" + mlabAPIKey,
        function(err,resMlab,body){
          if(body[0].balance<req.body.amount){
            res.send({"msg":"No hay saldo suficiente en la cuenta"});
          }else{
            var date=Date();
            var newTransaction={
              "date":date,
              "type":req.body.type,
              "name":"Transferencia",
              "concept":req.body.concept,
              "IBAN1":req.body.IBAN1,
              "IBAN2":req.body.IBAN2,
              "account":req.body.account,
              "DNI1":DNI1,
              "DNI2":req.body.DNI,
              "amount":req.body.amount
            };

            httpClient.post("transaction?"+mlabAPIKey, newTransaction,
            function(err,resMlab,body) {
              console.log("Transacción guardada con éxito");
              res.status(201);
              res.send({"msg":"Transacción guardada con éxito"});
              accountController.modifyTwoAccounts(req,res);
            }
          )
        }
      }
    )
  }else{
    res.send({"msg":"El IBAN de destino no está asociado a ninguna cuenta registrada"});
  }
}
)
  }
}

module.exports.createTransaction=createTransaction;
module.exports.getTransactionsByIban=getTransactionsByIban;
module.exports.getTransactionsByDni=getTransactionsByDni;
module.exports.getTransactionsByIban1=getTransactionsByIban1;
module.exports.getTransactionsByIban2=getTransactionsByIban2;
module.exports.getTransactionsByDni1=getTransactionsByDni1;
module.exports.getTransactionsByDni2=getTransactionsByDni2;
