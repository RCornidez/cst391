import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = (props) => {
    const authorized = props.authorized;
    const location = useLocation();

    return authorized ? (
        props.children
    ) : (
        <Navigate to='/login' state={{ from: location}} />
    );
};

export default PrivateRoute;