"use strict";

function count(arr, n){
    let res = 0;
    for (const iterator of arr) {
        if (iterator == n) res++;
    }
    return res;
}

function func(arr){
    let res = {};
    for(let i = 0; i < arr.length; i++){
        if (arr.indexOf(arr[i]) != arr.lastIndexOf(arr[i])){
            res[arr[i]] = count(arr, arr[i]);
        }
    }
    return res;
}

let x = {};
let arr = [0, 1, 1, 5, 6, 8, 5, 6, 1];
x = func(arr);
console.log(x);