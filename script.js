const numbers = document.querySelectorAll('.num');
const operators = document.getElementById('operators').childNodes;

const main = document.getElementById('main');
const upper = document.getElementById('upper');

// defines main.textContent as content
Object.defineProperty(window, 'content', {
    get: () => main.textContent,
    set: (n) => main.textContent = n
});

numbers.forEach((number) => 
    number.addEventListener('click', function() {
        if (this.id == 'dot' && content.includes('.') ||
            this.id == 'n0' && content == '' && !content.includes('.')) return;
        if (this.id == 'dot' && content == '') return content += '0.';
        
        content += this.textContent;

        adjustText();
    })
);

document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key == '.' && content.includes('.') ||
        key == '0' && content == '' && !content.includes('.') ||
        key !== '.' && isNaN(+key)) return;
    if (content == '' && key == '.') return content += '0.';

    key == ' ' ?
        content = '' : 
        content += key ;

    adjustText();
});


const clear = document.getElementById('clear');
clear.addEventListener('click', (event) => {
    content = "";
});

const allClear = document.getElementById('allClear');
allClear.addEventListener('click', (event) => {
    content = '', upper.textContent = '', calc = [];
});

const erase = document.getElementById('erase');
erase.addEventListener('click', (event) => {
    content = content.slice(0, -1);
    adjustText()
});

function adjustText() {
    let textList = [...content];
    let dotIndex = textList.indexOf('.');

    let textSlice = dotIndex > 0 ? textList.slice(0, dotIndex) : textList;
    let dotSlice = dotIndex > 0 ? textList.slice(dotIndex) : [];

    textSlice = textSlice.filter((item) => item != ',');
    
    let arr = textSlice.reverse().reduce((acc, item, i) => {
        i > 0 && i % 3 == 0 ? acc.push(',', item) : acc.push(item);
        return acc;
    }, []);

    content = arr.reverse().join('') + dotSlice.join('');
    return;
}

let calc = [];

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        let opt = event.target.textContent

        if (content == '') {
            calc.pop();
            calc.push(opt)

        } else {
        calc.push(content, event.target.textContent);
        content = '';

        }

        upper.textContent = [...calc].join(' ');
        
    });
});

const equal = document.getElementById('equal');
equal.addEventListener('click', (event) => {

    calc.push(String(content));
    upper.textContent = [...calc].join(' ');
    calc = calc.map((item, i) => i % 2 == 0 ? item.replace(/,/g, '') : item);

    let calcs = calc.filter((item, index) => index % 2 != 0);

    for (_ in calcs) {
        let multi = calc.indexOf('*'), divide = calc.indexOf('/');
        let sum = calc.indexOf('+'), sub = calc.indexOf('-');

        if (multi > 0) calc.splice(multi - 1, 3, calc[multi -1] * calc[multi +1]);
        else if (divide > 0) calc.splice(divide - 1, 3, calc[divide -1] / calc[divide +1]);
        else if (sub > 0) calc.splice(sub - 1, 3, calc[sub -1] - calc[sub +1]);
        else if (sum > 0) calc.splice(sum - 1, 3, Number(calc[sum -1]) + Number(calc[sum +1]));

    }

    content = calc[0];
    adjustText();

    calc = []

});
