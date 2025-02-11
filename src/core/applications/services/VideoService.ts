import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IVideoRepository } from "../ports/repository/IVideoRepository";
import { IVideoService } from "../ports/services/IVideoService";
import { IVideo } from "../../domain/Video";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

dotenv.config();

export class VideoService implements IVideoService {
  private VideoRepository: IVideoRepository;

  constructor(productRepository: IVideoRepository) {
    this.VideoRepository = productRepository;
  }

  public async create(VideoData: Partial<IVideo>): Promise<IVideo> {
    const video = await this.VideoRepository.create(VideoData);
    return this.VideoRepository.save(video);
  }


  public async extractFrames(videoData: Partial<IVideo>): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const outputDir = path.join(__dirname, "../../infrastructure/uploads/frames");
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

      const outputPattern = path.join(outputDir, "frame-%04d.png");

      ffmpeg(videoData.videoPath)
        .outputOptions([`-vf fps=1/${videoData.interval}`]) // Extract frame every `interval` seconds
        .output(outputPattern)
        .on("end", () => {
          const frames = fs.readdirSync(outputDir).map((file) => path.join(outputDir, file));
          resolve(frames);
        })
        .on("error", (err: any) => reject(err))
        .run();
    });
  }
}
