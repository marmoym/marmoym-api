import {Column, Entity, JoinColumn, ManyToOne, OneToOne,} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';
import User from '@entities/User';
import Vote from '@entities/Vote';

@Entity({database: DB1})
export default class Comment extends BaseEntity {
  @Column()
  private parentId: number;

  @Column()
  private gparentId: number;

  @Column()
  private targetType: string;

  @Column()
  private targetId: number;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'userId',
  })
  private user: User;

  @OneToOne(type => Vote)
  @JoinColumn()
  private vote: Vote;

  @Column()
  private status: string;
};
  