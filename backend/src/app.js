import cors from 'cors';
import express from 'express';
import { userRoutes } from './routes/user.routes.js';
import { taskRoutes } from './routes/task.routes.js';

//cors and middlewares
const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/task', taskRoutes);
app.get('/',(req ,res )=>{
    res.send('Task Management Web Application Server');
})

export default app;