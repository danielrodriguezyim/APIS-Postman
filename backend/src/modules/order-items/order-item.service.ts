import { OrderItem } from "./order-item.model";
import { Order } from "../orders/order.model";
import { Bicycle } from "../bicycles/bicycle.model";

const includeOrder = {
  model: Order,
  as: "order",
  attributes: ["id", "customerID", "orderDate", "status"],
};

const includeBicycle = {
  model: Bicycle,
  as: "bicycle",
  attributes: ["id", "model", "price"],
};

export class OrderItemService {

  static async findAll() {
    return OrderItem.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return OrderItem.findByPk(id);
  }

  static async findAllEagerly() {
    return OrderItem.findAll({
      include: [includeOrder, includeBicycle],
      order: [["id", "ASC"]],
    });
  }

  static async findEagerlyById(id: number) {
    return OrderItem.findByPk(id, {
      include: [includeOrder, includeBicycle],
    });
  }

  static async create(data: {
    orderID: number;
    bicycleID: number;
    quantity: number;
    unitPrice: number;
  }) {
    return OrderItem.create(data);
  }


  static async update(
    orderItem: OrderItem,
    data: {
      orderID?: number;
      bicycleID?: number;
      quantity?: number;
      unitPrice?: number;
    }
  ) {
    return orderItem.update(data);
  }


  static async delete(orderItem: OrderItem) {
    await orderItem.destroy();
  }
}
