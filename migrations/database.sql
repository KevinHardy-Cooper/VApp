SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `VApp`
--

-- --------------------------------------------------------

--
-- Table structure for table `Implications`
--

CREATE TABLE `Implications` (
  `id` int(11) NOT NULL,
  `setting_id` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `instructions` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Scores`
--

CREATE TABLE `Scores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `score` int(5) NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Score_Types`
--

CREATE TABLE `Score_Types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Score_Types`
--

INSERT INTO `Score_Types` (`id`, `name`) VALUES
(1, 'cumulative'),
(2, 'twitter');

-- --------------------------------------------------------

--
-- Table structure for table `Settings`
--

CREATE TABLE `Settings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `social_media_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Setting_States`
--

CREATE TABLE `Setting_States` (
  `id` int(11) NOT NULL,
  `setting_id` int(11) NOT NULL,
  `state` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Social_Media`
--

CREATE TABLE `Social_Media` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Social_Media`
--

INSERT INTO `Social_Media` (`id`, `name`) VALUES
(1, 'twitter');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Implications`
--
ALTER TABLE `Implications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `setting_id` (`setting_id`);

--
-- Indexes for table `Scores`
--
ALTER TABLE `Scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `Score_Types`
--
ALTER TABLE `Score_Types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Settings`
--
ALTER TABLE `Settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `social_media_id` (`social_media_id`);

--
-- Indexes for table `Setting_States`
--
ALTER TABLE `Setting_States`
  ADD PRIMARY KEY (`id`),
  ADD KEY `setting_id` (`setting_id`);

--
-- Indexes for table `Social_Media`
--
ALTER TABLE `Social_Media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Implications`
--
ALTER TABLE `Implications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Scores`
--
ALTER TABLE `Scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Score_Types`
--
ALTER TABLE `Score_Types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Settings`
--
ALTER TABLE `Settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Setting_States`
--
ALTER TABLE `Setting_States`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Social_Media`
--
ALTER TABLE `Social_Media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Implications`
--
ALTER TABLE `Implications`
  ADD CONSTRAINT `implications_ibfk_1` FOREIGN KEY (`setting_id`) REFERENCES `Settings` (`id`);

--
-- Constraints for table `Scores`
--
ALTER TABLE `Scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `Score_Types` (`id`);

--
-- Constraints for table `Settings`
--
ALTER TABLE `Settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`social_media_id`) REFERENCES `Social_Media` (`id`);

--
-- Constraints for table `Setting_States`
--
ALTER TABLE `Setting_States`
  ADD CONSTRAINT `setting_states_ibfk_1` FOREIGN KEY (`setting_id`) REFERENCES `Settings` (`id`);
