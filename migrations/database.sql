-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: vapp
-- ------------------------------------------------------
-- Server version	8.0.13

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
-- Table structure for table `implications`
--

DROP TABLE IF EXISTS `implications`;
CREATE TABLE `implications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_id` int(11) NOT NULL,
  `setting_state_id` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `instructions` mediumtext,
  `weight` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `setting_id` (`setting_id`),
  KEY `setting_state_id` (`setting_state_id`),
  CONSTRAINT `Implications_ibfk_1` FOREIGN KEY (`setting_id`) REFERENCES `settings` (`id`),
  CONSTRAINT `Implications_ibfk_2` FOREIGN KEY (`setting_state_id`) REFERENCES `setting_states` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `implications`
--

LOCK TABLES `implications` WRITE;
/*!40000 ALTER TABLE `implications` DISABLE KEYS */;
INSERT INTO `implications` VALUES (1,1,1,'If a hacker has your email, they can now find your Twitter account using this email. This serves as an entry point for them to gain information on you.\nThe current state of this setting makes you more vulnerable.\nPlease note that enabling discoverability by phone number has a similar effect.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy’\n3.Tap ‘Privacy and safety\'\n4.Tap ‘Privacy and safety’\n4. Select ‘Discoverability and contacts’ (setting is located under the ‘Discoverability’ heading and is titled ‘Let others find you by your email address’)\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1.To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2.Click ‘Privacy and safety’ (setting is located beside the ‘Discoverability’ heading and is titled ‘Let others find you by your email address’) ',10),(2,1,2,'This setting would force users to search for your account only using your username, unless you have enabled the Discoverability setting \'Let others find you by your phone number\'\nThe current state of this setting makes you less vulnerable.',NULL,5),(3,2,1,'If Precise Location is enabled, you allow the Twitter mobile app to share the precise location of your tweets by using your phone’s GPS hardware.\nIf Tweet with a location is enabled, you have the ability to manually tag your Tweet with a location on the Twitter website.\nYou are giving people who view your tweets the opportunity to know exactly where you are at the time of posting the tweet.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap ‘Settings and privacy’ \n3.Tap ‘Privacy and safety’ (setting is located under the ‘Location’ heading and is titled ‘Precise Location’)\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click ‘Privacy and safety’ (setting is located beside the ‘Tweet location’ heading and is titled ‘Tweet with a location’)',20),(4,3,1,'Your tweets are not posted publicly.\nYour tweets are shared to a smaller subset of people that you allow, decreasing the likelihood of data availability.\nYour tweets are invisible to search engine queries.\nOther Twitter users are not able to Retweet your tweets.\nThe current state of this setting makes you less vulnerable.',NULL,0),(5,3,2,'Your public tweets can be read by anyone, including hackers.\nSharing private info in public tweets can make you vulnerable (i.e. Birthday, hometown, place of birth, first pet, mother’s maiden name, favourite TV show, address, etc. can be answers for security questions on other websites where you have an account).\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n Tap ‘Settings and privacy’\n3. Tap ‘Privacy and safety’ (setting is located under the ‘Tweets’ heading and is titled ‘Protect your Tweets\')\n If you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click ‘Privacy and safety’ (setting is located beside the ‘Tweet privacy\' heading and is titled ‘Protect your Tweets’)',10),(6,2,2,'Your location information is kept private because you are not allowing Twitter to have access to your phone’s GPS hardware for use on the mobile app.\nYou are not able to enter your location through the Twitter website.\nThe current state of this setting makes you less vulnerable.',NULL,5);
/*!40000 ALTER TABLE `implications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
CREATE TABLE `levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,'A+',10),(2,'A',15),(3,'A-',20),(4,'B+',25),(5,'B',30),(6,'B-',35),(7,'C+',40),(8,'C',45),(9,'C-',50),(10,'D+',55),(11,'D',60),(12,'D-',65),(13,'F',70);
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score_types`
--

DROP TABLE IF EXISTS `score_types`;
CREATE TABLE `score_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
--
-- Dumping data for table `score_types`
--

LOCK TABLES `score_types` WRITE;
/*!40000 ALTER TABLE `score_types` DISABLE KEYS */;
INSERT INTO `score_types` VALUES (1,'cumulative'),(2,'twitter');
/*!40000 ALTER TABLE `score_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `score` int(5) NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `score_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting_states`
--

DROP TABLE IF EXISTS `setting_states`;
CREATE TABLE `setting_states` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_id` int(11) NOT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `setting_id` (`setting_id`),
  CONSTRAINT `setting_states_ibfk_1` FOREIGN KEY (`setting_id`) REFERENCES `settings` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `setting_states`
--

LOCK TABLES `setting_states` WRITE;
/*!40000 ALTER TABLE `setting_states` DISABLE KEYS */;
INSERT INTO `setting_states` VALUES (1,1,'true'),(2,1,'false'),(3,2,'true'),(4,2,'false'),(5,3,'true'),(6,3,'false');
/*!40000 ALTER TABLE `setting_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `social_media_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `social_media_id` (`social_media_id`),
  CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`social_media_id`) REFERENCES `social_media` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'discoverable_by_email',1),(2,'geo_enabled',1),(3,'protected',1);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_media`
--

DROP TABLE IF EXISTS `social_media`;
CREATE TABLE `social_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `social_media`
--

LOCK TABLES `social_media` WRITE;
/*!40000 ALTER TABLE `social_media` DISABLE KEYS */;
INSERT INTO `social_media` VALUES (1,'twitter');
/*!40000 ALTER TABLE `social_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-26 14:58:39
