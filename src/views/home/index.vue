<template>
  <div id="Home">

    <van-nav-bar title="首页" right-text="注销" fixed @click-right="logout" />
    <section>
      <van-grid clickable :column-num="2">
        <van-grid-item icon="bill-o" text="点菜宝" to="/mealOrder" />
        <van-grid-item icon="gem-o" text="菜品管理" to="/dishes/list" />
        <van-grid-item icon="apps-o" text="分类管理" to="/category" />
        <van-grid-item icon="cluster-o" text="桌号管理" to="/seat" />
      </van-grid>
    </section>

  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout", this.loginForm).then(() => {
        this.$router.push({
          path: "/login",
        });
      });
    },
  },
};
</script>
