const express = require('express');
const hbs = require('hbs');
const Middleware = require('./middleware/appmiddleware')

const app = express();

// set views 

app.set('views'.__dirname+'/views')
app.set('view engine','hbs')
app.set('view options', { layout: 'layout' })

//  set static

app.use(express.static(__dirname+'/static'))

// register partials

hbs.registerPartials(__dirname + '/views/partials')

app.use(Middleware.logger)

// routes

app.get('/', (req, res,next) => {
    res.render('index',{
        title:"Album Page",
        layout:"layout"
    })
})

app.get('/projects', (req, res,next) => {
    res.render('projects',{
        title:"project list",
        layout:"layout"
    })
})

app.get('/login', (req, res,next) => {
    res.render('login',{
        title:"login Page",
        layout:"layout-signin",
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
})



app.listen(3000, () => console.log('server started at port number 3000'))