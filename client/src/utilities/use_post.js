

//==============================================================================

//-- Dependencies --------------------------------
import {
    useState,
} from 'react';

//------------------------------------------------
export default function usePost(url, options) {
    const [response, setResponse] = useState({
        loading: false,
        error: false,
        data: null,
    });
    async function triggerPost(body) {
        setResponse({
            loading: true,
            error: false,
            data: null,
        });
        const requestOptions = {body: JSON.stringify(body)};
        if(options) { Object.assign(requestOptions, options);}
        let responseData;
        try {
            const httpResponse = await fetch(url, requestOptions);
            if(!httpResponse.ok) { throw httpResponse.status;}
            responseData = await httpResponse.json();
            setResponse({
                loading: false,
                error: false,
                data: responseData,
            });
        }
        catch(error) {
            setResponse({
                loading: false,
                error: error,
                data: null,
            });
        }
        return responseData;
    }
    return [response, triggerPost];
}
