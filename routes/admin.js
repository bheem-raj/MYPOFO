const router = require('express').Router();
const data = require('../my-data.json');

router.get('/', (req, res, next) => {
    res.render('login', {
        title: "login Page",
        layout: "layout-signin",
        extraCss: '<link rel="stylesheet" href="/css/signin.css">'
    })
})

router.get('/dashboard', (req, res, next) => {
    res.render('admin/dashboard', {
        title: "dashboard Page",
        layout: "layout-admin",
    })
})

router.get('/projects', (req, res, next) => {
    const projects = data.myProjects

    res.render('admin/project-list', {
        title: "dashboard Page",
        layout: "layout-admin",
        projects: projects
    })
})

router.get('/projects/:alias',(req, res,next) => {
    const alias = req.params.alias;
    const index = data.projectIndex[alias];
    const projects = data.myProjects[index];

    res.render('admin/project-detail',{
        title:"dashboard Page",
        layout:"layout-admin",
        projects:projects
    })
})

module.exports = router;

