package handlers

import (
	episodeDto "dumbflix/dto/episode"
	dto "dumbflix/dto/result"
	"dumbflix/models"
	"dumbflix/repositories"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerEpisode struct {
	EpisodeRepository repositories.EpisodeRepository
}

func 
HandlerEpisode(EpisodeRepository repositories.EpisodeRepository) *handlerEpisode {
	return &handlerEpisode{EpisodeRepository}
}

func (h *handlerEpisode) FindEpisodesByFilm(c echo.Context) error {
	filmID, _ := strconv.Atoi(c.Param("film_id"))
	episodes, err := h.EpisodeRepository.FindEpisodesByFilm(filmID)
fmt.Println(filmID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, m := range episodes {
		episodes[i].Thumbnail = path_file + m.Thumbnail
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: episodes})
}

func (h *handlerEpisode) GetEpisodeByFilm(c echo.Context) error {
	filmID, _ := strconv.Atoi(c.Param("film_id"))
	episodeID, _ := strconv.Atoi(c.Param("id"))

	episode, err := h.EpisodeRepository.GetEpisodeByFilm(filmID, episodeID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	episode.Thumbnail = path_file + episode.Thumbnail

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: episode})
}

func (h *handlerEpisode) GetEpisode(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	episode, err := h.EpisodeRepository.GetEpisode(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	episode.Thumbnail = path_file + episode.Thumbnail

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: episode})
}

func (h *handlerEpisode) CreateEpisode(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	filmID, _ := strconv.Atoi(c.FormValue("film_id"))

	request := episodeDto.CreateEpisodeRequest{
		Title:     c.FormValue("title"),
		Thumbnail: dataFile,
		VideoLink: c.FormValue("video_link"),
		FilmID:  filmID,
	}

	fmt.Println(request)

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	episode := models.Episode{
		Title:     request.Title,
		Thumbnail: request.Thumbnail,
		VideoLink: request.VideoLink,
		FilmID:    request.FilmID,
	}

	data, err := h.EpisodeRepository.CreateEpisode(episode)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseEpisode(data)})
}

func (h *handlerEpisode) UpdateEpisode(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	filmID, _ := strconv.Atoi(c.FormValue("film_id"))

	request := episodeDto.UpdateEpisodeRequest{
		Title:     c.FormValue("title"),
		Thumbnail: dataFile,
		VideoLink: c.FormValue("video_link"),
		FilmID:   filmID,
	}

	id, _ := strconv.Atoi(c.Param("id"))

	episode, err := h.EpisodeRepository.GetEpisode(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Title != "" {
		episode.Title = request.Title
	}

	if request.Thumbnail != "" {
		episode.Thumbnail = request.Thumbnail
	}

	if request.VideoLink != "" {
		episode.VideoLink = request.VideoLink
	}

	if request.FilmID != 0 {
		if _, err := strconv.Atoi(strconv.Itoa(request.FilmID)); err == nil {
			episode.FilmID = request.FilmID
		}
	}

	data, err := h.EpisodeRepository.UpdateEpisode(episode)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseEpisode(data)})
}

func (h *handlerEpisode) DeleteEpisode(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	episode, err := h.EpisodeRepository.GetEpisode(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.EpisodeRepository.DeleteEpisode(episode, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseEpisode(data)})
}

func convertResponseEpisode(u models.Episode) models.EpisodeResponse {
	return models.EpisodeResponse{
		ID:        u.ID,
		Title:     u.Title,
		Thumbnail: u.Thumbnail,
		VideoLink: u.VideoLink,
		Film:      u.Film,
	}
}
