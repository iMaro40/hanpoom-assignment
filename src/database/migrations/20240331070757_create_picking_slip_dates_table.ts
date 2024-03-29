import type { Knex } from "knex";

const TABLE_NAME = "picking_slip_dates";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, function (table) {
    table.bigIncrements("id").primary();
    table.bigint("picking_slip_id").references("picking_slips");
    table.string("printed_username", 20);
    table.string("inspected_username", 20);
    table.string("packed_username", 20);
    table.string("shipped_username", 20);
    table.string("held_username", 20);
    table.string("cancelled_username", 20);
    table.string("refunded_username", 20);
    table.string("confirmed_username", 20);
    table.datetime("printed_at", { useTz: false });
    table.datetime("inspected_at", { useTz: false });
    table.datetime("packed_at", { useTz: false });
    table.datetime("shipped_at", { useTz: false });
    table.datetime("delivered_at", { useTz: false });
    table.datetime("returned_at", { useTz: false });
    table.datetime("cancelled_at", { useTz: false });
    table.datetime("refunded_at", { useTz: false });
    table.datetime("held_at", { useTz: false });
    table.datetime("confirmed_at", { useTz: false });
    table.string("held_reason", 20);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
