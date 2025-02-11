import { DataSource, Repository } from 'typeorm';
import { Upload } from '../../../driven/repository/Upload';
import { IUploadRepository } from '../../../../core/applications/ports/repository/IUploadRepository';

export class UploadRepository implements IUploadRepository {
  private repository: Repository<Upload>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository('upload');
  }

  create: IUploadRepository['create'] = (data) => {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  };

  save: IUploadRepository['save'] = (entity) => {
    return this.repository.save(entity);
  };

  findOneBy: IUploadRepository['findOneBy'] = (where) => {
    return this.repository.findOneBy(where);
  };

  // delete: IUploadRepository['delete'] = (id) => {
  //   return this.repository.delete(id);
  // };

  // find: IUploadRepository['find'] = (options) => {
  //   return this.repository.find({ where: { category: options?.category as CATEGORIES } });
  // };
}
