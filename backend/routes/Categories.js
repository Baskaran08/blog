const express=require('express')
const Router=express.Router();
const Categories=require('../models/Category.js')


//get all post

Router.get('/',async(req,res)=>{
    try{
        const Category=await Categories.find({})
        res.json(Category)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//get a single post

Router.get('/:id',async(req,res)=>{
    try{
        const Category= await Categories.findById(req.params.id);
        if(!Category){
            return res.status(404).json({message: "Category not found.."})
        }
        res.json(Category)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})


//create a new post

Router.post('/',async(req,res)=>{

    const Category= new Categories({
    name:req.body.name,
    slug:req.body.slug,
    description:req.body.description
    })
    try{
        const newCategory=await Category.save();
        res.status(201).json(newCategory)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})


//update a post

Router.put('/:id',async(req,res)=>{
    try{
        const Category= await Categories.findById(req.params.id);
        if(!Category){
            return res.status(404).json({message:"Category not found"})
        }
        Category.name=req.body.name || Category.name
        Category.slug=req.body.slug ||  Category.slug
        Category.description=req.body.description||  Category.description
        Category.updatedAt=Date.now();
        
        const updatedCategory=await Category.save();
        res.status(200).json(updatedCategory)
    }catch(error){
        res.status(400).json({message:error.message})
    }
    
})


//delete post

Router.delete('/:id',async (req,res)=>{
    try{
        const Category= await Categories.findById(req.params.id);
        if(!Category){
            return res.status(404).json({message:"Category not found"})
        }
        await Categories.deleteOne({_id:Category._id})
        res.json({message:"Category Deleted"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports=Router;