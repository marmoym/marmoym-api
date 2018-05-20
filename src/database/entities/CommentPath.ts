import {Column, Entity,} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';

@Entity({database: DB1})
export default class CommentPath extends BaseEntity {
  @Column()
  private gparentId: number;

  @Column()
  private path: string;

  @Column()
  private targetId: number;

  @Column()
  private status: string;
};
