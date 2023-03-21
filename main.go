package main

import (
	"fmt"

	"io"
	"net/http"
	"strconv"
	"text/template"
	"time"

	"github.com/labstack/echo/v4"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

// Struct Interface Data Dummy
type Blog struct {
	ID          int
	Title       string
	Description string
	Author      string
	PostDate    string
	Techno      []string
	Image       string
	Icon        string
	Duration    string
	Start       string
	End         string
}

var blogData = []Blog{
	// {
	// 	Title:       "DW MOBILE APP-2022",
	// 	Description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugiat placeat aut earum!",
	// 	Author:      "Michael Ipin",
	// 	PostDate:    "12 Dec 2022 15:04",
	// },
}
var dummyD = []Blog{
	{

		Title:       "DW MOBILE APP-2020",
		Description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugiat placeat aut earum!",
		Author:      "Michael Ipin",
		PostDate:    "08 Feb 2020 15:04",
		Image:       "netflix",
		Icon: `<img src="/public/images/react.png"/>
					<img src="/public/images/node.png"/>
					<img src="/public/images/javascript.png"/>
					<img src="/public/images/angular.png"/>`,
		Duration: "2 Month(s)",
	},

	{
		Title:       "DW MOBILE APP-2021",
		Description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt alias consequatur.",
		Author:      "Michael Ipin",
		PostDate:    "12 Nov 2021 13:04",
		Image:       "proc",
		Icon: `<img src="/public/images/javascript.png"/>
					<img src="/public/images/react.png"/>`,
		Duration: "3 Week(s)",
	},
}

func main() {
	// connection.DatabaseConnection()

	e := echo.New()

	e.Static("/public", "public")

	t := &Template{
		templates: template.Must(template.ParseGlob("views/*.html")),
	}

	e.Renderer = t

	// ROUTING
	e.GET("/hello", helloWorld)
	e.GET("/", home)
	e.GET("/contact", contact)
	e.GET("/blog-Detail/:id", blogDetail)
	e.GET("/delete-blog/:id", deleteblog)
	e.GET("/form-project", formProject)
	e.POST("/add-project", addProject)
	e.GET("/delete-project/:id", deleteProject)
	e.GET("/blog-detail/:id", blogDet)
	e.GET("/edit-project/:id", editProject)
	e.POST("/update-project", uProject)

	fmt.Println("Server running on Port : 5000")
	e.Logger.Fatal(e.Start("Localhost:5000"))

}

func helloWorld(c echo.Context) error {
	return c.String(http.StatusOK, "Hello World!")
}

func home(c echo.Context) error {

	// data, _ := connection.Conn.Query(context.Background(),"SELECT *FROM public.tb_blog;")

	// var result[]Blog
	// for data.Next() {
	// 	var each= Blog{}

	// }
	blogs := map[string]interface{}{
		"Blogs": blogData,
		"Dummy": dummyD,
	}
	return c.Render(http.StatusOK, "index.html", blogs)
}
func contact(c echo.Context) error {
	return c.Render(http.StatusOK, "contactme.html", nil)
}

// ================================================================
// BLOG-DETAIL-DUMMY-DATA
func blogDetail(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id")) // url params | dikonversikan dari string menjadi int/integer

	var Dummy = Blog{}

	for i, data := range dummyD {
		if id == i {
			Dummy = Blog{

				// ID:id,
				Title:       data.Title,
				Description: data.Description,
				Author:      data.Author,
				PostDate:    data.PostDate,
				Icon:        data.Icon,
				Image:       data.Image,
			}

		}
	}
	dataDetail := map[string]interface{}{
		"Blog": Dummy,
	}
	return c.Render(http.StatusOK, "blog-d.html", dataDetail)
}

func formProject(c echo.Context) error {
	return c.Render(http.StatusOK, "myproject.html", nil)
}

// ============================================================
// ADD PROJECT
func addProject(c echo.Context) error {
	title := c.FormValue("inTitle")
	description := c.FormValue("inDesc")
	techno := c.Request().Form["techno"]
	startDate := c.FormValue("startdate")
	endDate := c.FormValue("enddate")
	loc, _ := time.LoadLocation("Asia/Jakarta")
	now := time.Now().In(loc)

	//Parsing time
	start, _ := time.Parse("2006-01-02", startDate)
	end, _:= time.Parse("2006-01-02", endDate)
	
	//================================================================
	// GET Duration
	//Menghitung Durasi
	duration := end.Sub(start)
	days := int(duration.Hours() / 24)//Hari
	weeks := int(duration.Hours() / 24 / 7)//Minggu
	months := int(end.Sub(start.AddDate(0, 0, -1)).Hours() / 24 / 30) //Bulan
	years := int(end.Sub(start.AddDate(0, 0, -1)).Hours() / 24 / 365) //Tahun

	
	fmt.Println(days, weeks, months, years)
	// Menentukan durasi berdasarkan Value tertinggi sesuai kondisi
	durationString := ""
	if years > 0 {
		if years == 1 {
			durationString = "1 year"
		} else {
			durationString = fmt.Sprintf("%d year(s)", years)
		}
	} else if months > 0 {
		if months == 1 {
			durationString = "1 month"
		} else {
			durationString = fmt.Sprintf("%d month(s)", months)
		}
	} else if weeks > 0 {
		if weeks == 1 {
			durationString = "1 week"
		} else {
			durationString = fmt.Sprintf("%d week(s)", weeks)
		}
	} else {
		if days == 1 {
			durationString = "1 day"
		} else {
			durationString = fmt.Sprintf("%d day(s)", days)
		}
	}
	println("Title: " + title)
	println("Description: " + description)

	var newBlog = Blog{
		Title:       title,
		Description: description,
		Author:      "Michael Ipin",
		Start:       startDate,
		End:         endDate,
		Techno:      techno,
		Duration:    durationString,
		PostDate:    now.Format("02 Jan 2006 15:04"),
	}

	fmt.Println(durationString)

	// APPEND-SLICE
	blogData = append(blogData, newBlog)
	fmt.Println(duration)
	fmt.Println(newBlog.PostDate)
	// RETURN
	return c.Redirect(http.StatusMovedPermanently, "/")
}

func deleteblog(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	dummyD = append(dummyD[:id], dummyD[id+1:]...)

	return c.Redirect(http.StatusMovedPermanently, "/")
}

// ============================================================
// DELETE-PROJECT
func deleteProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	blogData = append(blogData[:id], blogData[id+1:]...)

	return c.Redirect(http.StatusMovedPermanently, "/")
}

// ============================================================
// PROJECT-DETAILS
func blogDet(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id")) // url params | dikonversikan dari string menjadi int/integer

	var Blogdet = Blog{}

	for i, data := range blogData {
		if id == i {
			Blogdet = Blog{

				Title:       data.Title,
				Description: data.Description,
				Author:      data.Author,
				PostDate:    data.PostDate,
				Techno:      data.Techno,
				Duration:    data.Duration,
			}

		}
	}

	// data yang akan digunakan/dikirimkan ke html menggunakan map interface
	dataDetail := map[string]interface{}{
		"Blog": Blogdet,
	}
	return c.Render(http.StatusOK, "blog-e.html", dataDetail)
}

// ============================================================
// Edit Project
func editProject(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var editP = Blog{}
	for i, data := range blogData {
		if id == i {

			editP = Blog{
				Start:       data.Start,
				End:         data.End,
				ID:          id,
				Title:       data.Title,
				Description: data.Description,
				Author:      data.Author,
				PostDate:    data.PostDate,
				Techno:      data.Techno,
			}

		}
	}
	editDet := map[string]interface{}{
		"Blog": editP,
	}
	return c.Render(http.StatusOK, "edit.html", editDet)
}

// ============================================================
// ADD PROJECT
func uProject(c echo.Context) error {
	title := c.FormValue("inTitle")
	description := c.FormValue("inDesc")
	techno := c.Request().Form["techno"]
	id, _ := strconv.Atoi(c.Param("id"))

	println("Title: " + title)
	println("Description: " + description)

	for i, blog := range blogData {
		if blog.ID == id {
			blogData[i] = Blog{
				ID:          id,
				Title:       title,
				Description: description,
				Author:      "Michael Ipin",
				PostDate:    time.Now().Format("01 Dec 2006 15:04"),
				Techno:      techno,
			}
			break
		}
	}

	return c.Redirect(http.StatusMovedPermanently, "/")
}
