// import { IUpload } from '../../../domain/Upload';

import { IAuth } from "../../../domain/Auth";

export interface IAuthRepository {
  create(data: Partial<IAuth>): Promise<IAuth>;
  save(entity: IAuth): Promise<IAuth | any>;
  findOneBy(where: Partial<IAuth>): Promise<IAuth | null>;
  // delete(id: number): Promise<{ affected?: number | null }>;
  // find(options?: { category?: string }): Promise<IUpload[]>;
}
