import Cookies from "universal-cookie";

class token {
  constructor() {
    this.cookies = new Cookies();
  }

  set = (key, value) => {
    this.cookies.set(key, value, { path: "/" });
  };

  get= key => {
    return this.cookies.get(key, { path: "/" });
  };

  remove = key => {
    this.cookies.remove(key, { path: "/" });
  };
}

export default new token();