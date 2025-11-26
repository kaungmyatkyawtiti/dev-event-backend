import * as events from "../controllers/eventController.ts"
import express from "express";
import { upload } from '../utils/multer.ts';

const router = express.Router();

router.get("/", events.getAllEventsHandler);
router.get("/:slug", events.getEventBySlugHandler);
router.get("/:slug/similar", events.getSimilarEventHandler);
router.post('/', upload.single('image'), events.saveEventHandler);

export default router;
