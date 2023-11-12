import { Entity } from "../../domain/entity";
import { IRepository } from "../../domain/repository/repository.interface";
import { ValueObject } from "../../domain/value-object";

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
      item.entityId.equals(entity.entityId)
    });

    if (index === -1) {
      throw new Error('Entity note found');
    }

    this.items[index] = entity;
  }

  async delete(entityId: EntityId): Promise<void> {
    const index = this.items.findIndex((item) => {
      item.entityId.equals(entityId)
    });

    if (index === -1) {
      throw new Error('Entity note found');
    }

    this.items.splice(index, 1);
  }

  async findById(entityId: EntityId): Promise<E> {
    const item = this.items.find((item) => {
      item.entityId.equals(entityId)
    });

    return typeof item === 'undefined' ? null : item;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any) => any;
}