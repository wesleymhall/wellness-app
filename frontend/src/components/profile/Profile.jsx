import Calendar from './Calendar.jsx';
import Logout from '../auth/Logout.jsx';


function Profile () {
    // return JSX to render
    return (
        <>
            {/* render Calendar component */}
            <Calendar />
            {/* render Logout component */}
            <Logout />
        </>
    );
}

// export functional component for import
export default Profile;