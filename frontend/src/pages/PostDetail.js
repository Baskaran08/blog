import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function PostDetail(){
    const [post,setPost]=useState(null);
    const {id}=useParams();

    useEffect(()=>{
        fetch(`http://localhost:8000/api/posts/${id}`)
        .then(res=>res.json())
        .then(data=>{setPost(data)
            console.log(post)
        })
        .catch(err=>console.error("Error Occured while fetching the data"+err))
    },[])

    if(!post){
        return <h1>Loading..</h1>
    }

    const formattedDate=Intl.DateTimeFormat('en-US', {
        month: "long",
        day: "numeric", // Use 'day' instead of 'date'
        year: "numeric"
    }).format(new Date(post.createdAt));

    return(
        <>
            <main className="container my-4">
                <div className="row">
                    <article className="col-lg-8">
                        <h2 className="blog-post-title">{post.title}</h2>
                        <p className="blog-post-meta">{formattedDate} by <a href="#">{post.author}</a></p>

                        <img className="mb-3 img-fluid" src={post.image} alt="" />
                        <div className="blog-post-content">
                            <p>{post.content}</p>
                           
                        </div>
                    </article>


                </div>
            </main>        
        </>
    )
}