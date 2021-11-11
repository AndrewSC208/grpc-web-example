package migrations

import (
	"github.com/jinzhu/gorm"
	"github.com/pkg/errors"
)

// addUserMigration_0001 add a step to the migration phase to create the tables
// in the db that are needed for this service
var addUserMigration0001 = &Migration{
	Number: 1,
	Name:   "Add user",
	Forwards: func(db *gorm.DB) error {
		const addUserSQL = `
			CREATE TABLE users(
 				id serial PRIMARY KEY,
 				email text UNIQUE NOT NULL,
				hashed_password byte NOT NULL,
 				created_at TIMESTAMP NOT NULL,
 				updated_at TIMESTAMP NOT NULL,
 				deleted_at TIMESTAMP
			);
		`

		err := db.Exec(addUserSQL).Error
		return errors.Wrap(err, "unable to create users table")
	},
}

// init is called before main so this migration step is added to the slice
// of migrations that need to be complete for the db to be setup correctly
func init() {
	Migrations = append(Migrations, addUserMigration0001)
}
