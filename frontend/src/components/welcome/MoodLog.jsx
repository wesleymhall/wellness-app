import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../apiClient.js';
import '../../App.css';

function MoodLog() {
    // configure react hooks to manage state
    const [selectedMoodIndex, setSelectedMoodIndex] = useState(5);
    const [submitted, setSubmitted] = useState(false); // Track submission status
    const navigate = useNavigate();

    // array of moods
    const moods = [
        { id: 1, image: '/images/Smiley.svg' },
        { id: 2, image: '/images/Smiley.svg' },
        { id: 3, image: '/images/Smiley.svg' },
        { id: 4, image: '/images/Smiley.svg' },
        { id: 5, image: '/images/Smiley.svg' },
        { id: 6, image: '/images/Smiley.svg' },
        { id: 7, image: '/images/Smiley.svg' },
        { id: 8, image: '/images/Smiley.svg' },
        { id: 9, image: '/images/Smiley.svg' },
    ];

    // set selected mood to the index of the mood clicked
    const handleMoodSelect = (index) => {
        setSelectedMoodIndex(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedMood = moods[selectedMoodIndex];
        console.log(selectedMood)
        try {
            // send the selected mood index to the backend
            await apiClient.post('/welcome/logmood', { mood: selectedMood.id });
            // set submission status to true
            setSubmitted(true);
            // redirect to dash after a short delay
            setTimeout(() => {
                navigate('/dash');
            }, 1000);
        } catch (error) {
            console.error('Error logging mood:', error);
            setSubmitted(true); // set submission status to true
        }
    };

    return (
        <div>
            <div className="card-container">
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
                                        ? `scale(1.2)`
                                        : `translateY(100px) translateX(${position * 45}px) rotate(${position * 3}deg)`
                                    : `translateX(${position * 45}px) translateY(${Math.abs(position) * 10}px) scale(${isSelected ? 1.2 : 1}) rotate(${position * 3}deg)`,
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
                            <img src={mood.image} />
                        </div>
                    );
                })}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default MoodLog;