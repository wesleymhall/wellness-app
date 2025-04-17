import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import Logout from "../components/Logout";

function Auth() {
    // react hooks let us change and track state in functional components
    // const [state, setState] = useState(initialValue)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // alter state upon login/logout
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    // return JSX to render
    return (
        <div>
            <h1>User Authentication</h1>
            {!isLoggedIn ? (
                <>
                    <Register />
                    {/* render Login component and pass handleLogin function as prop */}
                    {/* props are used to pass data and logic to child components */}
                    <Login onLogin={handleLogin} />
                </>
            ) : (
                <>
                    {/* render Logout component and pass handleLogout function as prop */}
                    <Logout onLogout={handleLogout} />
                    <p>Welcome! You are logged in.</p>
                </>
            )}
        </div>
    );
}

// export functional component for import
export default Auth;