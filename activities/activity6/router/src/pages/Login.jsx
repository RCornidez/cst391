import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
    const handleLogin = () => {
        props.onClick(from, navigate);
    }

    let navigate = useNavigate();
    let location = useLocation();

    let state = location.state;
    let from = state?.from?.pathname ? state.from.pathname : '/';
    let text = '';
    if (from !== '/') text = <h3>You must login to visit "{from}"</h3>;
    
    return (
        <>
            {text}
            <button onClick={() => handleLogin()}>Login Here</button>
        </>
    )
}

export default LoginPage;