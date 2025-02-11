import { DataSource, Repository } from 'typeorm';
import { Upload } from '../../../driven/repository/Upload';
import { IUploadRepository } from '../../../../core/applications/ports/repository/IUploadRepository';
import { IAuthRepository } from '../../../../core/applications/ports/repository/IAuthRepository';
import { Auth } from '../../../driven/repository/Auth';

export class AuthRepository implements IAuthRepository {
  private repository: Repository<Auth>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository('auth');
  }

  create: IAuthRepository['create'] = (data) => {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  };

  save: IAuthRepository['save'] = (entity) => {
    return this.repository.save(entity);
  };

  findOneBy: IAuthRepository['findOneBy'] = (where) => {
    return this.repository.findOneBy(where);
  };

  // delete: IUploadRepository['delete'] = (id) => {
  //   return this.repository.delete(id);
  // };

  // find: IUploadRepository['find'] = (options) => {
  //   return this.repository.find({ where: { category: options?.category as CATEGORIES } });
  // };
}
