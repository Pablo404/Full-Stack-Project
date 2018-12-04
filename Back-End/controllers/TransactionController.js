
const requestJson=require('request-json');
const mlabBaseURL="https://api.mlab.com/api/1/databases/proyectotechu/collections/";
const mlabAPIKey="apiKey="+process.env.MLAB_API_KEY;

const accountController=require('./AccountController');

function getTransactionsByIban (req,res){
  var query='q={"$or":[{"IBAN":"'+req.params.IBAN+'"},{"IBAN1":"'+req.params.IBAN+'"},{"IBAN2":"'+req.params.IBAN+'"}]}';
  console.log(query);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("transaction?"+query+"&"+mlabAPIKey,
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
  console.log(query);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("transaction?"+query+"&"+mlabAPIKey,
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
      "amount":req.body.amount,
      "DNI":req.body.DNI
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
          "amount":req.body.amount,
          "DNI":req.body.DNI
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
              "amount":req.body.amount,
              "DNI":req.body.DNI
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
