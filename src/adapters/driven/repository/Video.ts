import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IVideo } from '../../../core/domain/Video';

@Entity()
export class Video implements IVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoPath: string;

  @Column()
  interval: number;
}
