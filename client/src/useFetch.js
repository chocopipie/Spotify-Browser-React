import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
        .then(res => {
            if (!res.ok) {
                throw Error('could not fetch data for that resource')
            }
            return res.json();
        }).then(data => {
            setData(data);  
            setError(null);
        }). catch(err => {
            setError(err.message)
        })
    }, [url])

    //console.log(data)
    return { data, error }
}

export default useFetch;