module.exports.index = (req, res,next) => {
    res.render('index',{
        title:"Album Page",
        layout:"layout"
    })
}

module.exports.projects = (req, res,next) => {
    res.render('projects',{
        title:"project list",
        layout:"layout"
    })
}

module.exports.projectlist = (req, res,next) => {
    res.render('project-detail',{
        title:"project list",
        layout:"layout"
    })
}

module.exports.blogs = (req, res,next) => {
    res.render('blogs',{
        title:"blog page",
        layout:"layout"
    })
}

module.exports.about = (req, res,next) => {
    res.render('about',{
        title:"about me",
        layout:"layout"
    })
}

module.exports.contacts = (req, res,next) => {
    res.render('contact',{
        title:"contact us",
        layout:"layout"
    })
}

module.exports.login = (req, res,next) => {
    res.render('login',{
        title:"login Page",
        layout:"layout-signin",
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
}

module.exports.dashboard = (req, res,next) => {
    res.render('admin/dashboard',{
        title:"dashboard Page",
        layout:"layout-admin",
    })
}

module.exports.project = (req, res,next) => {
    res.render('admin/project-list',{
        title:"dashboard Page",
        layout:"layout-admin",
    })
}

module.exports.signup = (req, res,next) => {
    res.render('signup',{
        title:"signup Page",
        layout:"layout-signin",
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
}