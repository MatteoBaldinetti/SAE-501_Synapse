-- MySQL dump 10.13  Distrib 9.5.0, for Linux (x86_64)
--
-- Host: localhost    Database: txlforma
-- ------------------------------------------------------
-- Server version	9.5.0

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
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` bigint NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `uploaded_at` datetime(6) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKdda6rwnjeromd54wdcf7eg6iy` (`file_name`),
  UNIQUE KEY `UKb1ejaa6ldbypierrjmet5y18k` (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'1767199048837-fernando-alonso-aston-martin-r.jpg','2025-12-31 16:37:28.840887','/api/files/download/1767199048837-fernando-alonso-aston-martin-r.jpg'),(2,'1767621182345-kirby-pictures-6f3961bh9tvmntwq.jpg','2026-01-05 13:53:02.350071','/api/files/download/1767621182345-kirby-pictures-6f3961bh9tvmntwq.jpg'),(3,'1767684132665-slider-programme-dev-web.jpeg','2026-01-06 07:22:12.666484','/api/files/download/1767684132665-slider-programme-dev-web.jpeg'),(4,'1767684665621-101_UX_vs_UI_illustration_blog-1.png','2026-01-06 07:31:05.621991','/api/files/download/1767684665621-101_UX_vs_UI_illustration_blog-1.png'),(5,'1767684747798-MicrosoftTeams-image-10.jpg','2026-01-06 07:32:27.800581','/api/files/download/1767684747798-MicrosoftTeams-image-10.jpg'),(6,'1767687824225-kirby-pictures-6f3961bh9tvmntwq.jpg','2026-01-06 08:23:44.226418','/api/files/download/1767687824225-kirby-pictures-6f3961bh9tvmntwq.jpg'),(7,'1767688034832-kirby-pictures-6f3961bh9tvmntwq.jpg','2026-01-06 08:27:14.834319','/api/files/download/1767688034832-kirby-pictures-6f3961bh9tvmntwq.jpg'),(52,'1767717058580-admin-panel.png','2026-01-06 16:30:58.608714','/api/files/download/1767717058580-admin-panel.png'),(53,'1767717915141-happy-young-man-laughing_23-2148911860.avif','2026-01-06 16:45:15.143672','/api/files/download/1767717915141-happy-young-man-laughing_23-2148911860.avif'),(54,'1767717969329-premium_photo-1689551670902-19b441a6afde.jpg','2026-01-06 16:46:09.335754','/api/files/download/1767717969329-premium_photo-1689551670902-19b441a6afde.jpg'),(55,'1767718018321-selfie-portrait-videocall_23-2149186122.avif','2026-01-06 16:46:58.321940','/api/files/download/1767718018321-selfie-portrait-videocall_23-2149186122.avif');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_seq`
--

DROP TABLE IF EXISTS `file_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_seq`
--

LOCK TABLES `file_seq` WRITE;
/*!40000 ALTER TABLE `file_seq` DISABLE KEYS */;
INSERT INTO `file_seq` VALUES (151);
/*!40000 ALTER TABLE `file_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscription`
--

DROP TABLE IF EXISTS `inscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscription` (
  `id` bigint NOT NULL,
  `amount` float NOT NULL,
  `date` datetime(6) NOT NULL,
  `inscription_date` datetime(6) NOT NULL,
  `status` varchar(255) NOT NULL,
  `session_id` bigint DEFAULT NULL,
  `training_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb3ckm4ansfumlubaocw95dwep` (`session_id`),
  KEY `FK8mqp9u7d8g2dl06y6rogdln2q` (`training_id`),
  KEY `FKabev4trxvkjaltn385ykbr62x` (`user_id`),
  CONSTRAINT `FK8mqp9u7d8g2dl06y6rogdln2q` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKabev4trxvkjaltn385ykbr62x` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKb3ckm4ansfumlubaocw95dwep` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscription`
--

LOCK TABLES `inscription` WRITE;
/*!40000 ALTER TABLE `inscription` DISABLE KEYS */;
INSERT INTO `inscription` VALUES (1,450,'2025-11-27 14:00:00.000000','2025-11-27 14:00:00.000000','PRESENT',1,1,1),(2,750,'2025-11-28 10:30:00.000000','2025-11-28 10:30:00.000000','EN_ATTENTE',2,2,2),(3,600,'2026-01-05 09:15:00.000000','2026-01-05 09:15:00.000000','PAY',3,3,3),(4,450,'2025-12-30 09:17:37.582000','2025-12-30 09:17:37.582000','CONFIRM',1,1,52),(8,600,'2026-02-12 17:00:00.000000','2025-12-30 09:29:49.383000','CONFIRM',3,3,52),(52,450,'2025-12-12 17:30:00.000000','2026-01-02 07:47:39.737000','CONFIRM',1,1,52),(53,450,'2025-12-12 17:30:00.000000','2026-01-05 13:00:00.462000','CONFIRM',1,1,52),(102,450,'2025-12-12 17:30:00.000000','2026-01-05 13:42:48.746000','CONFIRM',1,1,52),(103,750,'2026-01-23 16:30:00.000000','2026-01-05 13:43:33.725000','CONFIRM',2,2,52),(104,450,'2026-01-06 07:50:25.862000','2026-01-06 07:50:25.862000','CONFIRM',1,1,52);
/*!40000 ALTER TABLE `inscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscription_seq`
--

DROP TABLE IF EXISTS `inscription_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscription_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscription_seq`
--

LOCK TABLES `inscription_seq` WRITE;
/*!40000 ALTER TABLE `inscription_seq` DISABLE KEYS */;
INSERT INTO `inscription_seq` VALUES (201);
/*!40000 ALTER TABLE `inscription_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `id` bigint NOT NULL,
  `contract_type` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `specialty` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (1,'Freelance','Maude','Martin','Développement web et pédagogie numérique'),(2,'CDI','Antoine','Leclerc','Design UX/UI et accessibilité'),(3,'Intervenant freelance','Nadia','Roux','Management de projet et méthodes agiles');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor_seq`
--

DROP TABLE IF EXISTS `instructor_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor_seq`
--

LOCK TABLES `instructor_seq` WRITE;
/*!40000 ALTER TABLE `instructor_seq` DISABLE KEYS */;
INSERT INTO `instructor_seq` VALUES (101);
/*!40000 ALTER TABLE `instructor_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `id` bigint NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `max_capacity` int NOT NULL,
  `zip` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (1,'12 rue de la République','Lyon',30,'69002'),(2,'45 avenue des Champs-Élysées','Paris',20,'75008'),(3,'3 boulevard Longchamp','Marseille',25,'13001'),(52,'3 rue Emile Masson','Nantes',50,'44000'),(102,'4 allée Jean Paul Sartre','Noisiel',60,'77186');
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place_seq`
--

DROP TABLE IF EXISTS `place_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place_seq`
--

LOCK TABLES `place_seq` WRITE;
/*!40000 ALTER TABLE `place_seq` DISABLE KEYS */;
INSERT INTO `place_seq` VALUES (201);
/*!40000 ALTER TABLE `place_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result` (
  `id` bigint NOT NULL,
  `description` varchar(255) NOT NULL,
  `grade` float NOT NULL,
  `session_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6o0tmj4m6ay1iub6t7o6t9e4g` (`session_id`),
  KEY `FKpjjrrf0483ih2cvyfmx70a16b` (`user_id`),
  CONSTRAINT `FK6o0tmj4m6ay1iub6t7o6t9e4g` FOREIGN KEY (`session_id`) REFERENCES `session` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKpjjrrf0483ih2cvyfmx70a16b` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
INSERT INTO `result` VALUES (1,'Très bonne maîtrise des concepts et projet final solide.',16.5,1,1),(2,'Prototype correct mais nécessite des améliorations sur l\'organisation de l\'information.',13,2,2),(3,'Bonne participation, rituels agiles compris et capacité à animer une équipe.',15,3,3);
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result_seq`
--

DROP TABLE IF EXISTS `result_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result_seq`
--

LOCK TABLES `result_seq` WRITE;
/*!40000 ALTER TABLE `result_seq` DISABLE KEYS */;
INSERT INTO `result_seq` VALUES (101);
/*!40000 ALTER TABLE `result_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` bigint NOT NULL,
  `capacity` int NOT NULL,
  `description` longtext NOT NULL,
  `duration` float NOT NULL,
  `end_date` datetime(6) NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `title` varchar(255) NOT NULL,
  `instructor_id` bigint DEFAULT NULL,
  `place_id` bigint DEFAULT NULL,
  `training_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8l1v75brk9afixg1li5ymt7nj` (`instructor_id`),
  KEY `FKfwc7jdtbpfd501p8kqnqbn0ww` (`place_id`),
  KEY `FKrohssa00dtaqto152b65nucfc` (`training_id`),
  CONSTRAINT `FK8l1v75brk9afixg1li5ymt7nj` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKfwc7jdtbpfd501p8kqnqbn0ww` FOREIGN KEY (`place_id`) REFERENCES `place` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKrohssa00dtaqto152b65nucfc` FOREIGN KEY (`training_id`) REFERENCES `training` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (1,20,'Session intensive de 5 jours couvrant HTML, CSS, JavaScript et atelier final de mise en ligne.',35,'2025-12-12 17:30:00.000000','2025-12-08 09:00:00.000000','Session Intensive - Dév Web (déc. 2025)',1,1,1),(2,12,'Atelier complet : personas, wireframes, prototypage et tests utilisateurs.',40,'2026-01-23 16:30:00.000000','2026-01-15 09:30:00.000000','Atelier UX/UI - Prototype & Tests (janv. 2026)',2,2,2),(3,18,'Session courte axe pratique : simulation de sprints et gestion du backlog.',18,'2026-02-12 17:00:00.000000','2026-02-10 10:00:00.000000','Sprint Agile - Initiation (févr. 2026)',3,3,3);
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_seq`
--

DROP TABLE IF EXISTS `session_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_seq`
--

LOCK TABLES `session_seq` WRITE;
/*!40000 ALTER TABLE `session_seq` DISABLE KEYS */;
INSERT INTO `session_seq` VALUES (101);
/*!40000 ALTER TABLE `session_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training`
--

DROP TABLE IF EXISTS `training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training` (
  `id` bigint NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `detailed_description` longtext NOT NULL,
  `duration` float NOT NULL,
  `img_name` varchar(255) DEFAULT NULL,
  `learn_text` varchar(255) DEFAULT NULL,
  `prerequisites` longtext NOT NULL,
  `price` float NOT NULL,
  `title` varchar(255) NOT NULL,
  `model_file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training`
--

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
INSERT INTO `training` VALUES (1,'Informatique','Introduction aux fondamentaux du développement web : HTML, CSS et JavaScript.','Cette formation initie les participants aux technologies de base du web. Nous abordons la structure d\'une page HTML, la mise en forme avec CSS (box model, flexbox, grid) et les principes de base de JavaScript (variables, fonctions, DOM). Les sessions alternent théorie et ateliers pratiques : vous construirez une mini-application responsive de A à Z. À la fin du cours, vous serez capable de créer et déployer une page web simple, de connaître les bonnes pratiques d\'accessibilité et d\'optimisation des performances.',14,'1767684132665-slider-programme-dev-web.jpeg',NULL,'Aucun prérequis technique nécessaire ; curiosité pour l\'informatique recommandée.',450,'Initiation au développement web',NULL),(2,'Design','Méthodes et outils pour concevoir des interfaces centrées utilisateur.','La formation couvre le processus complet : recherche utilisateur, personas, architecture de l\'information, wireframes, prototypage et tests utilisateurs. Des cas concrets permettent de comprendre l\'importance de l\'accessibilité, de la hiérarchie visuelle et des micro-interactions. Des ateliers guident les participants de l\'idéation au prototype cliquable. Les apprenants reçoivent des retours personnalisés pour améliorer leur design.',21,'1767684665621-101_UX_vs_UI_illustration_blog-1.png',NULL,'Connaissance de base en informatique ; intérêt pour le design.',750,'Conception UX/UI pour produits numériques',NULL),(3,'Management','Principes et pratiques agiles pour piloter des équipes efficacement.','Cette formation explore Scrum, Kanban, les cérémonies agiles, la gestion du backlog, la planification, la rétrospective et les métriques. Grâce à des simulations de sprint et des jeux de rôles, les participants apprennent à prioriser la valeur, animer une équipe et favoriser la livraison continue. L\'accent est mis sur le leadership agile, la communication et la gestion du changement dans les organisations.',16,'1767684747798-MicrosoftTeams-image-10.jpg',NULL,'Exprience professionnelle recommandée.',600,'Gestion de projet agile',NULL);
/*!40000 ALTER TABLE `training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_seq`
--

DROP TABLE IF EXISTS `training_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_seq`
--

LOCK TABLES `training_seq` WRITE;
/*!40000 ALTER TABLE `training_seq` DISABLE KEYS */;
INSERT INTO `training_seq` VALUES (101);
/*!40000 ALTER TABLE `training_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `img_name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'camille.dupont@gmail.com','Camille','1767717969329-premium_photo-1689551670902-19b441a6afde.jpg','Dupont','$2b$05$1FKehkKfor9tAXQrG3gQdex4lXCbqxvT0W9Uu/h7qyg3WlVz/dxwa','+33695705961',0),(2,'lucas.moreau@gmail.com','Lucas','1767717915141-happy-young-man-laughing_23-2148911860.avif','Moreau','$2b$05$oIdTkuQ.K9xtJJREu.qfGuHJ1StuGmOrsm.zHpgw9Sp4ylb7vRDC2','+33749465790',0),(3,'sofia.bernard@gmail.com','Sofia','1767718018321-selfie-portrait-videocall_23-2149186122.avif','Bernard','$2b$05$hb6CzjwYXrzrMIVyPrl9S.a2zIsmwZRsW7NGlSyb7m/pVDbrqQLtK','+33632473645',1),(52,'matteo.baldinetti1@gmail.com','Mattéo',NULL,'Baldinetti','$2b$10$lZxajEYpndhj6jCH/nr4He/m9RO/M//tdXonEzqdrCbCfhwQ83gK2','',1),(102,'admin@txlforma.fr','admin','1767717058580-admin-panel.png','admin','$2b$05$aZYQiNKhJqLIRDO8jKUB/.PUdj6b11J2q14D2h9.pjcX7mO9aoHjK','+33 695061275',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (201);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-06 16:52:54
