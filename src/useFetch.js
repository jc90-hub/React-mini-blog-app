import {useState, useEffect} from 'react'

const useFetch = (url) =>{
    const [data, setData] = useState(null);  
    const [isPending, setIsPending] = useState(true)
    const [isError, setIsError] = useState(false)  

    useEffect(() =>{
        const abortCont = new AbortController();
        
        //Note, this code is using a local db.json file to emulate a database, hence setTimeout is used to mimic the delay from a remote server
        setTimeout(() =>{
             fetch(url, {signal:abortCont.signal})             
                 .then(res => {
                     if(!res.ok){
                         throw Error('Unable to fetch the data for that resource')                        
                     }
                     else{
                         return res.json()                        
                     }                    
                 })  
                 .then(data => {
                     setData(data)
                     setIsPending(false)
                     setIsError(null)                                        
                 })
                 .catch((err) => {

                    if (err.name === 'AbortError'){
                        console.log('fetch aborted')
                    }
                    else{
                        console.log(err)
                        setIsError(err.message) 
                        setIsPending(false)
                        setData(null)
                    }
                       
                 })  
        },500)  
        
        return () => abortCont.abort()
         
     },[url])  

     return {data, isPending, isError}


}

export default useFetch

