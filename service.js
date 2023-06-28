const {PrismaClient} = require('@prisma/client');
const uuid = require('uuid');
const prisma = new PrismaClient();

async function getPosts(page = 0, limit = 15) {
    const offset = page * limit;
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        skip: offset,
        take: limit,
    });
    return posts || [];
}

async function getPostById(id) {
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    });

    if (!post) {
        const error = new Error('Post not found');
        error.status = 404;
        throw error;
    }

    return post;
}

async function createPost(post) {
    return prisma.post.create({
        data: {
            id: uuid.v4(),
            title: post.title,
            content: post.content,
        }
    });
}

async function updatePost(id, post) {
    const existingPost = await getPostById(id);
    if (!existingPost) {
        const error = new Error('Post not found');
        error.status = 404;
        throw error;
    }

    return prisma.post.update({
        where: {
            id: existingPost.id
        },
        data: {
            title: post.title,
            content: post.content
        }
    });
}

async function deletePost(id) {
    const existingPost = await getPostById(id);
    if (!existingPost) {
        const error = new Error('Post not found');
        error.status = 404;
        throw error;
    }

    return prisma.post.delete({
        where: {
            id: existingPost.id
        }
    });
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}