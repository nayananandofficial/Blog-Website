import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');
let posts = [];
let nextId = 0; // Keep track of the next ID

// Routes
app.get('/', (req, res) => {
    res.render('pages/index', { posts: posts });
});

app.get('/create', (req, res) => {
    res.render('pages/create');
});

app.post('/create', (req, res) => {
    const post = {
        id: nextId++, //assigning unique id for each post
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (post) {
        res.render('pages/post', { post: post });
    } else {
        res.status(404).render('pages/notfound', { message: 'Post not found' });
    }
});

// to edit the blog post
app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (post) {
        res.render('pages/edit', { post: post });
    } else {
        res.status(404).render('pages/notfound', { message: 'Post not found' });
    }
});

app.post('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
        posts[postIndex] = {
            id: postId,
            title: req.body.title,
            content: req.body.content
        };
        res.redirect('/');
    } else {
        res.status(404).render('pages/notfound', { message: 'Post not found' });
    }
});

// delete post
app.get('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);

    if (post) {
        res.render('pages/delete', { post: post });
    } else {
        res.status(404).render('pages/notfound', { message: 'Post not found' });
    }
});

app.post('/delete/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
