import { Bicycle } from "../modules/bicycles/bicycle.model";
import { Brand } from "../modules/brands/brand.model";
import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model";
import { Customer } from "../modules/customers/customer.model";
import { Order } from "../modules/orders/order.model";

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
}
