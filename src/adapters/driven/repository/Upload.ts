import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUpload } from '../../../core/domain/Upload';

@Entity()
export class Upload implements IUpload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;
}
