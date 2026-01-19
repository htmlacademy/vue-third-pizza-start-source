<template>
  <header class="header">
    <div class="header__logo">
      <a href="index.html" class="logo">
        <img src="@/assets/img/logo.svg" alt="V!U!E! Pizza logo" width="90" height="40">
      </a>
    </div>
    <div class="header__cart">
      <a href="cart.html">0 ₽</a>
    </div>
    <div class="header__user">
      <a href="#" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header__logo img {
  width: 120px;
  height: auto;
}

.header__actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.header__cart {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff8a00, #ff5e00);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.header__cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255,94,0,0.35);
}

.header__login {
  padding: 6px 12px;
  border-radius: 12px;
  background-color: #f3f4f6;
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.header__login:hover {
  background-color: #e5e7eb;
}

.cart-icon {
  font-size: 18px;
}
</style>