import {Link} from 'react-router-dom'
import { useState} from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch"
const Create = () => {
  
  const {data:blogs} = useFetch ('http://localhost:8080/blogs')  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [creating, setCreating] = useState(false)
  const [blogListUpdated, setblogListUpdated]=useState(false) 
  
     const handleSubmit = (e) => {    
           
      e.preventDefault();
      const blog = { title, body, author };
      setCreating(true)
      setTimeout(()=>{
          fetch('http://localhost:8080/blogs/', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(blog)
            })
            .then(() => {
              console.log('new blog added');
              setCreating(false);                         
            })           
            .then(()=>setblogListUpdated(true))
            .catch((err)=>console.log(err))
      },500)
              
    };   

    
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          minLength="8"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          type="text"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">Mario</option>
          <option value="josh">Josh</option>
          <option value="ken">Ken</option>
        </select>
        {creating ? <p>Submitting...</p> : <button onClick={(e)=>{handleSubmit(e)}} type="submit"><Link to="/">Submit</Link></button>}        
        {blogListUpdated ? (<BlogList blogs={blogs} title="Blogs:" />):null}
        
      </form>
    </div>
  );
}
 
export default Create;