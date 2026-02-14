import mysql from "mysql2"

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rudee",
    database: "kmitl_net"
})

export default db
