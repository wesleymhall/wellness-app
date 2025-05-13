import apiClient from '../../apiClient.js';
import { useNavigate } from 'react-router-dom';


function Logout() {
    // call useNavigate hook to get navigate function
    const navigate = useNavigate();

    const handleLogout = async () => {
        // use axios instance with endpoint
        const response = await apiClient.post('/auth/logout');
        // navigate to default route
        navigate('/');
    };

    // return JSX to render
    return (
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

// export functional component for import
export default Logout;