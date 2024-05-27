import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//Set EJS as templating engine
app.set('view engine', 'ejs');
let posts = [];
const post = '';
const postId = '';

// Routes
app.get('/', (req, res) => {
    res.render('pages/index', { posts: posts });
});

app.get('/create', (req, res) => {
    res.render('pages/create');
});

app.post('/create', (req, res) => {
    post = {
        id: posts.length, //assigning unique id for each post
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    postId = req.params.id;
    post = posts.find(post => post.id === parseInt(postId));
    res.render('pages/post', { post: post });
});

//to edit the blog post
app.get('/edit/:id', (req, res) => {
    postId = req.params.id;
    post = posts.find(post => post.id === parseInt(postId));
    res.render('pages/edit', { post: post });
});

app.post('/edit/:id', (req, res) => {
    postId = req.params.id;
    const updatedPost = {
        id: parseInt(postId),
        title: req.body.title,
        content: req.body.content
    };
    posts[postId] = updatedPost;
    res.redirect('/');
});

//delete post
app.get('/delete/:id', (req, res) => {
    postId = req.params.id;
    const post = posts.find(post => post.id === parseInt(postId));
    res.render('pages/delete', { post: post });
});

app.post('/delete/:id', (req, res) => {
    postId = req.params.id;
    posts = posts.filter(post => post.id !== parseInt(postId));
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
