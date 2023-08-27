const express = require('express')
const app = express()
const PORT = 5000


// set hbs
app.set('view engine', 'hbs')

//serving static files
app.use(express.static('assets'))

// parsing data
app.use(express.urlencoded({ extended: false }))

// get
app.get('/home', home)
app.get('/add-project', addProject)
app.get('/contact', contact)
app.get('/blog-details/:id', blogDetails)
app.get('/delete-blog/:id', deleteBlog)
app.get('/edit-blog/:id', updateBlog)

//post
app.post('/add-project', addBlog)
app.post('/edit-blog/:id', editBlog)

// local server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Dummy data
const dataBlog = [
  {
    // id: 1,
    title: "Hari ini keren",
    dateDuration: "3 bulan",
    content: "Terlihat hari ini sangat cerah dan kemungkinan adanya hari baik.",

  },
  {
    // id: 2,
    title: "Hari ini cerah",
    dateDuration: "3 bulan",
    content: "Terlihat hari ini sangat cerah dan kemungkinan adanya hari baik.",
  }
]

function home(req, res) {

  res.render('index', { dataBlog })
}

function addProject(req, res) {
  res.render('add-project')

}

function contact(req, res) {
  res.render('contact')
}

function duration (startDate, endDate){
  let start = new Date(startDate);
  let end = new Date(endDate);

  let difference = end - start;
  let day = difference / (1000 * 3600 * 24);
  let week = Math.floor(day / 7);
  let month = Math.floor(week / 4);
  let year = Math.floor(month / 12);
  var durasi = "";

  if (day > 0){
    durasi = `${day} hari`;
  }
  if (week > 0){
    durasi = `${week} minggu`;
  } 
  if (month > 0){
    durasi = `${month} bulan`;
  }
  if (year > 0){
    durasi = `${year} tahun`;
  } 
  return durasi;
}

function isChecked(checkbox){
  return checkbox == 'on'? true : false;

}

function addBlog(req, res) {
  var { title, startdate, enddate, content, nodejs, nextjs, reactjs, typescript } = req.body
  const dateDuration = duration(startdate, enddate);
  nodejs = isChecked(nodejs);
  nextjs = isChecked(nextjs);
  reactjs = isChecked(reactjs);
  typescript = isChecked(typescript);

  const blog = {
    title,
    content,
    dateDuration,
    startdate,
    enddate,
    nodejs,
    nextjs,
    reactjs,
    typescript,
  }

  dataBlog.push(blog)
  res.redirect('/home')
}


function blogDetails(req, res) {
  const { id } = req.params

  res.render('blog-details', { home: dataBlog[id] })
}

function deleteBlog(req, res) {
  const { id } = req.params

  dataBlog.splice(id, 1)
  res.redirect('/home')
}

function updateBlog(req, res) {
  const { id } = req.params

  res.render('edit-project', { home: dataBlog[id]})
}

function editBlog(req, res) {
  const { id } = req.params
  console.log(id)
  var { title, startdate, enddate, content, nodejs, nextjs, reactjs, typescript } = req.body
  const dateDuration = duration(startdate, enddate);
  nodejs = isChecked(nodejs);
  nextjs = isChecked(nextjs);
  reactjs = isChecked(reactjs);
  typescript = isChecked(typescript);

  const form = {
    title,
    content,
    dateDuration,
    startdate,
    enddate,
    nodejs,
    nextjs,
    reactjs,
    typescript,
  }
  dataBlog[id] = form;
  console.log(dataBlog);
  res.redirect('/home')
}