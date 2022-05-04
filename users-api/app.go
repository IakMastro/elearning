package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"gopkg.in/gorp.v1"
)

var dbmap = initDb()

type Student struct {
	Id       int64  `db:"student_id" json:"id"`
	Name     string `db:"name" json:"name"`
	Surname  string `db:"surname" json:"surname"`
	Semester string `db:"semester" json:"semester"`
}

type Professor struct {
	Id      int64  `db:"professor_id" json:"id"`
	Name    string `db:"name" json:"name"`
	Surname string `db:"surname" json:"surname"`
}

func initDb() *gorp.DbMap {
	db, err := sql.Open("postgres", "postgres://postgres:1234@sql/elearning?sslmode=disable")
	checkErr(err, "sql.Open failed")
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}
	dbmap.AddTableWithName(Student{}, "student").SetKeys(true, "Id")
	dbmap.AddTableWithName(Professor{}, "professor").SetKeys(true, "Id")
	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")
	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

func getStudents(c *gin.Context) {
	var students []Student
	_, err := dbmap.Select(&students, "SELECT * FROM student")
	if err != nil {
		c.JSON(500, gin.H{"error": "error"})
		return
	}
	c.JSON(200, students)
}

func getStudent(c *gin.Context) {
	id := c.Params.ByName("id")
	var student Student
	err := dbmap.SelectOne(&student, "SELECT * FROM student WHERE student_id=$1", id)
	if err != nil {
		c.JSON(500, gin.H{"error": "error"})
		return
	}
	c.JSON(200, student)
}

func getProfessors(c *gin.Context) {
	var professors []Professor
	_, err := dbmap.Select(&professors, "SELECT * FROM professor")
	if err != nil {
		c.JSON(500, gin.H{"error": "error"})
		return
	}
	c.JSON(200, professors)
}

func getProfessor(c *gin.Context) {
	id := c.Params.ByName("id")
	var professor Professor
	err := dbmap.SelectOne(&professor, "SELECT * FROM professor WHERE professor_id=$1", id)
	fmt.Println(professor)
	if err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}
	c.JSON(200, professor)
}

func main() {
	router := gin.Default()
	router.GET("/students", getStudents)
	router.GET("/students/:id", getStudent)
	router.GET("/professors", getProfessors)
	router.GET("/professors/:id", getProfessor)
	router.Run(":8080")
}
