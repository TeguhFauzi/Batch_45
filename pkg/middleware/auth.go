package middleware

import (
	dto "dumbflix/dto/result"
	jwtToken "dumbflix/pkg/jwt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)


type Result struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}


func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		//Mendapatkan nilai dari header Authorization pada request yang diberikan.
		token := c.Request().Header.Get("Authorization")

		if token == "" {
			return c.JSON(http.StatusUnauthorized, dto.ErrorResult{Code: http.StatusBadRequest, Message: "unauthorized"})
		}

		//Metode pada jwt token
		token = strings.Split(token, " ")[1]
		claims, err := jwtToken.DecodeToken(token)

		if err != nil {
			return c.JSON(http.StatusUnauthorized, Result{Code: http.StatusUnauthorized, Message: "unathorized"})
		}

		c.Set("userLogin", claims)
		return next(c)
	}
}
