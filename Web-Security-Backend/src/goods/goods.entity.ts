import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Goods {
  @PrimaryColumn()
  goodsId: string;

  @ManyToOne(() => User)
  userId: User;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  info: string;

  @Column()
  url: string;
}
