const numbers = document.querySelectorAll('.num');
const clear = document.getElementById('clear');
const display = document.getElementById('display');

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        display.textContent += event.target.textContent;
    });
});

clear.addEventListener('click', (event) => {
    display.textContent = "";
});


