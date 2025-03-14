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
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `suppliers_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `suppliers_name` text NOT NULL,
  `contact_name` text DEFAULT NULL,
  `suppliers_email` text DEFAULT NULL,
  `suppliers_phone` text DEFAULT NULL,
  PRIMARY KEY (`suppliers_id`),
  UNIQUE KEY `email` (`suppliers_email`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Supplier Name',NULL,'Supplier Name@example.com',NULL),(2,'Updated Supplier',NULL,'Updated Supplier@example.com',NULL),(3,'Lenovo\'s  Supplier ',NULL,'Lenovo\'s  Supplier @example.com',NULL),(4,'Card Board Supplier ',NULL,'Card Board Supplier @example.com',NULL),(5,'asra kimia',NULL,'asra kimia@example.com',NULL),(6,'Apollo Life',NULL,'Apollo Life@example.com',NULL),(7,'Nescafe',NULL,'Nescafe@example.com',NULL),(8,'Parker',NULL,'Parker@example.com',NULL),(9,'India Post',NULL,'India Post@example.com',NULL),(10,'Odonil',NULL,'Odonil@example.com',NULL),(11,'Foam Spray',NULL,'Foam Spray@example.com',NULL),(12,'JCI',NULL,'JCI@example.com',NULL),(13,'LAS',NULL,'LAS@example.com',NULL),(14,'ASDASA',NULL,'ASDASA@example.com',NULL),(15,'8904355400527',NULL,'8904355400527@example.com',NULL),(16,'WET wipes',NULL,'WET wipes@example.com',NULL),(17,'Spray',NULL,'Spray@example.com',NULL),(18,'Supplier 1',NULL,'Supplier 1@example.com',NULL),(19,'Supplier 2',NULL,'Supplier 2@example.com',NULL),(20,'Demo Supplier 1',NULL,'Demo Supplier 1@example.com',NULL),(21,'Demo Supplier 2',NULL,'Demo Supplier 2@example.com',NULL),(22,'Demo Supplier 3',NULL,'Demo Supplier 3@example.com',NULL),(23,'Realme',NULL,'Realme@example.com',NULL),(25,'Venkateshwara Enterprise',NULL,'Venkateshwara Enterprise@example.com',NULL),(40,'srinivas steeel',NULL,'srinivas steeel@example.com',NULL),(41,'ramu stationary',NULL,'ramu stationary@example.com',NULL),(42,'gopi plastic',NULL,'gopi plastic@example.com',NULL),(52,'ss trades',NULL,'ss trades@example.com',NULL),(53,'heritage',NULL,'heritage@example.com',NULL),(54,'coco',NULL,'coco@example.com',NULL);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-04 16:08:39
