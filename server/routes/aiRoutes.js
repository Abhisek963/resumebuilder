import express from "express";
import protect from '../middleware/authMiddleware.js';
<<<<<<< HEAD
import { enhanceProSummary, enhanceJobDescription, uploadResume, enhanceCVSection } from "../controllers/aiController.js";
=======
import { enhanceProSummary, enhanceJobDescription, uploadResume } from "../controllers/aiController.js";
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b


const aiRouter = express.Router();


aiRouter.post('/enhance-pro-summary',protect, enhanceProSummary);
aiRouter.post('/enhance-job-description',protect, enhanceJobDescription);
aiRouter.post('/upload-resume',protect, uploadResume);
<<<<<<< HEAD
aiRouter.post('/enhance-cv-section', protect, enhanceCVSection);
=======
>>>>>>> e6dbd835ca97e36f3e0ad50a24fbe477fb4d783b


export default aiRouter;