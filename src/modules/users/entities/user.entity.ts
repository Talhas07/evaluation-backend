import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column({ default: 'contributor' })
  role: 'admin' | 'contributor';

  @Column({ default: 'pending_approval' })
  status: 'pending_approval' | 'approved';
}
