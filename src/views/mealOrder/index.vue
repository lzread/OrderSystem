<template>
  <div id="guide">
    <van-nav-bar title="点菜宝" fixed left-arrow @click-left="$router.push('/')" />
    <section>

      <h1>{{dateTime}}</h1>
      <div class="seats">

        <div class="item" v-for="(item,index) in items" :key="index" @click="enter(item)" :data-status="item.status">
          <van-icon name="sign" v-show="item.status == 0" size="24" />
          <van-icon name="underway-o" v-show="item.status == 1" size="24" />
          <strong>{{item.name}}</strong>
        </div>

      </div>
    </section>

    <van-popup v-model="orderView" position="bottom" :style="{ height: '70%' }">
      <div class="popup">
        <div class="popup-bd">

          <div class="order">
            <div class="hd">
              <van-divider>{{orderData.seat_name}}信息</van-divider>
              <span>订单编号：{{orderData.order_number}}</span>
              <span>就餐时间：{{orderData.repast_date}} {{orderData.repast_time}}</span>
              <span>备注信息：{{orderData.remark}}</span>
            </div>
            <div class="bd">
              <van-divider>已点菜品</van-divider>
              <div class="goods">
                <div class="item" v-for="(e,i) in orderData.dishes" :key="i">
                  <div class="hd">
                    <img :src="e.url" alt="">
                  </div>
                  <div class="bd">
                    <strong>{{e.name}}</strong>
                    <span>{{e.price}}</span>
                  </div>
                  <div class="ft">
                    <span>{{e.order_dishes.dishes_num}}/份</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="ft">
              <span>合计金额：<em>{{total}}</em><small>元</small></span>
            </div>

          </div>
        </div>
        <div class="popup-ft">
          <button class="van-button--primary" @click="handle(1,orderData)">扫码买单</button>
          <button class="van-button--warning" @click="handle(2,orderData)">增减菜品</button>
          <button class="van-button--info" @click="handle(3,orderData)">取消点单</button>
        </div>
      </div>

    </van-popup>

  </div>
</template>

<script>
import { getSeats, updateSeat } from "@/api/seat";
import { getOrderBySeatOn, updateOrder } from "@/api/order";
import dayjs from "dayjs";

export default {
  name: "guide",
  data() {
    return {
      items: [],
      orderData: {},
      orderView: false,
      dateTime: dayjs().format("YYYY年MM月DD日 HH:mm:ss"),
      total: 0,
    };
  },
  computed: {},
  created() {
    this.onLoad();
    setInterval(() => {
      this.dateTime = dayjs().format("YYYY年MM月DD日 HH:mm:ss");
    }, 1000);
  },
  methods: {
    async onLoad() {
      const { data } = await getSeats(0);
      this.items = data;
    },
    async enter(item) {
      if (item.status == 0) {
        //当前桌已使用,显示订单明细
        this.orderView = true;
        const { data } = await getOrderBySeatOn(item.id);
        this.orderData = data;
        this.orderData.seat_name = item.name;
        data.dishes.forEach((e) => {
          this.total += e.subtotal;
        });
      } else {
        //当前桌未使用，可以进行点菜
        this.$router.push({
          path: "/mealOrder/choose",
          query: { seat_no: item.id },
        }); //跳转
      }
    },
    async handle(key, data) {
      switch (key) {
        case 1:
          this.$router.push({
            path: "/mealOrder/pay",
            query: { seat_no: data.seat_no },
          }); //跳转
          break;
        case 2:
          this.$router.push({
            path: "/mealOrder/choose",
            query: { seat_no: data.seat_no },
          }); //跳转
          break;
        case 3:
          //改变订单状态 和 桌号状态
          try {
            await updateOrder({
              id: data.id,
              status: -1,
            });
            await updateSeat({
              id: data.seat_no,
              status: 1,
            });
            this.$toast("取消成功");
            this.onLoad();
            this.orderView = false;
          } catch (error) {
            this.$toast("取消失败");
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  border: 1px solid #eee;
  margin: 10px;
  padding: 10px;
  background: #2a2a2a;
  color: #eee;
  border-radius: 4px;
}
</style>
