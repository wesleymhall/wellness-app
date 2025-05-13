import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient.js';
import '../../App.css';

function SleepLog() {
    const [prompt, setPrompt] = useState('how much u sleep?')
    const [sleepHours, setSleepHours] = useState(6);
    const [emote, setEmote] = useState('(- _-)');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setPrompt('ദ്ദി(˵•̀ᴗ- ˵)✧');
        setTimeout(() => {
            navigate('/dash');
        }, 1000);
    }

    const handleSliderChange = (e) => {
        setSleepHours(e.target.value);
        if (e.target.value < 6) {
            setEmote('(> _<)');
        }
        else if (e.target.value > 6) {
            setEmote('(- ‿-)');
        }
        else {
            setEmote('(- _-)');
        }
    }

    return (
        <div className='vertical-flex'>
            <p>{prompt}</p>
            <div className='horizontal-flex'>
                <pre>
{`
∩___________∩
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default SleepLog;