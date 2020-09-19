const x = new Big('1000000000000.000000');
const y = new Big('900000000000.999999');

const calcForm = document.forms['calc'];
calcForm.addEventListener('submit', calculator);

function calculator(event) {
    event.preventDefault();
    document.getElementById('result').innerText = '';
    try {
        const a = prettier(calcForm.elements['first-num'].value);
        const b = prettier(calcForm.elements['second-num'].value);
        switch (document.querySelector('input[name="operation"]:checked').value) {
            case '+':
                document.getElementById('result').innerText = `${sum(new Big(a), new Big(b))}`;
                break;
            case '-':
                document.getElementById('result').innerText = `${diff(new Big(a), new Big(b))}`;
                break;
        }
    } catch (err) {
        console.error(`Error: ${err}`);
    }

}

function sum(x, y) {
    return x.plus(y).toPrecision();
}

function diff(x, y) {
    return x.minus(y).toPrecision();
}

function prettier(val) {
    isValid(val);
     return val.replace(',', '.');
}

function isValid(val) {
    if (val.indexOf('e') !== -1) {
        throw new Error('Invalid Data');
    }
    return true;
}
