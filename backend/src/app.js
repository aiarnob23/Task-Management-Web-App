import cors from 'cors';
import express from 'express';
import { userRoutes } from './routes/user.routes.js';


//cors and middlewares
const app = express();
app.use(express.json());
app.use(cors());


// routes
app.use('/api/v1/user', userRoutes);
app.get('/',(req ,res )=>{
    res.send('Task Management Web Application Server');
})

export default app;