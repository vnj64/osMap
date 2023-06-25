import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './Routes';
import { MAP_ROUTE } from './urls';

const AppRouter = () => {

    return (
        <Routes> 
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />}  exact ></Route>
            )}
            <Route path='*' element={<Navigate to={MAP_ROUTE + '/0/0'} />} />
        </Routes>
    );
};

export default AppRouter;