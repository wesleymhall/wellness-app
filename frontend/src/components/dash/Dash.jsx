import Log from './Log.jsx'
import Logout from '../auth/Logout.jsx';


function Dash () {
    // return JSX to render
    return (
        <>
            {/* render LogEntry component */}
            <Log />
            {/* render Logout component */}
            <Logout />
        </>
    );
}

// export functional component for import
export default Dash;