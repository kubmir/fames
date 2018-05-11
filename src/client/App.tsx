import * as React from "react";

import { Menus } from "./components/Menus"
import { Allergens } from "./components/Allergens"

export const App: React.StatelessComponent<{}> = () => (
    <div className="row">
        <Menus />
        <Allergens />
    </div>
);
