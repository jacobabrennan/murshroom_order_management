

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import speciesContext from '.';
import Loading from '../components/loading';
import usePost from '../utilities/use_post';
import useFeedback from '../utilities/use_feedback';
import { API_SPECIES_NEW } from '../utilities/urls_api.js';
import { ROUTE_SPECIES_BASE } from '../utilities/urls_routing.js';
import { validateForm } from './utilities.js';

//------------------------------------------------
export default function ViewNew() {
    const [warnings, feedback] = useFeedback();
    const speciesData = useContext(speciesContext);
    const formRef = useRef();
    const history = useHistory();
    const [response, triggerPost] = usePost(API_SPECIES_NEW);
    //
    async function submitHandler(eventSubmit) {
        //
        eventSubmit.preventDefault();
        const {data, problems} = validateForm(formRef.current);
        if(problems) {
            feedback(problems);
            return;
        }
        //
        await triggerPost(data);
        //
        speciesData.refresh();
        history.push(ROUTE_SPECIES_BASE);
    }
    // Loading Display for Data Submission
    if(response.loading) {
        return (
            <div className="big-form">
                <h1>New species</h1>
                <Loading />
            </div>
        );
    }
    //
    return (
        <form ref={formRef} className="big-form" onSubmit={submitHandler}>
            <h1 className="action-attach">
                <span className="action-attach__text">New Species</span>
            </h1>
            <label>
                <span>Code</span>
                <input name="code" type="text" />
            </label>
            <label>
                <span>Species</span>
                <input name="species" type="text" />
            </label>
            <label>
                <span>Strain</span>
                <input name="strain" type="text" />
            </label>
            <label>
                <span>Substrate Format</span>
                <input name="substrate format" type="number" />
            </label>
            <label>
                <span>Amount</span>
                <input name="amount" type="number" />
            </label>
            <label>
                <span>Incubation Time</span>
                <input name="incubation time" type="number" />
            </label>
            {warnings}
            <div className="button-bar">
                <button className="button" type="submit" children="Submit" />
                <Link className="button danger" to={ROUTE_SPECIES_BASE} children="Cancel" />
            </div>
        </form>
    );
}
