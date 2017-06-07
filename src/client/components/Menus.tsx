import * as React from "react";

import { Menu } from "./Menu";

export const Menus: React.StatelessComponent<{}> = () => (
    <div className="col-md-10">
        <Menu restaurantName="Magistr" restaurantId="16506840" />
        <Menu restaurantName="U Dřeváka" restaurantId="16505458" />
        <Menu restaurantName="Al Capone" restaurantId="16515833" />
        <Menu restaurantName="Divá Bára" restaurantId="16514047" />
        <Menu restaurantName="U Bílého beránka" restaurantId="16506737" />
        <Menu restaurantName="Espaňola" restaurantId="16505872" />
    </div>
)