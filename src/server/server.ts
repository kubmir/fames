'use strict';

import * as express from 'express';
import * as path from 'path';

import DailyMenuProvider from './DailyMenuProvider'

const zomatoUserKey: string = process.env.ZOMATO_USER_KEY || 'PUT YOUR USER KEY HERE'

const server = express()
    .use(express.static('public'))
    .get('(/|/index.html)', (request, response) => {
        response.sendFile(path.join(__dirname, '../../', 'index.html'));
    })
    .get('/api/restaurant/:restaurantId', (request, response) => {
        const restaurantId: number = Number.parseInt(request.params.restaurantId);
        const menuProvider = new DailyMenuProvider(zomatoUserKey);

        menuProvider.getDailyMenu(restaurantId)
            .then(dishes => response.json(dishes))
            .catch(reason => response.sendStatus(500));
    })
    .listen(process.env.PORT || 5001);
