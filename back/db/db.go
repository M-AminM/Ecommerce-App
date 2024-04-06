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

	sqlPass := os.Getenv("SQL_PASSWORD")
	sqlName := os.Getenv("SQL_DATABASE_NAME")

	DB, err = sql.Open("mysql", fmt.Sprintf("root:%s@tcp(localhost:3306)/%s", sqlPass, sqlName))
	if err != nil {
		panic("could not connect to database.")
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)
}
