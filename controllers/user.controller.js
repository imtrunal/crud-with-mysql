const mysql = require("mysql");
require("dotenv").config();

/* --- Connection Pool --- */
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_NAME,
});

/* ----- Add Users Data ----- */
exports.insertUser = (req, res) => {
    try {

        const params = req.body;

        /* -- Connect to DB -- */
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connected!

            // user the connection
            connection.query("INSERT INTO umsData SET ?", params, (err, rows) => {
                //when done with the connection, release it
                connection.release();

                if (!err) {

                    res.status(201).json({
                        message: "USER INSERTED SUCCESSFULLY",
                        status: 201
                    })

                } else {

                    res.status(500).json({
                        message: "DATABASE QUERY ERROR",
                        status: 500
                    })

                }
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
/* ----- End Of Add Users API ----- */


/* ----- Update Users Data ----- */
exports.updateUser = (req, res) => {
    try {

        const { username, email, number, password } = req.body;

        /* -- Connect to DB -- */
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connected!

            // user the connection
            connection.query(
                "UPDATE umsData SET username = ?, email = ?, number = ?, password = ? WHERE id = ?",
                [username, email, number, password, req.params.id],
                (err, rows) => {
                    //when done with the connection, release it
                    connection.release();

                    if (!err) {

                        res.status(200).json({
                            message: "USER UPDATED SUCCESSFULLY",
                            status: 200
                        })

                    } else {

                        res.status(500).json({
                            message: "DATABASE QUERY ERROR",
                            status: 500
                        })

                    }
                }
            );
        });
    } catch (error) {
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
/* ----- End Of Update Users API ----- */


/* ----- View Users Data ----- */
exports.viewData = async (req, res) => {
    try {

        /* -- Connect to DB -- */
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connected!

            // user the connection
            connection.query(
                "SELECT * FROM umsData",
                (err, rows) => {
                    //when done with the connection, release it
                    connection.release();

                    if (!err) {

                        res.status(200).json({
                            message: "GET ALL USERS LIST SHOW SUCCESSFULLY",
                            status: 200,
                            data: rows
                        })

                    } else {

                        res.status(500).json({
                            message: "DATABASE QUERY ERROR",
                            status: 500
                        })

                    }
                }
            );
        });

    } catch (error) {
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
/* ----- End Of View Users API ----- */


/* ----- View Users Data By Id ----- */
exports.viewUserDetails = async (req, res) => {
    try {

        /* -- Connect to DB -- */
        pool.getConnection((err, connection) => {
            if (err) throw err; //not connected!

            // user the connection
            connection.query(
                "SELECT * FROM umsData WHERE id = ?", [req.params.id],
                (err, rows) => {
                    //when done with the connection, release it
                    connection.release();

                    if (!err) {

                        res.status(200).json({
                            message: "GET USER PROFILE SUCCESSFULLY",
                            status: 200,
                            data: rows
                        })

                    } else {

                        res.status(500).json({
                            message: "DATABASE QUERY ERROR",
                            status: 500
                        })

                    }
                }
            );
        });

    } catch (error) {
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};
/* ----- End Of View Users Data By Id API ----- */


/* ----- Delete Users ----- */
exports.deleteUser = (req, res) => {
    /* -- Connect to DB -- */
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected!

        // user the connection
        connection.query(
            "DELETE FROM umsData WHERE id = ?",
            [req.params.id],
            (err, rows) => {
                //when done with the connection, release it
                connection.release();

                if (!err) {

                    res.status(200).json({
                        message: "USER DELETED SUCCESSFULLY",
                        status: 200
                    })

                } else {

                    res.status(500).json({
                        message: "DATABASE QUERY ERROR",
                        status: 500
                    })

                }
            }
        );
    });
};