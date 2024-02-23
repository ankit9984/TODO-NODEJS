import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.js'

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(`mongodb://localhost:27017/mydatabase`)


app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})