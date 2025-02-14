import { Goods } from 'src/goods/goods.entity';
import { Entity, Column, Unique, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
@Unique(['userId'])
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'user' })
  type: string;

  @Column({ default: null })
  account: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(() => Goods, (goods) => goods.userId)
  goods: Goods[];
}
