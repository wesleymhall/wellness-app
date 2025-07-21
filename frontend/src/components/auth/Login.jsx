import { useState } from 'react';
import apiClient from '../../apiClient.js';


function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            alert(error.response.data.error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className='vertical-flex'>
            <div className='horizontal-flex'>
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
            </div>
            <p className='horizontal-full'>
                <button type='submit'>login</button>
            </p>
        </form>
    );
};

export default Login;