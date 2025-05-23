import Logout from '../auth/Logout.jsx';
import Calendar from './Calendar.jsx';


function Dash () {
    // return JSX to render
    return (
        <>
        <div className='horizontal-flex'>
            <div className='vertical-flex'>
                {/* render Calendar component */}
                <Calendar />
            </div>
        </div>
        <div className='vertical-flex'>
            <Logout />
        </div>
        </>
    );
}

// export functional component for import
export default Dash;