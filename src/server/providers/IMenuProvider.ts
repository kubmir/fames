import Dish from "../../common/Dish";

export interface IMenuProvider {
    getMenu(): Promise<Dish[]>;
}
