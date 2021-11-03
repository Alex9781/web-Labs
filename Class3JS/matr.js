"use strict";

function matr(matr) {
    let resArr = [];
    for (const i of matr) {
        let min = i[0];
        for (const j of i) {
            if (j < min) min = j;
        }
        resArr.push(min);
    }
    let res = resArr[0];
    for (const i of resArr) {
        if (res < i) res = i;
    }

    return res;
}

let mat = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]];
console.log(matr(mat));