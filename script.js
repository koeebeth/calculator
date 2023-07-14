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
const resetBtn = document.querySelector('#delete');

//Objects
let operations = {
    'add': function(x, y) {return x + y},
    'substract': function(x, y) {return x - y},
    'multiply': function(x, y) {return x * y},
    'divide' : function(x, y) {
        if(y == 0) alert('Cannot divide by zero')
        else return parseFloat((x / y).toFixed(2));
    },
    'percent': function(x, y) {return parseFloat((x * y / 100).toFixed(2))},
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


//Event Listeners
numberBtns.forEach((element) => 
    element.addEventListener('click',function(e) {
        if(lastpressed !== 'equal'){
            if (lastpressed == 'operation'){
                numberDisplay.textContent = '';
            }
            if(x && operation){
                num = getNumber(e)
                if(numberDisplay.textContent == '0'){numberDisplay.textContent = num}
                else {numberDisplay.textContent += num}
                y = getDisplayedNumber();
                result = operations[operation](x, y);
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
}));

operationBtns.forEach((element) =>
    element.addEventListener('click', function(e) {
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

