const Comment = require("./../../../models/Comment");

module.exports.getCommentsList = async (req, res) => {
    try{
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.getComment = async (req, res) => {
    try{
        const commentId = req.params.id;
        const comment = await Comment.findByPk(commentId);

        if(!comment){
            res.status(400).json({error: "Comment not found"});
        }
        res.status(200).json(comment);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.createComment = async (req, res) => {
    try {
        const { parent_id, user_id, post_id, content, like_count } = req.body;

        if (!user_id || !post_id || !content || !like_count) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const comment = await Comment.create({
            user_id,
            post_id,
            content,
            like_count,
            parent_id: parent_id || null,
        });

        return res.status(201).json(comment);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.updateComment = async (req, res) => {
    try{
        const { parent_id, user_id, post_id, content, like_count, created_at } = req.body;
        const commentId = req.params.id;

        if (!commentId || !user_id || !post_id || !content || !like_count || !created_at) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const [updated] = await Comment.update({
            user_id,
            post_id,
            content,
            like_count,
            created_at,
        },{
            where: {id:commentId}
        });
        if(!updated){
            res.status(400).json({error: "Comment Not Found!",});
        }

        const updatedComment = await Comment.findByPk(commentId)
        return res.status(201).json(updatedComment);

    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        await Comment.destroy({
            where: { id: commentId }
        });

        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

