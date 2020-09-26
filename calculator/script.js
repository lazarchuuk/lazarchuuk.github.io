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
            case '*':
                document.getElementById('result').innerText = `${multiply(new Big(a), new Big(b))}`;
                break;
            case '/':
                document.getElementById('result').innerText = `${division(new Big(a), new Big(b))}`;
                break;
        }
    } catch (err) {
        alert(`${err}`);
    }

}

function sum(x, y) {
    return result(x.plus(y).round(6).toPrecision());
}

function diff(x, y) {
    return result(x.minus(y).round(6).toPrecision());
}

function multiply(x, y) {
    return result(x.times(y).round(6).toPrecision());
}

function division(x, y) {
    return result(x.div(y).round(6).toPrecision());
}

function result(val) {
    let parts = val.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
}

function prettier(val) {
    isValid(val);
    return val.replace(',', '.').replace(/\s/g, "");
}

function isValid(val) {
    const reg = new RegExp('^(((\\d{1,3})( \\d{3})*)|(\\d*))(\\.\\d*)?$')
    if ((val.indexOf('e') !== -1) || (!!!reg.test(val))) {
        throw new Error('Invalid Data');
    }
    return true;
}
