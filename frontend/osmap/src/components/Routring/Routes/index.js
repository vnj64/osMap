import Main from "../../../pages/main";
import Map from "../../../pages/map";
import { MAIN_ROUTE, MAP_ROUTE } from "../urls";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: MAP_ROUTE + '/:lat/:lng',
        Component: Map
    },
]