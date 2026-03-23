const express = require('express');
const { arrayBuffer } = require('stream/consumers');
const router = express.Router();
const {readfile} = require('fs').promises;

//Work goes here

router.get("/", async (req,res) =>{
    //Get 4 words, with their pos and def and send back to the other page
    let chosenWords = await getWords();
    //Send those back and render quiz.ejs
    //console.log("Chosen Words: ", chosenWords);//Testing
    res.render('quiz', {chosenWords});//Check Discord!
});

let getWords = async ()=>{
    //Get a random part of speech
    //console.log("Getting random Part!")//Debug
    let randomPart = getRandomPart();
    //Based on that, pick 4 words that match
    let allWords = await readFile('resources/allwords.txt', 'utf8');//Reads all words as 1 giant string
    let wordArray = allWords.split('\n');//Splits the single string into an array where each line is a index
    shuffle(wordArray);//shuffle that array

    let choices = [];
    while(choices.length <5){ //Keep looping until we get 5 choices
        let line = wordArry.pop();//one line as a string
        //let [word,  part, def] = line.split('\t'); //This is the same as code below
        let tokens = line.split('\t');
        let word = tokens[0];
        let part = tokens [1];
        let def = tokens [2];
        if(part === randomPart){//If part of my word matches the random part we picked, we keep it
            choices.push(line);
        }
    }
}

let getRandomPart = ()=>{
    let parts = ['noun','verb','adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;
}

let suffle = (array)=>{
    for(let i=array.length-1;i>0;i--){
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    console.log("Array Suffled!");
}
module.exports = router;//Don't forget to put this at the end