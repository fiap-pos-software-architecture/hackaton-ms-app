import { DataSource, Repository } from 'typeorm';
import { IVideoRepository } from '../../../../core/applications/ports/repository/IVideoRepository';
import { Video } from '../../../driven/repository/Video';

export class VideoRepository implements IVideoRepository {
  private repository: Repository<Video>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository('videos');
  }

  create: IVideoRepository['create'] = (data) => {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  };

  save: IVideoRepository['save'] = (entity) => {
    return this.repository.save(entity);
  };

  findOneBy: IVideoRepository['findOneBy'] = (where) => {
    return this.repository.findOneBy(where);
  };

  // delete: IUploadRepository['delete'] = (id) => {
  //   return this.repository.delete(id);
  // };

  // find: IUploadRepository['find'] = (options) => {
  //   return this.repository.find({ where: { category: options?.category as CATEGORIES } });
  // };
}
