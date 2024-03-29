import type { Knex } from "knex";
const TABLE_NAME = "picking_slip_items";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.bigIncrements("id").primary();
    table.bigint("picking_slip_id").references("picking_slips");
    table.bigint("item_id");
    table.bigint("stock_id");
    table.bigint("order_fulfillment_product_id");
    table.integer("quantity");
    table.integer("refunded_quantity");
    table.bigint("location_id");
    table.string("location_code", 30);
    table.boolean("is_pre_order");
    table.boolean("is_sales_only");
    table.datetime("pre_order_shipping_at", { useTz: false });
    table.datetime("pre_order_deadline_at", { useTz: false });
    table.datetime("created_at", { useTz: false }).defaultTo(knex.fn.now());
    table.datetime("updated_at", { useTz: false }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
