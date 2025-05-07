import Logout from '../auth/Logout.jsx';
import Calendar from './Calendar.jsx';


function Dash () {
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
export default Dash;