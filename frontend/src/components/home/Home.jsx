import Logout from "../auth/Logout.jsx";


function Home () {
    // return JSX to render
    return (
        <>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            {/* render Logout component */}
            <Logout />
        </>
    );
}

// export functional component for import
export default Home;