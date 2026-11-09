// Сущности каталога в том виде, в котором их отдаёт бэкенд
// (см. backend/src/models) и в котором они лежат в src/mocks/*.json.

export interface Dough {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface Sauce {
  id: number;
  name: string;
  price: number;
}

export interface Size {
  id: number;
  name: string;
  image: string;
  multiplier: number;
}

export interface Ingredient {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface Misc {
  id: number;
  name: string;
  image: string;
  price: number;
}
