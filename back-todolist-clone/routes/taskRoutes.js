import express from 'express';
import Task from '../models/todo.js';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks)
        // res.status(201).json({tasks, message: 'Everthing is ok'})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.post('/post', async(req, res) => {
    const {title} = req.body;

    try {
        if(!title){
            return res.status(400).json({error: 'Title is required'})
        }

        const task = new Task({title});
        await task.save();
        res.status(201).json(task)

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

router.delete('/delete/:id',async (req, res) => {
    const {id} = req.params;

    try {
        const deleteTask = await Task.findByIdAndDelete(id);

        if(!deleteTask){
            return res.status(404).json({error: 'Task is not found'})
        }

        res.json({message: 'Task deleted successfully'})
    } catch (error) {
        console.log(error);
        res.send(500).json({error: 'Internal Server Error'})
    }
});

router.put('/updates/:id', async(req, res) => {
    const {id} = req.params;
    const {title} = req.body;

    try{
        const updateTask = await Task.findByIdAndUpdate(id, {title}, {new: true})

        if(!updateTask){
            return res.status(400).json({error: 'Task not found'})
        }

        res.json(updateTask)
    }catch(error){
        console.log(error)
        res.send(500).json({error: 'Internal Server Error'})
    }
});

export default router;