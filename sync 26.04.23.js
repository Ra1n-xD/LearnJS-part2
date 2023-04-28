'use strict';
// Бинарный поиск --------------------------------------------
function binary(arr, item) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (arr[mid] > item) end = mid - 1;
        else if (arr[mid] < item) start = mid + 1;
        else return mid;
    }

    return -1;
}
// сука я дура, заебал забывать console.log
const arr = [1, 3, 10, 44, 45, 50, 60, 70];
console.log(binary(arr, 22222));
console.log(binary(arr, 10));
console.log(binary(arr, 44));
console.log(binary(arr, 45));
console.log(binary(arr, 50));
console.log(binary(arr, 60));
console.log(binary(arr, 70));

const array3 = [];
const array4 = [5];
const array5 = [2, 4, 4, 4, 6, 8, 10];
console.log(binary(array3, 4));
console.log(binary(array4, 4));
console.log(binary(array5, 4));

// Найти пары с разницей `k` в массиве ---------------------------
// function findPairs(arr, diff) {
//     const answ = {};
//     arr.sort();

//     if (diff === 0) return [];

//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (Math.abs(arr[i] - arr[j]) === Math.abs(diff)) {
//                 answ[[arr[i], arr[j]]] = [arr[i], arr[j]];
//             }
//         }
//     }

//     return Object.values(answ);
// }
function findPairs(arr, diff) {
    if (diff === 0) return [];

    arr.sort((a, b) => a - b);
    const answ = {};

    for (let i = 0; i < arr.length; i++) {
        const find = binary(arr, arr[i] + diff);

        if (find !== -1) {
            answ[[arr[i], arr[i] + diff]] = [arr[i], arr[i] + diff];
        }
    }

    return Object.values(answ);
}

function testFindPairs() {
    const result1 = findPairs([1, 5, 3, 4, 2], 2);
    const expected1 = [
        [1, 3],
        [2, 4],
        [3, 5]
    ];
    if (JSON.stringify(result1) !== JSON.stringify(expected1)) {
        console.error(`1) Expected ${expected1} but got ${result1}`);
    }

    const result2 = findPairs([4, 6, 8, 2, 10], 2);
    const expected2 = [
        [2, 4],
        [4, 6],
        [6, 8],
        [8, 10]
    ];
    if (JSON.stringify(result2) !== JSON.stringify(expected2)) {
        console.error(`2) Expected ${expected2} but got ${result2}`);
    }

    const result3 = findPairs([1, 2, 3, 4, 5], -1);
    const expected3 = [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5]
    ];
    if (JSON.stringify(result3) !== JSON.stringify(expected3)) {
        console.error(`3) Expected ${expected3} but got ${result3}`);
    }

    const result4 = findPairs([1, 2, 3, 4, 5], 3);
    const expected4 = [
        [2, 5],
        [1, 4]
    ];
    if (JSON.stringify(result4) !== JSON.stringify(expected4)) {
        console.error(`4) Expected ${expected4} but got ${result4}`);
    }

    const result5 = findPairs([1, 2, 3, 4, 5], 0);
    const expected5 = [];
    if (JSON.stringify(result5) !== JSON.stringify(expected5)) {
        console.error(`5) Expected ${expected5} but got ${result5}`);
    }

    const result6 = findPairs([1, 5, 2, 2, 2, 5, 5, 4], 3);
    const expected6 = [
        [2, 5],
        [1, 4]
    ];
    if (JSON.stringify(result5) !== JSON.stringify(expected5)) {
        console.error(`5) Expected ${expected5} but got ${result5}`);
    }
}

testFindPairs();
