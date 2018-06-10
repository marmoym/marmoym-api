import {
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  OneToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import { DB1 } from '@modules/Database';
import User from '@entities/User';
import Vote from '@entities/Vote';

@Entity({ database: DB1 })
@Tree('materialized-path')
export default class Comment extends BaseEntity {
  @Column()
  public content: string;

  @TreeChildren()
  children: Comment[];
  
  @TreeParent()
  parent: Comment;

  /**
   * ...
   */
  @Column({
    default: 'D'
  })
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

  @Column({
    default: 'N',
  })
  public status: string;
};
