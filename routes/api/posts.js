// Router Initialization
const express = require('express');
const router = express.Router();

// Bring in Post Schema
const Post = require('../../models/Post');

/*
    GET Method Route to get all the posts
*/
router.get('/', (req, res, next) => {
    Post.find().then((posts) => {
        return res.json({
            success: true,
            posts: posts
        });
    }).catch((err) => {
        console.log(err);
    });
});

/* 
    POST Method to Add a Post 
*/
router.post('/add', (req, res, next) => {

    let title = req.body.title;
    let body = req.body.body;
    let author = req.body.author;

    // Validation
    if (title === undefined || body === undefined || author === undefined) {
        return res.json({
            success: false,
            message: 'Please fill in all fields'
        });
    } else {
        // Create a new Post Instance
        let newPost = new Post({
            title,
            body,
            author
        });
        // Save the created Instance
        newPost.save().then((post) => {
            return res.json({
                success: true,
                post,
                message: 'Post added to database successfully.'
            });
        }).catch((err) => {
            return res.json({
                success: false,
                message: 'Unable to save the Post.',
                err: err
            });
        });
    }
});

/*
    GET Method single post by Id
*/
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Post.findOne({
        _id: id
    }).then((post) => {
        return res.json({
            success: true,
            post: post
        });
    }).catch((err) => {
        return res.json({
            success: false,
            message: 'Unable to get the Post.',
            err: err
        });
    });
});

/*
    PUT Method to Update single Post by Id
*/

router.put('/:id', (req, res, next) => {

    let title = req.body.title;
    let body = req.body.body;
    let author = req.body.author;

    let id = req.params.id;
    Post.findOne({
        _id: id
    }).then((post) => {
        post.title = title;
        post.body = body;
        post.author = author;
        post.save()
            .then((post) => {
                return res.json({
                    success: true,
                    message: 'Post updated successfully',
                    post: post
                });
            }).catch((err) => {
                return res.json({
                    success: false,
                    message: 'Unable to update the Post.',
                    err: err
                });
            });
    }).catch((err) => {
        return res.json({
            success: false,
            message: 'Opps! something went wrong.',
            err: err
        });
    });
});

router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Post.findOneAndDelete({
        _id: id
    }).then((post) => {
        return res.json({
            success: true,
            message: 'Post deleted successfully',
            post: post
        });
    }).catch((err) => {
        return res.json({
            success: false,
            message: 'Unable to delete the Post',
            err: err
        });
    });
})


module.exports = router;