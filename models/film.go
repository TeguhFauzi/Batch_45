package models

// User model struct
type Film struct {
	ID            int      `json:"id"`
	Title         string   `json:"title" gorm:"type: varchar(255)"`
	ThumbnailFilm string   `json:"thumbnailfilm" gorm:"type: varchar(255)"`
	Category      Category `json:"category"`
	CategoryID    int      `json:"category_id"`
	Year          int      `json:"year" gorm:"type: int"`
	Description   string   `json:"description" gorm:"type:varchar(255)"`
}

type FilmResponse struct {
	ID            int      `json:"id" gorm:"primary_key:auto_increment"`
	Title         string   `json:"title" form:"title" gorm:"type: varchar(255)"`
	ThumbnailFilm string   `json:"thumbnail" form:"thumbnail" gorm:"type: varchar(255)"`
	Year          int      `json:"year" form:"year"`
	Category      Category `json:"category" `
	CategoryID    int      `json:"category_id" `
	Description   string   `json:"description" form:"description" gorm:"type: text"`
}
