import * as axios from 'axios';

import Dish from '../common/Dish';

const getCurrentDay = () => {
    switch (new Date().getDay()) {
        case 1:
            return 'Pondělí';
        case 2:
            return 'Uterý';
        case 3:
            return 'Středa';
        case 4:
            return 'Čtvrtek';
        case 5:
            return 'Pátek';
        default:
            return '';
    }
};

const _extractDishes = ({ data: htmlText }: Axios.AxiosXHR<string>): Dish[] => {
    const currentDay = getCurrentDay();

    const dishes: Dish[] = [];

    const dailyMenuRegexp = new RegExp(`<[Hh]2>${currentDay}<\/[hH]2>(.*?)(<[hH]2>|<\/p>)`, 'g');
    const dailyMenuMatch = dailyMenuRegexp.exec(htmlText);

    if (dailyMenuMatch === null) {
        return [];
    }

    const dishRegExp = /<br>([^<]*) (\d+[kK][Čč])/g;
    let dishMatch;

    while ((dishMatch = dishRegExp.exec(dailyMenuMatch[1])) !== null) {
        dishes.push({
            name: dishMatch[1].trim(),
            price: dishMatch[2],
        });
    }

    return dishes;
};

export const retrieveIndiaMenu = (): Promise<Dish[]> => {
    return new Promise<Dish[]>((resolve, reject) => axios
        .get('http://www.lightofindia.cz/denni-menu')
        .then((response: Axios.AxiosXHR<string>) => {
            const dishes = _extractDishes(response);

            resolve(dishes);
        })
        .catch(exception => reject(exception))
    );
};
