const ID_TOKEN_KEY = "token";

class JwtService {
  getToken() {
    return window.localStorage.getItem(ID_TOKEN_KEY);
  }

  saveToken(token) {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
  }

  destroyToken() {
    window.localStorage.removeItem(ID_TOKEN_KEY);
  }
}

/*
 * Сразу же экспортируем новый экземпляр класса,
 * потому что сервис будет существовать в единственном экземпляре
 */
export default new JwtService();
