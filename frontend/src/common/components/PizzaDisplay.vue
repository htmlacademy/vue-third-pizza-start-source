<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input type="text" name="pizza_name" placeholder="Введите название пиццы" />
    </label>
    <div class="content__constructor">
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </div>
    <div class="content__result">
      <p>Итого: 0 ₽</p>
      <button type="button" class="button" disabled>Готовьте!</button>
    </div>
  </div>
</template>

<style scoped>
.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin: 25px auto;
}

.pizza {
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.pizza--foundation--big-tomato {
  background-image: url("@/assets/img/foundation/big-tomato.svg");
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.pizza__filling--ananas {
  background-image: url("@/assets/img/filling-big/ananas.svg");
}

.pizza__filling--bacon {
  background-image: url("@/assets/img/filling-big/bacon.svg");
}

.pizza__filling--cheddar {
  background-image: url("@/assets/img/filling-big/cheddar.svg");
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.content__result p {
  font-size: 24px;
  margin: 0;
}

.content__result button {
  margin-left: 12px;
  padding: 16px 45px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.content__result button:disabled {
  background-color: #a5b1c2;
  cursor: not-allowed;
}
</style>
