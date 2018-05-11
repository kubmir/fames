import * as React from "react";

import { Menu } from "./Menu";
import { restaurants } from "../restaurants";

// Restaurants are sorted by distance from Kentico Academy (CERIT)

export const Menus: React.StatelessComponent<{}> = () => (
    <div className="col-md-10">
      {
        restaurants.map(restaurant => (
          <Menu
            key={restaurant.id}
            restaurantName={restaurant.name}
            restaurantId={restaurant.id}
          />
        ))
      }
    </div>
);
