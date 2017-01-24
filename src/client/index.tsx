import * as React from "react";
import * as ReactDOM from "react-dom";

import { Menu } from "./components/Menu";

ReactDOM.render(
    <Menu restaurantName="U Dřeváka" restaurantId="16505458" />,
    document.getElementById("drevak")
);
ReactDOM.render(
    <Menu restaurantName="U Bílého beránka" restaurantId="16506737" />,
    document.getElementById("beranek")
);

ReactDOM.render(
    <Menu restaurantName="Divá Bára" restaurantId="16514047" />,
    document.getElementById("bara")
);

ReactDOM.render(
    <Menu restaurantName="Al Capone" restaurantId="16515833" />,
    document.getElementById("capone")
);

ReactDOM.render(
    <Menu restaurantName="Espaňola" restaurantId="16505872" />,
    document.getElementById("espanola")
);