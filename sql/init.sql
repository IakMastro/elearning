CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  surname TEXT,
  isTutor BOOLEAN,
  university TEXT,
  created DATE DEFAULT CURRENT_DATE,
  isActive BOOLEAN DEFAULT true
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name TEXT,
  category TEXT,
  subcategory TEXT,
  description TEXT,
  rating TEXT DEFAULT '0',
  created DATE DEFAULT CURRENT_DATE,
  tutorId INTEGER REFERENCES users(id)
);

CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  courseId INTEGER REFERENCES courses(id),
  studentId INTEGER REFERENCES users(id),
  testId INTEGER,
  grade FLOAT
);

COPY users (id, name, surname, isTutor, university) FROM '/data/users.csv' DELIMITER ';' CSV HEADER;
COPY courses (id, name, category, subcategory, description, tutorId) FROM '/data/courses.csv' DELIMITER ';' CSV HEADER;
