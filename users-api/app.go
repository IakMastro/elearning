package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Student struct {
	student_id string `json:"student_id"`
	name       string `json:"name"`
	surname    string `json:"surname"`
	semester   int    `json:"semester"`
}

type Professor struct {
	professor_id string `json:"professor_id"`
	name         string `json:"name"`
	surname      string `json:"surname"`
}

type Course struct {
	course_id string `json:"course_id"`
	name      string `json:"name"`
	semester  int    `json:"semester"`
}

type Test struct {
	test_id      string  `json:"test_id"`
	course_id    int     `json:"course_id"`
	student_id   int     `json:"student_id"`
	professor_id int     `json:"professor_id"`
	grade        float32 `json:"grade"`
}

var db *sql.DB

var err error

func getStudents(w http.ResponseWriter, r *http.Request) {
	var students []Student

	rows, err := db.Query("SELECT * FROM student")

	if err != nil {
		panic(err.Error())
	}

	for rows.Next() {
		var student Student
		err := rows.Scan(&student.student_id, &student.name, &student.surname, &student.semester)

		if err != nil {
			log.Fatal(err)
		}
		students = append(students, student)
	}

	fmt.Println(students)
	json.NewEncoder(w).Encode(students)
}

func getStudent(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var student Student

	rows := db.QueryRow("SELECT * FROM student WHERE student_id = $1", params["id"])
	rows.Scan(&student.student_id, &student.name, &student.surname, &student.semester)

	fmt.Println(student)
	json.NewEncoder(w).Encode(student)
}

func createStudent(w http.ResponseWriter, r *http.Request) {
	var student Student
	_ = json.NewDecoder(r.Body).Decode(&student)

	statement := `INSERT INTO student (name, surname, semester) VALUES ($1, $2, 1)`
	_, err := db.Exec(statement, student.student_id, student.name, student.surname)

	if err != nil {
		panic(err.Error())
	}

	json.NewEncoder(w).Encode(student)
}

func getProfessors(w http.ResponseWriter, r *http.Request) {
	var professors []Professor

	rows, err := db.Query("SELECT * FROM professor")

	if err != nil {
		panic(err.Error())
	}

	for rows.Next() {
		var professor Professor
		err := rows.Scan(&professor.professor_id, &professor.name, &professor.surname)

		if err != nil {
			log.Fatal(err)
		}
		professors = append(professors, professor)
	}

	fmt.Println(professors)
	json.NewEncoder(w).Encode(professors)
}

func getProfessor(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var professor Professor

	rows := db.QueryRow("SELECT * FROM professor WHERE professor_id = $1", params["id"])
	rows.Scan(&professor.professor_id, &professor.name, &professor.surname)

	fmt.Println(professor)
	json.NewEncoder(w).Encode(professor)
}

func getCourses(w http.ResponseWriter, r *http.Request) {
	var courses []Course

	rows, err := db.Query("SELECT * FROM course")

	if err != nil {
		panic(err.Error())
	}

	for rows.Next() {
		var course Course
		err := rows.Scan(&course.course_id, &course.name, &course.semester)

		if err != nil {
			log.Fatal(err)
		}
		courses = append(courses, course)
	}

	fmt.Println(courses)
	json.NewEncoder(w).Encode(courses)
}

func getCourse(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var course Course

	rows := db.QueryRow("SELECT * FROM course WHERE course_id = $1", params["id"])
	rows.Scan(&course.course_id, &course.name, &course.semester)

	fmt.Println(course)
	json.NewEncoder(w).Encode(course)
}

func main() {
	db, err = sql.Open("postgres", "host=sql port=5432 user=postgres dbname=elearning password=1234 sslmode=disable")

	if err != nil {
		panic("failed to connect to the SQL database")
	}
	defer db.Close()

	router := mux.NewRouter()
	router.HandleFunc("/students", getStudents).Methods("GET")
	router.HandleFunc("/students/{id}", getStudent).Methods("GET")
	router.HandleFunc("/students", createStudent).Methods("POST")
	router.HandleFunc("/professors", getProfessors).Methods("GET")
	router.HandleFunc("/professors/{id}", getProfessor).Methods("GET")
	router.HandleFunc("/courses", getCourses).Methods("GET")
	router.HandleFunc("/courses/{id}", getCourse).Methods("GET")

	handler := cors.Default().Handler(router)

	fmt.Println("User API started on port 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
