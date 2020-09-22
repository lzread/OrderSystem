<template>
  <div id="">
    <van-nav-bar title="管理" left-text="返回" right-text="新建" left-arrow fixed @click-left="$router.back(-1)" @click-right="addHandle" />

    <van-list>
      <van-swipe-cell :before-close="beforeClose" :index="index" :id="item.id" v-for="(item,index) in items" :key="index">
        <van-cell :border="false" :title="item.name" :value="item.status == 1 ? '启用' : '禁用'" @click="updateHandle(item)" />
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-list>

    <van-popup v-model="addPopup" position="right" :style="{ width: '100%' , height: '100%'}">
      <van-nav-bar title="新建" left-text="返回" right-text="提交" left-arrow @click-left="addPopup = false" @click-right="addData" />

      <van-form>

        <van-field v-model="formData.name" name="名称" label="名称" :rules="[{ required: true, message: '请输入名称' }]" />

        <van-field name="stepper" label="排序">
          <template #input>
            <van-stepper v-model="formData.sort" />
          </template>
        </van-field>

        <van-field name="switch" label="启用">
          <template #input>
            <van-switch v-model="switchChecked" size="20" />
          </template>
        </van-field>

      </van-form>

    </van-popup>

    <van-popup v-model="updatePopup" position="right" :style="{ width: '100%' , height: '100%'}">
      <van-nav-bar title="编辑" left-text="返回" right-text="提交" left-arrow @click-left="updatePopup = false" @click-right="updateData" />
      <van-form>

        <van-field v-model="formData.name" name="名称" label="名称" :rules="[{ required: true, message: '请输入名称' }]" />

        <van-field name="stepper" label="排序">
          <template #input>
            <van-stepper v-model="formData.sort" />
          </template>
        </van-field>

        <van-field name="switch" label="启用">
          <template #input>
            <van-switch v-model="switchChecked" size="20" />
          </template>
        </van-field>

      </van-form>
    </van-popup>

  </div>
</template>

<script>
import { getTimes, addTime, updateTime, deleteTime } from "@/api/time";
export default {
  name: "",
  data() {
    return {
      items: [],
      formData: {},
      addPopup: false,
      updatePopup: false,
      switchChecked: true,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await getTimes(0);
      this.items = data;
    },

    async addData() {
      if (this.switchChecked) {
        this.formData.status = 1;
      } else {
        this.formData.status = 0;
      }
      try {
        await addTime(this.formData);
        this.$toast("创建成功");
        this.addPopup = false;
        this.reset();
      } catch (error) {
        this.$toast("创建失败" + error);
      }
    },
    async updateData() {
      if (this.switchChecked) {
        this.formData.status = 1;
      } else {
        this.formData.status = 0;
      }
      try {
        await updateTime(this.formData);
        this.$toast("更新成功");
        this.updatePopup = false;
        this.reset();
      } catch (error) {
        this.$toast("更新失败" + error);
      }
    },
    async deleteData(index, id) {
      try {
        await deleteTime(id);
        this.items.splice(index, 1);
      } catch (error) {
        alert(error);
      }
    },
    reset() {
      this.switchChecked = true;
      this.formData = {};
      this.getData();
    },
    addHandle() {
      this.reset();
      this.addPopup = true;
    },
    updateHandle(item) {
      if (item.status == 1) {
        this.switchChecked = true;
      } else {
        this.switchChecked = false;
      }
      this.updatePopup = true;
      this.formData = item;
    },

    beforeClose({ position, instance }) {
      switch (position) {
        case "outside":
          instance.close();
          break;
        case "right":
          this.deleteData(instance.$attrs.index, instance.$attrs.id);
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