const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
    //This helps us to not have any deprecation warning.
    useNewUrlParser: true, useUnifiedTopology: true
})

//Imported view engine
app.set('view engine', 'ejs')
//Using parameters
app.use(express.urlencoded({ extended : false }))

//Defining route for index and passing variables
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    //Rendering index file
    res.render('index', { shortUrls: shortUrls })
})

//Defining end-points, taking request and respond.
app.post('/shortUrls',async (req, res)=> {
    await ShortUrl.create({ full : req.body.LengthyURL })
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    //we want to findone using shorturl
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    //Checking if the URL is valid or not
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.save()

    res.redirect(shortUrl.full)
})

//To deploy the site
app.listen(process.env.PORT || 1304);