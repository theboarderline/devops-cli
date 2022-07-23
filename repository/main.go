package repository

import (
	"errors"
	"fmt"
	"os"
)

// CreateDir takes a path string and creates the directory path
func CreateDir(p string) (string, error) {
	err := os.MkdirAll(p, 0755)
	if err != nil {
		return "", errors.New(fmt.Sprintf("Cannot create  directory at %s", p))
	}
	return p, nil
}
