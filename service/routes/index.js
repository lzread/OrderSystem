/**
 ├── routes
 └── index.js
 */
const Router = require('koa-router')

const UserController = require('../controllers/user')
const DishesController = require('../controllers/dishes')
const CategoryController = require('../controllers/category')

const CartController = require('../controllers/cart')
const MemberController = require('../controllers/member')
const OrderController = require('../controllers/order')
const OrderDishesController = require('../controllers/order_dishes')

const TimeController = require('../controllers/time')
const SeatController = require('../controllers/seat')
const PeopleController = require('../controllers/people')

const BaseController = require('../controllers/base')
const router = new Router({
    prefix: '/api'
})


/**
 * 用户相关接口
 */

//登录
router.post('/user/login', UserController.login);

/**
 * 菜品相关接口
 */

//查询菜品列表
router.get('/dishes/getDishess', DishesController.getDishess);
//根据菜品ID查询菜品详细
router.get('/dishes/getDishessById/:id', DishesController.getDishessById);
//添加菜品
router.post('/dishes/addDishes', DishesController.addDishes);
//更新菜品
router.post('/dishes/updateDishes', DishesController.updateDishes);
//删除菜品
router.post('/dishes/deleteDishes/:id', DishesController.deleteDishes);

router.get('/dishes/getDishesList', DishesController.getDishesList);
/**
 * 分类相关接口
 */

//查询分类列表
router.get('/category/getCategorys', CategoryController.getCategorys);
//根据分类ID查询分类详细
router.get('/category/getCategoryById/:id', CategoryController.getCategoryById);
//添加分类
router.post('/category/addCategory', CategoryController.addCategory);
//更新分类
router.post('/category/updateCategory', CategoryController.updateCategory);
//删除分类
router.post('/category/deleteCategory/:id', CategoryController.deleteCategory);
//查询分类列表,过滤未启用的分类
router.get('/category/getCategoryList', CategoryController.getCategoryList);


router.get('/cart/getCartById/:id', CartController.getCartById);
router.post('/cart/addCart', CartController.addCart);
router.post('/cart/deleteCartById/:id', CartController.deleteCartById);


router.get('/order/getOrderBySeatOn/:id', OrderController.getOrderBySeatOn);
router.post('/order/addOrder', OrderController.addOrder);
router.post('/order/updateOrder', OrderController.updateOrder);
router.post('/order/addOrderDishes', OrderDishesController.addOrderDishes);
router.post('/order/updateOrderDishes', OrderDishesController.updateOrderDishes);
router.post('/order/deleteOrderDishes/:id', OrderDishesController.deleteOrderDishes);


router.get('/time/getTimes/:type', TimeController.getTimes);
router.post('/time/addTime', TimeController.addTime);
router.post('/time/updateTime', TimeController.updateTime);
router.post('/time/deleteTime/:id', TimeController.deleteTime);

router.get('/seat/getSeats/:type', SeatController.getSeats);
router.get('/seat/getSeatById/:id', SeatController.getSeatById);
router.post('/seat/addSeat', SeatController.addSeat);
router.post('/seat/updateSeat', SeatController.updateSeat);
router.post('/seat/deleteSeat/:id', SeatController.deleteSeat);

router.get('/people/getPeoples/:type', PeopleController.getPeoples);
router.post('/people/addPeople', PeopleController.addPeople);
router.post('/people/updatePeople', PeopleController.updatePeople);
router.post('/people/deletePeople/:id', PeopleController.deletePeople);


/**
 * 基础通用接口
 */

//上传图片
router.post('/base/uploadImage', BaseController.uploadImage);

module.exports = router
