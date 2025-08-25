const numbers = document.querySelectorAll('.num');
const clear = document.getElementById('clear');
const display = document.getElementById('display');

Object.defineProperty(window, 'content', {
    get: () => display.textContent,
    set: (n) => display.textContent = n
});

numbers.forEach((number) => 
    number.addEventListener('click', function() {
        if (this.id == 'dot' && content.includes('.')) return;
        content += this.textContent
    })
);

document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key == '.' && content.includes('.') || key !== '.' && isNaN(+key)) return;

    key == ' ' ?
        content = '' : 
        content += key
});

clear.addEventListener('click', (event) => {
    content = "";
});
