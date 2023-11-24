import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import SignupRoute from './routers/login-routes/Signup.js'
import PartnerRoute from './routers/partner/PartnerRoutes.js'
import {connectDb} from './db/config.js'
import cors from 'cors'


dotenvConfig();
connectDb()

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', SignupRoute);
app.use('/api/partner', PartnerRoute);
app.get('/health/status', (req,res)=>{
  res.status(200).json({message: "working perfectly"})
})

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
