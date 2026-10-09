import { Request, Response, NextFunction } from "express";
import { OrderItemService } from "./order-item.service";

export class OrderItemController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orderItems = await OrderItemService.findAll();

      res.json(orderItems);
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

      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Item de pedido no encontrado",
        });

        return;
      }

      res.json(orderItem);

    } catch (error) {
      next(error);
    }
  }

  static async getAllEagerly(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orderItems = await OrderItemService.findAllEagerly();

      res.json(orderItems);
    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const orderItem = await OrderItemService.findEagerlyById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Item de pedido no encontrado",
        });

        return;
      }

      res.json(orderItem);

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
      const { orderID, bicycleID, quantity, unitPrice } = req.body;

      if (!orderID || !bicycleID || !quantity || !unitPrice) {
        res.status(400).json({
          message: "Todos los campos son obligatorios",
        });

        return;
      }

      const orderItem = await OrderItemService.create({
        orderID,
        bicycleID,
        quantity,
        unitPrice
      });

      res.status(201).json(orderItem);

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

      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Item de pedido no encontrado",
        });

        return;
      }

      const updatedOrderItem = await OrderItemService.update(
        orderItem,
        req.body
      );

      res.json(updatedOrderItem);

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

      const orderItem = await OrderItemService.findById(id);

      if (!orderItem) {
        res.status(404).json({
          message: "Item de pedido no encontrado",
        });

        return;
      }

      await OrderItemService.delete(orderItem);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
