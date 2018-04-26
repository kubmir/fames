import * as axios from 'axios';
import * as jsonpath from 'jsonpath';

import Dish from '../common/Dish';
import EspanolaMenuProvider from './EspanolaMenuProvider';
import AlCaponeMenuProvider from './AlCaponeMenuProvider';
import { retrieveIndiaMenu } from "./retrieveIndiaMenu";

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
                const alCaponeMenuProvider = new AlCaponeMenuProvider();
                return alCaponeMenuProvider.getMenu();
            case 16505872:
                const espanolaMenuProvider = new EspanolaMenuProvider();
                return espanolaMenuProvider.getMenu();
            case 16511911:
                return retrieveIndiaMenu();
            default:
                return this.getZomatoMenu(restaurantId);
        }
    }

    private getZomatoMenu(restaurantId: number): Promise<Dish[]>
    {
        return new Promise<Dish[]>((resolve, reject) => {
            axios
                .get(`https://developers.zomato.com/api/v2.1/dailymenu?res_id=${restaurantId}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'user_key': this.zomatoUserKey
                    }
                })
                .then(zomatoResponse => {
                    const dishes = jsonpath.query(zomatoResponse.data, '$.daily_menus[*].daily_menu.dishes[*].dish') as Dish[];
                    resolve(dishes);
                })
                .catch(exception => reject(exception));
        });
    }
}
