import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Size, SizeRelations, Pizza} from '../models';
import {PizzaRepository} from './pizza.repository';

export class SizeRepository extends DefaultCrudRepository<
  Size,
  typeof Size.prototype.id,
  SizeRelations
> {

  public readonly pizzas: HasManyRepositoryFactory<Pizza, typeof Size.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('PizzaRepository') protected pizzaRepositoryGetter: Getter<PizzaRepository>,
  ) {
    super(Size, dataSource);
    this.pizzas = this.createHasManyRepositoryFactoryFor('pizzas', pizzaRepositoryGetter,);
    this.registerInclusionResolver('pizzas', this.pizzas.inclusionResolver);
  }
}
