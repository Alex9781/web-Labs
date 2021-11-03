'use strict';

function fuct(n) {
    let res = 1;
    for (let i = n; i > 0; i--) res *= i;
    return res;
}

function fuctRec(n) {
    if (n > 1) return fuctRec(n - 1) * n;
    else return 1;
}

console.log(fuct(5));
console.log(fuctRec(5));



function xor(a, b) {
    if (a + b == 1) return true;
    if (a + b == 0 || a + b == 2) return false;
}

console.log(xor(true, true));

function isPalindrome(str) {
    for (let i = 0; i < str.length / 2; i++) if (str[i] != str[str.length - i - 1]) return false;
    return true;
}

console.log(isPalindrome("abba"));

function isArmstrong(n) {
    let strinN = String(n)
    let res = 0;
    for (let i = 0; i < strinN.length; i++) {
        res+= strinN[i]**strinN.length;
    }
    return res == n;
}

console.log(isArmstrong(153));