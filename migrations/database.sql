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
  `weight` float(11) DEFAULT NULL,
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
INSERT INTO `implications` VALUES (1,1,1,'twitter/discoverable_by_email/true/enter.png&&&A hacker can use your email to find your Twitter account. This serves as an entry point to gain more information about you.\ntwitter/discoverable_by_email/true/phone.png&&&Please note that enabling discoverability by phone number has a similar effect.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy\'\n3.Tap \'Privacy and safety\'\n4. Select \'Discoverability and contacts\' (setting is located under the \'Discoverability\' heading and is titled \'Let others find you by your email address\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1.To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2.Click \'Privacy and safety\' (setting is located beside the \'Discoverability\' heading and is titled \'Let others find you by your email address\') ',9.5),
                                  (2,1,2,'twitter/discoverable_by_email/false/search-id.png&&& This setting would force users to search for your account only using your username.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0.00),
                                  (3,2,3,'twitter/geo_enabled/true/map.png&&&When sharing location, people who view your tweets can know exactly where you are at the time of the tweet.\ntwitter/geo_enabled/true/phone-map.png&&&Enabling discoverability by phone number has a similar effect.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy\' \n3.Tap \'Privacy and safety\' (setting is located under the \'Location\' heading and is titled \'Precise Location\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click \'Privacy and safety\' (setting is located beside the \'Tweet location\' heading and is titled \'Tweet with a location\')',20.2),
                                  (4,2,4,'twitter/geo_enabled/false/address.png&&&Your location information is kept private, by denying Twitter to have access to your location.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0.00),
                                  (5,3,5,'twitter/protected/true/team.png&&&Your tweets are not posted publicly and shared only to a smaller subset of people that you allow.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (6,3,6,'twitter/protected/false/spy.png&&&Your public tweets can be read by anyone, including hackers.\ntwitter/protected/false/driver-license.png&&&Sharing private info in public tweets can make you vulnerable (i.e. Birthday, hometown, place of birth, first pet, mother\'s maiden name, favourite TV show, address, etc. can be answers for security questions on other websites where you have an account).\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n Tap \'Settings and privacy\'\n3. Tap \'Privacy and safety\' (setting is located under the \'Tweets\' heading and is titled \'Protect your Tweets\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click \'Privacy and safety\' (setting is located beside the \'Tweet privacy\' heading and is titled \'Protect your Tweets\')',60.7),
                                  (7,4,7,'twitter/use_cookie_personalization/true/cookie.png&&&Twitter is able to track your visits to other websites with Twitter integration.\ntwitter/use_cookie_personalization/true/calendar.png&&&Tracking is done through the use of cookies, which are small files that websites place on your device as you browse the web. They track your website history, however your name, email, phone number or Twitter handle are not associated with it. Twitter will not utilize the information gathered for longer than 30 days.\ntwitter/use_cookie_personalization/true/nota.png&&&An example of this would be if you regularly visit bird-watching websites, Twitter will suggest accounts for you to follow or advertisements that are related to this topic.\nred-shield.png&&&The current state of this setting makes you more vulnerable.', 'If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy\'\n3. Tap \'Privacy and safety\'\n4. Tap \'Personalization and data\' (setting is displayed with title \'Track where you see Twitter content across the web\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click \'Privacy and safety\'\n3. Click Personalization and data (setting is displayed with title \'Track where you see Twitter content across the web\')',4.8),
                                  (8,4,8,'twitter/use_cookie_personalization/false/cookie.png&&&Twitter is not able to track your visits to other websites through the use of cookies.\ntwitter/use_cookie_personalization/false/footsteps.png&&&Cookies are small files that websites place on your device as you browse the web. They track your website history, however your name, email, phone number or Twitter handle are not associated with it. Twitter will not utilize the information gathered for longer than 30 days.\ntwitter/use_cookie_personalization/false/nota.png&&&If you decide to turn on this setting, Twitter will be able to suggest accounts to you and show advertising based on the information gathered by the cookies.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (9,5,9,'twitter/allow_dms_from/all/fake.png&&&You are able to receive Direct Messages from any Twitter User, even if you do not follow them.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Twitter app, do the following:\n1. To access this setting, open the Twitter mobile app and tap on your profile picture on the top left corner of your screen\n2. Tap \'Settings and privacy\'\n3. Tap \'Privacy and safety\'\n4. Tap \'Direct Messages\' (setting is displayed with title \'Receive message requests\')\n\nIf you want to change this setting using the Twitter website www.twitter.com, do the following:\n1. To access this setting, open the Twitter website and click on your profile picture on the top right corner of your screen\n2. Click \'Privacy and safety\' (setting is displayed with title \'Receive Direct Messages from anyone\')\n3. Click Personalization and data (setting is displayed with title \'Track where you see Twitter content across the web\')',4.8),
                                  (10,5,10,'twitter/allow_dms_from/following/small-talk.png&&&Only people you follow can send you direct messages\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (11,6,11,'facebook/future_posts/public/spy.png&&&Anyone with or without a Facebook account can view the posts you make in the duration that this setting is active.\nfacebook/future_posts/public/domain.png&&&If you put personal information in your post, anyone in the world will have access to that information.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',51.0),
                                  (12,6,12,'facebook/future_posts/friends/team.png&&&Only people you have accepted as a Friend (users in your Friends List) can view the posts you make in the duration that this setting is active.\nfacebook/future_posts/friends/link.png&&&If you put personal information in your post, only your friends will have access to that information.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',38.3),
                                  (13,6,13,'facebook/future_posts/friends_except/team.png&&&Only people you have accepted as a Friend (users in your Friends List) can view the posts you make in the duration that this setting is active, except for certain friends that you specify\nfacebook/future_posts/friends_except/link.png&&&If you put personal information in your post, the friends you have specified and the public will not have access to that information.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',25.5),
                                  (14,6,14,'facebook/future_posts/only_me/view.png&&&Only you are able to view posts you make in the duration that this setting is active\nfacebook/future_posts/only_me/driver-license.png&&&If you put personal information in your post, only you will have access to that information.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (15,6,15,'facebook/future_posts/specific_friends/team.png&&&Only friends that you have specified from your Friends List can view the posts you make in the duration that this setting is active. All other Friends will not be able to see your posts\nfacebook/future_posts/specific_friends/link.png&&&If you put personal information in your post, only Friends you have specified will have access to that information.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',12.8),
                                  (16,6,16,'facebook/future_posts/custom/team.png&&&Only friends or other lists of users you specify can view the posts you make in the duration that this setting is active. You can also specify certain users or lists that will not be be able to see your posts.\nfacebook/future_posts/custom/link.png&&&If you put personal information in your post, only Friends you have specified will have access to that information.\ngreen-shield.png&&&TThe current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'Your Activity\' heading and is titled \'Who can see your future posts\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'Your Activity\' heading and is titled \'Who can see your future posts?\')',8.5),
                                  (17,7,17,'facebook/friend_requests/everyone/hacked.png&&&Anyone with a Facebook account can send you a Friend Request.\nfacebook/friend_requests/everyone/phishing.png&&&Your account is more susceptible to malicious accounts sending you friend requests. These accounts may have the intent to scam you.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send you friend requests?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send you friend requests?\')',9.0),
                                  (18,7,18,'facebook/friend_requests/friends_of_friends/mistery.png&&&For each Friend you have, their own friends on their Friends List can send you a Friend request. They are able to do this even if you are not friends with them.\nfacebook/friend_requests/friends_of_friends/phishing.png&&&If you have friends with large Friends lists, malicious accounts are more likely to exist within them. These accounts can send you Friend Requests and may have the intent to scam you.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (19,8,19,'facebook/friends_list/public/domain.png&&&All Facebook users are able to view your Friends List.\nfacebook/friends_list/public/spy.png&&&Users can learn a lot from you based on the people in your friends list. For example, they can correlate the locations of your close friends to aid them in discovering your location.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')',11.0),
                                  (20,8,20,'facebook/friends_list/friends/team.png&&&Only people you have accepted as a Friend (users in your Friends List) are able to view your Friends List.\nfacebook/friends_list/friends/spy.png&&&If you have accepted Friend Requests from people you deem untrustworthy, they can use the information from your Friends List against you. For example, they can correlate the locations of your close friends to discover your location.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')',7.3),
                                  (21,8,21,'facebook/friends_list/only_me/view.png&&&Only you are able to view your Friends List.\nfacebook/friends_list/only_me/invisible.png&&&Other Facebook users including your friends will not be able to view your Friends List.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (22,8,22,'facebook/friends_list/custom/team.png&&&Only friends or other lists of users you specify can view your Friends List. You can also specify certain users or lists that will not be be able to view your Friends List.\nfacebook/friends_list/custom/spy.png&&&Ensure that the accounts that you have allowed to view your Friends List are real and trustworthy according to your discretion. If one of them is not real or trustworthy they can use the information from your Friends List against you. For example, they can correlate the locations of your close friends to discover your location.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can send your friends list?\')',3.7),
                                  (23,9,23,'facebook/discoverable_by_email/everyone/mail.png&&&Any Facebook user who has uploaded your contact information (including email) from their mobile phone can find your Facebook profile.\nfacebook/discoverable_by_email/everyone/domain.png&&&Any person who you have ever given your email to has the potential to find your profile. If you have ever released your email to the public, you are at risk of malicious Facebook users finding your profile.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')',8),
                                  (24,9,24,'facebook/discoverable_by_email/friends_of_friends/team.png&&&For each Friend you have, their own friends on their Friends List who have uploaded your contact information (including email) from their mobile phone can find your Facebook profile.\nfacebook/discoverable_by_email/friends_of_friends/spy.png&&&If you have a Friend or multiple Friends who have very large Friends Lists, it is more likely that a few malicious accounts exist within these lists. You would be at risk of malicious Facebook users finding your profile.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the email address you provided?\')',4.0),
                                  (25,9,25,'facebook/discoverable_by_email/friends/team.png&&&Only your Friends who have uploaded your contact information (including email) from their mobile phone can find your Facebook profile.\nfacebook/discoverable_by_email/friends_of_friends/spy.png&&&If someone on your friends list is unknown or untrustworthy, you could be at risk of that user scamming you.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (26,10,26,'facebook/discoverable_by_phone_number/everyone/phone.png&&&Any Facebook user who has uploaded your contact information (including phone number) from their mobile phone can find your Facebook profile.\nfacebook/discoverable_by_phone_number/everyone/domain.png&&&Any person who you have ever given your phone number to has the potential to find your profile. If you have ever released your phone number to the public, you are at risk of malicious Facebook users finding your profile.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')',6),
                                  (27,10,27,'facebook/discoverable_by_phone_number/friends_of_friends/team.png&&&For each Friend you have, their own friends on their Friends List who have uploaded your contact information (including phone number) from their mobile phone can find your Facebook profile.\nfacebook/discoverable_by_phone_number/friends_of_friends/spy.png&&&If you have a Friend or multiple Friends who have very large Friends Lists, it is more likely that a few malicious accounts exist within these lists. You would be at risk of malicious Facebook users finding your profile.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Who can look you up using the phone number you provided?\')',3),
                                  (28,10,28,'facebook/discoverable_by_phone_number/friends/team.png&&&For each Friend you have, their own friends on their Friends List who have uploaded your contact information (including phone number) from their mobile phone can find your Facebook profile.\nfacebook/discoverable_by_phone_number/friends/phishing.png&&&If someone on your Friends List is unknown or untrustworthy, you could be at risk of that user scamming you.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (29,11,29,'facebook/discoverable_by_search_engine/yes/domain.png&&&Any search engine that is not within Facebook (Google, Yahoo!, Bing, etc.) is linked directly to your Facebook profile.\nfacebook/discoverable_by_search_engine/yes/browser.png&&&If someone searches your full name on a search engine, your Facebook profile link may appear.\nfacebook/discoverable_by_search_engine/yes/spy.png&&&Malicious users are able to search your full name and find your account.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Facebook app, do the following:\n1. To access this setting, open the Facebook mobile app and tap the Menu tab located on the top right corner of the page\n2. Scroll all the way down and tap \'Settings\'\n3. Tap \'Privacy Settings\' (setting is located under the \'How People Find and Contact You\' heading and is titled \'Do you want search engines outside of Facebook to link to your profile?\')\nIf you want to change this setting using the Facebook website www.facebook.com, do the following:\n1. To access this setting, open the Facebook website and click on the downward arrow icon located on the top right corner of the webpage\n2. Click \'Settings\'\n3. Tap \'Privacy\' located on the left toolbar menu (setting is located beside the \'How People Find and Contact You\' heading and is titled \'Do you want search engines outside of Facebook to link to your profile?\')',15.0),
                                  (30,11,30,'facebook/discoverable_by_search_engine/no/domain.png&&&Search engines that are not within Facebook (Google, Yahoo!, Bing, etc.) do not link directly to your Facebook profile.\nfacebook/discoverable_by_search_engine/no/browser.png&&&Public information may still appear in search results from these search engines. This includes posts you have created and shared that were set to public (See setting \'Who can see your future posts\' for more information).\nfacebook/discoverable_by_search_engine/no/driver-license.png&&&If you have put personal information in your posts, the information will be susceptible to anyone that searches the correct keywords related to your posts.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (31,12,31,'instagram/account_privacy/true/team.png&&&Only your followers can view your photos and videos.\ninstagram/account_privacy/true/reliability.png&&&If you have any personal or compromising photos or videos, only your followers will be able to see them. Ensure that the people following you are real and trustworthy.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (32,12,32,'instagram/account_privacy/false/spy.png&&&Anyone with or without an Instagram account can view your photos and videos.\ninstagram/account_privacy/false/domain.png&&&If you have any personal or compromising photos or videos, anyone in the world will be able to see them and use them against you.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Instagram app, do the following:\n1. To access this setting, open the Instagram mobile app and tap the Profile icon located at the bottom right corner of the page\n2. Tap the side menu icon located at the top right corner of the page\n3. Tap \'Settings\'\n4. Tap \'Privacy and security\'\n5. Tap \'Account Privacy\' (setting toggle is located to the right of \'Private account\')\n\nIf you want to change this setting using the Instagram website www.instagram.com, do the following:\n1. To access this setting, open the Instagram website and click on the Profile icon located on the top right corner of the webpage\n2. Click the \'Settings\' icon\n3. Click \'Privacy and Security\' (\'Private Account\' is located under heading \'Account Privacy\')',47.7),
                                  (33,13,33,'instagram/activity_status/true/clock.png&&&You allow the accounts that you follow and anyone you have messaged to see when you were last active on Instagram.\ninstagram/activity_status/true/nav.png&&&If you have messaged a user that you do not know personally, they can potentially be malicious. They will be able to see when you are generally active, and may try to communicate with you at these times.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Instagram app, do the following:\n1. To access this setting, open the Instagram mobile app and tap the Profile icon located at the bottom right corner of the page\n2. Tap the side menu icon located at the top right corner of the page\n3. Tap \'Settings\'\n4. Tap \'Privacy and security\'\n5. Tap \'Activity status\' (setting toggle is located to the right of \'Show activity status\')\n\nIf you want to change this setting using the Instagram website www.instagram.com, do the following:\n1. To access this setting, open the Instagram website and click on the Profile icon located on the top right corner of the webpage\n2. Click the \'Settings\' icon\n3. Click \'Privacy and Security\' (\'Show Activity Status\' is located under heading \'Activity Status\')',21.5),
                                  (34,13,34,'instagram/activity_status/false/spy.png&&&You do not allow the accounts that you follow and anyone you have messaged to see when you were last active on Instagram. You will also not be able to see the activity status of other accounts.\ninstagram/activity_status/false/clock.png&&&If you have messaged a user that you do not know personally, they can potentially be malicious, however they will not be able to see when you are generally active.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (35,14,35,'instagram/story_sharing/true/share.png&&&You allow other Instagram users to share your photos and videos in your Story as messages.\ninstagram/story_sharing/true/domain.png&&&If your \'Make Account Private\' setting is set to “true”, then a malicious user can share your Story to anyone in the world.\ninstagram/story_sharing/true/team.png&&&If your \'Make Account Private\' setting is set to “false”, then a malicious user can only share your Story to your own followers.\ninstagram/story_sharing/true/floppy-disk.png&&&Please note that malicious users can still take screenshots of your story from any device and have them stored on their local device. They can then share your story to anyone at their discretion.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Instagram app, do the following:\n1. To access this setting, open the Instagram mobile app and tap the Profile icon located at the bottom right corner of the page\n2. Tap the side menu icon located at the top right corner of the page\n3. Tap \'Settings\'\n4. Tap \'Privacy and security\'\n5. Tap \'Story controls\' (setting toggle is located to the right of \'Allow sharing\')\n\nIf you want to change this setting using the Instagram website www.instagram.com, do the following:\n1. To access this setting, open the Instagram website and click on the Profile icon located on the top right corner of the webpage\n2. Click the \'Settings\' icon\n3. Click \'Privacy and Security\' (\'Allow Sharing\' is located under heading \'Story Sharing\')',9.5),
                                  (36,14,36,'instagram/story_sharing/false/folder.png&&&You do not allow other Instagram users to share your photos and videos in your Story as messages.\ninstagram/story_sharing/false/floppy-disk.png&&&Although this setting is off, please note that malicious users can still take screenshots of your story from any device and have them stored on their local device. They can then share your story to anyone at their discretion.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0),
                                  (37,15,37,'instagram/usertag_review/automatic/hashtag.png&&&All photos and videos that you have been tagged in will be displayed in the \'Photos and videos\' section of your profile automatically.\ninstagram/usertag_review/automatic/link.png&&&Malicious users are able to associated you with photos and videos even if you are not in them. The photos and videos may not reflect your views and actions.\nred-shield.png&&&The current state of this setting makes you more vulnerable.','If you want to change this setting using the mobile Instagram app, do the following:\n1. To access this setting, open the Instagram mobile app and tap the Profile icon located at the bottom right corner of the page\n2. Tap the side menu icon located at the top right corner of the page\n3. Tap \'Settings\'\n4. Tap \'Privacy and security\'\n5. Tap \'Photos and videos of you\' (setting toggle is located to the right of \'Add Automatically\')\n\nIf you want to change this setting using the Instagram website www.instagram.com, do the following:\n1. To access this setting, open the Instagram website and click on the Profile icon located on the top right corner of the webpage\n2. Click the \'Settings\' icon\n3. Click \'Privacy and Security\' (\'Add Automatically\' and \'Add Manually\' is located under heading \'Photos of You\')',21.5),
                                  (38,15,38,'instagram/usertag_review/manual/folder.png&&&Photos and videos that you have been tagged in will be displayed in the \'Photos and videos\' section of your profile only if you approve them. You can approve the photo or video in the notification that you receive when you are tagged.\ninstagram/usertag_review/manual/remote-control.png&&&You are in control of the photos and videos you are tagged in, so malicious users will find it difficult to associate you with posts that do not reflect your views and actions.\ngreen-shield.png&&&The current state of this setting makes you less vulnerable.',NULL,0);
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
INSERT INTO `grades` VALUES (1,'A+',10),(2,'A',15),(3,'A-',20),(4,'B+',23),(5,'B',27),(6,'B-',30),(7,'C+',33),(8,'C',37),(9,'C-',40),(10,'D+',43),(11,'D',47),(12,'D-',50),(13,'F',100);
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
  `score` float(5) NOT NULL,
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
                                    (7,4,'true'),(8,4,'false'),(9,5,'all'),(10,5,'following'),(11,6,'public'),(12,6,'friends'),
                                    (13,6,'friends_except'),(14,6,'only_me'),(15,6,'specific_friends'),(16,6,'custom'),
                                    (17,7,'everyone'),(18,7,'friends_of_friends'),(19,8,'public'),(20,8,'friends'),
                                    (21,8,'only_me'),(22,8,'custom'),(23,9,'everyone'),(24,9,'friends_of_friends'),
                                    (25,9,'friends'),(26,10,'everyone'),(27,10,'friends_of_friends'),(28,10,'friends'),
                                    (29,11,'yes'),(30,11,'no'),(31,12,'true'),(32,12,'false'),(33,13,'true'),(34,13,'false'),
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
  `email` varchar(255) NOT NULL,
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
