import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {MiscOrder, MiscOrderRelations, Order, Misc} from '../models';
import {OrderRepository} from './order.repository';
import {MiscRepository} from './misc.repository';

export class MiscOrderRepository extends DefaultCrudRepository<
  MiscOrder,
  typeof MiscOrder.prototype.id,
  MiscOrderRelations
> {

  public readonly order: BelongsToAccessor<Order, typeof MiscOrder.prototype.id>;

  public readonly misc: BelongsToAccessor<Misc, typeof MiscOrder.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('MiscRepository') protected miscRepositoryGetter: Getter<MiscRepository>,
  ) {
    super(MiscOrder, dataSource);
    this.misc = this.createBelongsToAccessorFor('misc', miscRepositoryGetter,);
    this.registerInclusionResolver('misc', this.misc.inclusionResolver);
    this.order = this.createBelongsToAccessorFor('order', orderRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }
}
