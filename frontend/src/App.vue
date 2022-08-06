<template>
  <div class="main__wrapper">
    <div class="main__header">
      <img src="@/assets/img/logo.svg" width="300" height="47" alt="V!U!E! Pizza" />
    </div>
    <h1>Добро пожаловать!</h1>
    <p>
      Это проект V!U!E! Pizza для обучения на профессиональном онлайн‑курсе<br />
      <b>«Vue.js для опытных разработчиков».</b>
    </p>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/app.scss";
body {
  justify-content: center;
  align-items: center;
}
.main__wrapper {
  padding-bottom: 30px;

  background-color: $white;
  box-shadow: $shadow-light;

  h1 {
    margin-bottom: 0;
    padding: 0 95px;

    text-align: center;

    @include b-s36-h42;
  }

  p {
    padding: 0 95px;

    text-align: center;

    font-size: 20px;
    line-height: 30px;
  }

  b {
    font-size: 1.2em;
  }
}

.main__header {
  margin-bottom: 30px;
  padding: 20px 0;

  background-color: $green-600;

  img {
    display: block;

    margin: 0 auto;
  }
}

</style>
