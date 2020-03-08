

//==============================================================================

//-- Dependencies --------------------------------
import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import usePost from '../utilities/use_post';

//-- Project Constants ---------------------------
const URL_CUSTOMER_NEW = '/data/customer';

//------------------------------------------------
export default function ViewNew() {
    const formRef = useRef();
    const history = useHistory();
    const [, triggerPost] = usePost(URL_CUSTOMER_NEW);
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
    return (
        <form ref={formRef} className="new-species" onSubmit={submitHandler}>
            <h1>New Customer</h1>
            <label>
                <span>Customer Name</span>
                <input name="name" type="text" />
            </label>
            <label>
                <span>Location</span>
                <input name="location" type="text" />
            </label>
            <div className="new-species__actions">
                <button className="button" type="submit" children="Submit" />
                <Link className="button secondary" to="/customer" children="Cancel" />
            </div>
        </form>
    );
}
