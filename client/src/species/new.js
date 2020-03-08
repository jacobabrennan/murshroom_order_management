

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import usePost from '../utilities/use_post';
import speciesContext from '.';

//-- Project Constants ---------------------------
const URL_SPECIES_NEW = '/data/species';

//------------------------------------------------
export default function ViewNew() {
    const speciesData = useContext(speciesContext);
    const formRef = useRef();
    const history = useHistory();
    const [, triggerPost] = usePost(URL_SPECIES_NEW);
    //
    async function submitHandler(eventSubmit) {
        //
        eventSubmit.preventDefault();
        const speciesForm = formRef.current;
        for(const element of speciesForm.elements) {
            element.disabled = true;
        }
        //
        let data = {
            code: speciesForm.elements['code'].value,
            species: speciesForm.elements['species'].value,
            strain: speciesForm.elements['strain'].value,
            substrateFormat: speciesForm.elements['substrate format'].value,
            amount: speciesForm.elements['amount'].value,
            incubationTime: speciesForm.elements['incubation time'].value,
        }
        //
        await triggerPost(data);
        //
        speciesForm.reset();
        for(const element of speciesForm.elements) {
            element.disabled = false;
        }
        //
        speciesData.refresh();
        history.push('/species');
    }
    //
    return (
        <form ref={formRef} className="new-species" onSubmit={submitHandler}>
            <h1>New Species</h1>
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
            <div className="button-bar">
                <button className="button" type="submit" children="Submit" />
                <Link className="button danger" to="/species" children="Cancel" />
            </div>
        </form>
    );
}
