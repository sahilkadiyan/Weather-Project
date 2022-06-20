const express=require("express");
const { STATUS_CODES } = require("http");
const bodyParser=require("body-parser");
//native node https module
const https = require("https");
const app=express();

app.use(bodyParser.urlencoded({extended: true}))
app.get("/",function(req,res){
  res.sendFile(__dirname+ "/index.html");
    
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const apikey="ef31442abda17c634f7e67f9643307fe";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+ units;

    https.get(url,function(response){
        console.log(response,response.statusCode);

        response.on("data",function(data){
            // console.log(data);  this will give the data in hexadecimal form 
            //so we need to cinvert it then we are using JSON.parse(data);
            const weatherData=JSON.parse(data);
            // const object={
            //     name:"sahil",
            //     favfood:"paneer"
            // }
            //here this(stringify) is used to convert that object into a single string i.e in the single line

            // console.log(JSON.stringify(object));
            //by main.temp we are getting only the temp not other data
            const temp=weatherData.main.temp
            //for getting specific piece of data
            const des=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;   //this is for icon corresponding to weather
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(temp);
            console.log(des);
            //we cannot have multiple send but we have multiple write

            res.write("<h1>The Temperature in " + req.body.cityName+ " is " +temp+" degrees Celcius.</h1>");
            res.write("<p>The decription of weather is "+des+"</p>");
            res.write("<img src="+imageurl +">");
            res.send();


        });
    });




})























app.listen(3000,function(){
    console.log("Server is at 3000 port");
});