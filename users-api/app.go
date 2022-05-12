package main

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"gopkg.in/gorp.v1"
)

var dbmap = initDb()

type User struct {
	Id         int64  `db:"id" json:"id"`
	Name       string `db:"name" json:"name"`
	Surname    string `db:"surname" json:"surname"`
	IsTutor    bool   `db:"isTutor" json:"is_tutor"`
	University string `db:"university" json:"university"`
	Created    string `db:"created" json:"created"`
	IsActive   bool   `db:"isActive" json:"is_active"`
}

type Course struct {
	Id          int64  `db:"id" json:"id"`
	Name        string `db:"name" json:"name"`
	Category    string `db:"category" json:"category"`
	Subcategory string `db:"subcategory" json:"subcategory"`
	Description string `db:"description" json:"description"`
	Rating      string `db:"rating" json:"rating"`
	Created     string `db:"created" json:"created"`
	TutorId     int64  `db:"tutorId" json:"tutor_id"`
}

type Grade struct {
	Id       int64   `db:"id" json:"id"`
	CourseId int64   `db:"courseId" json:"course_id"`
	UserId   int64   `db:"studentId" json:"student_id"`
	Grade    float32 `db:"grade" json:"grade"`
}

func initDb() *gorp.DbMap {
	db, err := sql.Open("postgres", "postgres://postgres:1234@sql/elearning?sslmode=disable")
	checkErr(err, "sql.Open failed")
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}
	dbmap.AddTableWithName(User{}, "users").SetKeys(true, "Id")
	dbmap.AddTableWithName(Course{}, "courses").SetKeys(true, "Id")
	dbmap.AddTableWithName(Grade{}, "grades").SetKeys(true, "Id")
	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")
	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

func getCourses(c *gin.Context) {
	var courses []Course
	_, err := dbmap.Select(&courses, "SELECT * FROM courses")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, courses)
}

func getCourse(c *gin.Context) {
	id := c.Params.ByName("id")
	var course Course
	err := dbmap.SelectOne(&course, "SELECT * FROM courses WHERE id=$1", id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, course)
}

func addCourse(c *gin.Context) {
	var course Course
	c.BindJSON(&course)
	err := dbmap.Insert(&course)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, course)
}

func updateCourse(c *gin.Context) {
	var course Course
	c.BindJSON(&course)
	_, err := dbmap.Update(&course)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, course)
}

func getUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	err := dbmap.SelectOne(&user, "SELECT * FROM users WHERE id=$1", id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, user)
}

func addUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	err := dbmap.Insert(&user)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, user)
}

func updateUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	_, err := dbmap.Update(&user)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, user)
}

func disableUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	err := dbmap.SelectOne(&user, "SELECT * FROM users WHERE id=$1", id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	user.IsActive = !user.IsActive
	_, err = dbmap.Update(&user)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, user)
}

func getGrades(c *gin.Context) {
	id := c.Params.ByName("id")
	var grades []Grade
	_, err := dbmap.Select(&grades, "SELECT * FROM grades WHERE studentId=$1", id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, grades)
}

func addGrade(c *gin.Context) {
	var grade Grade
	c.BindJSON(&grade)
	err := dbmap.Insert(&grade)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, grade)
}

func main() {
	router := gin.Default()
	router.GET("/courses", getCourses)
	router.POST("/courses", addCourse)
	router.GET("/courses/:id", getCourse)
	router.POST("/courses/:id", updateCourse)
	router.POST("/users", addUser)
	router.GET("/users/:id", getUser)
	router.POST("/users/:id", updateUser)
	router.PUT("/users/:id", disableUser)
	router.POST("/grades", addGrade)
	router.GET("/grades/:id", getGrades)
	router.Run(":8080")
}
