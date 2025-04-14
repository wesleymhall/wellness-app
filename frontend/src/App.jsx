import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  // store anonymous async function in fetchAPI
  // use axios to send GET request to flask server 
  // await promise resolution to log response data in console
  const fetchAPI = async () => {
    const response = await axios.get('https://studious-halibut-pjwj4wrr5r95fj5w-5000.app.github.dev/')
    console.log(response.data.users);
  };

  // call fetchAPI on component mount with useEffect
  useEffect(() => {
    fetchAPI();
  }, []);

  // return JSX to render
  return (
    <div className="root">
      <h1>API Test</h1>
      <p>Check the console for the API response.</p>
    </div>
  )

}

// export component as main function to be available for import
export default App;
