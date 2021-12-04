'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function(chunk) {
    inputString += chunk;
});
process.stdin.on("end", function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function dataFinder(data) {
    const error = new Error('Invalid range')

    function find(minRange, maxRange, range) {
        if (minRange >= 0 && maxRange <= data.length) {
            const index = data.indexOf(range)
            if (index >= minRange && index <= maxRange) {
                return true
            } else {
                return false
            }
        } else {
            return error
        }

    }
    return find
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const data = readLine().trim().split(' ');
    const finalData = data.map(val => parseInt(val));
    const join = dataFinder(finalData);
    try {
        const inputs = readLine().trim().split(' ');
        const result = join(parseInt(inputs[0]), parseInt(inputs[1]), parseInt(inputs[2]));
        ws.write(result.toString());
    } catch (e) {
        ws.write(`${e}`);
    }
    ws.end();
}
