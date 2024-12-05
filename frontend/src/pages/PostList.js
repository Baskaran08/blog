import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import {useState,useEffect} from 'react'

export default function PostList(){
    const [posts,setposts]=useState([])
    const [categories,setcategories]=useState([])
    useEffect(()=>{
        fetch('http://localhost:8000/api/posts')
            .then(res=>res.json())
            .then(data=>setposts(data))
        
        fetch('http://localhost:8000/api/categories')
            .then(res=>res.json())
            .then(data=>setcategories(data))
    },[])
    

    return(
        <>
 

            <main>
                <div class="container mt-4">
                    <div class="row">
                        <div class="col-lg-8">
                            <h1 class="mb-4">Latest Posts</h1>
                            {
                               posts.length>0?posts.map(post=> <PostCard post={post} />):<h1>Posts Not Available</h1>
                            }
                               
                            
                        </div>
                        <div class="col-lg-4">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h5 class="card-title">About Me</h5>
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>

                            <div class="card mb-4">
                                <div class="card-body">
                                    <h5 class="card-title">Categories</h5>
                                    <ul class="list-group">
                                        {
                                            categories.map((category)=> <li class="list-group-item"><Link to={`/posts/category/${category._id}`} class="text-black">{category.name}</Link></li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>



        </>
    )
}