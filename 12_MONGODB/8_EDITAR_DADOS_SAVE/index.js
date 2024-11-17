const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const conn = require('./db/conn')
const worksRoutes = require('./routes/worksRoutes')



// read body
app.use(
    express.urlencoded({
        extended: true
    })
)
// middlewares
app.use(express.json())
app.use(express.static('public'))
app.use('/works', worksRoutes)

app.get("/", (req, res) => {
  res.redirect("/works");
});

app.listen(3000)
