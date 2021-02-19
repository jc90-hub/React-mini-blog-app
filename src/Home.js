 import BlogList from "./BlogList";
 import useFetch from "./useFetch"


const Home = () => {
    const {data:blogs, isPending, isError} = useFetch ('http://localhost:8080/blogs')
    
    return ( 
        <div className="home">
            {isError && <div>{isError}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="Blog list:"/>}
            <br/>
            <hr/>
                        
        </div>
     );

} 
export default Home;

