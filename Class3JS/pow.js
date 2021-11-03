"use strict"

function pow(x, n) {
    res = x;
    for (let i = 0; i < n-1; i++) {
        res *= x;
    }
    return res;
}

console.log(pow(2, 10));