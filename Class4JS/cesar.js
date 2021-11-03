'use strict'

function cesar(str, shift, action) {
    let alph = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    let res = '';
    for (let c of str) {
        if (alph.indexOf(c) == -1) {
            res = res + c;
            continue;
        }
        if (action == 'encode') {
            res = res + alph[(alph.indexOf(c) + shift) % alph.length]
        }
        else if (action == 'decode') {
            if (alph.indexOf(c) - shift >= 0) res = res + alph[(alph.indexOf(c) - shift) % alph.length];
            else res = res + alph[(alph.length + alph.indexOf(c) - shift) % alph.length];
        }
    }

    return res;
}

for (let index = 0; index < 32; index++) {
    console.log(cesar("эзтыхз фзъзъз", index, "decode")); //хакуна матата
} 