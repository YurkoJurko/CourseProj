const Like = require("./../../../models/Like");

module.exports.getLikesList = async (req, res) => {
    try {
        const likes = await Like.findAll();
        res.status(200).json(likes);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.getLike = async (req, res) => {
    try {
        const likeId = req.params.id;
        const like = await Like.findByPk(likeId);

        if (!like) {
            res.status(400).json({error: "Like not found"});
        }
        res.status(200).json(like);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.createLike = async (req, res) => {
    try {
        const {user_id, post_id} = req.body;

        if (!user_id || !post_id) {
            return res.status(400).json({error: "Bad Request: Missing required fields!"});
        }

        const like = await Like.create({
            user_id,
            post_id,
        });

        return res.status(201).json(like);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


module.exports.updateLike = async (req, res) => {
    try {
        const {user_id, post_id} = req.body;
        const likeId = req.params.id;

        if (!likeId || !user_id || !post_id) {
            return res.status(400).json({error: "Bad Request: Missing required fields!"});
        }

        const [updated] = await Like.update({
            user_id,
            post_id,
        }, {
            where: {id: likeId}
        });
        if (!updated) {
            res.status(400).json({error: "Like Not Found!",});
        }

        const updatedLike = await Like.findByPk(likeId)
        return res.status(201).json(updatedLike);

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}

module.exports.deleteLike = async (req, res) => {
    try {
        const likeId = req.params.id;
        const like = await Like.findByPk(likeId);
        if (!like) {
            return res.status(404).json({error: "Like not found"});
        }

        await Like.destroy({
            where: {id: likeId}
        });

        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

