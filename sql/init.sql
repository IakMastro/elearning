CREATE TABLE student (
  student_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  semester INTEGER NOT NULL
);

CREATE TABLE professor (
  professor_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL
);

CREATE TABLE course (
  course_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  semester INTEGER NOT NULL
);

CREATE TABLE test (
  test_id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  professor_id INTEGER NOT NULL,
  grade FLOAT(2.1) NOT NULL,
  given TIMESTAMP NOT NULL,
  FOREIGN KEY (course_id) REFERENCES course(course_id),
  FOREIGN KEY (student_id) REFERENCES student(student_id),
  FOREIGN KEY (professor_id) REFERENCES professor(professor_id)
);

COPY student (student_id, name, surname, semester) FROM '/data/students.csv' DELIMITER ',' CSV HEADER;
COPY professor (professor_id, name, surname) FROM '/data/professors.csv' DELIMITER ',' CSV HEADER;
COPY course (course_id, name, semester) FROM '/data/courses.csv' DELIMITER ',' CSV HEADER;
