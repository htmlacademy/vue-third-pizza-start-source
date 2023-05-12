import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Dough, DoughRelations, Pizza} from '../models';
import {PizzaRepository} from './pizza.repository';

export class DoughRepository extends DefaultCrudRepository<
  Dough,
  typeof Dough.prototype.id,
  DoughRelations
> {

  public readonly pizzas: HasManyRepositoryFactory<Pizza, typeof Dough.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('PizzaRepository') protected pizzaRepositoryGetter: Getter<PizzaRepository>,
  ) {
    super(Dough, dataSource);
    this.pizzas = this.createHasManyRepositoryFactoryFor('pizzas', pizzaRepositoryGetter,);
  }
}
