<template>
  <div id="choose">
    <van-nav-bar title="开始点菜" fixed left-arrow @click-left="$router.push('/mealOrder')" />
    <section>

      <div class="tabs">
        <div class="buttons">
          <span v-for="(item,index) in items" :key="index" @click="toggleHandle(index,$event)" :class="index == 0 ? 'tab active' : 'tab' ">{{item.name}}</span>
        </div>
        <div class="panels">
          <div class="panel" v-for="(item,index) in items" :key="index" :id="index">
            <div class="goods">
              <div class="item" v-for="(e,i) in item.dishes" :key="i">
                <div class="hd">
                  <img :src="e.url" alt="">
                </div>
                <div class="bd">
                  <strong>{{e.name}}</strong>
                  <span>{{e.price}}</span>
                </div>
                <div class="ft">
                  <van-stepper v-model="e.num" min="0" max="5" @change="steperChange(e)" default-value="0" theme="round" button-size="22" disable-input />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <footer>

      <button class="btn-cart" @click="cartPopup = true">
        <van-icon name="balance-list-o" :badge="amount" size="24" />
      </button>
      <span>{{total}}</span>
      <button @click="orderPopup=true" class="van-button--primary">提交</button>
    </footer>

    <van-popup v-model="cartPopup" position="bottom" :style="{ height: '40%'}">
      <div class="popup">
        <div class="popup-hd"><span>已选菜品</span></div>
        <div class="popup-bd">
          <div class="goods">
            <div class="item" v-for="(e,i) in cart" :key="i">
              <div class="hd">
                <img :src="e.url" alt="">
              </div>
              <div class="bd">
                <strong>{{e.name}}</strong>
                <span>{{e.price}}</span>
              </div>
              <div class="ft">
                <van-stepper v-model="e.num" min="0" max="5" @change="steperChange(e, 1)" default-value="0" theme="round" button-size="22" disable-input />
              </div>
            </div>
          </div>
        </div>
        <div class="popup-ft">
          <span>{{total}}</span>
          <button @click="orderPopup=true">提交</button>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="orderPopup" position="bottom" :style="{height: '100%'}">
      <van-nav-bar title="订单确认" left-arrow @click-left="orderPopup = false" />
      <section>
        <van-divider>菜品</van-divider>
        <div class="goods">
          <div class="item" v-for="(e,i) in cart" :key="i">
            <div class="hd">
              <img :src="e.url" alt="">
            </div>
            <div class="bd">
              <strong>{{e.name}}</strong>
              <span>{{e.price}}</span>
            </div>
            <div class="ft">
              <span>{{e.num}}/份</span>
            </div>
          </div>
        </div>
        <div class="total">合计：<span>{{total}}</span>元</div>
        <van-divider>备注</van-divider>
        <van-field v-model="remark" rows="3" autosize type="textarea" maxlength="50" placeholder="请填写客人有什么忌口等信息" show-word-limit />
      </section>
      <footer>
        <button @click="submitOrder" class="van-button--primary">提交</button>
      </footer>
    </van-popup>

  </div>
</template>

<script>
import { getDishesList } from "@/api/dishes";
import {
  getOrderBySeatOn,
  addOrder,
  updateOrder,
  addOrderDishes,
  deleteOrderDishes,
} from "@/api/order";
import { getSeatById, updateSeat } from "@/api/seat";
import { addClass, removeClass, generateID } from "@/utils";
import dayjs from "dayjs";

export default {
  name: "choose",
  data() {
    return {
      dateTime: dayjs().format("HH:mm:ss"),
      cartPopup: false,
      orderPopup: false,
      amount: 0,
      total: 0,
      dishesIds: [],
      cart: [],
      items: [],
      remark: "",
      isEdit: false,
      orderId: "",
    };
  },
  created() {
    this.onLoad();
    setInterval(() => {
      this.dateTime = dayjs().format("HH:mm:ss");
    }, 1000);
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getDishesList(); //获取菜品列表
        this.items = data;
        //校验当前桌号是否使用
        this.verifySeatNo();
      } catch (error) {
        this.$toast("未能成功加载");
      }
    },
    async verifySeatNo() {
      let seat_no = this.$route.query.seat_no;
      const { data } = await getSeatById(seat_no);
      if (data.status === 0) {
        this.isEdit = true;
        this.getData(data.id);
      } else {
        this.isEdit = false;
      }
    },

    async getData(id) {
      const { data } = await getOrderBySeatOn(id);
      this.orderId = data.id;
      console.log(data);
      await this.items.forEach((element) => {
        element.dishes.forEach((ele) => {
          data.dishes.forEach((e) => {
            if (e.id == ele.id) {
              ele.num = e.order_dishes.dishes_num;
            }
          });
        });
      });
    },

    async submitOrder() {
      if (this.cart.length == 0) {
        this.$toast("还未请选择任何菜品，无法提交");
        return;
      }

      let seat_no = this.$route.query.seat_no;
      if (this.isEdit) {
        await updateOrder({
          id: this.orderId,
          repast_date: dayjs().format("YYYY-MM-DD"),
          repast_time: dayjs().format("HH:mm:ss"),
          seat_no: seat_no,
          remark: this.remark,
        });

        await deleteOrderDishes(this.orderId);

        let order_detail_data = [];
        await this.cart.forEach((element) => {
          order_detail_data.push({
            order_id: this.orderId,
            dishes_id: element.id,
            dishes_num: element.num,
            dishes_price: element.price,
          });
        });
        //插入订单明细
        await addOrderDishes(order_detail_data);
      } else {
        try {
          //修改当前桌号状态为使用中,买单后状态修改为未使用；
          await updateSeat({
            id: seat_no,
            status: 0,
          });
        } catch (error) {
          this.$toast("提交失败" + error);
          return;
        }
        try {
          //提交订单
          const { data } = await addOrder({
            order_number: generateID(),
            repast_date: dayjs().format("YYYY-MM-DD"),
            repast_time: dayjs().format("HH:mm:ss"),
            seat_no: seat_no,
            remark: this.remark,
          });
          let order_detail_data = [];
          await this.cart.forEach((element) => {
            order_detail_data.push({
              order_id: data.id,
              dishes_id: element.id,
              dishes_num: element.num,
              dishes_price: element.price,
            });
          });
          //插入订单明细
          await addOrderDishes(order_detail_data);
        } catch (error) {
          this.$toast("提交失败" + error);
        }
      }

      this.$router.push({
        path: "/mealOrder/complete",
        query: { seat_no: seat_no },
      }); //跳转
    },
    toggleHandle(index, event) {
      let self = event.target;
      document.querySelectorAll(".tab").forEach((element) => {
        removeClass(element, "active");
      });
      addClass(self, "active");
      document.querySelectorAll(".panel").forEach((element) => {
        element.style.display = "none";
      });
      document.getElementById(index).style.display = "block";
    },
    steperChange(data, type) {
      let arr = new Set(this.dishesIds);
      if (Array.from(arr).indexOf(data.id) == -1) {
        this.cart.push({
          mid: 0,
          id: data.id,
          num: data.num,
          name: data.name,
          price: data.price,
          url: data.url,
          cid: data.cid,
        });
        this.dishesIds.push(data.id);
      } else {
        if (type == 1 && data.num >= 0) {
          this.steperSnyc(data, data.num);
        } else {
          this.steperRemove(data);
        }
      }
      this.calcNumber();
      this.calcPrice();
    },
    steperSnyc(data, num) {
      let cate_res = this.items.filter((item) => {
        return item.id == data.cid;
      });
      if (cate_res) {
        let dish_res = cate_res[0].dishes.filter((item) => {
          return item.id == data.id;
        });
        if (dish_res) {
          dish_res[0].num = num;
        }
      }
    },
    steperRemove(data) {
      let res = this.cart.filter((item) => {
        return item.id == data.id;
      });

      res[0].num = data.num;

      if (data.num == 0) {
        let index = this.cart.indexOf(res[0]);

        if (index > -1) {
          this.cart.splice(index, 1);
          let i = this.dishesIds.indexOf(data.id);
          if (i > -1) {
            this.dishesIds.splice(i, 1);
          }
        }
      }
    },
    calcNumber() {
      let sum = 0;
      this.cart.forEach((element) => {
        sum += element.num;
      });
      this.amount = sum;
    },
    calcPrice() {
      let sum = 0;
      this.cart.forEach((element) => {
        sum += element.num * element.price;
      });
      this.total = sum;
    },
  },
};
</script>
<style lang="scss" scoped>
section {
  margin-bottom: 44px;
}
</style>
