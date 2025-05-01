import Log from './Log.jsx'
import Logout from '../auth/Logout.jsx';


function Home () {
    // return JSX to render
    return (
        <>
            {/* render Log component */}
            <Log />
            {/* render Logout component */}
            <Logout />
        </>
    );
}

// export functional component for import
export default Home;