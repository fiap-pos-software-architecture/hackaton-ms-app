// import { IProduct } from '../../domain/Upload';
import {  IUploadRepository } from '../ports/repositories/IUploadRepository';
// import { IProductService } from '../ports/services/IProductService';
import { IUploadService } from '../ports/services/IUploadService';

export class UploadService implements IUploadService {
  private uploadRepository: IUploadRepository;

  constructor(productRepository: IUploadRepository) {
    this.uploadRepository = productRepository;
  }

  
  public async create(uploadData: Partial<any>): Promise<any> {
    const upload = await this.uploadRepository.create(uploadData);
    return this.uploadRepository.save(upload);
  }

  // public async create(productData: Partial<IProduct>): Promise<IProduct> {
  //   const product = await this.productRepository.create(productData);
  //   return this.productRepository.save(product);
  // }

  // public async update(id: number, productData: Partial<IProduct>): Promise<IProduct | null> {
  //   const product = await this.productRepository.findOneBy({ id });

  //   if (!product) {
  //     return null;
  //   }

  //   Object.assign(product, productData);
  //   return this.productRepository.save(product);
  // }

  // public async delete(id: number): Promise<boolean> {
  //   const result = await this.productRepository.delete(id);

  //   return result.affected !== undefined && result.affected! > 0;
  // }

  // public async getById(id: number): Promise<IProduct | null> {
  //   const product = await this.productRepository.findOneBy({ id });

  //   return product || null;
  // }

  // getAll: IProductService['getAll'] = async (payload = {}) => {
  //   const { category } = payload;
  //   return this.productRepository.find({ category });
  // };
}
