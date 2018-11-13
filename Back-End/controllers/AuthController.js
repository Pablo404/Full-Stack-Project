
const crypt=require('../crypt');
const requestJson=require('request-json');
const mlabBaseURL="https://api.mlab.com/api/1/databases/proyectotechu/collections/";
const mlabAPIKey="apiKey="+process.env.MLAB_API_KEY;


function login (req,res){
  console.log("POST /proyectotechu/login");
  console.log(req.body.email);
  console.log(req.body.password);

  var httpClient=requestJson.createClient(mlabBaseURL);
  console.log("Client created");
  var query='q={"email":"'+req.body.email+'"}';
  console.log(query);

  httpClient.get("user?"+query+"&"+mlabAPIKey,
    function(err,resMlab,body) {
      if(err){
        console.log("Error al entrar en el sistema");
        res.status(500);
        res.send({"msg":"Error al entrar en el sistema"});
      }else{
        if(body.length>0){
          var response=body;
          console.log(response);
          console.log(response[0].password);
          console.log(req.body.password);
          if (crypt.checkpassword(req.body.password,response[0].password)) {
            console.log("contraseña correcta");

            //var query2='q={"email":'+response[0].email+'}';
            var putBody= '{"$set":{"logged":true}}';
            httpClient.put("user?"+query+"&"+mlabAPIKey, JSON.parse(putBody),
              function(errPUT,resMlabPUT,bodyPUT) {
                console.log("Usuario logeado con éxito");
                res.status(200);
                var response ={
                  "msg":"Usuario logeado con exito"
                }
                res.send(response);
              }
            )
          }else{
            console.log("Contraseña incorrecta");
            res.status(401);
            res.send({"msg":"Login incorrecto, revise su email y/o contraseña"});
          }
        }else{
          console.log("No se encuentra el usuario");
          res.status(404);
          res.send({"msg":"Login incorrecto, revise su email y/o contraseña"});
        }
      }
    }
  )
}


  function logoutV2 (req,res){
    console.log("POST /apitechu/v2/logout/:id");
    console.log(req.params.id);

    var httpClient=requestJson.createClient(mlabBaseURL);
    console.log("Client created");

    var query='q={"id":'+req.params.id+'}';
    console.log(query);
    httpClient.get("user?"+query+"&"+mlabAPIKey,
    function(err,resMlab,body) {
      if(err){
        console.log("Error deslogeando usuario");
        res.send({"msg":"Error deslogeando usuario"});
        res.status(500);
      }else{
        if(body.length>0){
          var response=body;
          console.log(body);
            console.log(response);
            console.log(response[0].id);
            console.log(response[0].logged);
            if(response[0].logged) {

            var putBody='{"$unset":{"logged":""}}';
            var query2='q={"id":'+response[0].id+'}';
            httpClient.put("user?"+query2+"&"+mlabAPIKey, JSON.parse(putBody),
              function(err,resMlab,body) {
                console.log("Usuario deslogeado con éxito");
                res.status(200);
                res.send({"msg":"Usuario deslogeado con éxito"});
              }
            )
          }else{
            res.send({"msg":"El usuario no estaba logeado"});
          }
    }else{
      console.log("No se encuentra el usuario");
      res.send({"msg":"No se encuentra el usuario"});
      res.status(404);
    }
    }
    }
     )
    }


module.exports.login=login;
//module.exports.logoutV2=logoutV2;
