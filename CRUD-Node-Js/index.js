const express = require("express");
const app = express();
const path = require("path");
const port = 3002;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride('_method'))

let posts = [
    {
        id: uuidv4(),   
        username: "Amit Malhotra",
        content: "I love coding."
    },
    {
        id: uuidv4(),
        username: "Bhagesh Kumar",
        content: "Hard work is important to achieve success"
    },
    {
        id: uuidv4(),
        username: "Nishant Kumar",
        content: "He is a very good teacher!"
    },
]

app.get("/", (req,res)=>{
    res.send("Welcome to home page!");
});



app.get("/posts/new", (req,res)=>{
    res.render("newForm.ejs");
});

// Get route
app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>{
        return id===p.id
    })
    console.log(post);
    res.render("show.ejs", {post});
});


app.get("/posts", (req,res)=>{
    res.render("index.ejs",{posts});
});




// Post route

app.post("/posts", (req,res)=>{ 
    console.log(req.body);
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username,content});
    res.redirect("/posts")
})

// edit route

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>{
        return id===p.id
    })
    console.log(post);
    res.render("edit.ejs", {post})

})

// Update Route
app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>{
        return id===p.id
    })
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")
})

// delete route

app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>{
        return id !== p.id
    })
    res.redirect("/posts")
})

app.listen(port, ()=>{
    console.log(`Server started... on port: ${port}`);
    
})