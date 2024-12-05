import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import {useState,useEffect} from 'react'

export default function PostList(){
    const [posts,setposts]=useState([])
    const [category,setcategory]=useState({})
    const {id}=useParams()
    useEffect(()=>{
        fetch(`http://localhost:8000/api/posts/category/${id}`)
            .then(res=>res.json())
            .then(data=>setposts(data))
        
        fetch(`http://localhost:8000/api/categories/${id}`)
            .then(res=>res.json())
            .then(data=>setcategory(data))
    },[])
    

    return(
        <>
 

            <main>
                    <div class="container mt-4">
                        <div class="row">
                            <div class="col-lg-8">
                                <h1 class="mb-4">{category.name}</h1>
                                {
                                    posts.length>0?posts.map(post=> <PostCard post={post} />):<h1>Posts Not Available</h1>
                                }
                            </div>
                        </div>
                    </div>
            </main>




        </>
    )
}