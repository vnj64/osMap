import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './Routes';
import { MAIN_ROUTE } from './urls';

const AppRouter = () => {

    return (
        <Routes> 
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />}  exact ></Route>
            )}
            <Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;