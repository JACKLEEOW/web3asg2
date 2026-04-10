import { useNavigate } from "react-router-dom";
const LoginView = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        navigate('/');
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginView;
