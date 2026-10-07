import { Bicycle } from "../modules/bicycles/bicycle.model";
import { Brand } from "../modules/brands/brand.model";
import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model";
import { Customer } from "../modules/customers/customer.model";
import { Order } from "../modules/orders/order.model";
import { OrderItem } from "../modules/order-items/order-item.model";

export function defineAssociations() {
    Brand.hasMany(Bicycle, { foreignKey: "brandID", as: "bicycles" });
    Bicycle.belongsTo(Brand, { foreignKey: "brandID", as: "brand" });

    Bicycle.hasOne(BicycleDetail, {
        foreignKey: "bicycleID", as: "detail", onDelete: "CASCADE", onUpdate: "CASCADE"
    });
    BicycleDetail.belongsTo(Bicycle, {
        foreignKey: "bicycleID", as: "bicycle"
    });
    Customer.hasMany(Order, { foreignKey: "customerID", as: "orders" });
    Order.belongsTo(Customer, { foreignKey: "customerID", as: "customer" });
    Order.belongsToMany(Bicycle, {
        through: "OrderItem", foreignKey: "orderID", otherKey: "bicycleID", as: "bicycles"
    });
    Bicycle.belongsToMany(Order, {
        through: "OrderItem", foreignKey: "bicycleID", otherKey: "orderID", as: "orders"
    });
    Order.hasMany(OrderItem, { foreignKey: "orderID", as: "items" });
    OrderItem.belongsTo(Order, { foreignKey: "orderID", as: "order" });
    Bicycle.hasMany(OrderItem, { foreignKey: "bicycleID", as: "orderItems" });
    OrderItem.belongsTo(Bicycle, { foreignKey: "bicycleID", as: "bicycle" });
}
