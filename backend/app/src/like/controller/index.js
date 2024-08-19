const Post = require("./../../../models/Post");

module.exports.getLikesList = async (req, res) => {
    try{
        const posts = await Post.findAll();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.getLike = async (req, res) => {
    try{
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        if(!post){
            res.status(400).json({error: "Post not found"});
        }
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.createLike = async (req, res) => {
    try {
        const { tag_id, title, content, short_description, is_private } = req.body;

        if (!tag_id || !title || !content || !short_description || is_private === undefined) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
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
        res.status(500).json({ error: err.message });
    }
};


module.exports.updatePost = async (req, res) => {
    try{
        const {tag_id, title, content, short_description, is_private} = req.body;
        const postId = req.params.id;

        if (!postId || !tag_id || !title || !content || !short_description || !is_private) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const [updated] = await Post.update({
            tag_id,
            title,
            content,
            short_description,
            is_private,
        },{
            where: {id:postId}
        });
        if(!updated){
            res.status(400).json({error: "Post Not Found!",});
        }

        const updatedPost = await Post.findByPk(postId)
        return res.status(201).json(updatedPost);

    }catch(err){
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
            return res.status(404).json({ error: "Post not found" });
        }

        await Post.destroy({
            where: { id: postId }
        });

        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

