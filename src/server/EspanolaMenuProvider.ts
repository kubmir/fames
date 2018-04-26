import * as axios from 'axios';
import * as cheerio from 'cheerio';

import Dish from '../common/Dish';

export default class EspanolaMenuProvider {
    public getMenu(): Promise<Dish[]> {
        return new Promise<Dish[]>((resolve, reject) => {
            axios
                .get('http://www.espanola.cz/')
                .then((espanolaResponse: Axios.AxiosXHR<string>) => {
                    const dishes = this.extractDishes(espanolaResponse);
                    resolve(dishes);
                })
                .catch(exception => reject(exception))
        });
    }

    private extractDishes(espanolaResponse: Axios.AxiosXHR<string>): Dish[] {
        // Allows to query returned page with jQuery syntax.
        const $ = cheerio.load(espanolaResponse.data);

        // * Dishes are stored in child paragraphs (<p>) of document division (<div>) with class 'lunchText'.
        return $(`.lunchText p`)
            .toArray()
            .map((paragraph) => {
                const dishName = this.extractDishName(paragraph);
                const dishPrice = this.extractDishPrice(paragraph);

                const dish = new Dish();
                dish.name = dishName;
                dish.price = dishPrice;

                return dish;
            });
    }

    private extractDishName(paragraph: CheerioElement): string {
        // Paragraph contains dish name as text node.
        return paragraph
            .childNodes
            .filter(element => element.type === 'text')[0]
            .nodeValue
            .trim()
            .replace('  , ', ', ');
    }

    private extractDishPrice(paragraph: CheerioElement): string {
        // Paragraph contains dish price as text in child <strong> element.
        return paragraph
            .children
            .filter(element => element.tagName === 'strong')[0]
            .lastChild
            .nodeValue
            .replace(',-', ' Kč');
    }
}
