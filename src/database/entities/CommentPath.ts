import {Column, Entity} from 'typeorm';

import BaseEntity from '@entities/BaseEntity';
import {DB1} from '@database/db';

@Entity({database: DB1})
export default class CommentPath extends BaseEntity {
  @Column()
  public gparentId: number;

  @Column()
  public path: string;

  @Column()
  public targetId: number;

  @Column()
  public status: string;
};
