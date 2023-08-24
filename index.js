const express = require('express')
const app = express()
const PORT = 5000

// set hbs
app.set('view engine', 'hbs')

//serving static files
app.use(express.static('assets'))

// parsing data
app.use(express.urlencoded({ extended: false }))

app.get('/home', home)
app.get('/add-project', addProject)
app.post('/add-project', addBlog)
app.get('/contact', contact)
app.get('/blog-details/:id', blogDetails)

// local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

function home(req, res) {
  res.render('index')
}

function addProject(req, res) {
  res.render('add-project')

}

function contact(req, res) {
  res.render('contact')
}

function addBlog(req, res) {
  const { title, content } = req.body

  console.log(title)
  console.log(content)

  res.redirect('/home')
}

function blogDetails(req, res) {
  const { id } = req.params

  const data = {
    id,
    title: "Dumbways Project",
  }

  res.render('blog-details', { data })
}