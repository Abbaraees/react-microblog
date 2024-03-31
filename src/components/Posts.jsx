import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Post from "./Post";
import { useApi } from '../contexts/ApiProvider'

export default function Posts() {
  const [posts, setPosts] = useState()
  const api = useApi()

  useEffect(() => {
    (async () => {
      const response = await api.get("/feed")
      if (response.ok) {
        setPosts(results.body.data)
      } 
      else {
        setPosts(null)
      }
    })()
  }, [api]) 
  
  
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