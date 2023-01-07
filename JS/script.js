const calculatorBody = document.querySelector('.main_body'),
      calculationLine = calculatorBody.querySelector('.line'),
      calculatorKeyboard = calculatorBody.querySelector('.keyboard');

const keyboardSymbols = ['CE','(',')','÷','7','8','9','×','4','5','6','-','1','2','3','+','C','0',',','='];

keyboardSymbols.forEach(el => {
    calculatorKeyboard.innerHTML += `<button class='button'>${el}</button>`
});

const buttons = calculatorKeyboard.querySelectorAll('.button');

let lastComma = null,
    parenthesisOpen = 0,
    parenthesisClose = 0;

buttons.forEach(button => {
    switch (button.textContent) {
        case '(': button.addEventListener('click',() => {
            if (calculationLine.textContent.split('')[calculationLine.textContent.length - 1] != ',') {
                calculationLine.textContent += '(';
                parenthesisOpen++;
            }
        });  
        break;

        case ')': button.addEventListener('click',() => {
            if (calculationLine.textContent != '' && parenthesisOpen > parenthesisClose &&
                calculationLine.textContent.split('')[calculationLine.textContent.length -1] != '(' &&
                +calculationLine.textContent.split('')[calculationLine.textContent.length -1]) {
                calculationLine.textContent += ')';
                parenthesisClose++;
            }
        }); 
        break;

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
        }); 
        break;

        case 'CE': button.addEventListener('click',() => {
            if (calculationLine.textContent == '' || 
                calculationLine.textContent.split('')[calculationLine.textContent.length - 1] == ',') {
                    lastComma = null;
                    parenthesisOpen = 0;
                    parenthesisClose = 0;
                }
            
            calculationLine.textContent = calculationLine.textContent.slice(0,-1); 
            if (calculationLine.textContent == '') {
                parenthesisOpen = 0;
                parenthesisClose = 0;
            }
        }); 
        break;

        case 'C': button.addEventListener('click',() => {
            calculationLine.textContent = '';
            lastComma = null;
            parenthesisOpen = 0;
            parenthesisClose = 0;
        }); 
        break;

        case '-':
        case '÷':
        case '×':
        case '+': button.addEventListener('click',() => {
            const text = calculationLine.textContent;
            if (+text.split('')[text.length - 1] || text.split('')[text.length-1] == ')'
                || text.split('')[text.length-1] === '0') {
                    calculationLine.textContent += button.textContent;    
            } else if ((text.split('')[text.length-1] == '(' || text == '') && button.textContent == '-') {
                calculationLine.textContent += '-';
            }
        }); 
        break;

        case ',': button.addEventListener('click',() => {
            const text = calculationLine.textContent,
                  lastElement = text.split('')[text.length - 1];
            if (lastElement != ',' && 
                lastElement != '(' && 
                lastElement != ')' && 
                lastElement != '(' &&
                (+lastElement || lastElement === '0')) {
                    if (lastComma == null) {
                        calculationLine.textContent += ',';
                        lastComma = calculationLine.textContent.length - 1;
                    } else {
                        const textArray = calculationLine.textContent.split('');

                        for(let i = lastComma + 1; i < textArray.length - 1; i++) {
                            if (textArray[i] == '(' || textArray[i] == ')' || 
                                textArray[i] == '-' || textArray[i] == '×' ||
                                textArray[i] == '+' || textArray[i] == '÷') {
                                calculationLine.textContent += ',';
                                lastComma = calculationLine.textContent.length - 1;
                                break;
                            }
                        }
                    }
            }
        }); break;

        case '=': button.addEventListener('click',() => {
            const text = calculationLine.textContent,
                  calcArray = text.split('');
            
                calcArray.filter((item,i) => {
                    switch (item) {
                        case '÷': calcArray[i] = '/'; break;
                        case '×': calcArray[i] = '*'; break;
                        case ',': calcArray[i] = '.'; break;
                }
            });
            console.log(calcArray)
            calculationLine.textContent = eval(calcArray.join(''));
        });
    }
});