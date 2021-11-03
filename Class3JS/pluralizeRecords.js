"use strict"

function pluralizeRecords(n){
    if (n % 10 == 1 && n % 100 != 11) return `В результате выполнения запроса было найдено ${n} запись`;
    else if (n % 10 >= 2 && n % 10 <= 4 && n % 100 >= 12 && n % 100 <= 14) return `В результате выполнения запроса было найдено ${n} записи`;
    else return `В результате выполнения запроса было найдено ${n} записей`;
}

console.log(pluralizeRecords(15));