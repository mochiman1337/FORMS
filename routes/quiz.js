const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;

//Work goes here
router.get("/", async (req, res) => {
    //Get 4 words, with their pos and def and send back to the other page
    let chosenWords = await getWords();
    //Send those back and render quiz.ejs
    res.render('quiz', { 
        chosenWords,
        totalQuestions: 0, //Start set at 0
        totalCorrect: 0 // The counter was stuck at 0 w/o update. This is a fix
    });
});//Get when user directly types into URL

//March.25 class work
router.post("/", async (req, res) => {
    console.log(req.body);//debug check
    
    // Added to sold Reference Error.
    let totalCorrect = parseInt(req.body.totalCorrect) || 0;
    let totalQuestions = parseInt(req.body.totalQuestions) || 0;


    // Variables for feedback. I moved this up to fix issue?
    let isCorrect = false

    //Check Answer
    let { userChoice, correctDef } = req.body;
    if (userChoice === correctDef) {
        console.log("User guessed correctly!");//Good
        //Score++
        //let score = totalCorrect + 1;
        totalCorrect += 1;// trying to fix counter issue
        isCorrect = true;
    }

    //totalQuestions++
    //let total = totalQuestions + 1;
    totalQuestions += 1;//Attempt to fix counter issue

    //Get another new set of words
    let chosenWords = await getWords();

    //Send the new words and the updated score back to the EJS
    res.render('quiz', {
        chosenWords,
        totalCorrect,
        totalQuestions,
        isCorrect, // Correct vs. Wrong feedback
        previousDef: correctDef //Pass back to show if def. is wrong. This is NEW!
    })
});//Happens when user press Submit button

let getWords = async () => {
    //Get a random part of speech
    //console.log("Getting random Part!")//Debug
    let randomPart = getRandomPart();
    //Based on that, pick 4 words that match
    let allWords = await readFile('resources/allwords.txt', 'utf8');//Reads all words as 1 giant string
    //console.log(allWords);
    let wordArray = allWords.split('\n');//Splits the single string into an array where each line is a index
    //console.log(wordArray);
    shuffle(wordArray);//shuffle that array

    let choices = [];
    while (choices.length < 5) { //Keep looping until we get 5 choices
        let line = wordArray.pop();//one line as a string
        //let [word,  part, def] = line.split('\t'); //This is the same as code below
        let tokens = line.split('\t');
        let word = tokens[0];
        let part = tokens[1];
        let def = tokens[2];
        if (part === randomPart) {//If part of my word matches the random part we picked, we keep it
            choices.push(line);
        }
    }
    //console.log(choices);
    return choices;
}

let getRandomPart = () => {
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random() * parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;
}

let shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    console.log("Array Suffled!");
}
module.exports = router;//Don't forget to put this at the end