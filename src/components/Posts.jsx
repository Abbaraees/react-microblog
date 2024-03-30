import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState()

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/feed")
        if (response.ok) {
          const results = await response.json()
          setPosts(results.data)
        } 
        else {
          console.log("errorrrr")
          setPosts(null)
        }
      }
      catch {
        setPosts(null)
      }
    })()
  }, []) 
  
  
  return (
    <>
      {posts === undefined ?
        <Spinner animation="border" />
      :
       <>

        {
          posts === null ?
            <p>Could not retrieve blog posts.</p>
          :
          <>
            {
              posts.map(post => <Post key={post.id} post={post} />)
            }
          </>
        }
       </> 

      }
    </>
  );
  }