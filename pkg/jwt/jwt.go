package jwtToken

import (
	"fmt"
	"os"

	"github.com/golang-jwt/jwt/v4"
)

// nilai "SECRET_KEY" dari environment variable menggunakan method os.Getenv().
var SecretKey = os.Getenv("SECRET_KEY")

// fungsi GenerateToken menerima parameter berupa pointer ke mapClaims
func GenerateToken(claims *jwt.MapClaims) (string, error) {
	//jwt.NewWithClaims() akan membuat token baru
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	//Metode .SignedString([]byte(SecretKey)) untuk menandatangani token dengan kunci rahasia yang telah diperoleh
	//sebelumnya, kemudian mengembalikan token JSON yang sudah ditandatangani sebagai string
	webtoken, err := token.SignedString([]byte(SecretKey))
	if err != nil {
		return "", err
	}

	return webtoken, nil
}

/*
menerima sebuah token string sebagai parameter dan mengembalikan pointer ke
objek token JWT serta error (jika terjadi) dalam proses verifikasi token
*/
func VerifyToken(tokenString string) (*jwt.Token, error) {
	/*jwt.Parse() yang digunakan untuk melakukan parsing token JWT yang diberikan dalam bentuk string (tokenString),
	dengan menggunakan fungsi callback sebagai parameter kedua*/
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, isValid := token.Method.(*jwt.SigningMethodHMAC); !isValid {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(SecretKey), nil
	})

	if err != nil {
		return nil, err
	}
	return token, nil
}
 //fungsi DecodeToken dengan parameter tokenString bertipe data string yang mengembalikan jwt.MapClaims dan error
func DecodeToken(tokenString string) (jwt.MapClaims, error) {
	//verifikasi token menggunakan fungsi VerifyToken dengan parameter tokenString
	token, err := VerifyToken(tokenString)
	if err != nil {
		return nil, err
	}

	 //mendekode token ke claims dengan tipe jwt.MapClaims
	claims, isOk := token.Claims.(jwt.MapClaims)
	if isOk && token.Valid {
		return claims, nil
	}

	return nil, fmt.Errorf("invalid token")
}
