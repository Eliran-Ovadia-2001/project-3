import mysql from "mysql2";

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_manegment',
    port: 3306
})

export default function runQuery(q: string): Promise<any[]> {
    return new Promise((resolve, reject) => {

        connection.query(q, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res as any[]);
        })
    });
}
