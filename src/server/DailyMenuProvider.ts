import Dish from '../common/Dish';
import AlCaponeMenuProvider from './providers/AlCaponeMenuProvider';
import { LightOfIndiaMenuProvider } from "./providers/LightOfIndiaMenuProvider";
import {IMenuProvider} from "./providers/IMenuProvider";
import {createZomatoMenuProvider} from "./providers/ZomatoMenuProvider";

export default class DailyMenuProvider {
    private readonly zomatoUserKey: string;
    
    public constructor(zomatoUserKey: string) {
        this.zomatoUserKey = zomatoUserKey;
    }
    
    public getDailyMenu(restaurantId: number): Promise<Dish[]>
    {
        // Some restaurants cannot be retrieved from Zomato and are handled separately.
        switch (restaurantId) {
            case 16515833:
                return this.getMenuFrom(AlCaponeMenuProvider);
            case 16511911:
                return this.getMenuFrom(LightOfIndiaMenuProvider);
            default:
                const ZomatoMenuProvider = createZomatoMenuProvider(this.zomatoUserKey, restaurantId);
                return this.getMenuFrom(ZomatoMenuProvider);
        }
    }

    private getMenuFrom = (provider: { new(): IMenuProvider }): Promise<Dish[]> =>
        new provider().getMenu();
}
