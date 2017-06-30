/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : company

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-30 20:51:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for controller
-- ----------------------------
DROP TABLE IF EXISTS `controller`;
CREATE TABLE `controller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) DEFAULT NULL,
  `themeId` int(11) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of controller
-- ----------------------------
INSERT INTO `controller` VALUES ('1', 'http://192.168.147.110:7979/Inter/controller.html', '1', '1');

-- ----------------------------
-- Table structure for db
-- ----------------------------
DROP TABLE IF EXISTS `db`;
CREATE TABLE `db` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  `themeId` int(11) DEFAULT NULL COMMENT '主题ID',
  `itemId` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '数据库ID',
  `ip` varchar(255) DEFAULT NULL,
  `port` varchar(255) DEFAULT NULL,
  `database` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `psw` varchar(255) DEFAULT NULL,
  `table` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `real` varchar(255) DEFAULT '1',
  `onz` varchar(255) DEFAULT NULL,
  `editable` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of db
-- ----------------------------
INSERT INTO `db` VALUES ('1', '顾客信息1', '1', '1', 'item1', 'mysql', 'localhost', '3306', 'alf', 'xz', '000000xz', 'customer', 'pname,tatel', '1', '1', '1');
INSERT INTO `db` VALUES ('2', '顾客信息2', '1', '1', 'item1', 'mysql', 'localhost', '3306', 'alf', 'xz', '000000xz', 'customer', 'pname,setyp', '0', '0', '1');
INSERT INTO `db` VALUES ('3', '订单信息', '1', '1', 'item2', 'mysql', 'localhost', '3306', 'alf', 'xz', '000000xz', 'orders', 'urgen,addrd', '1', '0', '1');
INSERT INTO `db` VALUES ('4', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('5', '某接口', '1', '3', 'item1', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('6', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('7', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('8', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('9', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('10', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('11', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('12', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('13', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');
INSERT INTO `db` VALUES ('14', '某接口', '1', '2', 'item2', 'interface', 'http:\\\\192.168.147.106:8888?id=1', null, null, null, null, null, 'name', '1', '1', '0');

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `themes` varchar(255) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of device
-- ----------------------------
INSERT INTO `device` VALUES ('1', '192.168.147.116', '大厅大屏', 'windows', 'show', '2,1', '1');
INSERT INTO `device` VALUES ('2', '192.168.147.118', '平板', 'IOS', 'ctrl', '', '1');
INSERT INTO `device` VALUES ('3', '192.168.147.103', '董事长电脑', 'windows', 'show', '1', '1');

-- ----------------------------
-- Table structure for manager
-- ----------------------------
DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `psw` varchar(255) DEFAULT NULL,
  `companyId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of manager
-- ----------------------------
INSERT INTO `manager` VALUES ('1', 'admin', '698D51A19D8A121CE581499D7B701668', '1');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `timestamp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES ('1', 'alf', '2017/6/6');
INSERT INTO `member` VALUES ('2', 'alf1', '2017/6/20');
INSERT INTO `member` VALUES ('3', 'alf2', '2017/6/21');

-- ----------------------------
-- Table structure for theme
-- ----------------------------
DROP TABLE IF EXISTS `theme`;
CREATE TABLE `theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of theme
-- ----------------------------
INSERT INTO `theme` VALUES ('1', 'http://www.jnoos.com', '1', '全渠道');
INSERT INTO `theme` VALUES ('2', 'http://www.jnoos.com/DXF/index.html', '1', '智能智造');
INSERT INTO `theme` VALUES ('3', 'http://www.newTheme.html', '1', '新主题');
SET FOREIGN_KEY_CHECKS=1;
