<template>
  <div>

    <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="提交"
      left-arrow
      fixed
      @click-left="$router.back(-1)"
      @click-right="save"
    />

    <van-form>
      <van-field
        v-model="formData.name"
        name="名称"
        label="名称"
        :rules="[{ required: true, message: '请输入菜品名称' }]"
      />

      <van-field
        v-model="formData.price"
        name="价格"
        label="价格"
        :rules="[{ required: true, message: '请输入菜品价格' }]"
      />

      <van-field
        name="stepper"
        label="排序"
      >
        <template #input>
          <van-stepper v-model="formData.sort" />
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="picker"
        :value="categoryName"
        label="分类"
        placeholder="点击选择分类"
        @click="showPicker = true"
      />
      <van-popup
        v-model="showPicker"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="categoryNames"
          :default-index="defaultIndex"
          @confirm="onCategoryConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field
        name="switch"
        label="启用"
      >
        <template #input>
          <van-switch
            v-model="switchChecked"
            size="20"
          />
        </template>
      </van-field>

      <van-field
        v-model="formData.desc"
        rows="3"
        autosize
        label="描述"
        type="textarea"
        maxlength="500"
        placeholder="请输入描述"
        show-word-limit
      />

      <van-field
        name="uploader"
        label="图片"
      >
        <template #input>
          <van-uploader
            :before-read="beforeUploadRead"
            :after-read="afterUploadRead"
            v-model="fileList"
            :max-count="1"
          />
        </template>
      </van-field>

    </van-form>

  </div>
</template>

<script>
import { getDishessById, addDishes, updateDishes } from "@/api/dishes";
import { getCategorys } from "@/api/category";
import { uploadImage } from "@/api/base";
export default {
  name: "DishesCreate",
  data() {
    return {
      formData: {},
      categoryNames: [],
      categoryName: "",
      categoryItems: [],
      defaultIndex: 0,
      switchChecked: true,
      dishesID: 0,
      showPicker: false,
      fileList: [],
      imgFile: "",
      title: "",
    };
  },
  computed: {},
  created() {
    //获取菜品ID，存在为编辑
    let { id } = this.$route.query;
    if (id) {
      this.getData(id);
      this.dishesID = id;
      this.title = "编辑菜品";
    } else {
      this.title = "新建菜品";
      //加载分类列表
      this.getCategoryList();
    }
  },

  methods: {
    onCategoryConfirm(value) {
      let categoryData = this.categoryItems.find((item) => {
        return item.name === value;
      });
      this.categoryName = value;
      this.formData.cid = categoryData.id;
      this.showPicker = false;
    },
    beforeUploadRead(file) {
      if (file.type != "image/jpeg" && file.type != "image/png") {
        this.$toast("请上传 jpg 或 png 格式图片");
        return false;
      }
      return true;
    },
    afterUploadRead(file) {
      this.imgFile = file;
    },
    async getData(id) {
      const { data } = await getDishessById(id);
      if (data.url) {
        this.fileList.push({ url: data.url });
      }
      this.formData = data;
      if (data.status == 0) {
        this.switchChecked = false;
      } else {
        this.switchChecked = true;
      }
      //加载分类列表
      this.getCategoryList();
    },
    async getCategoryList() {
      const { data } = await getCategorys();
      this.categoryItems = data;

      data.forEach((element) => {
        this.categoryNames.push(element.name);
      });

      if (this.formData.cid) {
        let categoryData = data.find((item) => {
          return item.id === this.formData.cid;
        });
        this.defaultIndex = this.categoryNames.indexOf(categoryData.name);
        this.categoryName = categoryData.name;
      }
    },
    async save() {
      if (this.imgFile) {
        let form = new FormData();
        form.append("file", this.imgFile.file);
        const { data } = await uploadImage(form);
        this.formData.url = "";
        this.formData.url = data.url;
      }
      if (this.switchChecked) {
        this.formData.status = 1;
      } else {
        this.formData.status = 0;
      }

      if (this.dishesID == 0) {
        try {
          await addDishes(this.formData);
          this.$toast("创建成功");
          this.$router.back(-1);
        } catch (error) {
          this.$toast("创建失败" + error);
        }
      } else {
        try {
          this.formData.id = this.dishesID;
          await updateDishes(this.formData);
          this.$toast("更新成功");
          this.$router.back(-1);
        } catch (error) {
          this.$toast("更新失败" + error);
        }
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.van-form{margin-top: 46px}
</style>