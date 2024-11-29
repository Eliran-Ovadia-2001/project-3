import express, { Request, Response } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';



const app = express();
app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage });
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_manegment',
});

interface RegisterRequestBody {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
    id: number;
}

app.post('/vecations', upload.single('imagePath'), async (req: Request, res: Response) => {
    const { destination, description, startDate, endDate, price} = req.body;
    const query = 'INSERT INTO vecations (destination, description, startDate, endDate, price, imagePath) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [destination, description, startDate, endDate, price, req.file.path], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add vecation.' });
        }
        res.status(201).json({ destination, description, startDate, endDate, price});
    });
});


app.get('/GetAllVecations', async (req: Request, res: Response) => {
    try {
        db.query('SELECT * FROM vecations', (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.patch('/vecations/:id', upload.single('imagePath'), (req: Request, res: Response) => {
    const { destination, description, startDate, endDate, price } = req.body;
    const { id } = req.params;
    let imagePath = req.file ? req.file.path : null;

    if (!imagePath && req.body.imagePath) {
        imagePath = req.body.imagePath;
    }

    const query = `
      UPDATE vecations
      SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imagePath = ?
      WHERE id = ?`;

    db.query(query, [destination, description, startDate, endDate, price, imagePath, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update vecation' });
        }
        res.status(200).json({
            id,
            destination,
            description,
            startDate,
            endDate,
            price,
            imagePath
        });
    });
});


app.delete('/vecations/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const checkQuery = 'SELECT * FROM vecations WHERE id = ?';
    db.query(checkQuery, [id], (checkErr, checkResult) => {
        if (checkErr) {
            return res.status(500).json({ error: 'Error checking vecation existence' });
        }
        if (checkResult.length === 0) {
            return res.status(404).json({ error: 'Vecation not found' });
        }

        const deleteQuery = 'DELETE FROM vecations WHERE id = ?';
        db.query(deleteQuery, [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
                return res.status(500).json({ error: 'Failed to delete vecation' });
            }
            res.status(200).json({ message: 'Vecation deleted successfully' });
        });
    });
});
  


app.post('/register', (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { name, lastName, email, password } = req.body;

    const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailSql, [email], (err, result) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json('Error checking email');
        }
        if (result.length > 0) {
            return res.status(400).json('Email already in use');
        }
        const sql = 'INSERT INTO users (`name`, `lastname`, `email`, `password`) VALUES (?)';
        const values = [name, lastName, email, password];
        db.query(sql, [values], (err, data) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json('Error inserting user');
            }
            return res.status(200).json(data);
        });
    });
});


app.post('/login', (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const sql = 'SELECT * FROM users WHERE `email` = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json('Error');
        }

        if (data.length > 0) {
            const user = data[0];
            if (req.body.password === user.password) {
                return res.json({
                    statusCode: 200,
                    name: `${user.name} ${user.lastname}`,
                    is_admin: user.is_admin,
                    user_id: user.id, 
                });
            } else {
                return res.json({ statusCode: 401, message: 'Invalid credentials' });
            }
        } else {
            return res.json({ statusCode: 404, message: 'No Account Found' });
        }
    });
});


  app.post('/like-vecation', (req, res) => {
    const { user_id, vecation_id } = req.body;

    const query = 'INSERT INTO followers (user_id, vecation_id) VALUES (?, ?)';


    db.query(query, [user_id, vecation_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error liking vecation' });
        }
        res.status(200).json({ message: 'Vecation liked successfully' });
    });
});

app.delete('/like-vecation', (req, res) => {
    const { user_id, vecation_id } = req.body;
  
    const query = 'DELETE FROM followers WHERE user_id = ? AND vecation_id = ?';
  
    db.query(query, [user_id, vecation_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error unliking vecation' });
      }
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Vecation unliked successfully' });
      } else {
        res.status(404).json({ message: 'Like not found' });
      }
    });
  });
  


app.listen(3000, () => {
    console.log('Listening on port 3000');
});
