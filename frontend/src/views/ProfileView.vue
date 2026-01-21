<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div class="user">
    <picture>
      <source
        type="image/webp"
        srcset="
          @/assets/img/users/user5@2x.webp 1x,
          @/assets/img/users/user5@4x.webp 2x
        "
      />
      <img
        src="@/assets/img/users/user5@2x.jpg"
        srcset="@/assets/img/users/user5@4x.jpg"
        alt="Очир Сангаджиев"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>Очир Сангаджиев</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>+7 999-999-99-99</span></p>
  </div>

  <div class="layout__address">
    <div class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №1. Тест</b>
        <div class="address-form__edit">
          <button type="button" class="icon">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>Невский пр., д. 22, кв. 46</p>
      <small>Позвоните, пожалуйста, от проходной</small>
    </div>
  </div>

  <div class="layout__address">
    <form
      action="test.html"
      method="post"
      class="address-form address-form--opened sheet"
    >
      <div class="address-form__header">
        <b>Адрес №1</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button type="button" class="button button--transparent">
          Удалить
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
  </div>

  <div class="layout__button">
    <button type="button" class="button button--border">
      Добавить новый адрес
    </button>
  </div>
</template>

<style scoped>
.layout__title {
  margin-bottom: 24px;
}

.title {
  margin: 0;
}

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.user img {
  border-radius: 50%;
}

.user__name {
  font-size: 20px;
  font-weight: 600;
}

.user__phone {
  width: 100%;
  margin: 0;
  font-size: 15px;
  color: #555;
}

.layout__address {
  margin-bottom: 20px;
}

.address-form {
  position: relative;

  padding: 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.address-form__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;

  font-size: 16px;
  font-weight: 600;
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.address-form__input {
  width: 100%;
}

.address-form__input--size--normal {
  width: 60%;
}

.address-form__input--size--small {
  width: 18%;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input span {
  font-size: 14px;
  color: #555;
}

.input input {
  border-radius: 12px;
  border: 1px solid #dcdfe6;
  padding: 12px 16px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  font-size: 15px;
}

.input input:focus {
  border-color: #ff8a00;
  box-shadow: 0 0 0 3px rgba(255, 138, 0, 0.15);
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.button {
  padding: 12px 24px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.button--transparent {
  background: transparent;
  border: 1px solid #dcdfe6;
}

.button:not(.button--transparent) {
  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  color: #fff;
}

.layout__button {
  margin-top: 24px;
  text-align: right;
}

.button--border {
  background: #ffffff;
  border: 1px solid #ff8a00;
  color: #ff8a00;
}

.icon {
  width: 32px;
  height: 32px;

  border: none;
  border-radius: 50%;
  background-color: #fff;
  background-image: url("@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  cursor: pointer;
  transition: 0.2s ease;
}

.icon:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .address-form__input--size--normal,
  .address-form__input--size--small {
    width: 100%;
  }

  .user {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
