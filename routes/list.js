const router = require ("express").Router();
const User = require("../models/user");
const List = require("../models/list");
//create
router.post("/addTask", async(req,res) => {
    try {
        const{title, body, id} = req.body;
        const existingUser = await User.findById(id);
        if (existingUser){
            const list = new List({title, body, user: existingUser._id});
            await list.save();
            res.status(200).json({list});
            existingUser.list.push(list);
            await existingUser.save();
        };
    } catch (error) {
        console.log(error)
    }
});
//update
router.put("/updateTask/:id", async(req,res) => {
    try {
        const{title, body} = req.body;
        const list = await List.findByIdAndUpdate(req.params.id,
           { title, body }, { new: true } );
        list.save
        res.status(200).json({ message: "Task Updated" });
    } catch (error) {
        console.log(error)
    }
});
//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const userId = req.body.id;
    const taskId = req.params.id;

    await User.findByIdAndUpdate(userId, { $pull: { list: taskId } });
    await List.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting task" });
  }
});
//getTask
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

    if (list.length !== 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "No Tasks" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});
module.exports = router;