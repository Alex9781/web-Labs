"use sctrict"

function getSortedArray(array, key) {

    for (let i = 0; i < array.length ; i++) {
        for(let j = 0 ; j < array.length - i - 1; j++) { 
            if (array[j][key] > array[j + 1][key]) {
            let t = array[j + 1];
            array[j + 1] = array[j];
            array[j] = t;
            }
        }
    }

    return array;
}

let array = [{name: 'Влад', age: 46}, {name: 'Костя', age: 97}, {name: 'Александр', age: 69}, {name: 'Гриша', age: 10}];

array = getSortedArray(array, 'age');
console.log(array);
