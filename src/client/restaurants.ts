// distance in minutes

type Restaurant = {
    name: string;
    id: number;
    distance?: number;
};

const sortByDistance = ({ distance: distance1 = 0 }: Restaurant, { distance: distance2 = 0 }: Restaurant) =>
    distance1 - distance2;

export const restaurants: Restaurant[] = [
    { name: 'India', id: 16511911, distance: 4 },
    { name: 'Magistr', id: 16506840, distance: 2 },
    { name: 'U Dřeváka', id: 16505458, distance: 4 },
    { name: 'Al Capone', id: 16515833, distnace: 4 },
    { name: 'Divá Bára', id: 16514047, distance: 6 },
    { name: 'U Bílého beránka', id: 16506737, distance: 7 },
    { name: 'Espaňola', id: 16505872, distance: 6 },
].sort(sortByDistance);
