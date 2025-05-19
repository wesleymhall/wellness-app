import Logout from '../auth/Logout.jsx';
import Calendar from './Calendar.jsx';


function Dash () {
    // return JSX to render
    return (
        <div className='vertical-flex'>
            {/* render Calendar component */}
            <Calendar />
            {/* render Logout component */}
            <div className='centered-bottom'>
                <Logout />
            </div>
        </div>
    );
}

// export functional component for import
export default Dash;