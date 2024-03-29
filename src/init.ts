import { PickingSlipController } from "./controllers";
import { PickingSlipRepository } from "./repositories";
import { PickingSlipService } from "./services";
import { knex } from "./database";

export async function init() {
  const pickingSlipRepository = new PickingSlipRepository(knex);

  const pickingSlipService = new PickingSlipService(pickingSlipRepository);
  const pickingSlipController = new PickingSlipController(pickingSlipService);

  return {
    pickingSlipController,
  };
}
