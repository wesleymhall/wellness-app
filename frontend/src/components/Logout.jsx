import { useState } from 'react';
import api from '../api.js';


function Logout({ onLogout }) {
    // react hooks let us change and track state in functional components
    // const [state, setState] = useState(initialValue)
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        // use axios instance with endpoint and data
        const response = await api.post('/auth/logout');
        setMessage(response.data.message);
        // call onLogin function passed as prop
        onLogout();
    };

    // return JSX to render
    return (
        <div>
        <button onClick={handleLogout}>Logout</button>;
        {/* if message is not empty, display it */}
        {message && <p>{message}</p>};
        </div>
    );
};

// export functional component for import
export default Logout;