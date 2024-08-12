import { IdentifiableOrder } from "@interfaces/type"

export const defaultOrder = (table: number) => {
    return {
        id: "",
        active: true,
        table: table,
        orderItems: [],
    } as IdentifiableOrder
}

