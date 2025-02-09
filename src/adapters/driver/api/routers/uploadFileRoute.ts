
import { Router } from 'express';
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { UploadController } from '../controller/UploadController';
import { IUploadService } from '../../../../core/applications/ports/services/IUploadService';
import { UploadService } from '../../../../core/applications/services/UploadService';
import { AppDataSource } from '../../../../data-source';
import { UploadRepository } from '../repository/UploadRepository';

const uploadRepository = new UploadRepository(AppDataSource);
const uploadService: IUploadService = new UploadService(uploadRepository);
const uploadController = new UploadController(uploadService);

// Configuração do armazenamento com multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/'); // Pasta onde os arquivos serão armazenados
    },
    filename: (req: any, file: any, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com timestamp
    }
  });
  
  // Filtrando os tipos de arquivo
  const fileFilter = (req: any, file: any, cb: any) => {
    const filetypes = /jpeg|jpg|png|gif|pdf|txt/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Erro: Arquivo não permitido!');
    }
  };
  

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });

  const router = Router();
  

//   router.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).send('Nenhum arquivo foi enviado.');
//     }
//     res.status(200).send({
//       message: 'Arquivo enviado com sucesso!',
//       file: req.file
//     });
//   });

router.post('/upload', async (req, res) => {
    try {
      const result = await uploadController.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  
export default router;