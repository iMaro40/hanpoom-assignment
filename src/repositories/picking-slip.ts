import { Knex } from "knex";
import {
  IGetLatestPreOrderSlipsDB,
  PickingSlipData,
  PickingSlipStatus,
} from "../domain/picking-slips/picking-slip";

export class PickingSlipRepository {
  constructor(private knex: Knex) {}

  async getLatestPickingSlips(
    data: IGetLatestPreOrderSlipsDB
  ): Promise<PickingSlipData[]> {
    const { limit, offset, status } = data;

    try {
      const query = this.knex
        .select(
          "picking_slips.id AS picking_slip_id",
          "order_id",
          this.knex.raw(`
            CASE WHEN picking_slip_items.id IS NOT NULL
            THEN TRUE
            ELSE FALSE
            END has_pre_order_item`)
        )
        .from("picking_slips")
        .leftJoin("picking_slip_items", function () {
          this.on(
            "picking_slip_items.picking_slip_id",
            "=",
            "picking_slips.id"
          ).andOnVal("picking_slip_items.is_pre_order", "=", true);
        })
        .join(
          "picking_slip_dates",
          "picking_slips.id",
          "=",
          "picking_slip_dates.picking_slip_id"
        )
        .limit(limit)
        .offset(offset)
        .orderBy("picking_slips.created_at", "desc");

      query.modify((queryBuilder) => {
        switch (status) {
          case PickingSlipStatus.NOT_PRINTED: {
            queryBuilder
              .whereNull("picking_slip_dates.printed_at")
              .whereNull("picking_slip_dates.inspected_at")
              .whereNull("picking_slip_dates.shipped_at")
              .whereNull("picking_slip_dates.held_at");
            break;
          }
          case PickingSlipStatus.PRINTED: {
            queryBuilder
              .whereNotNull("picking_slip_dates.printed_at")
              .whereNull("picking_slip_dates.inspected_at")
              .whereNull("picking_slip_dates.shipped_at")
              .whereNull("picking_slip_dates.held_at");
            break;
          }
          case PickingSlipStatus.HELD: {
            queryBuilder.whereNotNull("picking_slip_dates.held_at");
            break;
          }
          default:
            break;
        }
      });

      const preOrderItems = await query;
      const preOrderItemsWithStatus = preOrderItems.map((item) => ({
        ...item,
        picking_slip_status: data.status,
        limit,
        offset,
      }));

      return preOrderItemsWithStatus;
    } catch (e) {
      console.log("Error running query");
      console.log(e);
      throw e;
    }
  }
}
