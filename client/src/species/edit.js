

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import usePost from '../utilities/use_post.js';
import speciesContext from './index.js';
import Loading from '../components/loading/index.js';
import useFeedback from '../utilities/use_feedback.js';
import {
    MAKEURL_API_SPECIES_EDIT,
    ROUTE_SPECIES_BASE,
    validateForm,
    PARAM_ID,
} from './utilities.js';

//------------------------------------------------
export default function ViewEdit() {
    let speciesData = useContext(speciesContext);
    const [warnings, feedback] = useFeedback();
    const formRef = useRef();
    const history = useHistory();
    const id = useParams()[PARAM_ID];
    const [response, triggerPost] = usePost(MAKEURL_API_SPECIES_EDIT(id));
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
    //
    if(response.loading) {
        return (<Loading />)
    }
    //
    const selection = speciesData.list.find(
        function (species) { return species.id === parseInt(id);}
    );
    if(!selection) {
        history.push(ROUTE_SPECIES_BASE);
        return '';
    }
    return (
        <form ref={formRef} className="big-form" onSubmit={submitHandler}>
            <h1 className="action-attach">
                <span className="action-attach__text">Edit Species: {id}</span>
            </h1>
            <label>
                <span>Code</span>
                <input name="code" type="text" defaultValue={selection.code} />
            </label>
            <label>
                <span>Species</span>
                <input name="species" type="text" defaultValue={selection.species} />
            </label>
            <label>
                <span>Strain</span>
                <input name="strain" type="text" defaultValue={selection.strain} />
            </label>
            <label>
                <span>Substrate Format (lb)</span>
                <input name="substrate format" type="number" defaultValue={selection.substrateFormat} />
            </label>
            <label>
                <span>Amount</span>
                <input name="amount" type="number" defaultValue={selection.amount} />
            </label>
            <label>
                <span>Incubation Time (weeks)</span>
                <input name="incubation time" type="number" defaultValue={selection.incubationTime} />
            </label>
            {warnings}
            <div className="button-bar">
                <button className="button" type="submit" children="Submit" />
                <Link className="button danger" to={ROUTE_SPECIES_BASE} children="Cancel" />
            </div>
        </form>
    );
}
