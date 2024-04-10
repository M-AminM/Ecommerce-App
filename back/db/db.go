package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		panic(".env file could not be loaded")
	}

	password := os.Getenv("SQL_PASSWORD")
	name := os.Getenv("SQL_DATABASE_NAME")
	hostName := os.Getenv("SQL_HOST_NAME")
	port := os.Getenv("SQL_PORT")

	DB, err = sql.Open("mysql", fmt.Sprintf("root:%s@tcp(%s:%s)/%s", password, hostName, port, name))
	if err != nil {
		panic("could not connect to database.")
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)
}
