CREATE TABLE student (
  student_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  semester INTEGER NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);

CREATE TABLE professor (
  professor_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);

CREATE TABLE course (
  course_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  semester INTEGER NOT NULL,
  created_on TIMESTAMP NOT NULL
);

CREATE TABLE test (
  test_id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  professor_id INTEGER NOT NULL,
  given TIMESTAMP NOT NULL,
  FOREIGN KEY (course_id) REFERENCES course(course_id),
  FOREIGN KEY (student_id) REFERENCES student(student_id),
  FOREIGN KEY (professor_id) REFERENCES professor(professor_id)
);
