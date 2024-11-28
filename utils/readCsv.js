const fs = require('fs');
const csv = require('csv-parser');

// Function to read items from a CSV file
async function readCsv(filePath) {
    const items = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => items.push(row))
            .on('end', () => resolve(items))
            .on('error', (error) => reject(error));
    });
}

module.exports = { readCsv };