
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




/*function getUserByIdV2 (req,res) {
  console.log("GET /apitechu/v2/users/:id");

  var id=req.params.id;
  var query='q={"id":'+id+'}';

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");

  httpClient.get("user?"+query + "&" + mlabAPIKey,
    function(err,resMlab,body) {
      if (err) {
        var response= {
          "msg":"Error obteniendo usuario"
        };
        res.status(500);
      } else {
        if (body.length > 0) {
          var response=body[0];
          // aqui lo hacemos asi para devolver un object en vez de un array
          // con un solo elemento como antes
        } else {
          var response={
            "msg":"Usuario no encontrado"
          };
          res.status(404);
        }
      }
      // var response= !err ?
      //   body : {"msg":"Error obteniendo usuarios"}

      res.send(response);
    }
  )
}


  function createUserV2 (req, res) {
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
   }

function deleteUserV1(req, res) {
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
}

    module.exports.getUsersV1=getUsersV1;
    module.exports.getUsersV2=getUsersV2;
    module.exports.getUserByIdV2=getUserByIdV2;
    module.exports.createUserV1=createUserV1;
    module.exports.createUserV2=createUserV2;
    module.exports.deleteUserV1=deleteUserV1;*/

module.exports.getUsers=getUsers
module.exports.getUsersByEmail=getUsersByEmail
module.exports.getUsersByDni=getUsersByDni
module.exports.createUser=createUser
