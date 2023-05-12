import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Pizza, PizzaRelations, Sauce, Dough, Size, PizzaIngredient, Order} from '../models';
import {SauceRepository} from './sauce.repository';
import {DoughRepository} from './dough.repository';
import {SizeRepository} from './size.repository';
import {PizzaIngredientRepository} from './pizza-ingredient.repository';
import {OrderRepository} from './order.repository';

export class PizzaRepository extends DefaultCrudRepository<
    Pizza,
    typeof Pizza.prototype.id,
    PizzaRelations
    > {

  public readonly sauce: BelongsToAccessor<Sauce, typeof Pizza.prototype.id>;

  public readonly dough: BelongsToAccessor<Dough, typeof Pizza.prototype.id>;

  public readonly size: BelongsToAccessor<Size, typeof Pizza.prototype.id>;

  public readonly ingredients: HasManyRepositoryFactory<PizzaIngredient, typeof Pizza.prototype.id>;

  public readonly order: BelongsToAccessor<Order, typeof Pizza.prototype.id>;

  constructor(
      @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('SauceRepository') protected sauceRepositoryGetter: Getter<SauceRepository>, @repository.getter('DoughRepository') protected doughRepositoryGetter: Getter<DoughRepository>, @repository.getter('SizeRepository') protected sizeRepositoryGetter: Getter<SizeRepository>, @repository.getter('PizzaIngredientRepository') protected pizzaIngredientRepositoryGetter: Getter<PizzaIngredientRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(Pizza, dataSource);
    this.order = this.createBelongsToAccessorFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
    this.ingredients = this.createHasManyRepositoryFactoryFor('ingredients', pizzaIngredientRepositoryGetter,);
    this.registerInclusionResolver('ingredients', this.ingredients.inclusionResolver);
    this.size = this.createBelongsToAccessorFor('size', sizeRepositoryGetter,);
    this.registerInclusionResolver('size', this.size.inclusionResolver);
    this.dough = this.createBelongsToAccessorFor('dough', doughRepositoryGetter,);
    this.registerInclusionResolver('dough', this.dough.inclusionResolver);
    this.sauce = this.createBelongsToAccessorFor('sauce', sauceRepositoryGetter,);
    this.registerInclusionResolver('sauce', this.sauce.inclusionResolver);
  }
}
