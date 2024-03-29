import { Request, Response, Router } from "express";
import { PickingSlipService } from "../services/picking-slip";
import { PickingSlipStatus } from "../domain/picking-slips";

export class PickingSlipController {
  private readonly router: Router = Router();
  constructor(private pickingSlipService: PickingSlipService) {
    this.router.get("/", this.getLatestPreOrderSlips.bind(this));
  }

  getRouter(): Router {
    return this.router;
  }

  private async getLatestPreOrderSlips(req: Request, res: Response) {
    try {
      const { status, limit, offset } = req.query;
      if (!Object.values<string>(PickingSlipStatus).includes(status as string))
        return res.status(400).json({ message: "Invalid picking slip status" });

      const pickingSlips = await this.pickingSlipService.getLatestPreOrderSlips(
        {
          status: status as string,
          limit: limit as string,
          offset: offset as string,
        }
      );

      return res.status(200).send(pickingSlips);
    } catch (e) {
      return res.status(200).json(e);
    }
  }
}
