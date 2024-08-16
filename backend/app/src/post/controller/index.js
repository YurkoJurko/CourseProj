const Post = require("./../../../models/Post");

module.exports.getPostList = async (req, res) => {
    try{
        const posts = await Post.findAll();
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports.getPost = async (req, res) => {
    try{
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            res.status(404).json({
                error: "Post not found"
            })
        }
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports.createPost = async (req, res) => {
    try{

        const {
            title, content, short_description, tag_id, is_private
        } = req.body;

        if(!(title || content || short_description || tag_id)){
            res.status(400).json({
                error: "Bad Request",
            })
        }

        const post = await Post.create({
            title,
            content,
            short_description,
            tag_id,
            is_private,
        });

        res.status(201).json(post);

    }
    catch(err){
        res.status(500).json({
            error: err.message
        });
    }
}