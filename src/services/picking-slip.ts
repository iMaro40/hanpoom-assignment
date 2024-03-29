import {
  IGetLatestPreOrderSlips,
  PickingSlipStatus,
} from "../domain/picking-slips/picking-slip";
import { PickingSlipRepository } from "../repositories";

export class PickingSlipService {
  constructor(private pickingSlipRepository: PickingSlipRepository) {}

  async getLatestPreOrderSlips(data: IGetLatestPreOrderSlips) {
    const { status, limit, offset } = data;
    const parsedStatus =
      PickingSlipStatus[status as keyof typeof PickingSlipStatus];

    return this.pickingSlipRepository.getLatestPickingSlips({
      limit: Number(limit) || 3,
      offset: Number(offset) || 0,
      status: parsedStatus,
    });
  }
}
