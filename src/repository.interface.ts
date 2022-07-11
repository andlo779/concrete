export interface RepositoryInterface<Type> {
  findOneById(id: string): Promise<Type>;
  findAll(): Promise<Type[]>;
  insert(entity: Type): Promise<Type>;
  update(entity: Type): Promise<Type>;
}
