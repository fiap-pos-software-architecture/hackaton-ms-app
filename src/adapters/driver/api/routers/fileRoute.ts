
import { Router } from 'express';
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { UploadController } from '../controller/UploadController';
import { IUploadService } from '../../../../core/applications/ports/services/IUploadService';
import { UploadService } from '../../../../core/applications/services/UploadService';
import { AppDataSource } from '../../../../data-source';
import { UploadRepository } from '../repository/UploadRepository';

const router = Router();

const fileRepository = new UploadRepository(AppDataSource);
const fileService: IUploadService = new UploadService(fileRepository);
const fileController = new UploadController(fileService);

router.post('/upload', async (req, res) => {
  try {
    const result = await fileController.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;