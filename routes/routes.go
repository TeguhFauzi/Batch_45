package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	UserRoutes(e)
	FilmRoutes(e)
	CategoryRoutes(e)
	AuthRoutes(e)
	EpisodeRoutes(e)
	TransactionRoutes(e)
}
