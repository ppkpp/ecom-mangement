import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
import {
  Entity,
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Exclude()
  @Column({ nullable: false, unique: true })
  password: string;

  @Column({ nullable: false, unique: true })
  phoneno: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  upload_img: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.Admin, nullable: false })
  role: Role;
}
