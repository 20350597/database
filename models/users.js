const usersModel = {
    getAll: `
        SELECT 
            *
        FROM
            Users    
    `,
    getByID:`
    SELECT
         *
    FROM
         USERS
    WHERE
         id = ?
    `,
    getByEmail:`
    SELECT
         *
    FROM
         USERS
    WHERE
         email = ?
    `,
    addRow:`
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
        ) VALUES (
            ?,?,?,?,?,?,?,?
        )
        `,
}

module.exports = usersModel