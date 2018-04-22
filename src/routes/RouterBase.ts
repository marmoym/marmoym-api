import { Router } from 'express';

export default class RouterBase {
  public static routes(): {} {
    throw new Error(`routes() is not defined', ${this.toString()}`);
  }
};
