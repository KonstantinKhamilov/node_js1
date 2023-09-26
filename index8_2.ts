// Задание 2 🍔
function subtractOrSquare(a?: number, b?: number): number {
    if (a === undefined && b === undefined) {
        throw new Error('Both parameters are undefined');
    }
    if (b === undefined) {
        return a * a;
    }
    return a - b;
}