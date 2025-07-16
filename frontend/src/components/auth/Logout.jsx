import apiClient from '../../apiClient.js';
import { useNavigate } from 'react-router-dom';


function Logout() {
    // call useNavigate hook to get navigate function
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await apiClient.post('/auth/logout');
        // navigate to default route
        navigate('/');
    };

    return (
        <button onClick={handleLogout}>logout</button>
    );
};

export default Logout;