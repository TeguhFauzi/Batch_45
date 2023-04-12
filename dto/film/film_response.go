package filmdto

import "dumbflix/models"

type FilmResponse struct {
	ID            int             `json:"id"`
	Title         string          `json:"title"  gorm:"type: varchar(255)"`
	ThumbnailFilm string          `json:"thumbnailfilm"  gorm:"type: varchar(255)"`
	Category      models.Category `json:"category"`
	CategoryID    int             `json:"category_id"`
	Year          int             `json:"year" gorm:"type: int"`
	Description   string          `json:"description"  gorm:"type: varchar(255)"`
}
