const Task = require('../models/Task');

exports.createTask = async (req, res) => {
   try {
    const { title, description, dueDate } = req.body;  // include dueDate and description
    const task = await Task.create({ 
      title, 
      description, 
      dueDate, 
      user: req.user._id 
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create task', error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { completed, search, dueBefore, dueAfter } = req.query;

    let filter = { user: req.user._id };

    // Filter by completion status
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }

    // Search in title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by due date range
    if (dueBefore || dueAfter) {
      filter.dueDate = {};
      if (dueBefore) filter.dueDate.$lte = new Date(dueBefore);
      if (dueAfter) filter.dueDate.$gte = new Date(dueAfter);
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch tasks', error: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update task', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    res.status(200).json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete task', error: err.message });
  }

}


exports.markTaskCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task.completed = true;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to mark as completed', error: err.message });
  }
};


