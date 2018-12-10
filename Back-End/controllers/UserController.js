
const crypt=require('../crypt');
const requestJson=require('request-json');
const mlabBaseURL="https://api.mlab.com/api/1/databases/proyectotechu/collections/";
const mlabAPIKey="apiKey="+process.env.MLAB_API_KEY;

function getUsers (req,res) {
  console.log("GET /proyectotechu/users");

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("user?"+mlabAPIKey,
    function(err,resMlab,body) {
      var response= !err ?
        body : {"msg":"Error obteniendo usuarios"}
      res.send(response);
    }
  )
}

function getUsersByEmail (req,res) {
  console.log("GET /proyectotechu/users/:email");

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");
  var query='q={"email":"'+req.params.email+'"}';

  httpClient.get("user?"+query+"&"+mlabAPIKey,
    function(err,resMlab,body) {
      var response= !err ?
        body : {"msg":"Error obteniendo usuarios"}
      res.send(response);
    }
  )
}

function getUsersByDni (req,res) {
  console.log("GET /proyectotechu/users/:dni");

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");
  var query='q={"DNI":"'+req.params.dni+'"}';

  httpClient.get("user?"+query+"&"+mlabAPIKey,
    function(err,resMlab,body) {
      var response= !err ?
        body : {"msg":"Error obteniendo usuarios"}
      res.send(response);
    }
  )
}

function createUser (req, res) {
    console.log("POST /proyectotechu/users");
    console.log(req.body.first_name);
    console.log(req.body.last_name);
    console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.DNI);

    var query='q={"email":"'+req.body.email+'"}';
    console.log(query);

    var httpClient=requestJson.createClient(mlabBaseURL);
    console.log("Client created");

    httpClient.get("user?"+query+"&"+mlabAPIKey,
      function(err,resMlab,body) {
        if(err){
          console.log("Error creando usuario");
          res.status(500);
          res.send({"msg":"Error creando usuario"});
        }else{
          if(body.length>0){
            console.log("Ya existe una cuenta asociada a este email");
            res.status(401);
            res.send({"msg":"Ya existe una cuenta asociada a este email"});
          }else{
            console.log("No esta registrado este email");
            var query2='q={"DNI":"'+req.body.DNI+'"}';

            httpClient.get("user?"+query2+"&"+mlabAPIKey,
              function(err,resMlab,body) {
                if(err){
                  console.log("Error creando usuario");
                  res.status(500);
                  res.send({"msg":"Error creando usuario"});
                }else{
                  if(body.length>0){
                    console.log("Ya existe una cuenta asociada a este DNI");
                    res.status(401);
                    res.send({"msg":"Ya existe una cuenta asociada a este DNI"});
                  }else{
                    console.log("No esta registrado este DNI");
                    var newUser={
                      "first_name":req.body.first_name,
                      "last_name":req.body.last_name,
                      "email":req.body.email,
                      "password":crypt.hash(req.body.password),
                      "DNI":req.body.DNI
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
                  }
                }
              }
            )
          }
        }
      }
    )
  }


module.exports.getUsers=getUsers
module.exports.getUsersByEmail=getUsersByEmail
module.exports.getUsersByDni=getUsersByDni
module.exports.createUser=createUser
