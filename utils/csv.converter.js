"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvConverter = void 0;
const csv_parse_1 = require("csv-parse");
function CsvConverter(csvString) {
    return new Promise((resolve, reject) => {
        (0, csv_parse_1.parse)(csvString, {
            columns: true,
            skip_empty_lines: false,
        }, (err, output) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(output);
            }
        });
    });
}
exports.CsvConverter = CsvConverter;
//# sourceMappingURL=csv.converter.js.map