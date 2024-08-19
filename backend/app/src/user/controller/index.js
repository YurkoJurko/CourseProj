const User = require("./../../../models/User");

module.exports.getUsersList = async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.getUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if(!user){
            res.status(400).json({error: "User not found"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.createUser = async (req, res) => {
    try {
        const { email, nickname, password, role_id, created_at, allowed_notifications } = req.body;

        if (!email || !nickname || !password ) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const user = await User.create({
            email,
            nickname,
            password,
            role_id,
            created_at,
            allowed_notifications,
        });

        return res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.updateUser = async (req, res) => {
    try{
        const {email, nickname, password, role_id, created_at, allowed_notifications} = req.body;
        const userId = req.params.id;

        if (!userId || !email || !nickname || !password || !role_id || !allowed_notifications) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const [updated] = await User.update({
            email,
            nickname,
            password,
            role_id,
            allowed_notifications,
        },{
            where: {id:userId}
        });
        if(!updated){
            res.status(400).json({error: "User Not Found!",});
        }

        const updatedUser = await User.findByPk(userId)
        return res.status(201).json(updatedUser);

    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await User.destroy({
            where: { id: userId }
        });

        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

