-- MySQL dump 10.13  Distrib 8.1.0, for macos12.6 (arm64)
--
-- Host: localhost    Database: fitness_helper
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `food_info`
--

DROP TABLE IF EXISTS `food_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_info` (
  `food_id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(45) NOT NULL,
  `carbonhydrate` float NOT NULL,
  `protein` float NOT NULL,
  `fat` float NOT NULL,
  `calory` float NOT NULL,
  `image_id` int NOT NULL DEFAULT '14',
  `owner_id` int NOT NULL DEFAULT '-1',
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_info`
--

LOCK TABLES `food_info` WRITE;
/*!40000 ALTER TABLE `food_info` DISABLE KEYS */;
INSERT INTO `food_info` VALUES (1,'711烤雞三明治',23,12.4,17,230,7,-1),(2,'711照燒溏心蛋三明治',23,13.1,9,230,8,-1),(3,'低脂牛奶100毫升',4.8,3.2,1.4,45,2,-1),(4,'全脂牛奶100毫升',4.8,3.2,3.7,65,3,-1),(5,'白飯',65,5,2,280,6,-1),(6,'茶葉蛋',2,7,5,75,4,-1),(7,'雞胸肉100g',2,25,2,120,11,-1),(8,'雙層牛肉吉事堡',35,25,25,475,5,-1),(9,'麥脆雞',10,16,17,250,1,-1),(10,'乳清蛋白10g',0,10,0,40,13,-1),(25,'apple',30,2,0,130,14,8),(26,'banana',10,3,5,122,14,8),(27,'big banana',40,3,5,122,14,8);
/*!40000 ALTER TABLE `food_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_info`
--

DROP TABLE IF EXISTS `image_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_info` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_name` varchar(45) NOT NULL,
  `image_url` varchar(200) NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_info`
--

LOCK TABLES `image_info` WRITE;
/*!40000 ALTER TABLE `image_info` DISABLE KEYS */;
INSERT INTO `image_info` VALUES (1,'chicken','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/chicken-leg.png'),(2,'milk','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/milk-2.png'),(3,'milk','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/milk.png'),(4,'egg','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/egg.png'),(5,'burger','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/hamburger.png'),(6,'rice','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/rice.png'),(7,'sandwich','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/sandwich-2.png'),(8,'sandwich','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/sandwich.png'),(9,'user','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/profile-user.png'),(10,'weightlifter','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/weightlifter.png'),(11,'chicken breast','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/chicken-breast.png'),(12,'user','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/user.png'),(13,'protein','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/protein.png'),(14,'custom_food','https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/diet.png');
/*!40000 ALTER TABLE `image_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `age` int DEFAULT NULL,
  `account_type` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`,`account_type`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (-1,NULL,NULL,NULL,'','',''),(8,NULL,NULL,NULL,'google','lovepeacekev@gmail.com','李國誠');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-29 22:37:36
