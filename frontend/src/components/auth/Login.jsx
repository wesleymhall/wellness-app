import { useState } from 'react';
import apiClient from '../../apiClient.js';


function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // form submit event is passed to async function
    const handleSubmit = async (e) => {
        // prevent default response to reload page
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/login', {
                username,
                password,
            });
            onLogin();
        } catch (error) { // if error occurs, set message to error response data
            setMessage(error.response.data.error);
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit} className='horizontal-flex'>
                <input
                type='text'
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>login</button>
            </form>
            {/* if message is not empty, display it */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;