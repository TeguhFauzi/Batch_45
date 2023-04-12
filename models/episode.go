// package models

//	type Episode struct {
//		ID            int    `json:"id"`
//		Title         string `json:"title" gorm:"type: varchar(255)"`
//		ThumbnailFilm string `json:"thumbnail" gorm:"type: varchar(255)"`
//		Year          int    `json:"year" form:"year"`
//		LinkFilm      string `json:"linkFilm" form:"link" gorm:"type: varchar(255)"`
//		FilmID        int    `json:"film_id" `
//		Film          Film   `json:"film"`
//	}
package models

import "time"

type Episode struct {
	ID        int       `json:"id,"`
	Title     string    `json:"title" gorm:"type: VARCHAR(255)"`
	Thumbnail string    `json:"thumbnail" gorm:"type: VARCHAR(255)"`
	VideoLink string    `json:"video_link" gorm:"type: VARCHAR(255)"`
	FilmID    int       `json:"film_id"`
	Film      Film      `json:"film"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type EpisodeResponse struct {
	ID        int    `json:"id,"`
	Title     string `json:"title"`
	Thumbnail string `json:"thumbnail"`
	VideoLink string `json:"video_link"`
	Film      Film   `json:"film"`
}

func (EpisodeResponse) TableName() string {
	return "EpisodeResponses"
}
