//Variables
let x = null;
let y = null;
let operation = null;
let result = null;
let num;
let lastpressed;


//Selectors
const numberBtns = document.querySelectorAll('.button.number');
const operationBtns = document.querySelectorAll('.button.operation');
const equal = document.querySelector('#equal');
const display = document.querySelector('.display');
const numberDisplay =  display.querySelector('.x');
const resetBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const floatBtn = document.querySelector('#floating-point');

//Objects
let operations = {
    'add': function(x, y) {return x + y},
    'substract': function(x, y) {return x - y},
    'multiply': function(x, y) {return x * y},
    'divide' : function(x, y) {
        if(y == 0) alert('Cannot divide by zero')
        else return roundToTwo(x / y);
    },
    'percent': function(x, y) {return roundToTwo(x * y / 100)},
}

/* let symbols = {
    'add': '+',
    'substract': '-',
    'multiply': '×',
    'divide' : '÷',
} */

//Helper functions
function setCalc(){
    x = null;
    y = null;
    operation = null;
    result = null;
    lastpressed = null;
    numberDisplay.textContent = '0';
}

function getNumber(e){
    return parseInt(e.currentTarget.id);
}

function getDisplayedNumber(){
    return parseFloat(numberDisplay.textContent);
}

function getOperation(e){
    return e.currentTarget.id;
}

function roundToTwo (num){
    return Math.round(num * 100) / 100;
}

function deleteLast() {
    if(numberDisplay.textContent.length > 1){
        numberDisplay.textContent = numberDisplay.textContent.slice(0, -1)
        if(!y){x = getDisplayedNumber()}
        else{y = getDisplayedNumber();
        console.log(y)}
    }
    else {return numberDisplay.textContent = '0'}
}

function calcDisplay(e) {
    if (lastpressed == 'operation'){
        numberDisplay.textContent = '';
    }
    if(lastpressed != 'equal' && numberDisplay.textContent.length < 11){
        if(x && operation){
            num = getNumber(e)
            if(lastpressed == 'operation'){numberDisplay.textContent = num}
            else {numberDisplay.textContent += num}
            y = getDisplayedNumber();
            console.log(x, y, result)
            lastpressed = 'number';
        };
        if(!y) {
            num = getNumber(e);
            if(numberDisplay.textContent == '0'){numberDisplay.textContent = num}
            else {numberDisplay.textContent += num}
            x = getDisplayedNumber();
            lastpressed = 'number';
        }
    }
}



//Event Listeners
numberBtns.forEach((element) => 
    element.addEventListener('click', calcDisplay));

operationBtns.forEach((element) =>
    element.addEventListener('click', function(e) {
        if(operation && lastpressed == 'number') {
            result = roundToTwo(operations[operation](x, y));
        }
        operation = getOperation(e);
        if(result) {
            x = result;
            numberDisplay.textContent = result;
        }
        lastpressed = 'operation';
        console.log(operation);
    })
);

equal.addEventListener('click', function(){
    if(operation && lastpressed !== 'equal'){
        result = roundToTwo(operations[operation](x, y));
        x = result;
        y = null;
        numberDisplay.textContent = result;
        lastpressed = 'equal';
    }
    else{
        numberDisplay.textContent = x;
    }
});

resetBtn.addEventListener('click', () => setCalc());

floatBtn.addEventListener('click', () => {
    if (!numberDisplay.textContent.includes('.')){
        numberDisplay.textContent += '.';
    }
})

deleteBtn.addEventListener('click' , () => deleteLast());