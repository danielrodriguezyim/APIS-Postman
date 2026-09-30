import { Request, Response, NextFunction } from "express";
import { BicycleDetailService } from "./bicycle-detail.service";

export class BicycleController {

  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycleDetail = await BicycleDetailService.findEagerlyById(id);

      if (!bicycleDetail) {
        res.status(404).json({
          message: "Detalle de bicicleta no encontrado",
        });
        
        return;
      }

      res.json(bicycleDetail);

    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bicycleDetails = await BicycleDetailService.findAll();

      res.json(bicycleDetails);
    } catch (error) {
      next(error);
    }
  }


  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycleDetail = await BicycleDetailService.findById(id);

      if (!bicycleDetail) {
        res.status(404).json({
          message: "Detalle de bicicleta no encontrado",
        });

        return;
      }

      res.json(bicycleDetail);

    } catch (error) {
      next(error);
    }
  }


  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { bicycleId, frameMaterial, wheelSize, weight, suspension } = req.body;

      if (!bicycleId || !frameMaterial || !wheelSize || !weight) {
        res.status(400).json({
          message: "brand, model y price son obligatorios",
        });

        return;
      }

      const bicycleDetail = await BicycleDetailService.create({
        bicycleId,
        frameMaterial,
        wheelSize,
        weight,
        suspension,
      });

      res.status(201).json(bicycleDetail);

    } catch (error) {
      next(error);
    }
  }


  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycleDetail = await BicycleDetailService.findById(id);

      if (!bicycleDetail) {
        res.status(404).json({
          message: "Detalle de bicicleta no encontrado",
        });

        return;
      }

      const updatedBicycle = await BicycleDetailService.update(
        bicycleDetail,
        req.body
      );

      res.json(updatedBicycle);

    } catch (error) {
      next(error);
    }
  }


  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const bicycleDetail = await BicycleDetailService.findById(id);

      if (!bicycleDetail) {
        res.status(404).json({
          message: "Detalle de bicicleta no encontrado",
        });

        return;
      }

      await BicycleDetailService.delete(bicycleDetail);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
