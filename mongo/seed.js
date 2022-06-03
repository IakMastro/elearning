db.users.drop();
db.users.insertMany([
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
    chapters: [
      {
        id: 1,
        files: ['path_to file'],
        test: [
          {
            _id: '1',
            question: 'text',
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
