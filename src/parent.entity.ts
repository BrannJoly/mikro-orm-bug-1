import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { c1 } from './c1.entity';
import { c2 } from './c2.entity';
import { c3 } from './c3.entity';
import { c4 } from './c4.entity';
import { c5 } from './c5.entity';
import { c6 } from './c6.entity';
import { c7 } from './c7.entity';
import { c8 } from './c8.entity';
import { c9 } from './c9.entity';
import { c10 } from './c10.entity';
import { c11 } from './c11.entity';
import { c12 } from './c12.entity';
import { c13 } from './c13.entity';
import { c14 } from './c14.entity';
import { c15 } from './c15.entity';
import { c16 } from './c16.entity';
import { c17 } from './c17.entity';
import { c18 } from './c18.entity';
import { c19 } from './c19.entity';
import { c20 } from './c20.entity';

@Entity()
export class Parent {

  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @ManyToMany(() => c1)
  c1s = new Collection<c1>(this);

  @ManyToMany(() => c2)
  c2s = new Collection<c2>(this);

  @ManyToMany(() => c3)
  c3s = new Collection<c3>(this);

  @ManyToMany(() => c4)
  c4s = new Collection<c4>(this);

  @ManyToMany(() => c5)
  c5s = new Collection<c5>(this);

  @ManyToMany(() => c6)
  c6s = new Collection<c6>(this);

  @ManyToMany(() => c7)
  c7s = new Collection<c7>(this);

  @ManyToMany(() => c8)
  c8s = new Collection<c8>(this);

  @ManyToMany(() => c9)
  c9s = new Collection<c9>(this);

  @ManyToMany(() => c10)
  c10s = new Collection<c10>(this);

  @ManyToMany(() => c11)
  c11s = new Collection<c11>(this);

  @ManyToMany(() => c12)
  c12s = new Collection<c12>(this);

  @ManyToMany(() => c13)
  c13s = new Collection<c13>(this);

  @ManyToMany(() => c14)
  c14s = new Collection<c14>(this);

  @ManyToMany(() => c15)
  c15s = new Collection<c15>(this);

  @ManyToMany(() => c16)
  c16s = new Collection<c16>(this);

  @ManyToMany(() => c17)
  c17s = new Collection<c17>(this);

  @ManyToMany(() => c18)
  c18s = new Collection<c18>(this);

  @ManyToMany(() => c19)
  c19s = new Collection<c19>(this);

  @ManyToMany(() => c20)
  c20s = new Collection<c20>(this);



  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

}
