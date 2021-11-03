"use strict"

function gcd(a, b) {
    while (a && b) {
        a > b ? a %= b : b %= a;
    }
    return a > b ? a : b;
}

console.log(gcd(1024, 512));