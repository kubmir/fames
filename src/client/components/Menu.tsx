import * as React from "react";
import * as Axios from 'axios';

import Dish from '../../common/Dish';
import DishListItem from './DishListItem';

interface MenuProperties {
    restaurantName: string;
    restaurantId: number;
}

class MenuState {
    isLoaded: boolean;
    dishes: Dish[];
    message: string;
}

export class Menu extends React.Component<MenuProperties, MenuState> {
    constructor(properties: MenuProperties) {
        super(properties);
        this.state = {
            isLoaded: false,
            dishes: null,
            message: 'Loading…'
        };
    }

    componentDidMount() {
        Axios
            .get('/api/restaurant/' + this.props.restaurantId,
                { headers: { 'Accept': 'application/json' } })
            .then(response => {
                this.setState(state => {
                    state.dishes = response.data as Dish[];
                    state.isLoaded = true;
                    return state;
                });
            })
            .catch(exception => {
                this.setState(state => {
                    state.isLoaded = true;
                    state.message = 'Error while loading lunch menu…';
                    return state;
                });
                console.log(exception)
            });
    }
    
    render() {
        // Display status message when results were not loaded or no dishes were returned.
        if (!this.state.isLoaded || this.state.dishes == null) {
            return (
                <div>
                    <h2>{this.props.restaurantName}</h2>
                    <p>{this.state.message}</p>
                </div>);
        }
        else
        {
            return (
                <div>
                    <h2>
                        {this.props.restaurantName}
                        <sup><small><a href={'http://zoma.to/r/' + this.props.restaurantId}><span className='glyphicon glyphicon-paperclip'></span></a></small></sup>
                    </h2>
                    <ul>
                        {this.state.dishes.map(dish => <DishListItem key={dish.name} dish={dish} />)}
                    </ul>
                </div>);
        }
    }
}
