const Task = require('../models/task');

module.exports.get = async (req, res) => {
    try {
        let limit = 10
        let skip = 0
        let where = { created_by: req.user.userId }
        if(req.query.q) where['title'] = { $regex: new RegExp(req.query.q, 'i') }
        if(req.query.page) skip = Number(req.query.page) * limit

        const tasks = await Task.find(where)
                                .sort({ created_at: -1 })
                                .skip(skip)
                                .limit(limit);

        const count = await Task.countDocuments(where)

        res.send({ tasks, pages: Math.ceil(count/limit) });
    } catch (error) {
        res.status(500).json({ error: 'Error getting tasks' });
    }
}

module.exports.create = async (req, res) => {
    try {
        req.body.created_by = req.user.userId
        const task = new Task(req.body);
        await task.save();
        res.send({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
}

module.exports.update = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id });
        if(!task) return res.status(404).json({ error: 'Task not found' });

        await Task.findOneAndUpdate({ _id: req.params.id }, req.body)

        res.send({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
}

module.exports.delete = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id })

        res.send({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
}