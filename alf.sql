/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : alf

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-30 20:51:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL COMMENT '客户编号',
  `parte` varchar(255) DEFAULT NULL COMMENT '会员编号',
  `pname` varchar(255) DEFAULT NULL COMMENT '客户姓名',
  `setyp` int(11) DEFAULT NULL COMMENT '客户性别',
  `tatel` double DEFAULT NULL COMMENT '联系电话',
  `iswxmbs` int(11) DEFAULT NULL COMMENT '是否微会员',
  `timestamp` datetime DEFAULT NULL COMMENT '入会时间',
  `grade` varchar(255) DEFAULT NULL COMMENT '会员等级',
  `storeId` int(11) DEFAULT NULL COMMENT '入会所在店铺',
  PRIMARY KEY (`id`),
  KEY `storeId` (`storeId`),
  CONSTRAINT `storeId` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('111', '2323', '张西子', '2', '13333333333', '1', '2017-06-06 00:08:03', '1', '300');
INSERT INTO `customer` VALUES ('112', '2324', '王静', '2', '1339938393', '1', '2017-06-09 14:42:06', '1', '300');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL COMMENT '商品编码',
  `name` varchar(255) DEFAULT NULL COMMENT '商品的名称',
  `tprot` varchar(255) DEFAULT NULL COMMENT '定制属性',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('100', '衬衫', '手臂，口袋，袖扣');
INSERT INTO `goods` VALUES ('101', '牛仔裤', '裤脚，口袋');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `oid` int(11) NOT NULL COMMENT '订单号',
  `urgen` varchar(255) DEFAULT NULL COMMENT '紧急度',
  `kunnr` int(11) DEFAULT NULL COMMENT '客户编码',
  `tailor` int(11) DEFAULT NULL COMMENT '量体师',
  `addrd` varchar(255) DEFAULT NULL COMMENT '发货地址',
  `matnrId` int(11) DEFAULT NULL COMMENT '商品编码',
  `proline` varchar(255) DEFAULT NULL COMMENT '生产线',
  `time` datetime DEFAULT NULL COMMENT '订单生成日期',
  `location` varchar(255) DEFAULT NULL COMMENT '站点工位',
  `amt` varchar(255) DEFAULT NULL COMMENT '金额',
  `store` int(11) DEFAULT NULL COMMENT '所属店铺',
  `tprop` varchar(255) DEFAULT '' COMMENT '商品定制因子(数组)',
  PRIMARY KEY (`oid`),
  KEY `tailor` (`tailor`) USING BTREE,
  KEY `kunnr` (`kunnr`) USING BTREE,
  KEY `matnrId` (`matnrId`) USING BTREE,
  CONSTRAINT `kunnr` FOREIGN KEY (`kunnr`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `matnrId` FOREIGN KEY (`matnrId`) REFERENCES `goods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tailor` FOREIGN KEY (`tailor`) REFERENCES `tailor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('13123123', '加急', '111', '222', '上海市徐家汇111号', '100', '7201', '2017-06-06 11:11:11', '1', '111', '300', '2,1,0');
INSERT INTO `orders` VALUES ('13123124', '加急', '111', '222', '上海市徐家汇111号', '101', '7201', '2017-06-06 11:11:11', '2', '111', '300', '2,1');
INSERT INTO `orders` VALUES ('13123125', '加急', '111', '222', '上海市徐家汇111号', '101', '7201', '2017-06-06 11:11:11', '3', '111', '300', '2,1');
INSERT INTO `orders` VALUES ('13123126', '加急', '111', '222', '上海市徐家汇111号', '101', '7201', '2017-06-06 11:11:11', '4', '111', '300', '2,1');
INSERT INTO `orders` VALUES ('13123127', '加急', '111', '222', '上海市徐家汇111号', '101', '7202', '2017-06-06 11:11:11', '1', '111', '300', '2,1');
INSERT INTO `orders` VALUES ('13123128', '加急', '111', '222', '上海市徐家汇111号', '101', '7202', '2017-06-06 11:11:11', '2', '111', '300', '2,1');
INSERT INTO `orders` VALUES ('13123129', '加急', '111', '222', '上海市徐家汇111号', '101', '7202', '2017-06-06 11:11:11', '3', '111', '300', '2,1');

-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '门店名称',
  `city` varchar(255) DEFAULT NULL COMMENT '所在城市',
  `brand` varchar(255) DEFAULT NULL COMMENT '所属品牌',
  `addrd` varchar(255) DEFAULT NULL COMMENT '门店地址',
  `longitude` varchar(255) DEFAULT NULL COMMENT '店铺经度',
  `latitude` varchar(255) DEFAULT NULL COMMENT '店铺纬度',
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of store
-- ----------------------------
INSERT INTO `store` VALUES ('300', '惊鸿路专卖店', '上海', 'ALF', '上海市惊鸿路300号', null, null);

-- ----------------------------
-- Table structure for tailor
-- ----------------------------
DROP TABLE IF EXISTS `tailor`;
CREATE TABLE `tailor` (
  `id` int(11) NOT NULL COMMENT '量体师编号',
  `name` varchar(255) DEFAULT NULL COMMENT '量体师姓名',
  `store` int(11) DEFAULT NULL COMMENT '所属门店',
  PRIMARY KEY (`id`),
  KEY `store` (`store`),
  CONSTRAINT `store` FOREIGN KEY (`store`) REFERENCES `store` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tailor
-- ----------------------------
INSERT INTO `tailor` VALUES ('222', '阿立', '300');
SET FOREIGN_KEY_CHECKS=1;
