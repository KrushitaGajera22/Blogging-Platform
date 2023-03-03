const Blogs = require('../models/blog');

//for searching title of blog
exports.search = async (req, res) => {
    try {
        const search = req.body.search;
        const title_data = await Blogs.find({
            "Title": {
                $regex: search
            }
        });
        if (title_data.length > 0) {
            res.status(200).send({
                data: title_data
            })
        }
        else {
            res.status(400).send({
                msg: "Not found"
            })
        }
    } catch (error) {
        res.status(400).send({
            msg: error.message
        })
    }
}
