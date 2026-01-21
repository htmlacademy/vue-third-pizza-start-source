import { AddressResource } from "@/services/resources/address.resource";
import { DoughResource } from "@/services/resources/dough.resource";
import { IngredientResource } from "@/services/resources/ingredient.resource";
import { MiscResource } from "@/services/resources/misc.resource";
import { OrderResource } from "@/services/resources/order.resource";
import { SauceResource } from "@/services/resources/sauce.resource";
import { SizeResource } from "@/services/resources/size.resource";

export default {
  address: new AddressResource(),
  dough: new DoughResource(),
  ingredient: new IngredientResource(),
  misc: new MiscResource(),
  order: new OrderResource(),
  sauce: new SauceResource(),
  size: new SizeResource(),
};