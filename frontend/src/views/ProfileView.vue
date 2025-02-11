<template>
  <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">Мои данные</h1>
      </div>

      <div class="user">
        <picture>
          <source type="image/webp" srcset="@/assets/img/users/user5@2x.webp 1x, @/assets/img/users/user5@4x.webp 2x">
          <img src="@/assets/img/users/user5@2x.jpg" srcset="@/assets/img/users/user5@4x.jpg" alt="Василий Ложкин" width="72" height="72">
        </picture>
        <div class="user__name">
          <span>Василий Ложкин</span>
        </div>
        <p class="user__phone">Контактный телефон: <span>+7 999-999-99-99</span></p>
      </div>

      <div class="layout__address">
        <div class="sheet address-form">
          <div class="address-form__header">
            <b>Адрес №1. Тест</b>
            <div class="address-form__edit">
              <button type="button" class="icon"><span class="visually-hidden">Изменить адрес</span></button>
            </div>
          </div>
          <p>Невский пр., д. 22, кв. 46</p>
          <small>Позвоните, пожалуйста, от проходной</small>
        </div>
      </div>

      <div class="layout__address">
        <form action="test.html" method="post" class="address-form address-form--opened sheet">
          <div class="address-form__header">
            <b>Адрес №1</b>
          </div>

          <div class="address-form__wrapper">
            <div class="address-form__input">
              <label class="input">
                <span>Название адреса*</span>
                <input type="text" name="addr-name" placeholder="Введите название адреса" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--normal">
              <label class="input">
                <span>Улица*</span>
                <input type="text" name="addr-street" placeholder="Введите название улицы" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Дом*</span>
                <input type="text" name="addr-house" placeholder="Введите номер дома" required>
              </label>
            </div>
            <div class="address-form__input address-form__input--size--small">
              <label class="input">
                <span>Квартира</span>
                <input type="text" name="addr-apartment" placeholder="Введите № квартиры">
              </label>
            </div>
            <div class="address-form__input">
              <label class="input">
                <span>Комментарий</span>
                <input type="text" name="addr-comment" placeholder="Введите комментарий">
              </label>
            </div>
          </div>

          <div class="address-form__buttons">
            <button type="button" class="button button--transparent">Удалить</button>
            <button type="submit" class="button">Сохранить</button>
          </div>
        </form>
      </div>

      <div class="layout__button">
        <button type="button" class="button button--border">Добавить новый адрес</button>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss"; // Нам нужны дизайн-система
@import "@/assets/scss/mixins/mixins.scss"; // и миксины

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

</style>