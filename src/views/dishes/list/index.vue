<template>
  <div id="DishesList">

    <van-nav-bar
      title="菜品管理"
      left-text="返回"
      right-text="新建"
      left-arrow
      fixed
      @click-left="$router.back(-1)"
      @click-right="$router.push({path:'/dishes/create'})"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >

      <van-swipe-cell
        :before-close="beforeClose"
        :index="index"
        :id="item.id"
        v-for="(item,index) in items"
        :key="index"
      >
        <van-cell
          :border="false"
          :title="item.name"
          :value="item.price"
          is-link
          :to="'/dishes/create?id='+item.id"
        />
        <template #right>
          <van-button
            square
            type="danger"
            text="删除"
          />
        </template>
      </van-swipe-cell>

    </van-list>

  </div>

</template>

<script>
import { getDishess } from "@/api/dishes";
import { deleteDishes } from "@/api/dishes";
export default {
  name: "DishesList",
  data() {
    return {
      items: [],
      loading: false,
      finished: false,
      query: {
        page: 0,
        limit: 10,
      },
    };
  },
  created() {},
  methods: {
    async remove(index, id) {
      try {
        await deleteDishes(id);
        this.items.splice(index, 1);
      } catch (error) {
        alert(error);
      }
    },
    async onLoad() {
      this.query.page++;
      const { data } = await getDishess(this.query);

      for (let x in data.rows) {
        this.items.push(data.rows[x]);
      }
      this.loading = false;

      if (this.items.length >= data.total) {
        this.finished = true;
      }
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case "outside":
          instance.close();
          break;
        case "right":
          this.remove(instance.$attrs.index, instance.$attrs.id);
          instance.close();
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-list {
  margin-top: 46px;
  .van-swipe-cell {
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>
