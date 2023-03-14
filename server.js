`use strict`

//import express 
const express = require("express");

//import cors
const cors = require("cors");

const server = express()

const axios = require('axios'); // 
require('dotenv').config();

//import postgress library 
const pg = require("pg")

server.use(cors());

server.use(express.json()); // to convert from [] to json to show me the info

//port

const PORT = process.env.PORT || 3000;

//DB obj

const client = new pg.Client(process.env.URL); // вміст констроктор
//port of postgress 


//routs
//lab11
server.get("/", homeHandler);
server.get("/favorite", favoriteHandler)

// lab12
server.get("/trending", trendingHandler);
server.get('/search', searchHandler);


server.get('/idd', movieIdHandler);
server.get('/person', personHandler);


// lab 13 + 14 
server.get("/getMovies", getMoviewHandler);
server.get("/getMovies/:newid", getsecMoviewHandler);
server.post("/getMovies", postMovieHandler);
server.delete("/getMovies/:id", deletMovieHandler);
server.put("/getMovies/:iddd", UPDateMovieHandler);



server.get("*", defultHandler);
server.use(errorHandler);




//constroctor ( lab 12 )
function Movie(id, title, release_date, poster_path, overview) {
    this.id = id
    this.title = title
    this.release_date = release_date
    this.poster_path = poster_path
    this.overview = overview
}

const data = require("./data.json");

//functions handlers

//home 
function homeHandler(req, res) {

    // res.status(200).send(str);

    let newMovie = new Movie(
        data.title, data.poster_path, data.overview

    )
    res.send(newMovie)
}
//favorite 
function favoriteHandler(req, res) {


    let str = "Welcome to Favorite Page";
    res.status(200).send(str);

}
//defult 
function defultHandler(req, res) {


    let str3 = "page not found error"
    res.status(404).send(str3)


}


// server.get("*",(req,res)=>{

// let str2= "Sorry, something went wrong"
//     res.status(500).send(str2)


// })

const APIKEY = process.env.APIkey;

//trinding
function trendingHandler(req, res) {
    try {


        const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}`;
        axios.get(url)
            .then((d) => {
                let mapResult = d.data.results.map((newitem) => {
                    let singleFilm = new Movie(newitem.id, newitem.title, newitem.release_date, newitem.poster_path, newitem.overview)
                    return singleFilm;
                })
                res.send(mapResult)

            })


            .catch((error) => {
                res.status(500).send(error)
            })

    }

    catch (error) {
        errorHandler(error, req, res)
    }

}



//search
function searchHandler(req, res) {
    try {

        const url2 = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=spider-man&page=1&include_adult=false`
        axios.get(url2)
            .then((b) => {
                // console.log(b);
                let mapResult2 = b.data.results.map((newItem2) => {
                    // console.log(newItem2);
                    let searchFilm = new Movie(newItem2.id, newItem2.title, newItem2.release_date, newItem2.poster_path, newItem2.overview)
                    return searchFilm;
                })
                // console.log(mapResult2);
                res.status(200).json(mapResult2)

            })


            .catch((error) => {
                // res.status(500).send(error)
            })

    }
    catch (error) {
        errorHandler(error, req, res)
    }
}

//movieHandler
function movieIdHandler(req, res) {
    try {
        // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
        const url3 = `https://api.themoviedb.org/3/movie/785084/videos?api_key=${APIKEY}&language=en-US`
        axios.get(url3)
            .then((c) => {
                // console.log(c);
                let mapResult3 = c.data.results.map((newItem3) => {
                    // console.log(newItem3);
                    let movieId = new Movie(newItem3.id, newItem3.title, newItem3.release_date, newItem3.poster_path, newItem3.overview)
                    return movieId;
                })
                // console.log(mapResult3);
                res.status(200).json(mapResult3)

            })


            .catch((error) => {
                // res.status(500).send(error)
            })

    }
    catch (error) {
        errorHandler(error, req, res)
    }
}

function personHandler(req, res) {
    try {

        const url4 = `https://api.themoviedb.org/3/person/976?api_key=${APIKEY}&language=en-US`
        axios.get(url4)
            .then((c) => {
                // console.log(c);
                // let mapResult3 = c.data.results.map((newItem3) => {
                //     // console.log(newItem3);
                //     let movieId = new Movie(newItem3.id, newItem3.title, newItem3.release_date, newItem3.poster_path, newItem3.overview)
                //     return movieId;
                res.send(c.data)
            })
            // console.log(mapResult3);
            // res.status(200).json(mapResult3)

            .catch((error) => {
                // res.status(500).send(error)
            })
    }




    catch (error) {
        errorHandler(error, req, res)
    }
}










//data base getMoviewHandler
//get
function getMoviewHandler(req, res) {
    const sql = `SELECT * from firstMOV`;// to get all data from the table 
    client.query(sql)
        .then((data) => {
            res.send(data.rows)

        })
        .catch((err) => {
            errorHandler(err, req, res)
        })
}

//post 
function postMovieHandler(req, res) {
    const mov = req.body; // to get the data from body that inside (the thunder) and insert it to do some updeats & posts 
    const sql = `INSERT INTO firstmov (title,release_date,poster_path,overview,comment)
VALUES ('${mov.title}','${mov.release_date}','${mov.poster_path}','${mov.overview}'.'${mov.comment}') RETURNING *;`

    client.query(sql)
        .then((data) => {
            res.send(data.rows)
        })

        .catch((error) => {
            res.status(500).send(error)
        })
}







//delete
function deletMovieHandler(req, res) {

    // console.log(req.params); to get the path parameter 

    const newID = req.params.id;
    const sql = `DELETE FROM firstMOV WHERE id=${newID}`; //sql : structer qyery languge 
    client.query(sql)
        .then((data) => {
            res.status(204).json({});
            // console.log("was deleted");
        })
        .catch((err) => {
            errorHandler(err, req, res);
        })

}

// to get specify data from the table &()
function getsecMoviewHandler(req, res) {
    const secID = req.params.newid
    const sql = `SELECT * from firstMOV WHERE id=${secID}`;// to get specify data from the table 
    client.query(sql)
        .then((data) => {
            res.send(data.rows)

        })
        .catch((err) => {
            errorHandler(err, req, res)
        })
}



function UPDateMovieHandler(req,res){

const therdID =req.params.iddd;
// console.log(therdID);
const show = req.body // to get the data from body and insert it to do some updeats & posts 
const sql = `UPDATE firstMOV SET title ='${show.title}', overview ='${show.overview},' WHERE id =${therdID} RETURNING *`;
// console.log(sql);
client.query(sql)
.then((data) => {
    res.send(data.rows)
})

.catch((err) => {
    errorHandler(err, req, res);
})

}




// function Error handler
function errorHandler(error, req, res) {
    const err = {
        status: 500,
        massage: error,

    }
    res.status(500).send(err)
}





//server port

client.connect()
    .then(
        server.listen(PORT, () => {
            console.log("listining to 3000");
        })
    )