import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Sauce, SauceRelations, Pizza} from '../models';
import {PizzaRepository} from './pizza.repository';

export class SauceRepository extends DefaultCrudRepository<
  Sauce,
  typeof Sauce.prototype.id,
  SauceRelations
> {

  public readonly pizzas: HasManyRepositoryFactory<Pizza, typeof Sauce.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('PizzaRepository') protected pizzaRepositoryGetter: Getter<PizzaRepository>,
  ) {
    super(Sauce, dataSource);
    this.pizzas = this.createHasManyRepositoryFactoryFor('pizzas', pizzaRepositoryGetter,);
  }
}
