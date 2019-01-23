-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: VApp
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Implications`
--

DROP TABLE IF EXISTS `Implications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Implications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_id` int(11) NOT NULL,
  `setting_state_id` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `instructions` mediumtext,
  PRIMARY KEY (`id`),
  KEY `setting_id` (`setting_id`),
  KEY `setting_state_id` (`setting_state_id`),
  CONSTRAINT `Implications_ibfk_1` FOREIGN KEY (`setting_id`) REFERENCES `Settings` (`id`),
  CONSTRAINT `Implications_ibfk_2` FOREIGN KEY (`setting_state_id`) REFERENCES `Setting_States` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Implications`
--

LOCK TABLES `Implications` WRITE;
/*!40000 ALTER TABLE `Implications` DISABLE KEYS */;
INSERT INTO `Implications` VALUES (1,1,1,'If a hacker has your email, they can now find your Twitter account using this email. This serves as an entry point for them to gain information on you.\nThe current state of this setting makes you more vulnerable.\nPlease note that enabling discoverability by phone number has a similar effect.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy’\n3.Tap ‘Privacy and safety\'\n4.Tap ‘Privacy and safety’\n4. Select ‘Discoverability and contacts’ (setting is located under the ‘Discoverability’ heading and is titled ‘Let others find you by your email address’)\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1.To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2.Click ‘Privacy and safety’ (setting is located beside the ‘Discoverability’ heading and is titled ‘Let others find you by your email address’) '),(2,1,2,'This setting would force users to search for your account only using your username, unless you have enabled the Discoverability setting \'Let others find you by your phone number\'\nThe current state of this setting makes you less vulnerable.',NULL),(3,2,1,'If Precise Location is enabled, you allow the Twitter mobile app to share the precise location of your tweets by using your phone’s GPS hardware.\nIf Tweet with a location is enabled, you have the ability to manually tag your Tweet with a location on the Twitter website.\nYou are giving people who view your tweets the opportunity to know exactly where you are at the time of posting the tweet.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap ‘Settings and privacy’ \n3.Tap ‘Privacy and safety’ (setting is located under the ‘Location’ heading and is titled ‘Precise Location’)\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click ‘Privacy and safety’ (setting is located beside the ‘Tweet location’ heading and is titled ‘Tweet with a location’)'),(4,3,1,'Your tweets are not posted publicly.\nYour tweets are shared to a smaller subset of people that you allow, decreasing the likelihood of data availability.\nYour tweets are invisible to search engine queries.\nOther Twitter users are not able to Retweet your tweets.\nThe current state of this setting makes you less vulnerable.',NULL),(5,3,2,'Your public tweets can be read by anyone, including hackers.\nSharing private info in public tweets can make you vulnerable (i.e. Birthday, hometown, place of birth, first pet, mother’s maiden name, favourite TV show, address, etc. can be answers for security questions on other websites where you have an account).\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n Tap ‘Settings and privacy’\n3. Tap ‘Privacy and safety’ (setting is located under the ‘Tweets’ heading and is titled ‘Protect your Tweets\')\n If you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click ‘Privacy and safety’ (setting is located beside the ‘Tweet privacy\' heading and is titled ‘Protect your Tweets’)'),(6,2,2,'Your location information is kept private because you are not allowing Twitter to have access to your phone’s GPS hardware for use on the mobile app.\nYou are not able to enter your location through the Twitter website.\nThe current state of this setting makes you less vulnerable.',NULL);
/*!40000 ALTER TABLE `Implications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Score_Types`
--

DROP TABLE IF EXISTS `Score_Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Score_Types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Score_Types`
--

LOCK TABLES `Score_Types` WRITE;
/*!40000 ALTER TABLE `Score_Types` DISABLE KEYS */;
INSERT INTO `Score_Types` VALUES (1,'cumulative'),(2,'twitter');
/*!40000 ALTER TABLE `Score_Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Scores`
--

DROP TABLE IF EXISTS `Scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `score` int(5) NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `Score_Types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Scores`
--

LOCK TABLES `Scores` WRITE;
/*!40000 ALTER TABLE `Scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `Scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Setting_States`
--

DROP TABLE IF EXISTS `Setting_States`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Setting_States` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_id` int(11) NOT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `setting_id` (`setting_id`),
  CONSTRAINT `setting_states_ibfk_1` FOREIGN KEY (`setting_id`) REFERENCES `Settings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Setting_States`
--

LOCK TABLES `Setting_States` WRITE;
/*!40000 ALTER TABLE `Setting_States` DISABLE KEYS */;
INSERT INTO `Setting_States` VALUES (1,1,'true'),(2,1,'false'),(3,2,'true'),(4,2,'false'),(5,3,'true'),(6,3,'false');
/*!40000 ALTER TABLE `Setting_States` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Settings`
--

DROP TABLE IF EXISTS `Settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `social_media_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `social_media_id` (`social_media_id`),
  CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`social_media_id`) REFERENCES `Social_Media` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Settings`
--

LOCK TABLES `Settings` WRITE;
/*!40000 ALTER TABLE `Settings` DISABLE KEYS */;
INSERT INTO `Settings` VALUES (1,'discoverable_by_email',1),(2,'geo_enabled',1),(3,'protected',1);
/*!40000 ALTER TABLE `Settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Social_Media`
--

DROP TABLE IF EXISTS `Social_Media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Social_Media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Social_Media`
--

LOCK TABLES `Social_Media` WRITE;
/*!40000 ALTER TABLE `Social_Media` DISABLE KEYS */;
INSERT INTO `Social_Media` VALUES (1,'twitter');
/*!40000 ALTER TABLE `Social_Media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-22 13:24:44
