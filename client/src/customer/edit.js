

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef } from 'react';
import { Link, useHistory, useParams, Redirect } from 'react-router-dom';
import Loading from '../components/loading/index.js';
import usePost from '../utilities/use_post.js';
import useGet from '../utilities/use_get.js';

//-- Project Constants ---------------------------
const URL_CUSTOMER_EDIT = '/data/customer';

//------------------------------------------------
export default function ViewEdit() {
    const formRef = useRef();
    const history = useHistory();
    const {id} = useParams();
    const customerUrl = `${URL_CUSTOMER_EDIT}/${id}`;
    const response = useGet(customerUrl)
    const [, triggerPost] = usePost(customerUrl);
    //
    if(response.loading) {
        return (<Loading />);
    }
    //
    async function submitHandler(eventSubmit) {
        //
        eventSubmit.preventDefault();
        const recordForm = formRef.current;
        for(const element of recordForm.elements) {
            element.disabled = true;
        }
        //
        let data = {
            name: recordForm.elements['name'].value,
            location: recordForm.elements['location'].value,
        }
        //
        await triggerPost(data);
        //
        recordForm.reset();
        for(const element of recordForm.elements) {
            element.disabled = false;
        }
        //
        history.push('/customer');
    }
    //
    const selection = response.data;
    if(!selection) {
        return (<Redirect to="/customer" />);
    }
    return (
        <form ref={formRef} className="new-species" onSubmit={submitHandler}>
            <h1>Edit Customer: {id}</h1>
            <label>
                <span>Name</span>
                <input name="name" type="text" defaultValue={selection.name} />
            </label>
            <label>
                <span>Location</span>
                <input name="location" type="text" defaultValue={selection.location} />
            </label>
            <div className="new-species__actions">
                <button className="button" type="submit" children="Submit" />
                <Link className="button secondary" to="/customer" children="Cancel" />
            </div>
        </form>
    );
}
