db.users.drop();
db.users.insertMany([
  { _id: '1', password: 'pass', role: 'professor' },
  { _id: '2', password: 'pass', role: 'professor' },
  { _id: '3', password: 'pass', role: 'professor' },
  { _id: '4', password: 'pass', role: 'professor' },
  { _id: '5', password: 'pass', role: 'professor' },
  { _id: '6', password: 'pass', role: 'professor' },
  { _id: '1645', password: 'pass', role: 'student' },
  { _id: '1646', password: 'pass', role: 'student' },
  { _id: '1647', password: 'pass', role: 'student' },
  { _id: '1648', password: 'pass', role: 'student' },
  { _id: '1649', password: 'pass', role: 'student' },
  { _id: '1650', password: 'pass', role: 'student' }
]);

db.courses.drop();
db.courses.insertMany([
  {
    _id: '1',
    content: [
      {
        source_code: [{ file_name: 'path_to_file' }],
        pdf: [{ file_name: 'path_to file' }],
        video: [{ youtube_link: 'https://www.youtube.com/watch?v=1enJYF6E7xE&t=634s' }],
        test: [
          {
            question_1: 'text',
            question_type: 'multiple',
            answer_1: 'a',
            answer_2: 'b',
            answer_3: 'c',
            answer_4: 'd',
            correct: 'answer_1',
            grade_weight: 30 // In percentage
          }
        ],
        grade_weight: 20
      }
    ]
  }
])