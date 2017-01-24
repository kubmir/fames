import * as React from "react";

import Dish from '../../common/Dish';

interface DishListItemProperties {
    dish: Dish;
}

export default class Menu extends React.Component<DishListItemProperties, Object> {
    constructor(properties: DishListItemProperties) {
        super(properties);
    }

    render() {
        if (this.props.dish.price != null && this.props.dish.price.trim().length > 0) {
            return <li>{this.props.dish.name}, {this.props.dish.price}</li>
        }
        else {
            return <li>{this.props.dish.name}</li>
        }
    }
}