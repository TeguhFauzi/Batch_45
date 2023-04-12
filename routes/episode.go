package routes

import (
	"dumbflix/handlers"
	"dumbflix/pkg/middleware"
	"dumbflix/pkg/mysql"
	"dumbflix/repositories"

	"github.com/labstack/echo/v4"
)

func EpisodeRoutes(e *echo.Group) {
	EpisodeRepository := repositories.RepositoryEpisode(mysql.DB)

	h := handlers.HandlerEpisode(EpisodeRepository)

	e.GET("/film/:film_id/episodes", middleware.Auth(h.FindEpisodesByFilm))
	e.GET("/film/:film_id/episode/:id", middleware.Auth(h.GetEpisodeByFilm))
	e.POST("/episode", middleware.Auth(middleware.UploadFile(h.CreateEpisode)))
	e.PATCH("/episode/:id", middleware.Auth(middleware.UploadFile(h.UpdateEpisode)))
	e.DELETE("/episode/:id", middleware.Auth(h.DeleteEpisode))
}
