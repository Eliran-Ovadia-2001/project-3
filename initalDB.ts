import runQuery from "./dal"


const createTables = async () => {
    let Q = `
            CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin TINYINT(1) NOT NULL DEFAULT 0
)
    `
    // await runQuery(Q);

    Q = `
        CREATE TABLE vecations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(255),
    description TEXT,
    startDate DATE,
    endDate DATE,
    price DECIMAL(10, 2),
    imagePath VARCHAR(255),
);
    `
    // await runQuery(Q)


    Q = `
        CREATE TABLE followers (
            user_id INT,
            vecation_id INT,
            PRIMARY KEY (user_id, vecation_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (vecation_id) REFERENCES vecations(id) ON DELETE CASCADE
        )
    `
    await runQuery(Q)
}

// createTables().then(() => {
//     console.log("Done creating tables");
// })

// createSampleData().then(()=>{console.log("Done adding data");})