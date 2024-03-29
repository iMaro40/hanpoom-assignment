export enum PickingSlipStatus {
  NOT_PRINTED = "NOT_PRINTED",
  PRINTED = "PRINTED",
  HELD = "HELD",
}
export interface IGetLatestPreOrderSlips {
  status: string;
  limit: string;
  offset: string;
}

export interface IGetLatestPreOrderSlipsDB {
  status: PickingSlipStatus;
  limit: number;
  offset: number;
}

export interface PickingSlipData {
  picking_slip_id: string;
  order_id: string;
  picking_slip_status: string;
  has_pre_order_item: boolean;
  limit: number;
  offset: number;
}
