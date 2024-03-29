import type { Knex } from "knex";

const TABLE_NAME = "picking_slips";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.bigIncrements("id").primary();
    table.bigint("order_id");
    table.bigint("order_fulfillment_order_id");
    table.boolean("is_contained_single_product");
    table.datetime("created_at", { useTz: false }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
