const router = require('express').Router();
const data = require('../my-data.json')

router.get('/', (req, res, next) => {
    const projects = data.myProjects

    res.render('projects', {
        title: "project list",
        layout: "layout",
        projects: projects
    })
})

router.get('/:projectAlias', (req, res, next) => {
    let alias = req.params.projectAlias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];

    res.render('project-detail', {
        title: "project list",
        layout: "layout",
        project: project
    })
})

module.exports = router;
