import { useState } from 'react';
import apiClient from '../../apiClient.js';


// pass toggleRegister function as prop
function Register({ toggleRegister }) {
    // configure react hooks to manage state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // form submit event is passed to async function
    const handleSubmit = async (e) => {
        // prevent default response to reload page
        e.preventDefault();
        // try to send POST request to flask server with username and password
        try {
            // use axios instance with endpoint and data
            const response = await apiClient.post('/auth/register', {
                username,
                password,
            });
            // if success, call toggleRegister function passed as prop
            toggleRegister();
        } catch (error) { // if error occurs, set message to error response data
            setMessage(error.response.data.error);
        }
    };
    
    // return JSX to render
    return (
        <div>
            <form onSubmit={handleSubmit} className='horizontal-flex'>
                <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">register</button>
            </form>
            {/* if message is not empty, display it */}
            {message && <p>{message}</p>}
        </div>
    );
};

// export functional component for import
export default Register;