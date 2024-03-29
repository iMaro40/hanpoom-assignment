import request from "supertest";
import { Application } from "express";
import http from "http";
import { startServer } from "../../src/server";
import { knex } from "../../src/database";
import { PickingSlipStatus } from "../../src/domain/picking-slips";

const mockPickingSlip = {
  id: "68",
  order_id: "63",
  order_fulfillment_order_id: "68",
  is_contained_single_product: "0",
  created_at: "2022-12-02 06:18:53",
};
const mockPickingSlipDate = {
  id: "68",
  picking_slip_id: "68",
  printed_username: null,
  inspected_username: null,
  packed_username: null,
  shipped_username: null,
  held_username: "jman(369)",
  cancelled_username: null,
  refunded_username: "mason",
  confirmed_username: "system(0)",
  printed_at: "2022-12-16 02:58:04",
  inspected_at: "2022-12-16 02:58:11",
  packed_at: "2022-12-16 02:58:19",
  shipped_at: "2022-12-16 02:57:53",
  delivered_at: null,
  returned_at: null,
  cancelled_at: null,
  refunded_at: "2022-12-02 16:45:03",
  held_at: "2022-12-02 07:45:24",
  confirmed_at: null,
  held_reason: "others",
};
const mockPickingSlipItems = [
  {
    id: "311",
    picking_slip_id: "69",
    item_id: "882016",
    stock_id: "1439",
    order_fulfillment_product_id: "307",
    quantity: "1",
    refunded_quantity: "0",
    location_id: "10",
    location_code: "FZ",
    is_pre_order: "0",
    is_sales_only: "0",
    pre_order_shipping_at: null,
    pre_order_deadline_at: null,
    created_at: "2022-12-02 06:33:51",
    updated_at: "2022-12-02 06:33:51",
  },
  {
    id: "312",
    picking_slip_id: "69",
    item_id: "907892",
    stock_id: "1031",
    order_fulfillment_product_id: "308",
    quantity: "1",
    refunded_quantity: "0",
    location_id: "10",
    location_code: "FZ",
    is_pre_order: "0",
    is_sales_only: "0",
    pre_order_shipping_at: null,
    pre_order_deadline_at: null,
    created_at: "2022-12-02 06:33:51",
    updated_at: "2022-12-02 06:33:51",
  },
];

describe("Picking Slip API", () => {
  let app: Application;
  let server: http.Server;
  beforeAll(async () => {
    const { app: initApp, server: initServer } = await startServer();
    app = initApp;
    server = initServer;
    try {
      await knex.migrate.latest({ directory: "./src/database/migrations" });
    } catch (e) {}

    await knex("picking_slips").del();
    await knex("picking_slip_dates").del();
    await knex("picking_slip_items").del();

    await knex("picking_slips").insert(mockPickingSlip);
    await knex("picking_slip_dates").insert(mockPickingSlipDate);
    await knex("picking_slip_items").insert(mockPickingSlipItems);
  });
  afterAll(async () => {
    await knex.destroy();
    server.close();
  });
  describe("GET /api/picking-slips", () => {
    describe("Positive Cases", () => {
      it("Should return 200", async () => {
        const status = PickingSlipStatus.HELD;
        const limit = 5;
        const offset = 0;

        const expectedRes = [
          {
            picking_slip_id: mockPickingSlip.id,
            order_id: mockPickingSlip.order_id,
            has_pre_order_item: false,
            picking_slip_status: status,
            limit,
            offset,
          },
        ];

        const res = await request(app)
          .get("/api/picking-slips")
          .query({ limit, offset, status })
          .send();
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(expectedRes);
      });
    });
  });
});
