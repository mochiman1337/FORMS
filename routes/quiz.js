const express = require('express');
const { arrayBuffer } = require('stream/consumers');
const router = express.Router();
const {readfile} = require('fs').promises;

//Work goes here

router.get("/", (req,res) =>{
    //Get 4 words, with their pos and def and send back to the other page

    //Send those back and render quiz.ejs

});

let getWords = async ()=>{
    //Get a random part of speech
    let randomPart = getRandomPart();
    //Based on that, pick 4 words that match
}

let getRandomPart = ()=>{
    let parts = ['noun','verb','adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;
}

let suffle = (array)=>{
    for(let i=0;i<array.length-1;i--){
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
}
module.exports = router;//Don't forget to put this at the end