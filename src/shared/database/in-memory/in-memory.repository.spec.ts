import { update } from "lodash";
import { Entity } from "../../domain/entity";
import { NotFoundError } from "../../domain/errors/not-found-error";
import { Uuid } from "../../domain/value-objects/uuid.vo";
import { InMemoryRepository } from "./in-memory-repository";

type EntityStubConstructor = {
  entityId?: Uuid;
  name?: string;
  price?: number;
}

class EntityStub extends Entity {
  entityId: Uuid;
  name: string;
  price: number;

  constructor(props: EntityStubConstructor) {
    super();
    this.entityId = props.entityId || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entityId: this.entityId,
      name: this.name,
      price: this.price,
    }
  }
}

class InMemoryRepositoryStub extends InMemoryRepository<EntityStub, Uuid> {
  getEntity(): new (...args: any) => any {
    return EntityStub;
  }

}

const entity = new EntityStub({name: 'A Name', price: 10 });

const newEntities = [
  new EntityStub({
  entityId: new Uuid(),
  name: 'Test',
  price: 100,
  }),
  new EntityStub({
    entityId: new Uuid(),
    name: 'Test',
    price: 100,
  }),
];

describe('InMemoryRepository Unit Tests', () => {
  let repository: InMemoryRepositoryStub;

  beforeEach(() => {
    repository = new InMemoryRepositoryStub();
  });

  test('Should insert a new Entity', async() => {
    const entity = new EntityStub({
      entityId: new Uuid(),
      name: 'Test',
      price: 100,
    });

    await repository.insert(entity);

    expect(repository.items.length).toBe(1);
    expect(repository.items[0]).toBe(entity);
  });

  test('Should bulk insert a new Entity', async() => {
    await repository.bulkInsert(newEntities);

    expect(repository.items.length).toBe(2);
    expect(repository.items[0]).toBe(newEntities[0]);
    expect(repository.items[1]).toBe(newEntities[1]);
  });

  test('Should throws error on update when Entity not found', async () => {
    const entity = new EntityStub({ name: 'A Name', price: 5 });

    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entityId, EntityStub)
    );
  });

  test('Should updates an Entity', async () => {
    await repository.insert(entity);

    const updatedEntity = new EntityStub({
      entityId: entity.entityId,
      name: 'Updated Name',
      price: 50,
    });

    await repository.update(updatedEntity);

    expect(updatedEntity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  test('Should delete an Entity', async () => {
    await repository.insert(entity);

    expect(repository.items.length).toBe(1);

    await repository.delete(entity.entityId);

    expect(repository.items.length).toBe(0);
  });

  test('Should throws error on delete when Entity not found', async () => {
    const entityId = new Uuid();

    await expect(repository.delete(entityId)).rejects.toThrow(
      new NotFoundError(entityId, EntityStub)
    );
  });

  test('Should find an Entity by Id', async () => {
    await repository.insert(entity);

    const a = await repository.findById(entity.entityId);

    expect(a).toStrictEqual(entity);
  });

  test('Should return all Entities', async() => {
    await repository.bulkInsert(newEntities);

    const entities = await repository.findAll();

    expect(entities.length).toBe(newEntities.length);
    expect(entities[0]).toBe(newEntities[0]);
    expect(entities[1]).toBe(newEntities[1]);
  });
});
