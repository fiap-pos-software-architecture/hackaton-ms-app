import { Router } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../../../data-source";
import { AuthRepository } from "../repository/AuthRepository";
import { IAuthService } from "../../../../core/applications/ports/services/IAuthService";
import { VideoController } from "../controller/VideoController";
import { AuthService } from "../../../../core/applications/services/AuthService";
import { VideoRepository } from "../repository/VideoRepository";
import { VideoService } from "../../../../core/applications/services/VideoService";
import { IVideoService } from "../../../../core/applications/ports/services/IVideoService";

const videoRepository = new VideoRepository(AppDataSource);
const videoService: IVideoService = new VideoService(videoRepository);
const videoController = new VideoController(videoService);

const router = Router();

router.post("/extract-frames", async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No video file uploaded" });
  const videoPath = req.file.path;
  const interval = Number(req.body.interval) || 20
  try {
    const result = await videoController.extractFrames(req.body);
    res.status(201).json(result);

    const frames = await videoController.extractFrames({videoPath, interval});
    res.json({ message: "Frames extracted successfully", frames });
  } catch (error) {
    res.status(500).json({ message: 'Error extracting frames' });
  }
});

export default router;