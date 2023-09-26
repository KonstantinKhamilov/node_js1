function subtract(a, b) {
    return a - b;
}
function subtractOrSquare(a, b) {
    if (a === undefined && b === undefined) {
        throw new Error('Both parameters are undefined');
    }
    if (b === undefined) {
        return a * a;
    }
    return a - b;
}
function convertToNumbers(arr) {
    return arr.map(Number);
}
function logPerson(person) {
    var name = person.name, age = person.age, pet = person.pet;
    console.log(name, age, pet);
}
function toSet(arr) {
    return new Set(arr);
}
