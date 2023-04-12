package filmdto

import "dumbflix/models"

type CreateFilmRequest struct {

	Title         string          `json:"title" form:"title" validate:"required"`
	ThumbnailFilm string          `json:"thumbnailfilm" form:"thumbnailfilm" validate:"required"`
	Category      models.Category `json:"category" form:"category" validate:"required"`
	CategoryID    int             `json:"category_id" form:"category_id" validate:"required"`
	Year          int             `json:"year" form:"year" validate:"required"`
	Description   string          `json:"description" form:"description" validate:"required"`
}

type UpdateFilmRequest struct {

	Title         string          `json:"title" form:"title"`
	ThumbnailFilm string          `json:"thumbnailfilm" form:"thumbnailfilm"`
	Category      models.Category `json:"category" form:"category"`
	CategoryID    int             `json:"category_id" form:"category_id"`
	Year          int             `json:"year" form:"year"`
	Description   string          `json:"description" form:"description"`
}
