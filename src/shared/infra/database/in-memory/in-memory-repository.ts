import { Entity } from "../../../domain/entity";
import { NotFoundError } from "../../../domain/errors/not-found-error";
import { IRepository } from "../../../domain/repository/repository.interface";
import { ValueObject } from "../../../domain/value-object";

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject> implements IRepository<E, EntityId> {
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const index = this.items.findIndex((item) => {
      return item.entityId.equals(entity.entityId)
    });

    if (index === -1) {
      throw new NotFoundError(entity.entityId, this.getEntity());
    }

    this.items[index] = entity;
  }

  async delete(entityId: EntityId): Promise<void> {
    const index = this.items.findIndex((item) => {
      return item.entityId.equals(entityId)
    });

    if (index === -1) {
      throw new NotFoundError(entityId, this.getEntity());
    }

    this.items.splice(index, 1);
  }

  async findById(entityId: EntityId): Promise<E> {
    const item = this.items.find((item) => {
      return item.entityId.equals(entityId)
    });

    return typeof item === 'undefined' ? null : item;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any) => any;
}