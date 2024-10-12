import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { Parent } from './parent.entity';

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

let orm: MikroORM;

beforeAll(async () => {
  orm = await MikroORM.init({
   
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'test',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    schema: 'public',
    debug:true,
    allowGlobalContext: true, // only for testing
  });
  await orm.schema.refreshDatabase();
});

afterAll(async () => {
  await orm.close(true);
});


function getRandomSubset<T>(array: T[], size: number): T[] {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

async function batchInsert(entities: any[], batchSize: number, em: EntityManager) {
  for (let i = 0; i < entities.length; i += batchSize) {
    const batch = entities.slice(i, i + batchSize);
    console.log(`Inserting batch ${i / batchSize + 1} of ${Math.ceil(entities.length / batchSize)}`);
    await em.persistAndFlush(batch);
    em.clear();  // Clear the entity manager to avoid memory bloat
  }
}

test('benchmark parent entity retrieval using two strategies', async () => {
// here we can see how postgres totaly fails when joining 20 tables (eventhough they're almost all empty !)


  const childEntityCounts = 100;
  const parentEntityCounts = 10000;
  const children = [];
  const batchSize = 1000;

  // Create 100 entities for each child type (c1 to c20)
  for (let i = 0; i < childEntityCounts; i++) {
    children.push(
      orm.em.create(c1, {name:String(i)}),
      orm.em.create(c2, {name:String(i)}),
      orm.em.create(c3, {name:String(i)}),
      orm.em.create(c4, {name:String(i)}),
      orm.em.create(c5, {name:String(i)}),
      orm.em.create(c6, {name:String(i)}),
      orm.em.create(c7, {name:String(i)}),
      orm.em.create(c8, {name:String(i)}),
      orm.em.create(c9, {name:String(i)}),
      orm.em.create(c10, {name:String(i)}),
      orm.em.create(c11, {name:String(i)}),
      orm.em.create(c12, {name:String(i)}),
      orm.em.create(c13, {name:String(i)}),
      orm.em.create(c14, {name:String(i)}),
      orm.em.create(c15, {name:String(i)}),
      orm.em.create(c16, {name:String(i)}),
      orm.em.create(c17, {name:String(i)}),
      orm.em.create(c18, {name:String(i)}),
      orm.em.create(c19, {name:String(i)}),
      orm.em.create(c20, {name:String(i)})
    );
  }

  console.log('Batch inserting child entities...');
  await batchInsert(children, batchSize, orm.em);
  console.log('Child entities inserted.');
  orm.em.clear();

  // Create 10,000 Parent entities with random assortments of 10 child entities each
  const parents = [];

  console.log('Creating parent entities...');
  for (let i = 0; i < parentEntityCounts; i++) {
    const randomC1s = getRandomSubset(children.slice(0, 100), 10);
    const randomC2s = getRandomSubset(children.slice(100, 200), 10);

    const parent = orm.em.create(Parent, {
      name: `Parent ${i}`,
      email: `parent${i}@test.com`,
      c1s: randomC1s,
      c2s: randomC2s,

    });
    parents.push(parent);

    if (i % 1000 === 0) {
      console.log(`Created ${i} parent entities so far...`);
    }
  }

  console.log('Batch inserting parent entities...');
  await batchInsert(parents, batchSize, orm.em);
  console.log('Parent entities inserted.');
  orm.em.clear();


  let start = performance.now();
  console.log('Retrieving parent entities with collections using select-in...');
  await orm.em.find(Parent, {}, {strategy: 'select-in', populate: ['c1s', 'c2s', 'c3s', 'c4s', 'c5s', 'c6s', 'c7s', 'c8s', 'c9s', 'c10s', 'c11s', 'c12s', 'c13s', 'c14s', 'c15s', 'c16s', 'c17s', 'c18s', 'c19s', 'c20s'] });
  let end = performance.now();
  let timeTaken = end - start;
  console.log(`Time taken to load ${parentEntityCounts} parents with their collections using select-in strategy: ${timeTaken} ms`);


  start = performance.now();
  console.log('Retrieving parent entities with collections using joined...');
  await orm.em.find(Parent, {}, {strategy: 'joined', populate: ['c1s', 'c2s', 'c3s', 'c4s', 'c5s', 'c6s', 'c7s', 'c8s', 'c9s', 'c10s', 'c11s', 'c12s', 'c13s', 'c14s', 'c15s', 'c16s', 'c17s', 'c18s', 'c19s', 'c20s'] });
  end = performance.now();
  timeTaken = end - start;
  console.log(`Time taken to load ${parentEntityCounts} parents with their collections using joined strategy: ${timeTaken} ms`);

  start = performance.now();
  console.log('Retrieving parent entities with only 2 collections using joined...');
  await orm.em.find(Parent, {}, {strategy: 'joined', populate: ['c1s', 'c2s'] });
  end = performance.now();
  timeTaken = end - start;
  console.log(`Time taken to load ${parentEntityCounts} parents with only 2 collections using joined strategy: ${timeTaken} ms`);
  

},120000);