
function myEach(collection, callback) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            callback(collection[i], i, collection);
        }
    } else {
        const keys = Object.keys(collection);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            callback(collection[key], key, collection);
        }
    }
    return collection;
}

function myMap(collection, callback) {
    const result = [];
    myEach(collection, (value, key, collection) => {
        result.push(callback(value, key, collection));
    });
    return result;
}

function myReduce(collection, callback, acc) {

    const values = Array.isArray(collection) ? collection : Object.values(collection);
    let startingIndex = 0;
    if (acc === undefined) {
        acc = values[0];
        startingIndex = 1;
    }
    for (let i = startingIndex; i < values.length; i++) {
        acc = callback(acc, values[i], collection);
    }
    return acc;
}


function myFind(collection, predicate) {
    let result;
    let found = false; 
    myEach(collection, (value, key, collection) => {
        if (!found && predicate(value, key, collection)) {
            result = value;
            found = true; 
        }
    });
    return result;
}
function myFilter(collection, predicate) {
    const result = [];
    myEach(collection, (value, key, coll) => {
        if (predicate(value, key, coll)) {
            result.push(value);
        }
    });
    return result;
}

function mySize(collection) {
    if (Array.isArray(collection)) {
        return collection.length;
    } else {
        return Object.keys(collection).length;
    }
}


function myFirst(array, n) {
    if (n === undefined) {
        return array[0];
    } else {
        return array.slice(0, n);
    }
}

function myLast(array, n) {
    if (n === undefined) {
        return array[array.length - 1];
    } else {
        return array.slice(-n);
    }
}


function mySortBy(array, callback) {
    return array.slice().sort((a, b) => {
        const valueA = callback(a);
        const valueB = callback(b);
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    });
}


function myFlatten(array, shallow = false, newArr = []) {
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i]) && shallow) {
            for (let j = 0; j < array[i].length; j++) {
                newArr.push(array[i][j]);
            }
        } else if (Array.isArray(array[i])) {
            myFlatten(array[i], shallow, newArr);
        } else {
            newArr.push(array[i]);
        }
    }
    return newArr;
}


function myKeys(object) {
    return Object.keys(object);
}

function myValues(object) {
    return myMap(object, (value) => value);
}


console.log(myEach([1, 2, 3], alert)); 
console.log(myEach({one: 1, two: 2, three: 3}, alert)); 

console.log(myMap([1, 2, 3], function(num){ return num * 3; })); 
console.log(myMap({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; })); 

console.log(myReduce([1, 2, 3], function(acc, val, collection) { return acc + val; }, 10)); 
console.log(myReduce({one: 1, two: 2, three: 3}, function(acc, val, collection) { return acc + val; })); 

console.log(myFind([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; })); 
console.log(myFind({one: 1, three: 3, four: 4, six: 6}, function(num){ return num % 2 == 0; })); 

console.log(myFilter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; })); 
console.log(myFilter({one: 1, three: 3, five: 5}, function(num){ return num % 2 == 0; })); 

console.log(mySize({one: 1, two: 2, three: 3})); 
console.log(mySize([])); 

console.log(myFirst([5, 4, 3, 2, 1])); 
console.log(myFirst([5, 4, 3, 2, 1], 3)); 

console.log(myLast([5, 4, 3, 2, 1])); 
console.log(myLast([5, 4, 3, 2, 1], 3)); 


console.log(mySortBy([1, 2, 3, 4, 5, 6], function(num){ return Math.sin(num); })); 
const stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(mySortBy(stooges, function(stooge){ return stooge.name; })); 

console.log(myFlatten([1, [2], [3, [[4]]]])); 
console.log(myFlatten([1, [2], [3, [[4]]]], true)); 


console.log(myKeys({one: 1, two: 2, three: 3})); 
console.log(myValues({one: 1, two: 2, three: 3}));