if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require(('express'));
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOveride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const AppError = require('./utils/AppError');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
var cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const mongoStore = require('connect-mongo');
const dbUrl = process.env.DB_URL;



const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(data => {
        console.log("Connection Open for Mongo!");
    })
    .catch(err => {
        console.log(err);
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log('Database Connected');
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOveride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(mongoSanitize({
    replaceWith:'_'
}));

const secret = process.env.SECRET || 'secretshouldbebetterthenthis';

const sessionConfig = {
    store: mongoStore.create({ mongoUrl: dbUrl }),
    name:'mbx_12hgshal',
    secret,
    resave:true,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000 * 60 * 60* 24 * 7,
        maxAge:1000 * 60 * 60* 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(cookieParser());
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://cdn.jsdelivr.net/",
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: [ "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dqkhts0ux/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
                "https://source.unsplash.com",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
app.use((req, res, next) => {
	res.removeHeader("Cross-Origin-Embedder-Policy");
	next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//app.use(morgan('common'));
app.use('/',userRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews',reviewRoutes);
app.get('/', (req, res) => {
    res.render('home.ejs');
});


app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found!!!', 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.messag = "Oh No, Something Went Wrong!!";
    res.status(status).render('error', { err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving YELPCAMP at Port ${port}!!!`);
});