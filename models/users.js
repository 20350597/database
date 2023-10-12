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
}

module.exports = usersModel