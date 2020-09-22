<template>
  <div id="Login">

    <div class="login">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="">
        <h1>OrderSystem</h1>
      </div>
      <div class="fileds">
        <div class="filed">
          <input type="tel" maxlength="11" v-model="loginForm.username" placeholder="请输入手机号">
        </div>
        <div class="filed">
          <input type="password" maxlength="11" v-model="loginForm.password" placeholder="请输入密码">
        </div>
        <div class="filed">
          <button @click="login">登录</button>
        </div>
      </div>
      <div class="copyright">
        <span>
          <a href="https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89">MIT License</a>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "18241172058",
        password: "123456",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("user/login", this.loginForm).then(() => {
        this.$router.push({
          path: "/",
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .logo {
    text-align: center;
    padding: 40px 20px;
    img {
      width: 64px;
    }
    h1 {
      font-size: 20px;
      color: #2a2a2a;
    }
  }
  .fileds {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 50px;
    .filed {
      width: 100%;
      margin: 10px 0;
      input {
        width: 100%;
        height: 50px;
        border: 1px solid #ddd;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 16px;
        color: #666;
      }
      button {
        width: 100%;
        height: 50px;
        border: 1px solid #ddd;
        font-size: 16px;
      }
    }
  }
  .copyright {
    text-align: center;
    padding: 10px;
  }
}
</style>
