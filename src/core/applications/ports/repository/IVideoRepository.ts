import { IVideo } from "../../../domain/Video";

export interface IVideoRepository {
  create(data: Partial<IVideo>): Promise<IVideo>;
  save(entity: IVideo): Promise<IVideo | any>;
  findOneBy(where: Partial<IVideo>): Promise<IVideo | null>;
  // delete(id: number): Promise<{ affected?: number | null }>;
  // find(options?: { category?: string }): Promise<IUpload[]>;
}
