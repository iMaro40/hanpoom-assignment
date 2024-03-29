import { parseFile } from "@fast-csv/parse";

async function readCSV(path: string): Promise<any[]> {
  const data: any[] = [];

  return new Promise((resolve, reject) => {
    parseFile(path)
      .on("data", (row) => {
        data.push(row);
      })
      .on("error", (error) => {
        console.log(`Error reading ${path}`);
        console.log(error);
        reject(`Error reading ${path}`);
      })
      .on("end", () => {
        resolve(data);
      });
  });
}

function createInsertQuery(tableName: string, data: any[], n = 20): string {
  let output = `INSERT INTO ${tableName}\nVALUES\n`;

  for (const fields of data) {
    let value = "(";
    for (const field of fields) {
      value += field ? `'${field}', ` : `NULL, `;
    }
    value = value.slice(0, -2); // Remove trailing white space and comma
    value += "),\n";

    output += value;
  }
  output = output.slice(0, -2); // Remove trailing newline and comma
  output += ";";
  return output;
}

async function main() {
  const pickingSlipsPath = "src/scripts/hanpoom_picking_slips.csv";
  const pickingSlipDatesPath = "src/scripts/hanpoom_picking_slip_dates.csv";
  const pickingSlipItemsPath = "src/scripts/hanpoom_picking_slip_items.csv";

  let pickingSlips = await readCSV(pickingSlipsPath);
  let pickingSlipDates = await readCSV(pickingSlipDatesPath);
  let pickingSlipItems = await readCSV(pickingSlipItemsPath);

  // First item is headers so remove it
  pickingSlips.shift();
  pickingSlipDates.shift();
  pickingSlipItems.shift();

  // Remove records in pickingSlipDates and pickingSlipItems that reference nonexistent pickingSlips id's
  const idChecker: Record<string, boolean> = {};
  for (const slip of pickingSlips) {
    const id = slip[0];
    idChecker[id] = true;
  }

  pickingSlipDates = pickingSlipDates.filter((slipDate) => {
    const slipId = slipDate[1];
    return idChecker[slipId];
  });

  pickingSlipItems = pickingSlipItems.filter((item) => {
    const slipId = item[1];
    return idChecker[slipId];
  });

  const a = createInsertQuery("picking_slips", pickingSlips);
  const b = createInsertQuery("picking_slip_items", pickingSlipItems);
  const c = createInsertQuery("picking_slip_dates", pickingSlipDates);

  console.log(a);
  console.log(b);
  console.log(c);
}

main();
