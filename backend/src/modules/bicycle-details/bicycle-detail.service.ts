import { BicycleDetail } from "../bicycle-details/bicycle-detail.model";
import { Bicycle } from "../bicycles/bicycle.model";

const includeBicycle = {
    model: Bicycle,
    as: "bicycle",
    attributes: ["id", "model"],
};

export class BicycleDetailService {
    static async findAll() {
        return BicycleDetail.findAll({
            order: [["id", "ASC"]],
            include: [includeBicycle],
        });
    }

    static async findById(id: number) {
        return BicycleDetail.findByPk(id, {
            include: [includeBicycle],
        });
    }

    static async create(data: {
        bicycleID: number;
        frameMaterial: "Aluminum" | "Carbon" | "Steel" | "Titanium";
        wheelSize: number;
        weight: number;
        suspension?: string | null;
    }) {
        return BicycleDetail.create(data);
    }

    static async update(
        bicycleDetail: BicycleDetail,
        data: {
            bicycleID?: number;
            frameMaterial?: "Aluminum" | "Carbon" | "Steel" | "Titanium";
            wheelSize?: number;
            weight?: number;
            suspension?: string | null;
        }
    ) {
        return bicycleDetail.update(data);
    }


    static async delete(bicycleDetail: BicycleDetail) {
        await bicycleDetail.destroy();
    }

}