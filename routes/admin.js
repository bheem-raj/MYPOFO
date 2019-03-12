const router = require('express').Router();
const data = require('../my-data.json');
const Client = require('mongodb').MongoClient;

let dbUrl = 'mongodb://localhost:27017';

let db;

Client.connect(dbUrl, { useNewUrlParser: true }, function (error, client) {
    if (error) {
        console.log(error)
    } else {
        console.log('Successfully Connected to DB');
        db = client.db('mean1')
    }
})

router.get('/dashboard', (req, res, next) => {
    res.render('admin/dashboard', {
        title: "dashboard Page",
        layout: "layout-admin",
    })
})

router.get('/projects', (req, res, next) => {
    let projectsCollection = db.collection('projects');

    projectsCollection.find().toArray(function (err, projectList) {

        if (err) {
            next(err)
        } else {
            res.render('admin/project-list', {
                title: 'Project List',
                layout: 'layout-admin',
                projects: projectList
            })
        }
    })
})

router.get('/projects/create', (req,res) => {
    res.render('admin/project-create', {
        title: "Create New Project",
        layout: "layout-admin"
    })
})

router.post('/projects/create', (req,res,next) => {
    let data = req.body;

    let projectCollection = db.collection('projects');

    projectCollection.insertOne(data,function(err, project) {
        if(err){
            console.log(err)
            next(err)
        }else {
            console.log(project.toJSON())
            res.redirect('/admin/projects')
        }
    })

})

router.get('/projects/:alias', (req, res, next) => {
    const alias = req.params.alias;
    const index = data.projectIndex[alias];
    const projects = data.myProjects[index];

    res.render('admin/project-detail', {
        title: "dashboard Page",
        layout: "layout-admin",
        projects: projects
    })
})

module.exports = router;

