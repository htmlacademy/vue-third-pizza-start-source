<template>
  <div class="popup">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
    @import "@/assets/scss/ds-system/ds.scss";
    @import "@/assets/scss/mixins/mixins.scss";

    .popup {
    @include pf_center-all;

    z-index: 10;

    display: block;

    box-sizing: border-box;
    width: 420px;
    padding: 64px 95px;

    background-color: $white;
    box-shadow: $shadow-light;

    &::before,
    &::after {
        position: absolute;

        width: 48px;
        height: 48px;

        content: "";

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    &::before {
        top: 15px;
        left: 15px;

        background-image: url("@/assets/img/filling/ananas.svg");
    }

    &::after {
        right: 15px;
        bottom: 15px;

        background-image: url("@/assets/img/filling/tomatoes.svg");
    }

    p {
        margin-top: 24px;
        margin-bottom: 24px;

        text-align: center;
    }
    }
</style>