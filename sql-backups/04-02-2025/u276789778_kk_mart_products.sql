-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 62.72.28.52    Database: u276789778_kk_mart
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.10-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `products_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `products_name` varchar(255) NOT NULL,
  `products_description` varchar(255) DEFAULT NULL,
  `products_price` decimal(10,2) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `supplier_id` bigint(20) NOT NULL,
  `barcode` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiry_date` date DEFAULT NULL,
  `qty_alert` int(11) DEFAULT NULL,
  `unit_id` bigint(20) NOT NULL,
  `batch_number` varchar(450) DEFAULT NULL,
  `manufacturing_date` date DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `status` enum('active','inactive','discontinued') DEFAULT 'active',
  `brand_id` int(11) NOT NULL,
  `created_on` date DEFAULT current_timestamp(),
  `updated_on` date DEFAULT NULL,
  PRIMARY KEY (`products_id`),
  UNIQUE KEY `barcode` (`barcode`) USING HASH,
  KEY `products_ibfk_2_idx` (`supplier_id`),
  KEY `products_ibfk_3_idx` (`created_by`),
  KEY `products_ibfk_4_idx` (`updated_by`),
  KEY `product_ibfk_1_idx` (`category_id`),
  KEY `product_ibfk_2_idx` (`brand_id`),
  KEY `product_ibfk_6_idx` (`unit_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_ibfk_3` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`suppliers_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_ibfk_5` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_ibfk_6` FOREIGN KEY (`unit_id`) REFERENCES `units` (`unit_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (58,'Xtech barcode scanner','Xtech barcode scanner',2100.00,34,25,'3111300159',47,'2025-04-29',30,3,'BS8568','2025-02-04',1,1,'active',8,'2025-02-04','2025-02-04'),(59,'Lenovo\'s Wireless Mouse','Awesome MOUSE with hightest dpi',500.00,34,25,'8SGX31C40732AVLC37D002E',48,'2025-05-14',5,3,'BS8568','2025-02-04',1,NULL,'active',8,'2025-02-04',NULL),(60,'Ground Nuts','best quality ground nuts 500grams packet ',150.00,52,52,'0929u93inu939',400,'2029-11-23',220,5,'bt002-1','2025-01-22',1,NULL,'active',34,'2025-02-04',NULL),(61,'Milk Packet','milk packect 500 ml',32.00,53,53,'938847hf748h58gf',1200,'2025-02-04',550,2,'ed0komeo','2025-02-03',1,NULL,'active',35,'2025-02-04',NULL),(62,'Coconut','big coconuts ',38.00,54,54,'w0qdknkfmedklas',550,'2029-11-09',10,3,'000weoe','2023-12-31',1,NULL,'active',27,'2025-02-04',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-04 16:08:40
