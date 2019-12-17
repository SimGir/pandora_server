/*
SQLyog Ultimate v11.26 (32 bit)
MySQL - 10.1.19-MariaDB : Database - pandora
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`pandora` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `pandora`;

/*Table structure for table `pandora_index_carousel` */

DROP TABLE IF EXISTS `pandora_index_carousel`;

CREATE TABLE `pandora_index_carousel` (
  `carousel_id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(128) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL,
  `href` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`carousel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `pandora_index_carousel` */

/*Table structure for table `pandora_order` */

DROP TABLE IF EXISTS `pandora_order`;

CREATE TABLE `pandora_order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单编号',
  `status` int(11) DEFAULT NULL COMMENT '订单状态 1:等待发货 2:运输中 3:已签收 4:已取消',
  `order_time` bigint(20) DEFAULT NULL COMMENT '下单时间',
  `deliver_time` bigint(20) DEFAULT NULL COMMENT '发货时间',
  `received_time` bigint(20) DEFAULT NULL COMMENT '收货时间',
  `address_id` int(11) DEFAULT NULL COMMENT '收货地址',
  `user_id` int(11) DEFAULT NULL COMMENT '下单用户',
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `pandora_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `pandora_user` (`user_id`),
  CONSTRAINT `pandora_order_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `pandora_receiver_address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_order` */

insert  into `pandora_order`(`order_id`,`status`,`order_time`,`deliver_time`,`received_time`,`address_id`,`user_id`) values (15,4,1574061133166,NULL,NULL,2,3),(16,3,1574061314446,NULL,1574132277165,2,3),(17,4,1574061375748,NULL,NULL,2,3),(18,3,1574061388860,NULL,1574132654653,2,3),(19,1,1574061464221,NULL,NULL,2,3),(20,1,1574061577503,NULL,NULL,2,3),(21,1,1574061673222,NULL,NULL,2,3),(22,1,1574061747573,NULL,NULL,2,3),(23,1,1574062050605,NULL,NULL,2,3),(24,1,1574062957077,NULL,NULL,2,3),(25,3,1574082876329,NULL,1574132725804,1,3),(26,4,1574135974996,NULL,NULL,10,4),(27,4,1574136359269,NULL,NULL,11,6),(28,1,1574330202735,NULL,NULL,1,3),(29,1,1574331162005,NULL,NULL,12,3),(30,1,1574334172360,NULL,NULL,12,3),(31,4,1575866823673,NULL,NULL,12,3),(32,4,1575870367551,NULL,NULL,13,4),(33,3,1575870935046,NULL,1575870945278,15,4),(34,1,1575873037903,NULL,NULL,2,3),(35,1,1575873085542,NULL,NULL,6,3),(36,1,1575874597055,NULL,NULL,15,4),(37,1,1575874688865,NULL,NULL,15,4),(38,1,1575880832446,NULL,NULL,12,3);

/*Table structure for table `pandora_order_detail` */

DROP TABLE IF EXISTS `pandora_order_detail`;

CREATE TABLE `pandora_order_detail` (
  `order_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `counts` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `pandora_order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `pandora_order` (`order_id`),
  CONSTRAINT `pandora_order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `pandora_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_order_detail` */

insert  into `pandora_order_detail`(`order_detail_id`,`order_id`,`product_id`,`counts`) values (29,15,25,1),(30,15,19,3),(31,16,25,1),(32,16,21,1),(33,17,25,1),(34,18,25,1),(35,19,19,1),(36,19,26,1),(37,20,25,1),(38,21,5,1),(39,21,13,1),(40,22,5,1),(41,22,12,1),(42,23,21,1),(43,23,19,1),(44,24,5,1),(45,24,21,1),(46,25,5,2),(47,26,13,1),(48,26,26,1),(49,27,5,1),(50,27,13,1),(51,30,10,2),(52,30,5,3),(53,31,20,4),(54,31,25,2),(55,31,26,2),(56,32,25,1),(57,32,32,1),(58,33,23,2),(59,33,51,2),(60,34,27,2),(61,34,1,1),(62,35,27,2),(63,35,1,1),(64,36,26,1),(65,37,2,1),(66,38,11,1);

/*Table structure for table `pandora_page_product` */

DROP TABLE IF EXISTS `pandora_page_product`;

CREATE TABLE `pandora_page_product` (
  `page_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `page_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`page_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `pandora_page_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `pandora_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_page_product` */

insert  into `pandora_page_product`(`page_id`,`product_id`,`page_name`) values (1,1,'gift'),(2,2,'gift'),(4,5,'gift'),(5,6,'gift'),(6,10,'gift'),(7,11,'gift'),(8,12,'gift'),(9,13,'gift'),(10,14,'gift'),(11,15,'gift'),(12,16,'gift'),(13,17,'gift'),(14,19,'gift'),(15,20,'gift'),(16,21,'gift'),(17,22,'gift'),(18,23,'gift'),(19,24,'gift'),(20,25,'gift'),(21,26,'gift'),(22,27,'gift'),(23,28,'gift');

/*Table structure for table `pandora_product` */

DROP TABLE IF EXISTS `pandora_product`;

CREATE TABLE `pandora_product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL COMMENT '商品名称',
  `img1` varchar(100) DEFAULT NULL COMMENT '商品图片',
  `img2` varchar(100) DEFAULT NULL COMMENT '部分产品鼠标悬停时会切换图片',
  `price` decimal(10,2) DEFAULT NULL COMMENT '商品价格',
  `subtitle` varchar(128) DEFAULT NULL,
  `spec` varchar(64) DEFAULT NULL COMMENT '商品规格',
  `details` varchar(1024) DEFAULT NULL,
  `mark` tinyint(1) DEFAULT NULL COMMENT '促销标签',
  `family_id` int(11) DEFAULT NULL COMMENT '商品家族，同一商品不同规格',
  `category_id` int(11) DEFAULT NULL COMMENT '商品分类',
  PRIMARY KEY (`product_id`),
  KEY `family_id` (`family_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `pandora_product_ibfk_1` FOREIGN KEY (`family_id`) REFERENCES `pandora_product_family` (`family_id`),
  CONSTRAINT `pandora_product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `pandora_product_category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_product` */

insert  into `pandora_product`(`product_id`,`title`,`img1`,`img2`,`price`,`subtitle`,`spec`,`details`,`mark`,`family_id`,`category_id`) values (1,'繁星童话','img/BPVD00010-1.jpg',NULL,'2180.00',NULL,'15cm',NULL,1,1,1),(2,'一生所爱','img/BPVD00022-1.jpg',NULL,'3088.00',NULL,'15cm',NULL,0,2,1),(5,'爱意萌动','img/BPVD00030-1.jpg',NULL,'946.00',NULL,'15cm',NULL,0,3,1),(6,'浪漫爱恋','img/ZT0123-1.jpg',NULL,'2112.00',NULL,'15cm',NULL,1,4,1),(7,'繁星童话','img/BPVD00010-1.jpg',NULL,'2180.00',NULL,'17cm',NULL,1,1,1),(8,'繁星童话','img/BPVD00010-1.jpg',NULL,'2180.00',NULL,'19cm',NULL,1,1,1),(9,'繁星童话','img/BPVD00010-1.jpg',NULL,'2180.00',NULL,'21cm',NULL,1,1,1),(10,'PANDORA我爱你礼品套装','img/B800880-1.jpg',NULL,'1798.00',NULL,'金色',NULL,0,5,1),(11,'璀璨之心','img/ZT0134-1.jpg',NULL,'1146.00',NULL,'15cm',NULL,1,6,1),(12,'清新热恋串饰','img/797826CZRMX-1.jpg',NULL,'648.00',NULL,'多色',NULL,0,7,2),(13,'倾心热恋固定夹','img/797838CZRMX-1.jpg',NULL,'368.00',NULL,'多色',NULL,0,8,2),(14,'爱之箭吊饰','img/767816CZ-1.jpg',NULL,'698.00',NULL,'银色、金色',NULL,1,9,2),(15,'小爱神吊饰','img/767796CZ-1.jpg',NULL,'548.00',NULL,'银色',NULL,1,10,2),(16,'闪耀之箭吊饰','img/797827CZMX-1.jpg',NULL,'398.00',NULL,'银色、金色',NULL,1,11,2),(17,'俏皮爱心吊饰','img/797820ENMX-1.jpg',NULL,'398.00',NULL,'红色',NULL,0,12,2),(19,'花木兰耳钉','img/290739PCZ-1.jpg',NULL,'368.00',NULL,'粉色',NULL,1,13,3),(20,'神圣羽毛耳坠','img/297205EN168-1.jpg','img/297205EN168-2.jpg','398.00',NULL,'银色',NULL,1,14,3),(21,'连珠圆环耳坠','img/297535-1.jpg',NULL,'498.00',NULL,'银色',NULL,0,15,3),(22,'粉色魔法皇冠耳环','img/287127NPO-1.jpg',NULL,'548.00',NULL,'粉色',NULL,0,16,3),(23,'爱心与蜂耳环','img/267071-1.jpg','img/267071-2.jpg','398.00',NULL,'金黄色',NULL,1,17,3),(24,'冰川之美耳坠','img/297545CZ-1.jpg',NULL,'648.00',NULL,'银色',NULL,1,18,3),(25,'花冠戒指','img/167119CZ-1.jpg','img/167119CZ-2.jpg','898.00',NULL,'46mm',NULL,0,19,4),(26,'璀璨抛光心形开口戒指','img/186570CZR-1.jpg','img/186570CZR-2.jpg','548.00',NULL,'46mm',NULL,1,20,4),(27,'璀璨泪滴形戒指','img/196251CZ-1.jpg','img/196251CZ-2.jpg','698.00',NULL,'46mm',NULL,1,21,4),(28,'闪耀之箭戒指','img/197830CZ-1.jpg','img/197830CZ-2.jpg','548.00',NULL,'48mm',NULL,0,22,4),(32,'一生所爱','img/BPVD00022-1.jpg',NULL,'3088.00',NULL,'17cm',NULL,0,2,1),(35,'爱意萌动','img/BPVD00030-1.jpg',NULL,'946.00',NULL,'17cm',NULL,1,3,1),(38,'浪漫爱恋','img/ZT0123-1.jpg',NULL,'2112.00',NULL,'17cm',NULL,1,4,1),(49,'闪耀之箭戒指','img/197830CZ-1.jpg','img/197830CZ-2.jpg','548.00',NULL,'50mm',NULL,0,22,4),(51,'花冠戒指','img/167119CZ-1.jpg','img/167119CZ-2.jpg','898.00',NULL,'48mm',NULL,0,19,4),(54,'璀璨泪滴形戒指','img/196251CZ-1.jpg','img/196251CZ-2.jpg','698.00',NULL,'48mm',NULL,1,21,4),(57,'璀璨之心','img/ZT0134-1.jpg',NULL,'1146.00',NULL,'17cm',NULL,1,6,1),(59,'璀璨抛光心形开口戒指','img/186570CZR-1.jpg','img/186570CZR-2.jpg','548.00',NULL,'48mm',NULL,1,20,4);

/*Table structure for table `pandora_product_category` */

DROP TABLE IF EXISTS `pandora_product_category`;

CREATE TABLE `pandora_product_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(16) NOT NULL COMMENT '每个分类的英文名称',
  `zh_name` varchar(100) DEFAULT NULL COMMENT '每个分类的中文名称',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_product_category` */

insert  into `pandora_product_category`(`category_id`,`category_name`,`zh_name`) values (1,'bracelet','手链'),(2,'chuan','串饰'),(3,'earring','耳饰'),(4,'ring','戒指');

/*Table structure for table `pandora_product_detail` */

DROP TABLE IF EXISTS `pandora_product_detail`;

CREATE TABLE `pandora_product_detail` (
  `product_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `details_img` varchar(100) DEFAULT NULL COMMENT '详情页详情介绍图',
  `product_id` int(11) DEFAULT NULL COMMENT '商品编号，外键',
  PRIMARY KEY (`product_detail_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `pandora_product_detail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `pandora_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_product_detail` */

insert  into `pandora_product_detail`(`product_detail_id`,`details_img`,`product_id`) values (1,'img/detail_1.png',1),(2,'img/detail_2.png',1),(3,'img/detail_3.png',1),(4,'img/detail_1.png',2),(5,'img/detail_1.png',5),(6,'img/detail_2.png',5),(7,'img/detail_1.png',6),(8,'img/detail_1.png',7),(9,'img/detail_2.png',7),(10,'img/detail_1.png',8),(11,'img/detail_1.png',9),(12,'img/detail_1.png',10),(13,'img/detail_1.png',11),(14,'img/detail_2.png',11),(15,'img/detail_1.png',12),(16,'img/detail_1.png',13),(17,'img/detail_1.png',14),(18,'img/detail_1.png',15),(19,'img/detail_1.png',16),(20,'img/detail_1.png',17),(21,'img/detail_1.png',19),(22,'img/detail_2.png',19),(23,'img/detail_3.png',19),(24,'img/detail_1.png',20),(25,'img/detail_1.png',21),(26,'img/detail_1.png',22),(27,'img/detail_1.png',23),(28,'img/detail_2.png',23),(29,'img/detail_1.png',24),(30,'img/detail_2.png',24),(31,'img/detail_3.png',24),(32,'img/detail_1.png',25),(33,'img/detail_1.png',26),(34,'img/detail_1.png',27),(35,'img/detail_1.png',28),(36,'img/detail_2.png',28);

/*Table structure for table `pandora_product_family` */

DROP TABLE IF EXISTS `pandora_product_family`;

CREATE TABLE `pandora_product_family` (
  `family_id` int(11) NOT NULL AUTO_INCREMENT,
  `family_name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`family_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_product_family` */

insert  into `pandora_product_family`(`family_id`,`family_name`) values (1,'繁星童话'),(2,'一生所爱'),(3,'爱意萌动'),(4,'浪漫爱恋'),(5,'我爱你礼品套装'),(6,'璀璨之心'),(7,'清新热恋串饰'),(8,'倾心热恋固定夹'),(9,'爱之箭吊饰'),(10,'小爱神吊饰'),(11,'闪耀之箭吊饰'),(12,'俏皮爱心吊饰'),(13,'花木兰耳钉'),(14,'神圣羽毛耳坠'),(15,'连珠圆环耳坠'),(16,'粉色魔法皇冠耳环'),(17,'爱心与蜂耳环'),(18,'冰川之美耳坠'),(19,'花冠戒指'),(20,'璀璨抛光心形开口戒指'),(21,'璀璨泪滴形戒指'),(22,'闪耀之箭戒指');

/*Table structure for table `pandora_product_love` */

DROP TABLE IF EXISTS `pandora_product_love`;

CREATE TABLE `pandora_product_love` (
  `love_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`love_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pandora_product_love_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `pandora_product` (`product_id`),
  CONSTRAINT `pandora_product_love_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `pandora_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_product_love` */

insert  into `pandora_product_love`(`love_id`,`product_id`,`user_id`) values (17,12,7),(38,2,3),(40,13,3),(43,12,1),(45,1,1),(46,26,3),(54,1,4),(55,25,4);

/*Table structure for table `pandora_product_pic` */

DROP TABLE IF EXISTS `pandora_product_pic`;

CREATE TABLE `pandora_product_pic` (
  `pic_id` int(11) NOT NULL AUTO_INCREMENT,
  `pics_small` varchar(100) DEFAULT NULL COMMENT '商品详情页的小图',
  `pics_big` varchar(100) DEFAULT NULL COMMENT '商品详情页大图',
  `product_id` int(11) DEFAULT NULL COMMENT '商品编号，外键',
  PRIMARY KEY (`pic_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `pandora_product_pic_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `pandora_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_product_pic` */

insert  into `pandora_product_pic`(`pic_id`,`pics_small`,`pics_big`,`product_id`) values (1,'img/BPVD00010-1-small.JPG','img/BPVD00010-1.jpg',1),(2,'img/BPVD00022-1.jpg','img/BPVD00022-1.jpg',2),(3,'img/BPVD00030-1.jpg','img/BPVD00030-1.jpg',5),(4,'img/ZT0123-1.jpg','img/ZT0123-1.jpg',6),(5,'img/BPVD00010-1.jpg','img/BPVD00010-1.jpg',7),(6,'img/BPVD00010-1.jpg','img/BPVD00010-1.jpg',8),(7,'img/BPVD00010-1.jpg','img/BPVD00010-1.jpg',9),(8,'img/B800880-1.jpg','img/B800880-1.jpg',10),(9,'img/ZT0134-1.jpg','img/ZT0134-1.jpg',11),(10,'img/797826CZRMX-1.jpg','img/797826CZRMX-1.jpg',12),(11,'img/797838CZRMX-1.jpg','img/797838CZRMX-1.jpg',13),(12,'img/767816CZ-1.jpg','img/767816CZ-1.jpg',14),(13,'img/767796CZ-1.jpg','img/767796CZ-1.jpg',15),(14,'img/797827CZMX-1.jpg','img/797827CZMX-1.jpg',16),(15,'img/797820ENMX-1.jpg','img/797820ENMX-1.jpg',17),(16,'img/290739PCZ-1.jpg','img/290739PCZ-1.jpg',19),(17,'img/297205EN168-1.jpg','img/297205EN168-1.jpg',20),(18,'img/297205EN168-2.jpg','img/297205EN168-2.jpg',20),(19,'img/297535-1.jpg','img/297535-1.jpg',21),(20,'img/287127NPO-1.jpg','img/287127NPO-1.jpg',22),(21,'img/267071-1.jpg','img/267071-1.jpg',23),(22,'img/267071-2.jpg','img/267071-2.jpg',23),(23,'img/297545CZ-1.jpg','img/297545CZ-1.jpg',24),(24,'img/167119CZ-1.jpg','img/167119CZ-1.jpg',25),(25,'img/167119CZ-2.jpg','img/167119CZ-2.jpg',25),(26,'img/186570CZR-1.jpg','img/186570CZR-1.jpg',26),(27,'img/186570CZR-2.jpg','img/186570CZR-2.jpg',26),(28,'img/196251CZ-1.jpg','img/196251CZ-1.jpg',27),(29,'img/196251CZ-2.jpg','img/196251CZ-2.jpg',27),(30,'img/197830CZ-1.jpg','img/197830CZ-1.jpg',28),(31,'img/BPVD00022-1.jpg','img/BPVD00022-1.jpg',32),(32,'img/BPVD00030-1.jpg','img/BPVD00030-1.jpg',35),(33,'img/ZT0123-1.jpg','img/ZT0123-1.jpg',38),(34,'img/197830CZ-1.jpg','img/197830CZ-1.jpg',49),(35,'img/167119CZ-1.jpg','img/167119CZ-1.jpg',51),(36,'img/167119CZ-2.jpg','img/167119CZ-2.jpg',51),(37,'img/196251CZ-1.jpg','img/196251CZ-1.jpg',54),(38,'img/ZT0134-1.jpg','img/ZT0134-1.jpg',57),(39,'img/186570CZR-1.jpg','img/186570CZR-1.jpg',59),(40,'img/186570CZR-2.jpg','img/186570CZR-2.jpg',59);

/*Table structure for table `pandora_receiver_address` */

DROP TABLE IF EXISTS `pandora_receiver_address`;

CREATE TABLE `pandora_receiver_address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `receiver` varchar(16) DEFAULT NULL COMMENT '收件人姓名',
  `address` varchar(128) DEFAULT NULL COMMENT '详细地址',
  `cellphone` varchar(16) DEFAULT NULL COMMENT '手机号码',
  `postcode` char(6) DEFAULT NULL COMMENT '邮编',
  `is_default` tinyint(1) DEFAULT NULL COMMENT '是否默认地址',
  `user_id` int(11) DEFAULT NULL COMMENT '用户编号，外键',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pandora_receiver_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `pandora_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_receiver_address` */

insert  into `pandora_receiver_address`(`address_id`,`receiver`,`address`,`cellphone`,`postcode`,`is_default`,`user_id`) values (1,'亮闪闪','浙江省杭州市***小区46号','13534528762','310018',0,3),(2,'小璐','西湖中心','13877663332','232323',0,3),(5,'海尔','湖南张家界***号','18776903218','789338',0,3),(6,'嘻哈','余杭区222***','13456879876','328974',0,3),(10,'筱筱','陕西西安***号','13567346523','325634',0,4),(11,'xixi','湖北武汉**号','15634256745','324563',1,6),(12,'kangkang','康康之家345号','14567873849','345345',1,3),(13,'haha','中心广场111号','1356789654','321223',0,4),(14,'康康','西湖文化广场','13589876256','334433',0,4),(15,'李先生','***小区25号','14565434543','223344',1,4),(16,'hah','湖南','14565432456','344333',0,3);

/*Table structure for table `pandora_shopping_cart` */

DROP TABLE IF EXISTS `pandora_shopping_cart`;

CREATE TABLE `pandora_shopping_cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `counts` int(11) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pandora_shopping_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `pandora_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_shopping_cart` */

insert  into `pandora_shopping_cart`(`cart_id`,`product_id`,`user_id`,`counts`) values (5,13,1,2),(6,2,7,1),(7,13,7,3),(33,14,1,2),(35,32,1,1),(47,5,4,1),(52,2,4,1),(53,1,3,1);

/*Table structure for table `pandora_user` */

DROP TABLE IF EXISTS `pandora_user`;

CREATE TABLE `pandora_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(32) NOT NULL,
  `user_pwd` varchar(32) NOT NULL,
  `remark` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `pandora_user` */

insert  into `pandora_user`(`user_id`,`user_name`,`user_pwd`,`remark`) values (1,'admin','21232f297a57a5a743894a0e4a801fc3','密码：admin'),(3,'tom','202cb962ac59075b964b07152d234b70','密码：123'),(4,'haha','202cb962ac59075b964b07152d234b70','密码：123'),(5,'abc','e10adc3949ba59abbe56e057f20f883e','密码：123456'),(6,'xixi','21232f297a57a5a743894a0e4a801fc3','密码：admin'),(7,'newName','68a0099b3f45357798639a30c5fe3154','密码：new123');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
