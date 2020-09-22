<template>
  <div id="">
    <van-nav-bar title="扫码支付" fixed left-arrow @click-left="$router.push('/mealOrder')" />
    <section>

      <div class="paybody">
        <van-divider>扫一扫</van-divider>
        <div class="qrcode">
          <img src="@/assets/images/qrcode.png" alt="">
        </div>
        <van-divider>订单信息</van-divider>
        <span>订单编号：{{orderData.order_number}}</span>
        <span>就餐时间：{{orderData.repast_date}}{{orderData.repast_time}}</span>
        <span>订单金额：{{total}}元</span>
      </div>

    </section>
    <footer>
      <button class="van-button--primary" @click="succees">模拟成功回调</button>
      <button class="van-button--info" @click="fail">模拟失败回调</button>
    </footer>
  </div>
</template>

<script>
import { updateSeat } from "@/api/seat";
import { getOrderBySeatOn, updateOrder } from "@/api/order";
export default {
  name: "",
  data() {
    return {
      orderData: {},
      total: 0,
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      let seat_no = this.$route.query.seat_no;
      const { data } = await getOrderBySeatOn(seat_no);
      this.orderData = data;
      data.dishes.forEach((e) => {
        this.total += e.subtotal;
      });
    },
    async succees() {
      //改变订单状态 和 桌号状态
      try {
        await updateOrder({
          id: this.orderData.id,
          status: 2,
        });
        await updateSeat({
          id: this.orderData.seat_no,
          status: 1,
        });
        this.$toast("回调成功");
        this.$router.push('/mealOrder')
      } catch (error) {
        this.$toast("回调失败");
      }
    },
    fail() {},
  },
};
</script>
<style lang="scss" scoped>
section {
  margin-bottom: 44px;
}
.paybody {
  img {
    margin: 30px auto;
    width: 240px;
    display: block;
  }
  span {
    display: block;
    padding: 5px 20px;
  }
}
</style>
