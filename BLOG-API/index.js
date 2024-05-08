import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;


let posts = [
  {
    id: 1,
    title: "",
    content:
      "",
    author: "",
    date: "",
  },
  
];

let lastId = 1;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/posts",(req,res)=>{
  console.log(posts);
  res.json(posts);
})


app.get("/posts/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const blog = posts.find((post)=>post.id === id);
  if(!blog){
    res.status(404).json("no post found!!");
  }
  console.log(blog);
  res.json(blog);
})


app.post("/posts",(req,res)=>{
  const newBlog = {
    id: posts.length +1,
    title : req.body.title,
    content : req.body.content,
    author : req.body.author,
    date: new Date(),
  };
  posts.push(newBlog);
  res.status(200).json(newBlog);
})

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

app.delete("/posts/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post)=>post.id === id);
  if(index == -1){
    res.status(404).json({message: "Can find post!!"})
  }
  posts.splice(index,1);
  res.json({message: "Post deleted!!"});
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
