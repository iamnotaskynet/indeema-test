const form = document.querySelector('#form-input');
const output = document.querySelector('#output');

form.addEventListener('submit', event => { 
    event.preventDefault(); // disable reloading page
    
    // 1. Collecting data from inputs
    const amount = Number(document.querySelector('#amount').value);
    const price = Number(document.querySelector('#price').value);

    // 2. Checking data from inputs
    if( amount < price) {
        printError(
            "Amount and Price must be a numbers. " +
            "Not empty. " + 
            "Not string. " + 
            "Not zero. " +
            "Amount must be more than or quals price.");
            return; // prevent next instructions
    };
    // 3. Call callculating function
    const result = calculateChange(amount, price);
    // 4. Print result
    printResult(result);
});

const calculateChange = (amount, price) => {
    
    const result = {
        change: (amount - price).toFixed(2),
        text:   ""
    };
    let accumulator = amount - price;

    if (accumulator === 0) return result;
    if(accumulator >= 100) {
        const hundreds = ~~(accumulator/100);
        result.text +=`${hundreds} hundreds`;
        accumulator = accumulator - (hundreds * 100);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 50) {
        const fifties = ~~(accumulator/50);
        result.text +=`, ${fifties} fifties`;
        accumulator = accumulator - (fifties * 50);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 20) {
        const twenties = ~~(accumulator/20);
        result.text +=`, ${twenties} twenties`;
        accumulator = accumulator - (twenties * 20);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 10) {
        const tens = ~~(accumulator/10);
        result.text +=`, ${tens} tens`;
        accumulator = accumulator - (tens * 10);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 5) {
        const fives = ~~(accumulator/5);
        result.text +=`, ${fives} fives`;
        accumulator = accumulator - (fives * 5);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 2) {
        const twos = ~~(accumulator/2);
        result.text +=`, ${twos} two's`;
        accumulator = accumulator - (twos * 2);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 1) {
        const ones = ~~(accumulator/1);
        result.text +=`, ${ones} one's`;
        accumulator = accumulator - (ones * 1);
        if (accumulator === 0) return result;
    };
    // Lets hack the coins
    accumulator = accumulator * 100;
    if(accumulator >= 50) {
        const half = ~~(accumulator/50);
        result.text +=`, ${half} half(50)`;
        accumulator = accumulator - (half * 50);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 25) {
        const quarter = ~~(accumulator/25);
        result.text +=`, ${quarter} quarter(25)`;
        accumulator = accumulator - (quarter * 25);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 10) {
        const dime = ~~(accumulator/10);
        result.text +=`, ${dime} dime's(10)`;
        accumulator = accumulator - (dime * 10);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 5) {
        const nickel = ~~(accumulator/5);
        result.text +=`, ${nickel} nickel's(5)`;
        accumulator = accumulator - (nickel * 5);
        if (accumulator === 0) return result;
    };
    if(accumulator >= 1) {
        const penny = ~~(accumulator/1);
        result.text +=`, ${penny} penny's(1)`;
        accumulator = accumulator - (penny * 1);
        if (accumulator === 0) return result;
    };
    return result;
};

const printResult = (obj) => {
    output.classList.remove('error'); // removes error output style
    output.classList.add('result');   // adds normal style
    output.innerHTML = `
        <p>CHANGE:  ${obj.change}</p>
        <p>NOMINALS:${obj.text}</p>
    `;
};

const printError = (message) => {
    output.classList.remove('result'); // removes normal output style
    output.classList.add('error');     // adds error style
    output.innerText = message;
};