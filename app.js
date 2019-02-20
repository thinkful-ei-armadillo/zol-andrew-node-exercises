const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) =>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const c = (a + b).toString();
    res.send(c);
});

app.get('/cipher', (req, res) =>{
    const text = req.query.text
    const shift = parseInt(req.query.shift)
    let string = text.split('').map(letter =>{
        let code = letter.charCodeAt();
        let newCode = code + shift
        console.log(newCode)
        if(newCode >= 122){
            let newShift = (newCode) - 122;
            newCode = newShift + 96;
        }
        return String.fromCharCode(newCode)
    });
    const newText = string.join('');
    res.send(newText);
})
function generateRandomNumbers(){
    let array = [];
    for(let i = 0; i < 6; i++){
        array.push(Math.ceil(Math.random() * 20));
    }
    return array;
}
app.get('/lotto', (req, res) =>{
    const userInput = req.query.numbers.map(num => parseInt(num));
    const lottoNumbers = generateRandomNumbers();
    let scoreCount = 0;
    for(let i = 0; i < userInput.length; i++){
        for(let j = 0; j < lottoNumbers.length; j++){
            if(userInput[i] === lottoNumbers[j]){
                scoreCount++
            }
        }
    }
    if(scoreCount < 4){
        res.send(`Sorry you did not win! ${scoreCount} ${lottoNumbers}`)
    } 
    else if(scoreCount === 5){
        res.send(`Congratulations, you win a free ticket ${scoreCount} ${lottoNumbers}`)
    }
    else if(scoreCount === 6){
        res.send(`Congratulations! You win $100! ${scoreCount} ${lottoNumbers}`)
    }
})
app.listen(8000, () =>{
    console.log('Listening on 8000.')
})