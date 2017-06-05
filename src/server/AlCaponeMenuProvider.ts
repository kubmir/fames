import * as axios from 'axios';
import * as cheerio from 'cheerio';

import Dish from '../common/Dish';

export default class AlCaponeMenuProvider {
    public getMenu(): Promise<Dish[]> {
        return new Promise<Dish[]>((resolve, reject) => {
            axios
                .get('http://www.pizzaalcapone.cz/brno/poledni-menu')
                .then((alCaponeResponse: Axios.AxiosXHR<string>) => {
                    const dishes = this.extractDishes(alCaponeResponse);

                    resolve(dishes);
                })
                .catch(exception => reject(exception));
        });
    }

    private extractDishes(alCaponeResponse: Axios.AxiosXHR<string>): Dish[] {
        // Allows to query returned page with jQuery syntax.
        const alCaponeMenuPage = cheerio.load(alCaponeResponse.data);

        const dishNames = this.extractDishNames(alCaponeMenuPage);
        const dishPrices = this.extractPrices(alCaponeMenuPage);

        return this.mergeDishNamesAndPrices(dishNames, dishPrices);
    }

    private extractDishNames(alCaponeMenuPage: CheerioStatic): string[] {
        // Dishes are stored as text in paragraph <p> with class .poledni-menu.active-day.
        const paragraphWithDayNameAndDishes = alCaponeMenuPage(`p.poledni-menu.active-day`);

        // Paragraph contains name of the day on first line and names of dishes and empty lines on others.
        // Remove name of the day and tags. Empty lines will be removed later.
        const unformatedDishNames = paragraphWithDayNameAndDishes[0].children
            .filter((item) => item.type !== "tag")
            .splice(1);

        // Remove empty lines and return dish names.
        return unformatedDishNames
            .map((value: CheerioElement) => value.nodeValue.trim())
            .filter(text => text.length !== 0);
    }

    private extractPrices(alCaponeMenuPage: CheerioStatic): string[] {
        // First item (soup) is present but it does not have its own price.
        const priceList: string[] = [''];

        // Prices are stored in separate paragraph (<p>) that can be recognized only by its known content, which is text string 'Kč'.
        const paragraphWithPriceList = alCaponeMenuPage('p.poledni-menu:contains("Kč")');

        // Paragraph contains more text lines which are filtered since they do not contain 'Kč'.
        const lineWithPriceList = paragraphWithPriceList
            .contents()
            .filter((_, element) =>
                element.type === 'text' && element.nodeValue.indexOf('Kč') !== -1)[0]
            .nodeValue;

        // Prices are separated by ' / '.
        const prices = lineWithPriceList
            .trim()
            .split(' / ');

        // Retrieve amount of money using regular expression.
        prices
            .forEach((content, index) => {
                const extractedAmount = content.match('Menu \\d - (.* Kč)')[1];

                priceList.push(extractedAmount);
            });

        return priceList;
    }

    private mergeDishNamesAndPrices(dishNames: string[], dishPrices: string[]): Dish[] {
        const dishes: Dish[] = [];

        for (let index in dishNames)
        {
            const dish = new Dish();
            dish.name = dishNames[index];
            dish.price = dishPrices[index];

            dishes.push(dish);
        }

        return dishes;
    }
}