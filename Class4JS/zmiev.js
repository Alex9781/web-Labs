"use strict";


//Задача 1
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

let arr = [5, 10, 54, 69, 66, 14, 2];
bubbleSort(arr);
console.log(arr);


//Задача 2
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


//Задача 3
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


//Задача 4
function Vector(x, y, z) {
    this.x = x,
    this.y = y,
    this.z = z,

    this.sum = function(vect) {
        return new Vector(this.x + vect.x, this.y + vect.y, this.z + vect.z);
    },

    this.mult = function(vect) {
        return new Vector(this.x * vect.x, this.y * vect.y, this.z * vect.z);
    },

    this.subtr = function(vect) {
        return new Vector(this.x - vect.x, this.y - vect.y, this.z - vect.z);
    },

    this.multNum = function(num) {
        return new Vector(this.x * num, this.y * num, this.z * num);
    },

    this.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },

    this.scalar = function(vect){
        return this.x * vect.x + this.y * vect.y + this.z * vect.z;
    }
};

let x = new Vector(5, 5, 5);
console.log(x.length());