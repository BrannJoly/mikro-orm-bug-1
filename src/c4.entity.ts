import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class c4 {

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;


  constructor(name: string) {
    this.name = name;

  }

}
