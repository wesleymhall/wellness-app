import { useState } from 'react';
import apiClient from '../../apiClient.js';


function Log() {
    // configure react hooks to manage state
    const [logentry, setLogEntry] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null)

    // form submit event is passed to async function
    const handleSubmit = async (e) => {
        // prevent default response to reload page
        e.preventDefault();
        // try to send POST request to flask server with log entry
        try {
            // use axios instance with endpoint and data
            const response = await apiClient.post('/dash/log', {
                logentry,
            });
            // if success, clear log entry
            setLogEntry('');
            // set response to response data
            setResponse(response.data);
        } catch (error) { // if error occurs, set message to error response data
            setMessage(error.response.data.error);
        }
    }   

    // return jsx content to render
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                value={logentry}
                onChange={(e) => setLogEntry(e.target.value)}
                />
                <button type='submit'>Enter</button>
            </form>
            {/* if message is not empty, display it */}
            {message && <p>{message}</p>}
            {/* if response is not empty, display it */}
            {response && 
                <ul>
                    {response.tagged_sentences.map((item, index) => (
                        <li key={index}>
                            <p><strong>Sentence:</strong> {item.sentence}</p>
                            <p><strong>Label:</strong> {item.label}</p>
                            <p><strong>Confidence:</strong> {item.confidence.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            }      
        </div>
    )
}

// export functional component for import
export default Log;