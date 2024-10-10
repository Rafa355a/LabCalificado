import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';
import resenasRoutes from './routes/resenas.routes.js';
import favoritosRoutes from './routes/favoritos.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

const hbs = engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: {
        isFavorite: (productId, favorites) => {
            return favorites.some(f => f.id === productId);
        }
    }
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        const [reviews] = await pool.query('SELECT * FROM reviews');
        const [products] = await pool.query('SELECT * FROM products');
        const [favorites] = await pool.query('SELECT product_id FROM favorites');

        res.render('home', { reviews, products, favorites });
    } catch (error) {
        console.error('Error al obtener reseñas, productos o favoritos:', error);
        res.status(500).send('Error del servidor');
    }
});

app.use('/resenas', resenasRoutes);
app.use('/favoritos', favoritosRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
