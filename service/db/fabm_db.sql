/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : fabm_db

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2020-09-04 17:45:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) DEFAULT NULL,
  `did` int(11) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `did` (`did`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`did`) REFERENCES `dishes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of carts
-- ----------------------------
INSERT INTO `carts` VALUES ('1', '0', '4', '1', '1');
INSERT INTO `carts` VALUES ('2', '0', '8', '1', '1');
INSERT INTO `carts` VALUES ('3', '0', '8', '1', '1');
INSERT INTO `carts` VALUES ('4', '0', '7', '1', '1');
INSERT INTO `carts` VALUES ('5', '0', '4', '1', '1');
INSERT INTO `carts` VALUES ('6', '0', '4', '1', '1');
INSERT INTO `carts` VALUES ('7', '0', '4', '1', '1');
INSERT INTO `carts` VALUES ('8', '0', '4', '1', '1');
INSERT INTO `carts` VALUES ('9', '0', '4', '1', '1');
INSERT INTO `carts` VALUES ('10', '0', '4', '1', '1');
INSERT INTO `carts` VALUES ('11', '0', '4', '1', '1');

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sort` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES ('3', '热卖推荐', '15', '1');
INSERT INTO `categories` VALUES ('4', '热菜', '4', '1');
INSERT INTO `categories` VALUES ('5', '凉菜', '1', '1');
INSERT INTO `categories` VALUES ('6', '汤面类', '1', '1');
INSERT INTO `categories` VALUES ('7', '港式烧味', '1', '1');
INSERT INTO `categories` VALUES ('8', '饮品', '1', '1');
INSERT INTO `categories` VALUES ('9', '靓汤', '1', '1');
INSERT INTO `categories` VALUES ('10', '炒饭', '1', '1');
INSERT INTO `categories` VALUES ('11', '卤味', '1', '1');
INSERT INTO `categories` VALUES ('12', '啤酒', '1', '1');
INSERT INTO `categories` VALUES ('13', '甜品', '1', '1');
INSERT INTO `categories` VALUES ('14', '新品', '19', '1');
INSERT INTO `categories` VALUES ('15', '台湾风味', '1', '1');
INSERT INTO `categories` VALUES ('16', '四川风味', '1', '1');
INSERT INTO `categories` VALUES ('17', '东北风味', '1', '1');

-- ----------------------------
-- Table structure for dishes
-- ----------------------------
DROP TABLE IF EXISTS `dishes`;
CREATE TABLE `dishes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `desc` text,
  `sort` int(11) DEFAULT '0',
  `cid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`),
  CONSTRAINT `dishes_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of dishes
-- ----------------------------
INSERT INTO `dishes` VALUES ('4', '麦辣鸡汉堡套餐', '0.75', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183231622.jpg', '', '1', '3', '1');
INSERT INTO `dishes` VALUES ('5', '凉拌腐竹', '0.66', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183349550.png', '', '1', '5', '1');
INSERT INTO `dishes` VALUES ('6', '锅包肉', '6.00', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183357408.png', '', '1', '4', '1');
INSERT INTO `dishes` VALUES ('7', '鱼香肉丝', '6.00', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183366161.jpg', '', '1', '4', '1');
INSERT INTO `dishes` VALUES ('8', '糖醋鱼段', '5.00', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183469792.jpg', '', '1', '4', '1');
INSERT INTO `dishes` VALUES ('9', '拌花菜', '2.00', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183374265.jpg', '', '1', '5', '1');
INSERT INTO `dishes` VALUES ('10', '香辣蟹', '15.00', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183383842.jpg', '', '1', '14', '1');
INSERT INTO `dishes` VALUES ('11', '辣炒蚬子', '2.00', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183438456.jpg', '', '1', '14', '1');
INSERT INTO `dishes` VALUES ('12', '花卷', '0.5', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183447384.jpg', '', '1', '15', '1');
INSERT INTO `dishes` VALUES ('13', '口水鸡', '9.00', 'http://lzread.oss-cn-shanghai.aliyuncs.com/20200941599183454807.jpg', '', '1', '5', '1');

-- ----------------------------
-- Table structure for members
-- ----------------------------
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(255) NOT NULL,
  `real_name` varchar(255) NOT NULL,
  `sex` int(11) NOT NULL DEFAULT '-1',
  `birth_date` datetime NOT NULL,
  `phone` varchar(255) NOT NULL,
  `openid` varchar(255) NOT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of members
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) NOT NULL,
  `mid` int(11) NOT NULL,
  `repast_date` datetime DEFAULT NULL,
  `repast_time` int(11) DEFAULT NULL,
  `repast_number` int(11) DEFAULT NULL,
  `seat_no` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', '202009041599210276000', '0', null, null, '2', '3', 'sss', '1');
INSERT INTO `orders` VALUES ('2', '202009041599212459000', '0', null, null, '2', '3', 'sss', '1');

-- ----------------------------
-- Table structure for order_dishes
-- ----------------------------
DROP TABLE IF EXISTS `order_dishes`;
CREATE TABLE `order_dishes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `dishes_id` int(11) NOT NULL,
  `dishes_num` int(11) NOT NULL,
  `dishes_price` varchar(255) NOT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of order_dishes
-- ----------------------------

-- ----------------------------
-- Table structure for people
-- ----------------------------
DROP TABLE IF EXISTS `people`;
CREATE TABLE `people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sort` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of people
-- ----------------------------
INSERT INTO `people` VALUES ('2', '1~2/人', '10', '1');
INSERT INTO `people` VALUES ('3', '2~4/人', '9', '1');
INSERT INTO `people` VALUES ('4', '4~6/人', '8', '1');
INSERT INTO `people` VALUES ('5', '6~12/人', '7', '1');
INSERT INTO `people` VALUES ('6', '12~20/人', '6', '1');
INSERT INTO `people` VALUES ('7', '20人以上', '5', '1');

-- ----------------------------
-- Table structure for seats
-- ----------------------------
DROP TABLE IF EXISTS `seats`;
CREATE TABLE `seats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sort` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of seats
-- ----------------------------
INSERT INTO `seats` VALUES ('3', '101号桌', '100', '1');
INSERT INTO `seats` VALUES ('4', '102号桌', '99', '1');
INSERT INTO `seats` VALUES ('5', '103号桌', '98', '1');
INSERT INTO `seats` VALUES ('6', '104号桌', '97', '1');
INSERT INTO `seats` VALUES ('7', '105号桌', '96', '1');
INSERT INTO `seats` VALUES ('8', '106号桌', '95', '1');
INSERT INTO `seats` VALUES ('9', '107号桌', '94', '1');
INSERT INTO `seats` VALUES ('10', '108号桌', '93', '1');
INSERT INTO `seats` VALUES ('11', '109号桌', '92', '1');
INSERT INTO `seats` VALUES ('12', '110号桌', '91', '1');
INSERT INTO `seats` VALUES ('13', '111号桌', '90', '1');
INSERT INTO `seats` VALUES ('14', '112号桌', '89', '1');
INSERT INTO `seats` VALUES ('15', '113号桌', '88', '1');
INSERT INTO `seats` VALUES ('16', '114号桌', '87', '1');
INSERT INTO `seats` VALUES ('17', '115号桌', '86', '1');
INSERT INTO `seats` VALUES ('18', '“春”包间', '85', '1');
INSERT INTO `seats` VALUES ('19', '“夏”包间', '84', '1');
INSERT INTO `seats` VALUES ('20', '“秋”包间', '83', '1');
INSERT INTO `seats` VALUES ('21', '“冬”包间', '82', '1');

-- ----------------------------
-- Table structure for times
-- ----------------------------
DROP TABLE IF EXISTS `times`;
CREATE TABLE `times` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sort` int(11) DEFAULT '0',
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of times
-- ----------------------------
INSERT INTO `times` VALUES ('17', '早茶(9:00~11:00)', '5', '1');
INSERT INTO `times` VALUES ('18', '午餐(11:00~14:00)', '4', '1');
INSERT INTO `times` VALUES ('20', '晚餐(16:00~22:00)', '3', '1');
INSERT INTO `times` VALUES ('21', '夜宵(22:00~02:00)', '2', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '18241172058', '123456', '1');
