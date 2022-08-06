import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DatabaseDataSource} from '../datasources';
import {Misc, MiscRelations, MiscOrder} from '../models';
import {MiscOrderRepository} from './misc-order.repository';

export class MiscRepository extends DefaultCrudRepository<
  Misc,
  typeof Misc.prototype.id,
  MiscRelations
> {

  public readonly orderMisc: HasManyRepositoryFactory<MiscOrder, typeof Misc.prototype.id>;

  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource, @repository.getter('MiscOrderRepository') protected miscOrderRepositoryGetter: Getter<MiscOrderRepository>,
  ) {
    super(Misc, dataSource);
    this.orderMisc = this.createHasManyRepositoryFactoryFor('orderMisc', miscOrderRepositoryGetter,);
    this.registerInclusionResolver('orderMisc', this.orderMisc.inclusionResolver);
  }
}
