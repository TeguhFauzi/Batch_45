package models

// User model struct
type User struct {
	ID        int    `json:"id"`
	FullName  string `json:"fullname" gorm:"type: varchar(255)"`
	Email     string `json:"email" binding:"required, email" gorm:"unique;not null"`
	Password  string `json:"password" gorm:"type: varchar(255)"`
	Gender    string `json:"gender" gorm:"type:varchar(255)"`
	Phone     string `json:"phone" gorm:"type:varchar(255)"`
	Address   string `json:"address" gorm:"type:varchar(255)"`
	Subscribe bool   `json:"subscribe" gorm:"default:false"`
}
