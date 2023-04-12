package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/labstack/echo/v4"
)

func FilmRoutes(e *echo.Group) {
	filmRepository := repositories.RepositoryFilm(mysql.DB)
	h := handlers.HandlerFilm(filmRepository)

	e.GET("/films", h.FindFilms)
	e.GET("/film/:id", h.GetFilm)
	e.POST("/film", middleware.Auth(h.CreateFilm))
	e.PATCH("/film/:id", middleware.Auth(h.UpdateFilm))
	e.DELETE("/film/:id", middleware.Auth(h.DeleteFilm))
}
