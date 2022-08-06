import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Order, OrderRelations, User, Pizza, MiscOrder, Address} from '../models';
import {UserRepository} from './user.repository';
import {PizzaRepository} from './pizza.repository';
import {MiscOrderRepository} from './misc-order.repository';
import {AddressRepository} from './address.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Order.prototype.id>;

  public readonly orderPizzas: HasManyRepositoryFactory<Pizza, typeof Order.prototype.id>;

  public readonly orderMisc: HasManyRepositoryFactory<MiscOrder, typeof Order.prototype.id>;

  public readonly orderAddress: BelongsToAccessor<Address, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('PizzaRepository') protected pizzaRepositoryGetter: Getter<PizzaRepository>, @repository.getter('MiscOrderRepository') protected miscOrderRepositoryGetter: Getter<MiscOrderRepository>, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>,
  ) {
    super(Order, dataSource);
    this.orderAddress = this.createBelongsToAccessorFor('orderAddress', addressRepositoryGetter,);
    this.registerInclusionResolver('orderAddress', this.orderAddress.inclusionResolver);
    this.orderMisc = this.createHasManyRepositoryFactoryFor('orderMisc', miscOrderRepositoryGetter,);
    this.registerInclusionResolver('orderMisc', this.orderMisc.inclusionResolver);
    this.orderPizzas = this.createHasManyRepositoryFactoryFor('orderPizzas', pizzaRepositoryGetter,);
    this.registerInclusionResolver('orderPizzas', this.orderPizzas.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
