import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {PizzaIngredient, PizzaIngredientRelations, Pizza, Ingredient} from '../models';
import {PizzaRepository} from './pizza.repository';
import {IngredientRepository} from './ingredient.repository';

export class PizzaIngredientRepository extends DefaultCrudRepository<
    PizzaIngredient,
    typeof PizzaIngredient.prototype.id,
    PizzaIngredientRelations
    > {

  public readonly pizza: BelongsToAccessor<Pizza, typeof PizzaIngredient.prototype.id>;

  public readonly ingredient: BelongsToAccessor<Ingredient, typeof PizzaIngredient.prototype.id>;

  constructor(
      @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('PizzaRepository') protected pizzaRepositoryGetter: Getter<PizzaRepository>, @repository.getter('IngredientRepository') protected ingredientRepositoryGetter: Getter<IngredientRepository>,
  ) {
    super(PizzaIngredient, dataSource);
    this.ingredient = this.createBelongsToAccessorFor('ingredient', ingredientRepositoryGetter,);
    this.registerInclusionResolver('ingredient', this.ingredient.inclusionResolver);
    this.pizza = this.createBelongsToAccessorFor('pizza', pizzaRepositoryGetter,);
    this.registerInclusionResolver('pizza', this.pizza.inclusionResolver);
  }
}
