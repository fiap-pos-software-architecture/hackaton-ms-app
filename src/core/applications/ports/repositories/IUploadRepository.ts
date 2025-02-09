// import { IUpload } from '../../../domain/Upload';

import { IUpload } from "../../../domain/Upload";

export interface IUploadRepository {
  create(data: Partial<IUpload>): Promise<IUpload>;
  save(entity: IUpload): Promise<IUpload | any>;
  // findOneBy(where: Partial<IUpload>): Promise<IUpload | null>;
  // delete(id: number): Promise<{ affected?: number | null }>;
  // find(options?: { category?: string }): Promise<IUpload[]>;
}
