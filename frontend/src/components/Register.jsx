import { useState } from 'react';
import api from '../api.js';


function Register() {
    // react hooks let us change and track state in functional components
    // const [state, setState] = useState(initialValue)
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
            const response = await api.post('/auth/register', {
                username,
                password,
            });
            // if successful, set message to response data
            setMessage(response.data.message);
        } catch (error) { // if error occurs, set message to error response data
            setMessage(error.response.data.error);
        }
    };
    
    // return JSX to render
    return (
        <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
        {/* if message is not empty, display it */}
        {message && <p>{message}</p>}
        </div>
    );
};

// export functional component for import
export default Register;