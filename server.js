const express = require('express')
    const app = express()
const path = require('path')
// log the different requests to our server
const logger = require('morgan')
    app.use(logger('dev'))
// cross origin access
const cors = require('cors')
const { default: axios } = require('axios')
    app.use(cors({
        origin: "*"
    }));
const passport = require('passport');
const initializePassport = require('./config/passport-config.js')
const bcrypt = require('bcrypt');
require('dotenv').config(); //-----what config()?
require('./config/database.js');
const mongoose = require('mongoose')
const session = require('express-session')
const User = require('./models/user.js');

// parse stringified objects (JSON)
app.use(express.json())

// server builder folder
app.use(express.static(path.join(__dirname, 'build')))

// logs the different requests to our server
app.use(logger('dev'))

initializePassport(
    passport,
    // passport tells us that they want a function that will return the correct user given an email
    async email => {
        let user = await User.findOne({email: email})
        return user;
    },
    async id => {
        let user = await User.findById(id);
        return user;
    },
);

app.use(session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: true, //true or false?
    saveUninitialized: true,
    cookie: { originalMaxAge: 3600000, sameSite: 'strict'}
}))
app.use(passport.session())


app.get('/session-info', (req, res) => {
    res.json({
        session: req.session
    })
})


app.post('/users/signup',async (req, res) => {
    console.log(req.body);
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword);
    // use User model to place user in the database
    let userFromCollection = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        favorites: [],
        wishlist: [],
        picUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'
    })
    console.log(userFromCollection);
    // sending user response after creation or login
    res.json("user created")
});

app.get('/getUserData', async (req, res) => {
    try {
        console.log('/getuserData REACHED');
        let user = await User.findOne({email: req.user.email});
        res.json(user)
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: /getUserData Route Failed' });
       }
})

app.put('/changePic', async (req, res) => {
    try {
        console.log('/changePic REACHED');
        let newUrl = req.body.url;
        console.log('THE URL TO PUSH', newUrl);
        let user = await User.findOne({email: req.user.email});
        user.picUrl = newUrl;
        await user.save();
        res.send('URL CHANGED IN DB')
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: /changePic Route Failed' });
       }
})


app.put('/users/login', async (req, res, next) => {
    console.log(req.body);
    // passport authentication
    await passport.authenticate("local", (err, user, message) => {
        console.log(message);
        if (err) throw err;
        if (!user) {
            res.json({
                message: "login failed",
                user: false
            })
        } else {
            //delete user.password;
            req.logIn(user, err => { //login from express; enters user into session
                if (err) throw err;
                res.json({
                    message: "successfully authenticated",
                    // remove user
                })
            })
        }
    })(req, res, next)
});

app.post('/users/logout', function(req, res, next) {
    req.logOut(function(err) { 
      if (err) { return next(err); }
      //console.log('REQ.SESSION BEFORE:',req.session);
      req.session.destroy();
      //console.log('REQ.SESSION AFTER:',req.session);
      res.redirect('/');
    });
  });

  //res.json({ redirect: '/' });

// app.post('/users/logout', (req, res, next) => {
//     req.logout();
//     res.status(200).send("Logged out successfully");
//     req.session.destroy();
//     res.redirect('/');
// });

//sort by ratings url
//https://api.rawg.io/api/games?key=${process.env.API_KEY}&ordering=-rating&metacritic=80,100&exclude_additions=true
app.get('/get_games', async (req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    let order = req.query.order;
    //console.log({order});
    let apiResponse = await axios(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}&page_size=${size}&ordering=${order}`)
    let data = apiResponse.data;
    res.json(data)
})

app.get('/get_game', async (req, res) => {
    let id = req.query.id;
    //console.log('!!!!!!!!!!!!SHOULD BE ID OF GAME', id);
    let apiResponse = await axios(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)
    let data = apiResponse.data;
    console.log('!!!!!!!!!GAME DATA', data);
    res.json(data)
})

app.get('/get_wishlist', async (req, res) => { 
    try {
        let user = await User.findOne({email: req.user.email});
        const wishlist = user.wishlist;
        res.json(wishlist);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: /get_wishlist Route Failed' });
       }
})

app.get('/get_favs', async (req, res) => { 
    //console.log('THIS IS USER',req.user);
    //console.log('THIS IS THE USER: ',User.name);
    try {
        let user = await User.findOne({email: req.user.email});
        const favs = user.favorites;
        res.json(favs);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: /get_favs Route Failed' });
       }
})

app.post('/addFav', async (req, res) => {
    try {
        console.log('/addFav REACHED');
        let game = req.body.title;
        console.log('THE GAME TITLE TO PUSH', game);
        let user = await User.findOne({email: req.user.email});
        user.favorites.push(game)
        await user.save()
        res.send('FAV ADDED TO DB')
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: /addFav Route Failed' });
       }
})

app.delete('/deleteFav', async (req, res) => {
    try {
        console.log('/deleteFav REACHED');
        let game = req.body.title;
        console.log('THE GAME TITLE TO DELETE', game);
        let user = await User.findOne({email: req.user.email});
        user.favorites.pull(game)
        await user.save()
        res.send('FAV DELETED FROM DB')
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: /deleteFav Route Failed' });
       }
})

app.post('/addToWishlist', async (req, res) => {
    try {
        console.log('/addToWishlist REACHED');
        let game = req.body.title;
        console.log('THE GAME TITLE TO PUSH', game);
        let user = await User.findOne({email: req.user.email});
        user.wishlist.push(game)
        await user.save()
        res.send('WISH ADDED TO DB')
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: /addToWishlist Route Failed' });
       }
})

app.delete('/deleteFromWishlist', async (req, res) => {
    try {
        console.log('/deleteFromWishlist REACHED');
        let game = req.body.title;
        console.log('THE GAME TITLE TO DELETE', game);
        let user = await User.findOne({email: req.user.email});
        user.wishlist.pull(game)
        await user.save()
        res.send('WISH DELETED FROM DB')
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: /deleteFromWishlist Route Failed' });
       }
})

// catch all route (must be last route)
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})
