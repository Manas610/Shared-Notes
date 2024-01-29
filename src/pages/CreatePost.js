import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle"
import { addDoc , collection } from "firebase/firestore"
import { db , auth } from "../firebase/config"

export const CreatePost = () => {

  useTitle("Create Post")
  const postRef = collection(db , "posts");
  const navigate = useNavigate();

  async function handleCreatePost(event){
    event.preventDefault();
    const document = {
      title: event.target.title.value,
      description: event.target.description.value,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    }
    await addDoc(postRef , document);
    event.target.title.value = ""
    event.target.description.value = ""
    navigate("/");
  }

  return (
    <section className="create">
      <div className="heading">
        <h1>Add New Post</h1>
      </div>
      <form className="createPost" onSubmit={handleCreatePost}>
        <input type="text" className="title" name="title" placeholder="Title" maxLength="50" required />
        <textarea type="text" className="description" name="description" placeholder="Description" maxLength="600" required ></textarea>
        <button type="submit" className="submit">Create</button>
      </form>
    </section>
  )
}
