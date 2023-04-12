package bcrypt

import "golang.org/x/crypto/bcrypt"

/*Fungsi ini menerima input berupa string password dan mengembalikan output
berupa string hasil enkripsi password menggunakan algoritma bcrypt.*/
func HashingPassword(password string) (string, error) {
	// melakukan enkripsi password dengan menggunakan algoritma bcrypt.
	hashedByte, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		// fungsi HashingPassword akan mengembalikan dua nilai yaitu "" dan error yang terjadi.
		return "", err
	}
	// hasil enkripsi akan disimpan pada variabel hashedByte
	return string(hashedByte), nil
}

func CheckPasswordHash(password, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
