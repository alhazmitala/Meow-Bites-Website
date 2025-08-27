//--------------------------------------------------------------------
//  app.js ─ Express + EJS + Sequelize + JWT
//--------------------------------------------------------------------
require('dotenv').config();

const path    = require('path');
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const layouts = require('express-ejs-layouts');

const { connectToDB, sequelize } = require('./src/config/db');
const models                      = require('./src/models');             // registers models
const auth                        = require('./src/middleware/auth');    // JWT-guard

// ────────────────────────────────────────────────────────────────────
//  Routers (API)
// ────────────────────────────────────────────────────────────────────
const productRouter = require('./src/routes/productRoutes');
const userRouter    = require('./src/routes/userRoutes');
const feedbackRouter = require('./src/routes/feedbackRoutes');   // ← build next
const supportRouter  = require('./src/routes/supportRoutes');    // ← build next

// ────────────────────────────────────────────────────────────────────
//  Initialise Express
// ────────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3000;

// ────────────────────────────────────────────────────────────────────
//  Global middleware
// ────────────────────────────────────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static files → /css/, /js/, /images/…
app.use(express.static(path.join(__dirname, 'src', 'public')));

// ────────────────────────────────────────────────────────────────────
//  View engine (EJS + express-ejs-layouts)
// ────────────────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(layouts);
app.set('layout', 'layouts/main');

// ────────────────────────────────────────────────────────────────────
//  API routes
// ────────────────────────────────────────────────────────────────────
app.use('/api/products', productRouter);
app.use('/api/users',    userRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/support',  supportRouter);

// ────────────────────────────────────────────────────────────────────
//  Page routes  (render locals → title / extraJS / extraCSS)
// ────────────────────────────────────────────────────────────────────
app.get('/', (_ , res) =>
  res.render('pages/Homepage', {
    title  : 'Meow Bites – Home',
    extraJS: '/js/home.js'
  })
);

app.get('/products', (_ , res) =>
  res.render('pages/products', {
    title   : 'Products',
    extraJS : '/js/plans.js',
    extraCSS: '/css/products.css'
  })
);

app.get('/new-product', (_ , res) =>
  res.render('pages/new-product', {
    title   : 'Add Product',
    extraJS : '/js/data.js',
    extraCSS: '/css/products.css'
  })
);

app.get('/add-user', (_ , res) =>
  res.render('pages/add-user', { title: 'Add User' })
);

app.get('/contact-us', (_ , res) =>
  res.render('pages/contact-us', {
    title  : 'Contact Us',
    extraJS: '/js/feedback.js'
  })
);

app.get('/support', (_ , res) =>
  res.render('pages/support', { title: 'Support' })
);

// Protected profile page
app.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.user.id);
    res.render('pages/profile', { title: 'Profile', user });
  } catch (err) { next(err); }
});

// ────────────────────────────────────────────────────────────────────
//  Error handling
// ────────────────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).render('pages/500', { title: 'Server Error' }); // create pages/500.ejs
});

// 404 fallback
app.use((_req, res) =>
  res.status(404).render('pages/404', { title: 'Not Found' })     // create pages/404.ejs
);

// ────────────────────────────────────────────────────────────────────
//  Start server  (after DB handshake & optional table sync)
// ────────────────────────────────────────────────────────────────────
(async () => {
  try {
    await connectToDB();

    // During active dev you can flip alter:true; set to false for safety.
    await sequelize.sync({ alter: true });

    app.listen(PORT, () =>
      console.log(`🚀  Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
})();
