
const express=require('express');
const app=express();
const port=process.env.PORT||3000;

app.listen(port);
app.use(express.json());

console.log("server escuchando en el puerto "+port);
