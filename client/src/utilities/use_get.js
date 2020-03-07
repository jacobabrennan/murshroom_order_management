

//==============================================================================

//-- Dependencies --------------------------------
import {
    useState,
    useEffect,
} from 'react';

//------------------------------------------------
export default function useGet(url) {
    const [response, setResponse] = useState({
        loading: true,
        error: false,
        data: null,
        refetch: null,
    });
    useEffect(function () {
        function doGet() {
            console.log('Fetching', url)
            fetch(url)
                .then(async function (httpResponse) {
                    if(!httpResponse.ok) { throw httpResponse.status;}
                    const responseData = await httpResponse.json();
                    setResponse({
                        loading: false,
                        error: false,
                        data: responseData,
                        refetch: doGet,
                    });
                })
                .catch(function (error) {
                    setResponse({
                        loading: false,
                        error: error,
                        data: null,
                        refetch: doGet,
                    });
                });
        }
        doGet();
    }, [url])
    return response;
}
