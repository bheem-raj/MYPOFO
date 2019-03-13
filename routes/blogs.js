const router = require('express').Router();
const data = require("../my-data.json");

router.get('/blogs', (req, res,next) => {
    let query = req.query.category
    let random = Math.floor(Math.random() * data.myBlog.length);

    res.render('blogs',{
        title:"blog page",
        layout:"layout",
        blogs : data.myBlog,
        blogCategories: data.blogCategories,
        featuredBlog : data.myBlog[random]
    })
    
})