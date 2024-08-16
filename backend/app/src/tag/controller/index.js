const Tag = require("./../../../models/Tag");

module.exports.getTagsList = async (req, res) => {
    try{
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.getTag = async (req, res) => {
    try{
        const tagId = req.params.id;
        const tag = await Tag.findByPk(tagId);

        if(!tag){
            res.status(400).json({error: "Tag not found"});
        }
        res.status(200).json(tag);
    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
};

module.exports.createTag = async (req, res) => {
    try {
        const { name, icon_path} = req.body;

        if (!name || !icon_path) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const tag = await Tag.create({
            name,
            icon_path,
        });

        return res.status(201).json(tag);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.updateTag = async (req, res) => {
    try{
        const {name, icon_path} = req.body;
        const tagId = req.params.id;

        if (!name || !icon_path) {
            return res.status(400).json({ error: "Bad Request: Missing required fields!" });
        }

        const [updated] = await Tag.update({
            name,
            icon_path,
        },{
            where: {id:tagId}
        });
        if(!updated){
            res.status(400).json({error: "Tag Not Found!",});
        }

        const updatedTag = await Tag.findByPk(tagId)
        return res.status(201).json(updatedTag);

    }catch(err){
        res.status(500).json({
            error: err.message,
        });
    }
}

module.exports.deleteTag = async (req, res) => {
    try {
        const tagId = req.params.id;
        const tag = await Tag.findByPk(tagId);
        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }

        await Tag.destroy({
            where: { id: tagId }
        });

        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

