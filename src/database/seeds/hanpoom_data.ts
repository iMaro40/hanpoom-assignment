import { parseFile } from "@fast-csv/parse";
import { Knex } from "knex";

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
function matchHeadersWithData(headers: any[], data: any[]) {
  return data.map((fields) => {
    const obj: Record<string, any> = {};

    headers.forEach((header: string, i: number) => {
      obj[header] = fields[i] || null;
    });
    return obj;
  });
}

async function createSeedData() {
  const pickingSlipsPath = "src/scripts/hanpoom_picking_slips.csv";
  const pickingSlipDatesPath = "src/scripts/hanpoom_picking_slip_dates.csv";
  const pickingSlipItemsPath = "src/scripts/hanpoom_picking_slip_items.csv";

  let pickingSlips = await readCSV(pickingSlipsPath);
  let pickingSlipDates = await readCSV(pickingSlipDatesPath);
  let pickingSlipItems = await readCSV(pickingSlipItemsPath);

  const pickingSlipsHeaders = pickingSlips.shift();
  const pickingSlipDatesHeaders = pickingSlipDates.shift();
  const pickingSlipItemsHeaders = pickingSlipItems.shift();

  pickingSlips = matchHeadersWithData(pickingSlipsHeaders, pickingSlips);
  pickingSlipDates = matchHeadersWithData(
    pickingSlipDatesHeaders,
    pickingSlipDates
  );
  pickingSlipItems = matchHeadersWithData(
    pickingSlipItemsHeaders,
    pickingSlipItems
  );

  return { pickingSlips, pickingSlipDates, pickingSlipItems };
}

export async function seed(knex: Knex): Promise<void> {
  await knex("picking_slips").del();
  await knex("picking_slip_dates").del();
  await knex("picking_slip_items").del();

  const { pickingSlips, pickingSlipDates, pickingSlipItems } =
    await createSeedData();

  await knex.batchInsert("picking_slips", pickingSlips);
  await knex.batchInsert("picking_slip_dates", pickingSlipDates);
  await knex.batchInsert("picking_slip_items", pickingSlipItems);
}
