const Post = require("./../../../models/Post");

module.exports.getPostsList = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        if (!post) {
            res.status(400).json({error: "Post not found"});
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.createPost = async (req, res) => {
    try {
        const {tag_id, title, content, short_description, is_private} = req.body;

        if (!tag_id || !title || !content || !short_description || is_private === undefined) {
            return res.status(400).json({error: "Bad Request: Missing required fields!"});
        }

        const post = await Post.create({
            tag_id,
            title,
            content,
            short_description,
            is_private,
        });

        return res.status(201).json(post);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


module.exports.updatePost = async (req, res) => {
    try {
        const {tag_id, title, content, short_description, is_private} = req.body;
        const postId = req.params.id;

        let post = Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({error: "Not found: Missing post!"});
        }

        // if (!postId) {
        //     return res.status(404).json({error: "Not found: Missing post_id!"});
        // }

        if (!tag_id || !title || !content || !short_description || !is_private) {
            return res.status(400).json({error: "Bad Request: Missing required fields!"});
        }

        post.tag_id = tag_id;
        post.title = title;
        post.content = content;
        post.short_description = short_description;
        post.is_private = is_private;

        await post.save();

        // const [updated] = await Post.update({
        //     tag_id,
        //     title,
        //     content,
        //     short_description,
        //     is_private,
        // }, {
        //     where: {id: postId}
        // });
        // if (!updated) {
        //     res.status(404).json({error: "Post Not Found!",});
        // }

        // const updatedPost = await Post.findByPk(postId)
        // return res.status(201).json(updatedPost);
        return res.status(201).json(post);

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({error: "Post not found"});
        }

        await post.destroy();

        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

