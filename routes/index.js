const data = require("../my-data.json");

module.exports.index = (req, res,next) => {
    res.render('index',{
        title:"Album Page",
        layout:"layout"
    })
}

module.exports.projects = (req, res,next) => { 
    const projects = data.myProjects
   
    res.render('projects',{
        title:"project list",
        layout:"layout",
        projects:projects
    })
}

module.exports.projectDetail = (req, res,next) => {
    let alias = req.params.projectAlias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];

    res.render('project-detail',{
        title:"project list",
        layout:"layout",
        project:project
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
    const projects = data.myProjects

    res.render('admin/project-list',{
        title:"dashboard Page",
        layout:"layout-admin",
        projects:projects
    })
}

module.exports.myProjects = (req, res,next) => {
    const alias = req.params.alias;
    const index = data.projectIndex[alias];
    const projects = data.myProjects[index];

    res.render('admin/project-detail',{
        title:"dashboard Page",
        layout:"layout-admin",
        projects:projects
    })
}


module.exports.signup = (req, res,next) => {
    res.render('signup',{
        title:"signup Page",
        layout:"layout-signin",
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
}