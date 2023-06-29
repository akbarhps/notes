const express = require('express');
const service = require('./service.js');

const apiRouter = express.Router();

apiRouter.get('/posts', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 15;
        const posts = await service.getPosts(page, limit)
        res.status(200).json({
            'code': 200,
            'status': 'ok',
            'data': posts
        });
    } catch (err) {
        next(err);
    }
});

apiRouter.post('/posts', async (req, res, next) => {
    try {
        const post = await service.createPost(req.body);
        res.status(201).json({
            'code': 201,
            'status': 'ok',
            'message': 'Post created successfully',
            'data': post
        });
    } catch (err) {
        next(err);
    }
});

apiRouter.get('/posts/:id', async (req, res, next) => {
    try {
        const post = await service.getPostById(req.params.id);
        res.status(200).json({
            'code': 200,
            'status': 'ok',
            'data': post
        });
    } catch (err) {
        next(err)
    }
});

apiRouter.put('/posts/:id', async (req, res, next) => {
    try {
        const post = await service.updatePost(req.params.id, req.body);
        res.status(200).json({
            'code': 200,
            'status': 'ok',
            'message': 'Post updated successfully',
            'data': post
        });
    } catch (err) {
        next(err);
    }
});

apiRouter.put('/posts/:id/pin', async (req, res, next) => {
    try {
        const post = await service.togglePostPin(req.params.id);
        res.status(200).json({
            'code': 200,
            'status': 'ok',
            'message': 'Post pinned successfully',
            'data': post
        });
    } catch (err) {
        next(err);
    }
});

apiRouter.delete('/posts/:id', async (req, res, next) => {
    try {
        await service.deletePost(req.params.id);
        res.status(200).json({
            'code': 200,
            'status': 'ok',
            'message': 'Post deleted successfully',
        });
    } catch (err) {
        next(err);
    }
});

module.exports = apiRouter;