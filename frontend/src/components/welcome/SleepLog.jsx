import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient.js';
import '../../App.css';
import { set } from 'date-fns';

function SleepLog() {
    const [prompt, setPrompt] = useState('how much u sleep?')
    const [sleepHours, setSleepHours] = useState(6);
    const [emote, setEmote] = useState('(- ‿-)');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        try {
            // send the selected mood index to the backend
            await apiClient.post('/welcome/logmetric', { name: 'sleep', value: sleepHours });
            // set prompt to approval emote
            setPrompt('ദ്ദി(˵•̀ᴗ-˵)✧')
            // redirect to dash after a short delay
            setTimeout(() => {
                navigate('/dash');
            }, 1000);
        } catch (error) {
            console.error('Error logging metric:', error);
        }
    }

    const handleSliderChange = (e) => {
        setSleepHours(e.target.value);
        if (e.target.value == 0) {
            setEmote('(≖ _≖)');
        }
        else {
            setEmote('(- ‿-)');
        }
    }

    return (
        <div className='vertical-flex'>
            <p>{prompt}</p>
            <div className='horizontal-flex'>
                <pre>
{`   
∩__________∩
||          |
||  ${emote}  |     
∣ \\    ︵︵   \\
(   \\    ︵︵   \\
 \\  ||‾‾‾‾‾‾‾‾‾‾||
  \\_||——————————|| 
`}
                </pre>
                <p>{'z '.repeat(sleepHours)}</p>
            </div>
            <form className='vertical-flex' onSubmit={handleSubmit}>
                <div className='horizontal-flex'>
                    <input 
                        type='range' 
                        min='0' 
                        max='12' 
                        step='1' 
                        onChange={handleSliderChange}
                        value={sleepHours}
                    />
                    <p>{sleepHours}hrs</p>
                </div>
                <button type='submit' disabled={isSubmitting}>Submit</button>
            </form>
        </div>
    )
}

export default SleepLog;