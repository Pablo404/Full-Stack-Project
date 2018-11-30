
const requestJson=require('request-json');
const mlabBaseURL="https://api.mlab.com/api/1/databases/proyectotechu/collections/";
const mockBaseURL="https://my.api.mockaroo.com/";
const mlabAPIKey="apiKey="+process.env.MLAB_API_KEY;
const mockAPIKey="key="+process.env.MOCK_API_KEY;


/*function getIBAN (req,res) {
  console.log("GET /IBAN");

  var httpClient=requestJson.createClient(mockBaseURL);
  console.log("Client created");

  httpClient.get("IBAN?"+mockAPIKey,
    function(err,resMlab,body) {
      var response= !err ?
        body : {"msg":"Error obteniendo IBAN"}
      res.send(response);
    }
  )
} */
function createAccount (req, res) {
  console.log("POST /proyectotechu/accounts");

  var httpClientMock=requestJson.createClient(mockBaseURL);
  console.log("Client Mock created");

  httpClientMock.get("IBAN?"+mockAPIKey,
    function(err,resMlab,body) {
      response= !err ?
        body : {"msg":"Error obteniendo IBAN"}
        console.log(response);
        var newAccount={
          "name":req.body.name,
          "IBAN":response.IBAN,
          "DNI":req.body.DNI,
          "balance":req.body.balance
        };

        var httpClient=requestJson.createClient(mlabBaseURL);
        console.log("Client created");

        httpClient.post("account?"+mlabAPIKey, newAccount,
          function(err,resMlab,body) {
            console.log("Cuenta guardada con éxito");
            res.status(201);
            res.send({"msg":"Cuenta guardada con éxito"});
          }
        )
      }
    )
  }


function modifyAccount (req,res) {
console.log("PUT /proyectotechu/accounts");

var query='q={"IBAN":"'+req.body.IBAN+'"}';
var httpClient=requestJson.createClient(mlabBaseURL);
console.log("Client created");

httpClient.get("account?"+query + "&" + mlabAPIKey,
function(err,resMlab,body){
      console.log(body.length);
      var newBalance=body[0].balance+req.body.amount;
      var putBody= '{"$set":{"balance":'+newBalance+'}}';
      httpClient.put("account?"+query+"&"+mlabAPIKey, JSON.parse(putBody),
        function(errPUT,resMlabPUT,bodyPUT) {
          console.log("Saldo de la cuenta actualizado");
        }
      )
    }
  )
}

function modifyTwoAccounts (req,res) {
  console.log("PUT /proyectotechu/accounts");
  console.log("PUT /proyectotechu/accounts");

  var query1='q={"IBAN":"'+req.body.IBAN1+'"}';
  var query2='q={"IBAN":"'+req.body.IBAN2+'"}';
  var amount1=req.body.amount;
  var amount2=(-1)*(req.body.amount);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("account?"+query1 + "&" + mlabAPIKey,
  function(err,resMlab,body){
        console.log(body.length);
        var newBalance1=body[0].balance+amount1;
        var putBody1= '{"$set":{"balance":'+newBalance1+'}}';
        httpClient.put("account?"+query1+"&"+mlabAPIKey, JSON.parse(putBody1),
          function(errPUT,resMlabPUT,bodyPUT) {
            console.log("Saldo de la cuenta 1 actualizado");
          }
        )
      }
    )
  httpClient.get("account?"+query2 + "&" + mlabAPIKey,
  function(err,resMlab,body){
        console.log(body.length);
        var newBalance2=body[0].balance+amount2;
        var putBody2= '{"$set":{"balance":'+newBalance2+'}}';
        httpClient.put("account?"+query2+"&"+mlabAPIKey, JSON.parse(putBody2),
          function(errPUT,resMlabPUT,bodyPUT) {
            console.log("Saldo de la cuenta 2 actualizado");
          }
        )
      }
    )

  }


function getAccountsByDni (req,res) {
  console.log("GET /proyectotechu/accounts/:DNI");

  var DNI=req.params.DNI;
  var query='q={"DNI":"'+DNI+'"}';

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("account?"+query + "&" + mlabAPIKey,
    function(err,resMlab,body){
      if (err){
        var response={
          "msg":"Error obteniendo cuenta"
        };
        res.status(500);
      }else{
        if(body.length > 0){
          var response=body;
        }else{
          var response={
            "msg":"Usuario no encontrado"
          };
          res.status(404);
          console.log(body);
        }
      }
      res.send(response);
    }
  )
}



  /* function deleteUserV1(req, res) {
  console.log("DELETE /apitechu/v1/users/:id");
  console.log("La id enviada es: "+ req.params.id);



  var users=require("../prueba.json");

users.forEach(function(valor,indice){
  if (valor.id==req.params.id){
    console.log(valor);
    users.splice(indice,1);

  }
  console.log(users[indice].id);
});

   console.log("id encontrado= "+req.params.id)




  //users.splice(req.params.id - 1,1);
  io.writeUserDataToFileLogin(users);
  console.log("Usuario borrado");
  res.send(users);
} */



module.exports.getAccountsByDni=getAccountsByDni;
    //module.exports.getIBAN=getIBAN;
module.exports.createAccount=createAccount;
module.exports.modifyAccount=modifyAccount;
module.exports.modifyTwoAccounts=modifyTwoAccounts;
