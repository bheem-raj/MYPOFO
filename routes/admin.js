const router = require('express').Router();
const data = require('../my-data.json');
const Project = require('../models/projectSchema');
const multer = require('multer')
const path = require('path')
const mediaService = require('../service/uploadMediaService');
const projectService = require('../service/projectService')
const fs = require('fs');
const unzip = require('unzip');

let storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, path.join(__dirname, '../static/image/projects'))
    },
    filename: function(req,file,cb) {
        cb(null, file.originalname)
    } 
})

const upload = multer({storage:storage})

router.get('/dashboard', (req, res, next) => {
    res.render('admin/dashboard', {
        title: "dashboard Page",
        layout: "layout-admin",
    })
})

router.get('/projects', (req, res,next) => {

    function renderProjectList (err, data) {
        if(err) {
            next(err)
        }else {
            res.render('admin/project-list', {
                title: 'Project List',
                layout: 'layout-admin',
                projects: data
            })
        }
    }


   projectService.getProjectList(renderProjectList)


})

router.get('/projects/create', (req, res) => {
    res.render('admin/project-create', {
        title: "Create New Project",
        layout: "layout-admin"
    })
})

router.post('/projects/create', (req, res) => {
    let data = req.body;

    let alias = data.name.toLowerCase().trim().split(' ').join('-')
    // console.log(alias)
    data.alias = alias;

    let newProject = new Project(data);

    newProject.save().then(projectSaved => {
        res.redirect('/admin/projects')
    }).catch(err => next(err))
})


router.get('/projects/:alias', (req, res, next) => {
    let alias = req.params.alias;

    function renderProjectDetail (err, data) {
        if(err) {
            next(err)
        }else {
            res.render('admin/project-detail', {
                title: 'Project Detail',
                layout: 'layout-admin',
                project: data
            })
        }
    }

    projectService.getSingleProject(alias, renderProjectDetail)
})


router.get('/projects/:alias/delete', (req, res) => {
    let alias = req.params.alias;

    Project.findOneAndDelete({ alias: alias }).then(data => {
        console.log(data)
        res.redirect('/admin/projects')
    }).catch(err => next(err))
})

router.post('/projects/:alias/update', (req, res) => {
    let bodyData = req.body;
    bodyData.updatedOn = Date.now();
    // console.log(bodyData)
    let alias = req.params.alias;



    Project.findOneAndUpdate({alias:alias}, {$set:bodyData, $inc:{__v:1}}, {new:true}).then(data =>{
        console.log(data)
        res.redirect('/admin/projects')
    }).catch(err => next(err))
})

router.get('/projects/:alias/image-upload', (req,res) => {
    let alias = req.params.alias
    res.render('admin/upload', {
        title:'Upload',
        layout:'layout-admin',
        actionUrl:'/admin/projects/'+alias+'/image-upload'
    })
})

router.post('/projects/:alias/image-upload', upload.single('upload'), (req,res,next) =>{

    let file = req.file;
    // console.log(file);

    Project.findOneAndUpdate({alias:req.params.alias}, {$set:{imageUrl: `/image/projects/${file.originalname}`}}, {new:true}).then(data => {
        console.log(data)
        res.redirect('/admin/projects')

    }).catch(err => next(err))
})


router.get('/projects/:alias/upload-demo', (req,res) => {

    let alias = req.params.alias;

    res.render('admin/upload', {
        title:'Upload Demo',
        layout:'layout-admin',
        actionUrl:'/admin/projects/'+alias+'/upload-demo' 
    })
});

router.post('/projects/:alias/upload-demo', (req,res) => {
    let alias = req.params.alias;

    let dir = path.join(__dirname, '../static/project-demos/'+alias)

    console.log(dir);
    

    let filename = alias+'.zip'

    function uploaded(err, success) {
        console.log('cb called')
        if(err) {

            console.log(err);
        } else {
            let zipfile = dir + '/' + alias + '.zip';



            fs.createReadStream(zipfile).pipe(unzip.Extract({path: dir}));
            fs.unlinkSync(zipfile);

            console.log('Uploaded')
            res.redirect('/admin/projects')
        }
    }

    mediaService.uploadMedia(req,res, dir,filename, uploaded)

})

module.exports = router;

