import{useState} from 'react';


//props object has been destructured from (props) to ({blogs, title})
const BlogList = ({blogs, title}) => {

    const [displayBlogContent, setdisplayBlogContent] = useState(''); 
    const handleBlogContent = ()=>{
           
        setdisplayBlogContent(true)   
        if(displayBlogContent === true){
            setdisplayBlogContent(false)     
        }
        
    }

          
    return(
        <div className="blog-list" >
            <br/>
            <hr/>
            <h2> {title} </h2>
            <hr/>
            {blogs.map((blog) => (
                <div onClick={()=>handleBlogContent()}className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    {displayBlogContent? <p>{blog.body}</p>:null}
                    <p>Written by {blog.author}</p>
                </div>                
            ))
            } 
        </div>
    )    
}
export default BlogList


