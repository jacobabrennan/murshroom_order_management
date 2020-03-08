

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import usePost from '../utilities/use_post';
import speciesContext from '.';
import Loading from '../components/loading';

//-- Project Constants ---------------------------
const URL_SPECIES_EDIT = '/data/species';

//------------------------------------------------
export default function ViewEdit() {
    let speciesData = useContext(speciesContext);
    const formRef = useRef();
    const history = useHistory();
    const {id} = useParams();
    const [response, triggerPost] = usePost(`${URL_SPECIES_EDIT}/${id}`);
    //
    async function submitHandler(eventSubmit) {
        //
        eventSubmit.preventDefault();
        const speciesForm = formRef.current;
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
        speciesData.refresh();
        history.push('/species');
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
        history.push('/species');
        return '';
    }
    return (
        <form ref={formRef} className="new-species" onSubmit={submitHandler}>
            <h1>Edit Species: {id}</h1>
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
            <div className="button-bar">
                <button className="button" type="submit" children="Submit" />
                <Link className="button danger" to="/species" children="Cancel" />
            </div>
        </form>
    );
}
