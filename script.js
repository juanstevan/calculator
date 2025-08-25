const numbers = document.querySelectorAll('.num');
const clear = document.getElementById('clear');
const main = document.getElementById('main');

// defines main.textContent as content
Object.defineProperty(window, 'content', {
    get: () => main.textContent,
    set: (n) => main.textContent = n
});

numbers.forEach((number) => 
    number.addEventListener('click', function() {
        if (this.id == 'dot' && content.includes('.')) return;
        if (this.id == 'dot' && content == '') return content += '0.';
        
        content += this.textContent;

        adjustText();
    })
);

document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key == '.' && content.includes('.') || key !== '.' && isNaN(+key)) return;
    if (content == '' && key == '.') return content += '0.';

    key == ' ' ?
        content = '' : 
        content += key ;

    adjustText();
});

clear.addEventListener('click', (event) => {
    content = "";
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
