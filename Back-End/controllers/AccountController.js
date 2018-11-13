
const crypt=require('../crypt');
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
          "email":req.body.email,
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


function getAccountsByUserEmail (req,res) {
  console.log("GET /proyectotechu/accounts/:email");

  var email=req.params.email;
  var query='q={"email":"'+email+'"}';

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




  /* function createUserV1 (req, res) {
    console.log("POST /apitechu/v1/users");

    //console.log(req.headers);
    console.log(req.body.first_name);
    console.log(req.body.last_name);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.id);

    var newUser={
      "id":req.body.id,
      "first_name":req.body.first_name,
      "last_name":req.body.last_name,
      "email":req.body.email,
      "password":req.body.password
    };
    var users=require("../prueba.json");
    users.push (newUser);

    io.writeUserDataToFileLogin(users);

    res.send("Usuario añadido con éxito");
  }   */


  /* function createUserV2 (req, res) {
      console.log("POST /apitechu/v2/users");

      console.log(req.body.first_name);
      console.log(req.body.last_name);
      console.log(req.body.email);
      console.log(req.body.password);
      console.log(req.body.id);

      var newUser={
        "id":req.body.id,
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "password":crypt.hash(req.body.password)
      };

      var httpClient=requestJson.createClient(mlabBaseURL);
      console.log("Client created");

      httpClient.post("user?"+mlabAPIKey, newUser,
        function(err,resMlab,body) {
          console.log("Usuario guardado con éxito");
          res.status(201);
          res.send({"msg":"Usuario creado con éxito"});

       }
     )
   } */

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



    module.exports.getAccountsByUserEmail=getAccountsByUserEmail;
    //module.exports.getIBAN=getIBAN;
    module.exports.createAccount=createAccount;
