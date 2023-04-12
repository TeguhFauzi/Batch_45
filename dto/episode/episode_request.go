// package episodedto

// import "dumbflix/models"

// type EpisodeRequest struct {
// 	ID            int         `json:"id" gorm:"primary_key:auto_increment"`
// 	Title         string      `json:"title" form:"title" gorm:"type: varchar(255)"`
// 	ThumbnailFilm string      `json:"thumbnail" form:"thumbnail" gorm:"type: varchar(255)"`
// 	Year          int         `json:"year" form:"year"`
// 	LinkFilm      string      `json:"linkFilm" form:"link" gorm:"type: varchar(255)"`
// 	FilmID        int         `json:"film_id" `
// 	Film          models.Film `json:"film"`
// }
package episodeDto

type CreateEpisodeRequest struct {
	Title     string `json:"title" form:"title" validate:"required"`
	Thumbnail string `json:"thumbnail" form:"thumbnail" validate:"required"`
	VideoLink string `json:"video_link" form:"video_link" validate:"required"`
	FilmID   int    `json:"film_id" form:"film_id" validate:"required"`
}

type UpdateEpisodeRequest struct {
	Title     string `json:"title" form:"title"`
	Thumbnail string `json:"thumbnail" form:"thumbnail"`
	VideoLink string `json:"video_link" form:"video_link"`
	FilmID   int    `json:"film_id" form:"film_id"`
}
