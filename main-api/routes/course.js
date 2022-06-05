import express from 'express'
import axios from 'axios'
import courses from './models/courses.js'

const courses_router = express.Router()
const users_api_url = "http://usersapi:8080"

courses_router.get('/', async (req, res) => {
  axios.get(`${users_api_url}/courses`)
    .then((response) => {
      const courses = response.data
      res.status(200).send(courses)
    })
    .catch((error) => {
      res.status(400).send({ error: error })
    })
})

courses_router.get('/:id', async (req, res) => {
  courses.findById(req.params.id, 'chapters', (err, course) => {
    axios.get(`${users_api_url}/courses/${req.params.id}`)
      .then((response) => {
        const sql_course = response.data

        res.status(200).send({
          id: course._id,
          chapters: course.chapters,
          name: sql_course.name,
          category: sql_course.category,
          subcategory: sql_course.subcategory,
          description: sql_course.description,
          tutor_id: sql_course.tutor_id,
          rating: sql_course.rating
        })
      })
      .catch((error) => {
        res.status(400).send({ error: error })
      })
  })
  res.status(404)
})

courses_router.post('/:id', async (req, res) => {
  axios.post(`${users_api_url}/courses/${req.params.id}`, req.body)
    .then((response) => {
      res.send(response.status)
    })
    .catch((error) => {
      res.status(400).send({ error: error })
    })
})

courses_router.get('/:id/:index/test', async (req, res) => {
  courses.findById(req.params.id, 'chapters', (err, course) => {
    res.send({ test: course.chapters[req.params.index].test })
  })
})

// NOTE: This needs testing
courses_router.post('/:id/:index/test/create', async (req, res) => {
  let course_id = req.params.id
  let chapter_index = req.params.index

  let content = await axios.get(`http://localhost:5000/${course_id}`)
  content[chapter_index]['test'].append(req.body.test)
  courses.findByIdAndUpdate(course_id, { $set: { content: content } })
})

// NOTE: This needs testing
courses_router.post('/:id/:index/files/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded')
  }

  let uploaded_file = req.files.uploaded_file
  let course_id = req.params.id
  let chapter_index = req.params.index
  let path = '/files/' + course_id + '/' + chapter_index + '/' + uploaded_file.name

  let content = await axios.get(`http://localhost:5000/${course_id}`)
  content[chapter_index]['files'].append(path)
  courses.findByIdAndUpdate(course_id, { $set: { content: content } })

  uploaded_file.mv(path, (err) => {
    if (err)
      return res.status(500).send(err)

    res.send(201)
  })
})

// NOTE: This needs testing
courses_router.get('/:id/:index/files/:filename', async (req, res) => {
  res.download(`/files/${req.params.id}/${req.params.index}/${req.params.filename}`)
})

export default courses_router
