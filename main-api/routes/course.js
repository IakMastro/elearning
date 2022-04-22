import express from 'express'
import axios from 'axios'
import courses from './models/courses.js'

const courses_router = express.Router()

courses_router.get('/', async (req, res) => {
  courses.find({}, (err, db_courses) => {
    res.send(db_courses)
  })
})

courses_router.get('/:id', async (req, res) => {
  courses.findById(req.params.id, 'content', (err, course) => {
    res.send(course)
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

courses_router.get('/:id/:index/test', async (req, res) => {
  courses.findById(req.params.id, 'content', (err, course) => {
    res.send(course.content[req.params.index]['test'])
  })
})

// NOTE: This needs testing
courses_router.get('/:id/:index/files/:path', async (req, res) => {
  res.download(req.params.path)
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

export default courses_router
