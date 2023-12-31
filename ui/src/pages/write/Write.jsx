import { useContext, useState } from "react"
import "./write.css"
import axios from "axios"
import { Context } from "../../context/Context"
import { useSelector } from "react-redux";


export default function Write() {
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [file,setFile] = useState(null)
const user = useSelector((state)=>state.user.author)

  const handleSubmit =async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      
    }
    if (file){
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("file",file)
      data.append("name",filename)
      newPost.photo = filename;
      try{  
            await axios.post("/upload",data)
      }catch(err){
        console.log(err);
      }
    }
    try{

    const res = await axios.post("/posts",newPost)
    window.location.replace("/post/" + res.data._id)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="write" onSubmit={handleSubmit}>
      {file && (
        // <img src={require("../../components/images/1.jpg")} alt="" className="writeImg" />
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />

      )}
      <form  className="writeForm">
        <div className="writeFormGroup">
            <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <input type="file" id="fileInput" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>

            <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="writeFormGroup">
            <textarea placeholder="Tell Your Story .." type="text" className="writeInput writeText" onChange={e => setDesc(e.target.value)}></textarea>
        </div>
        <button className="writeSubmit" type="submit">Publsih</button>
      </form>
    </div>
  )
}
