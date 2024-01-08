import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Item } from './items.entity';

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

 @ManyToMany(() => Item)
  items = new Collection<Item>(this);


  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

}
