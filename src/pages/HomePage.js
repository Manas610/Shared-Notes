import { useEffect, useState ,useRef } from "react";
import { useTitle } from "../hooks/useTitle"
import { Postcard , Skeletons } from "../components"
import { db } from "../firebase/config";
import { getDocs , collection } from "firebase/firestore";

export const HomePage = () => {
  useTitle("Home")
  const [posts , setPosts] = useState([false , false , false]);
  const postsRef = useRef(collection(db,"posts"));
  const [toggle , setToggle] = useState(false);

  useEffect(() => {
    async function getPosts(){
      const data = await getDocs(postsRef.current);
      setPosts(data.docs.map((document) => (
        {...document.data() , id: document.id}
      )))
    }
    console.log("---")
    getPosts();
  } , [toggle , postsRef])

  return (
    <section>
      { posts.map((post ,id) => (
        post ? (<Postcard key={post.id} post={post} toggle={toggle} setToggle={setToggle} />) 
        :
        (<Skeletons key={id}/>) 
      )) }
    </section>
  )
}
