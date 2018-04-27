import {IMenuProvider} from "./IMenuProvider";
import Dish from "../../common/Dish";
import * as jsonpath from "jsonpath";
import * as axios from "axios";

export const createZomatoMenuProvider = (zomatoUserKey: string, restaurantId: number) =>
    class ZomatoMenuProvider implements IMenuProvider {
        getMenu = (): Promise<Dish[]> => {
            return new Promise<Dish[]>((resolve, reject) => {
                axios
                    .get(`https://developers.zomato.com/api/v2.1/dailymenu?res_id=${restaurantId}`,
                        {
                            headers: {
                                'Accept': 'application/json',
                                'user_key': zomatoUserKey
                            }
                        })
                    .then(zomatoResponse => {
                        const dishes = jsonpath.query(zomatoResponse.data, '$.daily_menus[*].daily_menu.dishes[*].dish') as Dish[];
                        resolve(dishes);
                    })
                    .catch(exception => reject(exception));
            });
        }
    };
