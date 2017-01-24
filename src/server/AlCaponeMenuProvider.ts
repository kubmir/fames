import * as axios from 'axios';
import * as cheerio from 'cheerio';

import Dish from '../common/Dish';

export default class AlCaponeMenuProvider {
    public getMenu(): Promise<Dish[]> {
        return new Promise<Dish[]>((resolve, reject) => {
            axios
                .get('http://www.pizzaalcapone.cz/poledni-menu.html')
                .then((alCaponeResponse: Axios.AxiosXHR<string>) => {
                    const dishes = this.extractDishes(alCaponeResponse);

                    resolve(dishes);
                })
                .catch(exception => reject(exception));
        });
    }

    private getDayName(dayNumber: number): string {
        switch (dayNumber) {
            case 1: return 'Pondělí';
            case 2: return 'Úterý';
            case 3: return 'Středa';
            case 4: return 'Čtvrtek';
            case 5: return 'Pátek';
            default: throw 'Unexpected day, weekends are not supported';
        }
    };

    private extractDishes(alCaponeResponse: Axios.AxiosXHR<string>): Dish[] {
        // Allows to query returned page with jQuery syntax.
        const alCaponeMenuPage = cheerio.load(alCaponeResponse.data);

        const dishNames = this.extractDishNames(alCaponeMenuPage);
        const dishPrices = this.extractPrices(alCaponeMenuPage);

        return this.mergeDishNamesAndPrices(dishNames, dishPrices);
    }

    private extractDishNames(alCaponeMenuPage: CheerioStatic): string[] {
        // Day to find in page
        const dayName = this.getDayName((new Date()).getDay());

        // Dishes are stored as text in paragraph <p> which also contains name of requested day in <strong> element.
        const paragraphWithDayNameAndDishes = alCaponeMenuPage(`.col-md-6.jt_col.column_container.col-lg-12 p strong:contains("${dayName}")`)
            .parent();

        // Paragraph contains name of the day on first line and names of dishes and empty lines on others.
        // First, remove name of the day. Empty lines will be removed later.
        const unformatedDishNames = paragraphWithDayNameAndDishes
            .text()
            .split('\r\n')
            .splice(1);

        // Remove empty lines and return dish names.
        return unformatedDishNames
            .map(value => value.trim())
            .filter(text => text.length !== 0);
    }

    private extractPrices(alCaponeMenuPage: CheerioStatic): string[] {
        // Al Capone menu has 5 items from which first and last do not have their prices because they are included to each dish.
        // Therefore, their price stay empty, other prices will be set later in the method.
        const priceList: string[] = ['', '', '', '', ''];

        // Prices are stored in separate paragraph (<p>) that can be recognized only by its known content, which is text string 'Kč'.
        const paragraphWithPriceList = alCaponeMenuPage('.col-md-6.jt_col.column_container.col-lg-12 p:contains("Kč")');

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

                // Skip first item in the menu since it does not have its own price.
                priceList[index + 1] = extractedAmount;
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