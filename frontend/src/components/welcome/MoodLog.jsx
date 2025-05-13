import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient.js';
import '../../App.css';

function MoodLog() {
    // configure react hooks to manage state
    const [selectedMoodIndex, setSelectedMoodIndex] = useState(3);
    const [submitted, setSubmitted] = useState(false);
    const [prompt, setPrompt] = useState('how do u feel?')
    const navigate = useNavigate();

    // array of moods
    const moods = [
        { id: 1, mood: '(╥﹏╥)' },
        { id: 2, mood: '(ಥ﹏ಥ)' },
        { id: 3, mood: '(︶︹︶)' },
        { id: 4, mood: '(・_・)' },
        { id: 5, mood: '(^ ‿ ^)' },
        { id: 6, mood: '(≧◡≦)' },
        { id: 7, mood: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧' },
    ];

    // set selected mood to the index of the mood clicked
    const handleMoodSelect = (index) => {
        setSelectedMoodIndex(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedMood = moods[selectedMoodIndex];
        try {
            // send the selected mood index to the backend
            await apiClient.post('/welcome/logmetric', { name: 'mood', value: selectedMood.id });
            // set submission status to true
            setSubmitted(true);
            // set prompt to approval emote
            setPrompt('ദ്ദി(˵•̀ᴗ- ˵)✧')
            // redirect to dash after a short delay
            setTimeout(() => {
                navigate('/sleeplog');
            }, 1000);
        } catch (error) {
            console.error('Error logging mood:', error);
            setSubmitted(true); // set submission status to true
        }
    };

    return (
        <div className='vertical-flex'>
            <p>{prompt}</p>
            <div className='card-container'>
                {moods.map((mood, index) => {
                    const position = index - selectedMoodIndex;
                    const isSelected = position === 0;

                    return (
                        <div
                            key={mood.id}
                            className={`card`}
                            style={{
                                transform: submitted
                                    ? isSelected
                                        ? `scale(1.3)`
                                        : `translateY(100px) translateX(${position * 75}px)`
                                    : `translateX(${position * 75}px) scale(${isSelected ? 1.3 : 1})`,
                                zIndex: isSelected ? 10 : 10 - Math.abs(position),
                                opacity: submitted
                                    ? isSelected
                                        ? 1 
                                        : 0
                                    : Math.abs(position) > 2
                                    ? 0
                                    : 1,
                            }}
                            onClick={() => handleMoodSelect(index)}
                        >
                            <p>{mood.mood}</p>
                        </div>
                    );
                })}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default MoodLog;