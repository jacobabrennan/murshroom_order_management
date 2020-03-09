

//==============================================================================

//-- Dependencies --------------------------------
import {
    useState,
} from 'react';

//------------------------------------------------
export default function useGetDelayed() {
    async function doGet(url) {
        console.log('Fetching', url)
        setResponse({
            loading: true,
            error: false,
            data: null,
            fetch: doGet,
        });
        try {
            const httpResponse = await fetch(url);
            if(!httpResponse.ok) { throw httpResponse.status;}
            let responseData = null;
            try { responseData = await httpResponse.json();}
            catch { /* default to null */}
            setResponse({
                loading: false,
                error: false,
                data: responseData,
                fetch: doGet,
            });
        }
        catch(error) {
            setResponse({
                loading: false,
                error: error,
                data: null,
                fetch: doGet,
            });
        }
    }
    const [response, setResponse] = useState({
        loading: false,
        error: false,
        data: null,
        fetch: doGet,
    });
    return response;
}
