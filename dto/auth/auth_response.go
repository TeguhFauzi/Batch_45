package authdto

type AuthResponse struct {
	Email     string `json:"email" form:"email" validate:"required"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}

type LoginResponse struct {
	Email string `gorm:"type: varchar(255)" json:"email"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}
