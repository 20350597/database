const usersModel = {
    getAll: `
      SELECT 
        *
      FROM
        Users
    `,
    getByID: `
      SELECT
        *
      FROM
        USERS
      WHERE
        id = ?
    `,
    getByEmail: `
      SELECT
        *
      FROM
        USERS
      WHERE
        email = ?
    `,
    getByUsername: `
      SELECT
        *
      FROM
        Users
      WHERE
        username = ?
    `,
    addRow: `
      INSERT INTO
        Users (
          username,
          password,
          email,
          name, 
          lastname,
          phonenumber,
          role_id,
          is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    updateRow: `
      UPDATE Users
      SET name = ?,
          email = ?
      WHERE id = ?
    `,
    deleteRow: `
      UPDATE Users
      SET is_active = 0
      WHERE id = ?
    `,
    checkNameExists: `
      SELECT *  
      FROM Users 
      WHERE name = ? 
      AND id != ?
    `,
    checkEmailExists: `
      SELECT * 
      FROM Users 
      WHERE email = ? 
      AND id != ?
    `,
    updateUser: `
    UPDATE Users
    SET name = ?,
    email = ?,
    username = ?,
    password = ?,
    lastname = ?,
    phonenumber = ?
    WHERE id = ?
`
  };
  
  module.exports = usersModel;
  