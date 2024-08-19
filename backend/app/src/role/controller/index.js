const Role = require("./../../../models/Role");

module.exports.getRolesList = async (req, res) => {
    try{
        const roles = await Role.findAll();
        res.status(200).json(roles);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.getRole = async (req, res) => {
    try{
        const roleId = req.params.id;
        const role = await Role.findByPk(roleId);

        if(!role){
            res.status(400).json({error: "Role not found"});
        }
        res.status(200).json(role);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.createRole = async (req, res) => {
    try {
        const { name, created_at} = req.body;

        if (!name || !created_at) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const role = await Role.create({
            name,
            created_at,
        });

        return res.status(201).json(role);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.updateRole = async (req, res) => {
    try{
        const { name, created_at} = req.body;
        const roleId = req.params.id;

        if (!roleId || !name || !created_at) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const [updated] = await Role.update({
            name,
            created_at,
        },{
            where: {id:roleId}
        });
        if(!updated){
            res.status(400).json({error: "Role Not Found!",});
        }

        const updatedRole = await Role.findByPk(roleId)
        return res.status(201).json(updatedRole);

    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
}

module.exports.deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ error: "Role not found" });
        }

        await Role.destroy({
            where: { id: roleId }
        });

        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

