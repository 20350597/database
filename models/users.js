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
    getByUsername: `
    SELECT
    *
    FROM
        Users
    WHERE
        username = ?
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
        updateRow: `
        Pendiente
        `,
        deleteRow:`
        Update
            Users
        SET
            is_active=0
        Where
            id = ?
        `,
}

module.exports = usersModel