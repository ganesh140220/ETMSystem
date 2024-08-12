-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: etmsystem
-- ------------------------------------------------------
-- Server version	8.0.37
drop database if exists 'etmsystem';
create database etmsystem;
use etmsystem;
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
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contact_no` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'9860','Client@gmail.com','SuperClient');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `desig_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`desig_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'Software Devloper');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login_id` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `contact_no` int NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `desig_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_id_UNIQUE` (`login_id`),
  KEY `FKmr55wiec420mxhu78p2f1eebl` (`desig_id`),
  CONSTRAINT `FK13jn542578lslhr6drjt21kps` FOREIGN KEY (`login_id`) REFERENCES `login` (`loginid`),
  CONSTRAINT `FKmr55wiec420mxhu78p2f1eebl` FOREIGN KEY (`desig_id`) REFERENCES `designation` (`desig_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,1,'Ganesh','Kupkar',96894455,'gk@gmail.com','pimpleGurav',1),(2,3,'Pratik','Bhagat',98506216,'pb@gmail.com','pcmc',1),(3,2,'Vivek','Patil',99236514,'vp@gmail.com','wakad',1),(4,4,'Sanket','Bhadale',72164589,'sb@gmail.com','katraj',1),(5,5,'Pratap','Bhosale',62457891,'pb5@gmail.com','satara',1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `loginid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleid` int NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`loginid`),
  KEY `FK7556csmui0fcfn2ssqxmyt313` (`roleid`),
  CONSTRAINT `FK7556csmui0fcfn2ssqxmyt313` FOREIGN KEY (`roleid`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'ganesh1234','Gana@123',2,1),(2,'vivek99','Vive@123',1,1),(3,'pratik44','Prat@123',3,1),(4,'sanket55','Sank@123',4,1),(5,'pratap33','Pb12@123',2,0);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assigned_to` int NOT NULL,
  `client_id` int NOT NULL,
  `created_by` int NOT NULL,
  `created_date` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `project_title` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf7d0rp3hf66ayydxtma968nsc` (`assigned_to`),
  KEY `FK8nw995uro0115f1go0dmrtn2d` (`client_id`),
  KEY `FK4232xu771fp6nuh1so7e7tjok` (`created_by`),
  CONSTRAINT `FK4232xu771fp6nuh1so7e7tjok` FOREIGN KEY (`created_by`) REFERENCES `employee` (`id`),
  CONSTRAINT `FK8nw995uro0115f1go0dmrtn2d` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `FKf7d0rp3hf66ayydxtma968nsc` FOREIGN KEY (`assigned_to`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,2,1,3,'10-08-2024','First Project','React Project','pending');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `query`
--

DROP TABLE IF EXISTS `query`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `query` (
  `qid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `created_text` varchar(255) NOT NULL,
  `query_text` varchar(255) NOT NULL,
  `raised_by` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `task_id` int NOT NULL,
  PRIMARY KEY (`qid`),
  KEY `FK4k9qk5xo277qmfj9vsvthtfqa` (`raised_by`),
  KEY `FK76i946ly66s6yee6efws38fiw` (`task_id`),
  CONSTRAINT `FK4k9qk5xo277qmfj9vsvthtfqa` FOREIGN KEY (`raised_by`) REFERENCES `employee` (`id`),
  CONSTRAINT `FK76i946ly66s6yee6efws38fiw` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `query`
--

LOCK TABLES `query` WRITE;
/*!40000 ALTER TABLE `query` DISABLE KEYS */;
INSERT INTO `query` VALUES (1,'Data Type Mismatched','10/08/2024','Type mismatched for int argument please explain what to do',4,'resolved',1),(2,'Follow Up Query','10-08-2024','Please tell what is solution',4,'resolved',1);
/*!40000 ALTER TABLE `query` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'MasterAdmin'),(2,'Admin'),(3,'Manager'),(4,'Associate');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution`
--

DROP TABLE IF EXISTS `solution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solution` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `created_date` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `qid` int NOT NULL,
  `solved_by` int NOT NULL,
  PRIMARY KEY (`sid`),
  KEY `FKdejvwyrdtre81284e40d59gbd` (`qid`),
  KEY `FKt75vm71i2fc5gv0q2blntf8md` (`solved_by`),
  CONSTRAINT `FKdejvwyrdtre81284e40d59gbd` FOREIGN KEY (`qid`) REFERENCES `query` (`qid`),
  CONSTRAINT `FKt75vm71i2fc5gv0q2blntf8md` FOREIGN KEY (`solved_by`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution`
--

LOCK TABLES `solution` WRITE;
/*!40000 ALTER TABLE `solution` DISABLE KEYS */;
INSERT INTO `solution` VALUES (1,'10-08-2024','convert int to Integer',1,3),(2,'10-08-2024','Already Solved By Vivek Sir',2,2);
/*!40000 ALTER TABLE `solution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assigned_to` int NOT NULL,
  `created_date` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `due_date` varchar(255) NOT NULL,
  `project_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfs0bgcnqw1nl8wu2oe8m2hxi5` (`assigned_to`),
  KEY `FKk8qrwowg31kx7hp93sru1pdqa` (`project_id`),
  CONSTRAINT `FKfs0bgcnqw1nl8wu2oe8m2hxi5` FOREIGN KEY (`assigned_to`) REFERENCES `employee` (`id`),
  CONSTRAINT `FKk8qrwowg31kx7hp93sru1pdqa` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,4,'10-08-2024','create Function','11-08-2024',1,'completed','Function create'),(2,4,'10-08-2024','create Function','11-08-2024',1,'pending','Rerender func'),(3,4,'10-08-2024','create Function','11-08-2024',1,'in progress','update create'),(4,4,'10-08-2024','new task4','11-08-2024',1,'in progress','my task 4'),(5,4,'10-08-2024','new task1','11-08-2024',1,'completed','my task 1'),(6,4,'10-08-2024','create Function','11-08-2024',1,'pending',' func recreted');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_progress`
--

DROP TABLE IF EXISTS `task_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `task_id` int NOT NULL,
  `update_date` varchar(255) NOT NULL,
  `work_done_percent` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2cueuy9hcfpratrhb30ia7i5a` (`task_id`),
  CONSTRAINT `FK2cueuy9hcfpratrhb30ia7i5a` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_progress`
--

LOCK TABLES `task_progress` WRITE;
/*!40000 ALTER TABLE `task_progress` DISABLE KEYS */;
INSERT INTO `task_progress` VALUES (1,'Query Raised',1,'10-08-2024',10),(2,'Completed',1,'10-08-2024',100);
/*!40000 ALTER TABLE `task_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_members` (
  `team_id` int NOT NULL,
  `emp_id` int NOT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`team_id`),
  KEY `proj_idx` (`project_id`),
  KEY `empi_idx` (`emp_id`),
  CONSTRAINT `empi` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `proj` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

LOCK TABLES `team_members` WRITE;
/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
INSERT INTO `team_members` VALUES (1,2,1),(2,4,1),(3,1,1),(4,3,1);
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-11 23:41:08
