`use strict`

const express = require("express");
const cors = require("cors");

const server = express()

server.use(cors())




const PORT = 3000
server.listen(PORT, () => {
    console.log("helooo");
})

//constroctor
function mOvie(title, poster_path, overview) {
    this.title = title
    this.poster_path = poster_path
    this.overview = overview
}


//home route
server.get("/", (req, res) => {

    // res.status(200).send(str);

    const data = require("./data.json");
    let newMovie = new mOvie(
        data.title , data.poster_path ,data.overview

    )


    res.send(newMovie)
})

//favorite route
server.get("/favorite",(req,res)=>{

    
    let str = "Welcome to Favorite Page";
    res.status(200).send(str);

})

server.get("*",(req,res)=>{

    let str3= "page not found error"
        res.status(404).send(str3)
    
    
    })
    
server.get("*",(req,res)=>{

let str2= "Sorry, something went wrong"
    res.status(500).send(str2)


})


    
