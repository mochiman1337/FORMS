const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('User List');
});

router.get('/new', (req, res)=>{
    res.send('User New Form');
});

//Dynamic route
/*
router.get('/:id', (req,res)=>{
    res.send(`Getting User Data: ${req.params.id}`);
});//This is original example
*/

router.route('/:id').get((req, res)=>{
 res.send(`Getting User data for id: ${req.params.id}`);
}).delete((req, res)=>{
res.send(`Deleting User data for id: ${req.params.id}`);
}).put((req, res)=>{
res.send(`Updating User data for id: ${req.params.id}`);
});//improved multi-rule route

module.exports = router;//Always keep this at the end!