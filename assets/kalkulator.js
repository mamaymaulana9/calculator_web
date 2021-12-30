// object calculator
const calculator = {
   displayNumber: '0',
   operator: null,
   firstNumber: null,
   waitingForSecondNumber: false
};

//fungsi - fungsi umum yang dilakukan kalkulator seperti meng-update angka pada layar dan menghapus data pada kalkulator. 
function updateDisplay() {
   document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}
 
function clearCalculator() {
   calculator.displayNumber = '0';
   calculator.operator = null;
   calculator.firstNumber = null;
   calculator.waitingForSecondNumber = false;
}
 
//fungsi untuk memasukkan angka ke dalam nilai displayNumber kalkulator.
function inputDigit(digit) {
    if (calculator.displayNumber ==='0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
} 

function inverseNumber () {
    if (calculator.displayNumber ==='0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator (operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang number supaya tombol selanjutnya di mulai dari angka yang pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('operator sudah di tetapklan')
    }
}

function performCalculation () {
    if (calculator.displayNumber == null || calculator.operator == null) {
        alert ('anda belum menetatapkan operator')
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt (calculator.firstNumber) + parseInt (calculator.displayNumber)
    } else {
        result = parseInt (calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
   const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();

}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
   button.addEventListener('click', function(event) {
 
       // mendapatkan objek elemen yang diklik
       const target = event.target;

       if (target.classList.contains ('clear'))   {
           clearCalculator ();
           updateDisplay();
           return;
       }

       if (target.classList.contains('negative')) {
           inverseNumber ();
           updateDisplay();
           return;
       }

       if (target.classList.contains ('equals')) {
           performCalculation ();
           updateDisplay();
           return;
       }

       if (target.classList.contains ('operator')) {
           handleOperator (target.innerText);
           return;
       }
 
       inputDigit(target.innerText);
       updateDisplay()
   });
}