const express = require('express');
const hbs = require('hbs');
const validator = require('express-validator')
const session = require('express-session');
const bodyParser = require('body-parser')
const Middleware = require('./middleware/appmiddleware')


const index = require('./routes/index');
const projects = require('./routes/projects')
const admin =require('./routes/admin')

const app = express();

// set views 

app.set('views'.__dirname+'/views')
app.set('view engine','hbs')
app.set('view options', { layout: 'layout' })

//  set static

app.use(express.static(__dirname+'/static'))

// register partials

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper("inc", function(value, options) {
    return value+1;
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000000}
}))

app.use(validator());

app.use(Middleware.logger)

app.use('/', index)
app.use('/projects', projects)
app.use('/admin', Middleware.authenticate, admin)

// routes

// app.get('/',routes.index )

// app.get('/projects',routes.projects )

// app.get('/projects/:projectAlias', routes.projectDetail);

// app.get('/about',routes.about)

// app.get('/contacts',routes.contacts)

// app.get('/blogs',routes.blogs )

// app.get('/login',routes.login )

// app.get('/dashboard',routes.dashboard)

// app.get('/project',routes.project)

// app.get ('/project/:alias',routes.myProjects)

// app.get('/signup', routes.signup)

// middlewares 

app.use(Middleware.notFoundError)
app.use(Middleware.handleError)



app.listen(3000, () => console.log('server started at port number 3000'))