import {useState, useEffect} from 'react'

const useFetch = (url) =>{
    const [data, setData] = useState(null);  
    const [isPending, setIsPending] = useState(true)
    const [isError, setIsError] = useState(false)  

    useEffect(() =>{
        setTimeout(() =>{
             fetch(url)
             
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
                     console.log(err)
                     setIsError(err.message) 
                     setIsPending(false)
                     setData(null)  
                 })  
        },1000)        
         
     },[url])  

     return {data, isPending, isError}
}

export default useFetch

