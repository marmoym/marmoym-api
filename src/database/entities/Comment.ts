import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';
import User from '@entities/User';
import Vote from '@entities/Vote';

@Entity({database: DB1})
export default class Comment extends BaseEntity {
  @Column()
  public parentId: number;

  @Column()
  public gparentId: number;

  @Column()
  public targetType: string;

  @Column()
  public targetId: number;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'userId',
  })
  public user: User;

  @OneToOne((type) => Vote)
  @JoinColumn()
  public vote: Vote;

  @Column()
  public status: string;
};
  