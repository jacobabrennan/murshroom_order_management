

//==============================================================================

//-- Dependencies --------------------------------
import React, { useState } from 'react';
import Warnings from '../components/warnings';

//------------------------------------------------
export default function useFeedback() {
    const [warnings, setWarnings] = useState([]);
    const feedback = (
        <Warnings warnings={warnings} />
    );
    function addFeedback(feedbackArray) {
        // Cancel if no feedback
        if(Array.isArray(feedbackArray)) {
            if(!feedbackArray.length) { return;}
        }
        // Cancel if not a string or array
        else if('string' !== typeof feedbackArray) { return;}
        // Wrap single string in array
        else { feedbackArray = [feedbackArray];}
        //
        setWarnings(feedbackArray);
    }
    return [feedback, addFeedback];
}
