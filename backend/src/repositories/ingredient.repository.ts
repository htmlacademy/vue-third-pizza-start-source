import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Ingredient, IngredientRelations} from '../models';

export class IngredientRepository extends DefaultCrudRepository<
  Ingredient,
  typeof Ingredient.prototype.id,
  IngredientRelations
> {

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource) {
    super(Ingredient, dataSource);
  }
}
