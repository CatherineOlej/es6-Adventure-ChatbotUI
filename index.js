/**
 * Catherine Olejarczyk
 * Assignment 3 - Chat UI
 * Choose your own adventure Halloween themed
 * A chatbot written in es6 and vs6 for twilio and testing on the web
 */

/*import express from 'express';
import bodyParser  from "body-parser";
import Adventure from "./Adventure";*/


const express = require('express');
const bodyParser = require("body-parser");
const Game = require("./Adventure");

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let oGames = {};
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From || req.body.from;
    if(!oGames.hasOwnProperty(sFrom)){
        oGames[sFrom] = new Game();
    }
    let sMessage = req.body.Body|| req.body.body;
    let aReply = oGames[sFrom].makeAMove(sMessage);
    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for(let n = 0; n < aReply.length; n++){
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");

});


var port = process.env.PORT || parseInt(process.argv.pop()) || 3000;

app.listen(port, () => console.log('app listening on port ' + port));

//var express = require('express');
//var app = express();

//app.use(express.static(__dirname + '/www'));

/*var port = process.env.PORT || 3000;

app.listen(port);

console.log('working on port ' + port);*/
