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
INSERT INTO `implications` VALUES (1,1,1,'If a hacker has your email, they can now find your Twitter account using this email. This serves as an entry point for them to gain information on you.\nThe current state of this setting makes you more vulnerable.\nPlease note that enabling discoverability by phone number has a similar effect.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy\'\n3.Tap \'Privacy and safety\'\n4. Select \'Discoverability and contacts\' (setting is located under the \'Discoverability\' heading and is titled \'Let others find you by your email address\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1.To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2.Click \'Privacy and safety\' (setting is located beside the \'Discoverability\' heading and is titled \'Let others find you by your email address\') ',10),
                                  (2,1,2,'This setting would force users to search for your account only using your username, unless you have enabled the Discoverability setting \'Let others find you by your phone number\'\nThe current state of this setting makes you less vulnerable.',NULL,5),
                                  (3,2,3,'If Precise Location is enabled, you allow the Twitter mobile app to share the precise location of your tweets by using your phone\'s GPS hardware.\nIf \'Tweet With a Location\' is enabled, you have the ability to manually tag your Tweet with a location on the Twitter website.\nYou are giving people who view your tweets the opportunity to know exactly where you are at the time of posting the tweet.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy\' \n3.Tap \'Privacy and safety\' (setting is located under the \'Location\' heading and is titled \'Precise Location\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click \'Privacy and safety\' (setting is located beside the \'Tweet location\' heading and is titled \'Tweet with a location\')',20),
                                  (4,2,4,'Your location information is kept private because you are not allowing Twitter to have access to your phone\'s GPS hardware for use on the mobile app.\nYou are not able to enter your location through the Twitter website.\nThe current state of this setting makes you less vulnerable.',NULL,5),
                                  (5,3,5,'Your tweets are not posted publicly.\nYour tweets are shared to a smaller subset of people that you allow, decreasing the likelihood of data availability.\nYour tweets are invisible to search engine queries.\nOther Twitter users are not able to Retweet your tweets.\nThe current state of this setting makes you less vulnerable.',NULL,0),
                                  (6,3,6,'Your public tweets can be read by anyone, including hackers.\nSharing private info in public tweets can make you vulnerable (i.e. Birthday, hometown, place of birth, first pet, mother\'s maiden name, favourite TV show, address, etc. can be answers for security questions on other websites where you have an account).\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n Tap \'Settings and privacy\'\n3. Tap \'Privacy and safety\' (setting is located under the \'Tweets\' heading and is titled \'Protect your Tweets\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click \'Privacy and safety\' (setting is located beside the \'Tweet privacy\' heading and is titled \'Protect your Tweets\')',10),
                                  (7,4,7,'Twitter is able to track your visits to other websites with Twitter integration.\nTracking is done through the use of cookies, which are small files that websites place on your device as you browse the web. They track your website history, however your name, email, phone number or Twitter handle are not associated with it. Twitter will not utilize the information gathered for longer than 30 days.\nAn example of this would be if you regularly visit bird-watching websites, Twitter will suggest accounts for you to follow or advertisements that are related to this topic.\nThe current state of this setting makes you more vulnerable.', 'If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy\'\n3. Tap \'Privacy and safety\'\n4. Tap \'Personalization and data\' (setting is displayed with title \'Track where you see Twitter content across the web\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click \'Privacy and safety\'\n3. Click Personalization and data (setting is displayed with title \'Track where you see Twitter content across the web\')',10),
                                  (8,4,8,'Twitter is not able to track your visits to other websites through the use of cookies.\nCookies are small files that websites place on your device as you browse the web. They track your website history, however your name, email, phone number or Twitter handle are not associated with it. Twitter will not utilize the information gathered for longer than 30 days.\nIf you decide to turn on this setting, Twitter will be able to suggest accounts to you and show advertising based on the information gathered by the cookies.\nThe current state of this setting makes you less vulnerable.',NULL,0),
                                  (9,5,9,'You are able to receive Direct Messages from any Twitter User, even if you do not follow them.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy\'\n3. Tap \'Privacy and safety\'\n4. Tap \'Direct Messages\' (setting is displayed with title \'Receive message requests\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click \'Privacy and safety\' (setting is displayed with title \'Receive Direct Messages from anyone\')\n3. Click Personalization and data (setting is displayed with title \'Track where you see Twitter content across the web\')',10),
                                  (10,5,10,'Only people you follow can send you direct messages\nThe current state of this setting makes you less vulnerable.',NULL,0),
                                  (11,6,11,'Anyone with or without a Facebook account can view the posts you make in the duration that this setting is active.\nIf you put personal information in your post, anyone in the world will have access to that information.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',6),
                                  (12,6,12,'Only people you have accepted as a Friend (users in your Friends List) can view the posts you make in the duration that this setting is active.\nIf you put personal information in your post, only your friends will have access to that information.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',5),
                                  (13,6,13,'Only people you have accepted as a Friend (users in your Friends List) can view the posts you make in the duration that this setting is active, except for certain friends that you specify\nIf you put personal information in your post, the friends you have specified and the public will not have access to that information.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',4),
                                  (14,6,14,'Only you are able to view posts you make in the duration that this setting is active\nIf you put personal information in your post, only you will have access to that information.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',3),
                                  (15,6,15,'Only friends that you have specified from your Friends List can view the posts you make in the duration that this setting is active. All other Friends will not be able to see your posts\nIf you put personal information in your post, only Friends you have specified will have access to that information.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',2),
                                  (16,6,16,'Only friends or other lists of users you specify can view the posts you make in the duration that this setting is active. You can also specify certain users or lists that will not be be able to see your posts.\nIf you put personal information in your post, only Friends you have specified will have access to that information.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',1),
                                  (17,7,17,'Anyone with a Facebook account can send you a Friend Request.\nYour account is more susceptible to malicious accounts sending you friend requests. These accounts may have the intent to scam you.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send you friend requests?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send you friend requests?\')',5),
                                  (18,7,18,'For each Friend you have, their own friends on their Friends List can send you a Friend request. They are able to do this even if you are not friends with them.\nIf you have friends with large Friends lists, malicious accounts are more likely to exist within them. These accounts can send you Friend Requests and may have the intent to scam you.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send you friend requests?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send you friend requests?\')',1),
                                  (19,8,19,'All Facebook users are able to view your Friends List.\nUsers can learn a lot from you based on the people in your friends list. For example, they can correlate the locations of your close friends to aid them in discovering your location.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')',8),
                                  (20,8,20,'Only people you have accepted as a Friend (users in your Friends List) are able to view your Friends List.\nIf you have accepted Friend Requests from people you deem untrustworthy, they can use the information from your Friends List against you. For example, they can correlate the locations of your close friends to discover your location.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')',6),
                                  (21,8,21,'Only you are able to view your Friends List.\nOther Facebook users including your friends will not be able to view your Friends List.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')',4),
                                  (22,8,22,'Only friends or other lists of users you specify can view your Friends List. You can also specify certain users or lists that will not be be able to view your Friends List.\nEnsure that the accounts that you have allowed to view your Friends List are real and trustworthy according to your discretion. If one of them is not real or trustworthy they can use the information from your Friends List against you. For example, they can correlate the locations of your close friends to discover your location.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')',2),
                                  (23,9,23,'Any Facebook user who has uploaded your contact information (including email) from their mobile phone can find your Facebook profile.\nAny person who you have ever given your email to has the potential to find your profile. If you have ever released your email to the public, you are at risk of malicious Facebook users finding your profile.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')',9),
                                  (24,9,24,'For each Friend you have, their own friends on their Friends List who have uploaded your contact information (including email) from their mobile phone can find your Facebook profile.\nIf you have a Friend or multiple Friends who have very large Friends Lists, it is more likely that a few malicious accounts exist within these lists. You would be at risk of malicious Facebook users finding your profile.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')',6),
                                  (25,9,25,'Only your Friends who have uploaded your contact information (including email) from their mobile phone can find your Facebook profile.\nIf someone on your friends list is unknown or untrustworthy, you could be at risk of that user scamming you.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')',3),
                                  (26,10,26,'Any Facebook user who has uploaded your contact information (including phone number) from their mobile phone can find your Facebook profile.\nAny person who you have ever given your phone number to has the potential to find your profile. If you have ever released your phone number to the public, you are at risk of malicious Facebook users finding your profile.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')',9),
                                  (27,10,27,'For each Friend you have, their own friends on their Friends List who have uploaded your contact information (including phone number) from their mobile phone can find your Facebook profile.\nIf you have a Friend or multiple Friends who have very large Friends Lists, it is more likely that a few malicious accounts exist within these lists. You would be at risk of malicious Facebook users finding your profile.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')',6),
                                  (28,10,28,'For each Friend you have, their own friends on their Friends List who have uploaded your contact information (including phone number) from their mobile phone can find your Facebook profile.\nIf someone on your Friends List is unknown or untrustworthy, you could be at risk of that user scamming you.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')',3),
                                  (29,11,29,'Any search engine that is not within Facebook (Google, Yahoo!, Bing, etc.) is linked directly to your Facebook profile.\nIf someone searches your full name on a search engine, your Facebook profile link may appear.\nMalicious users are able to search your full name and find your account.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Do you want search engines outside of Facebook to link to your profile?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Do you want search engines outside of Facebook to link to your profile?\')',10),
                                  (30,11,30,'Search engines that are not within Facebook (Google, Yahoo!, Bing, etc.) do not link directly to your Facebook profile.\nPublic information may still appear in search results from these search engines. This includes posts you have created and shared that were set to public (See setting \'Who can see your future posts\' for more information).\nIf you have put personal information in your posts, the information will be susceptible to anyone that searches the correct keywords related to your posts.\nThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Do you want search engines outside of Facebook to link to your profile?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Do you want search engines outside of Facebook to link to your profile?\')',1),
                                  (31,12,31,'Only your followers can view your photos and videos.\nIf you have any personal or compromising photos or videos, only your followers will be able to see them. Ensure that the people following you are real and trustworthy.\nThe current state of this setting makes you less vulnerable.',NULL,5),
                                  (32,12,32,'Anyone with or without an Instagram account can view your photos and videos.\nIf you have any personal or compromising photos or videos, anyone in the world will be able to see them and use them against you.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Instagram app, do the following:\n1. To access this setting, open the Instagram mobile app and tap the Profile icon located at the bottom right corner of the page\n2. Tap the side menu icon located at the top right corner of the page\n3. Tap \'Settings\'\n4. Tap \'Privacy and security\'\n5. Tap \'Account Privacy\' (setting toggle is located to the right of \'Private account\')\n\nIf you want to change this setting using the Instagram website www.instagram.com, do the following:\n1. To access this setting, open the Instagram website and click on the Profile icon located on the top right corner of the webpage\n2. Click the \'Settings\' icon\n3. Click \'Privacy and Security\' (\'Private Account\' is located under heading \'Account Privacy\')',15),
                                  (33,13,33,'You allow the accounts that you follow and anyone you have messaged to see when you were last active on Instagram.\nIf you have messaged a user that you do not know personally, they can potentially be malicious. They will be able to see when you are generally active, and may try to communicate with you at these times.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Instagram app, do the following:\n1. To access this setting, open the Instagram mobile app and tap the Profile icon located at the bottom right corner of the page\n2. Tap the side menu icon located at the top right corner of the page\n3. Tap \'Settings\'\n4. Tap \'Privacy and security\'\n5. Tap \'Activity status\' (setting toggle is located to the right of \'Show activity status\')\n\nIf you want to change this setting using the Instagram website www.instagram.com, do the following:\n1. To access this setting, open the Instagram website and click on the Profile icon located on the top right corner of the webpage\n2. Click the \'Settings\' icon\n3. Click \'Privacy and Security\' (\'Show Activity Status\' is located under heading \'Activity Status\')',20),
                                  (34,13,34,'You do not allow the accounts that you follow and anyone you have messaged to see when you were last active on Instagram. You will also not be able to see the activity status of other accounts.\nIf you have messaged a user that you do not know personally, they can potentially be malicious, however they will not be able to see when you are generally active.\nThe current state of this setting makes you less vulnerable.',NULL,5),
                                  (35,14,35,'You allow other Instagram users to share your photos and videos in your Story as messages.\nIf your \'Make Account Private\' setting is set to “true”, then a malicious user can share your Story to anyone in the world.\nIf your \'Make Account Private\' setting is set to “false”, then a malicious user can only share your Story to your own followers.\nPlease note that malicious users can still take screenshots of your story from any device and have them stored on their local device. They can then share your story to anyone at their discretion.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Instagram app, do the following:\n1. To access this setting, open the Instagram mobile app and tap the Profile icon located at the bottom right corner of the page\n2. Tap the side menu icon located at the top right corner of the page\n3. Tap \'Settings\'\n4. Tap \'Privacy and security\'\n5. Tap \'Story controls\' (setting toggle is located to the right of \'Allow sharing\')\n\nIf you want to change this setting using the Instagram website www.instagram.com, do the following:\n1. To access this setting, open the Instagram website and click on the Profile icon located on the top right corner of the webpage\n2. Click the \'Settings\' icon\n3. Click \'Privacy and Security\' (\'Allow Sharing\' is located under heading \'Story Sharing\')',15),
                                  (36,14,36,'You do not allow other Instagram users to share your photos and videos in your Story as messages.\nAlthough this setting is off, please note that malicious users can still take screenshots of your story from any device and have them stored on their local device. They can then share your story to anyone at their discretion.\nThe current state of this setting makes you less vulnerable.',NULL,10),
                                  (37,15,37,'All photos and videos that you have been tagged in will be displayed in the \'Photos and videos\' section of your profile automatically.\nMalicious users are able to associated you with photos and videos even if you are not in them. The photos and videos may not reflect your views and actions.\nThe current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Instagram app, do the following:\n1. To access this setting, open the Instagram mobile app and tap the Profile icon located at the bottom right corner of the page\n2. Tap the side menu icon located at the top right corner of the page\n3. Tap \'Settings\'\n4. Tap \'Privacy and security\'\n5. Tap \'Photos and videos of you\' (setting toggle is located to the right of \'Add Automatically\')\n\nIf you want to change this setting using the Instagram website www.instagram.com, do the following:\n1. To access this setting, open the Instagram website and click on the Profile icon located on the top right corner of the webpage\n2. Click the \'Settings\' icon\n3. Click \'Privacy and Security\' (\'Add Automatically\' and \'Add Manually\' is located under heading \'Photos of You\')',25),
                                  (38,15,38,'Photos and videos that you have been tagged in will be displayed in the \'Photos and videos\' section of your profile only if you approve them. You can approve the photo or video in the notification that you receive when you are tagged.\nYou are in control of the photos and videos you are tagged in, so malicious users will find it difficult to associate you with posts that do not reflect your views and actions.\nThe current state of this setting makes you less vulnerable.',NULL,10);
/*!40000 ALTER TABLE `implications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
CREATE TABLE `grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (1,'A+',10),(2,'A',15),(3,'A-',20),(4,'B+',25),(5,'B',30),(6,'B-',35),(7,'C+',40),(8,'C',45),(9,'C-',50),(10,'D+',55),(11,'D',60),(12,'D-',65),(13,'F',100);
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
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
INSERT INTO `score_types` VALUES (1,'cumulative'),(2,'twitter'),(3,'facebook'),(4,'instagram');
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
  `time` timestamp DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO `setting_states` VALUES (1,1,'true'),(2,1,'false'),(3,2,'true'),(4,2,'false'),(5,3,'true'),(6,3,'false'),
                                    (7,4,'true'),(8,4,'false'),(9,5,'all'),(10,5,'following'),(11,6,'Public'),(12,6,'Friends'),
                                    (13,6,'Friends Except...'),(14,6,'Only Me'),(15,6,'Specific Friends'),(16,6,'Custom'),
                                    (17,7,'Everyone'),(18,7,'Friends of friends'),(19,8,'Public'),(20,8,'Friends'),
                                    (21,8,'Only Me'),(22,8,'Custom'),(23,9,'Everyone'),(24,9,'Friends of friends'),
                                    (25,9,'Friends'),(26,10,'Everyone'),(27,10,'Friends of friends'),(28,10,'Friends'),
                                    (29,11,'Yes'),(30,11,'No'),(31,12,'true'),(32,12,'false'),(33,13,'true'),(34,13,'false'),
                                    (35,14,'true'),(36,14,'false'),(37,15,'automatic'),(38,15,'manual');
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
INSERT INTO `settings` VALUES (1,'discoverable_by_email',1),(2,'geo_enabled',1),(3,'protected',1),
                              (4,'use_cookie_personalization',1),(5,'allow_dms_from',1),(6,'future_posts',2),
                              (7,'friend_requests',2),(8,'friends_list',2),(9,'discoverable_by_email',2),(10,'discoverable_by_phone',2),
                              (11,'discoverable_by_search_engine',2),(12,'account_privacy',3),(13,'activity_status',3),
                              (14,'story_sharing',3),(15,'usertag_review',3);
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
INSERT INTO `social_media` VALUES (1,'twitter'),(2,'facebook'),(3,'instagram');
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
