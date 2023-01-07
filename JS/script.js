const calculatorBody = document.querySelector('.main_body'),
      calculationLine = calculatorBody.querySelector('.line'),
      calculatorKeyboard = calculatorBody.querySelector('.keyboard');

const keyboardSymbols = ['C','CE','( )','÷','7','8','9','×','4','5','6','-','1','2','3','+','!','0',',','='];

keyboardSymbols.forEach(el => {
    calculatorKeyboard.innerHTML += `<button class='button'>${el}</button>`
});

const buttons = calculatorKeyboard.querySelectorAll('.button');

buttons.forEach(button => {
    switch (button.textContent) {
        case '1': 
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0': button.addEventListener('click',() => {
            calculationLine.textContent += button.textContent;
        }); break;
        case 'CE': button.addEventListener('click',() => {
            calculationLine.textContent = calculationLine.textContent.slice(0,-1); 
        }); break;
        case 'C': button.addEventListener('click',() => {
            calculationLine.textContent = '';
        }); break;
        case '+': button.addEventListener('click',() => {
            const text = calculationLine.textContent;
            if (text.split('')[text.length-1] !== '+') {
                calculationLine.textContent += '+'
            }
        }); break;
    }
});

