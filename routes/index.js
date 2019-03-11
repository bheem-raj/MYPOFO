const router = require('express').Router();
const data = require("../my-data.json");

router.get('/',(req, res,) => {
    res.render('index',{
        title:"Album Page",
        layout:"layout"
    })
})

router.get('/projects',(req, res,next) => { 
    const projects = data.myProjects
   
    res.render('projects',{
        title:"project list",
        layout:"layout",
        projects:projects
    })
})

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
router.get('/about',(req, res,next) => {
    res.render('about',{
        title:"about me",
        layout:"layout"
    })
})
router.get('/contacts', (req, res,next) => {
    res.render('contact',{
        title:"contact us",
        layout:"layout"
    })
})

router.get('/login', (req, res,next) => {
    res.render('login',{
        title:"login Page",
        layout:"layout-signin",
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
})
let users = [
    {
        name:'Bheemaraj',
        email:"test@test.com",
        password:'test'
    },

    {
        name:'JS',
        email:"js@js.com",
        password:'javascript'
    }
]

router.post('/login', (req,res) => {
    req.checkBody('email', 'Email is required').isEmail().withMessage('Invalid Email');

    req.checkBody('password','Password is required').notEmpty().withMessage('Password is required').isLength({min:3}).withMessage('Length should be min 5')
    
    var errors = req.validationErrors();

    if(errors) {
        let msgs = errors.map(ele => ele.msg);
        res.render('login', {
            title:'Login',
            layout:'layout-signin',
            extraCss:'<link rel="stylesheet" href="/css/signin.css">',
            messages: msgs
        });
    }else {
        let data = req.body;
        let foundUser = users.filter(user => data.email == user.email && data.password == user.password)
        if(foundUser.length > 0) {
        
        req.session.isLoggedIn = true;
        req.session.user = foundUser[0];
        res.redirect('/admin/dashboard')

        }else {
            res.render('login', {
                title:'Login',
                layout:'layout-signin',
                extraCss:'<link rel="stylesheet" href="/css/signin.css">',
                messages: ['Email or Password Wrong']
            });
        }

    }
})

router.get('/logout', (req,res) => {
    req.session.isLoggedIn = false;
    
    res.redirect('/')
})

router.get('/signup',(req, res,next) => {
    res.render('signup',{
        title:"signup Page",
        layout:"layout-signin",
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
})

module.exports = router;








