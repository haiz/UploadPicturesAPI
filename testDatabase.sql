-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 29, 2016 at 10:38 PM
-- Server version: 5.6.33-0ubuntu0.14.04.1
-- PHP Version: 5.6.27-1+deb.sury.org~trusty+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `picture`
--

-- --------------------------------------------------------

--
-- Table structure for table `Pictures`
--

CREATE TABLE IF NOT EXISTS `Pictures` (
  `id` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `caption` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `link` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `userID` char(36) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Pictures`
--

INSERT INTO `Pictures` (`id`, `caption`, `link`, `userID`) VALUES
('1a386670-b633-11e6-8d25-f19a93b07b6e', 'Caption có tiếng Việt', 'http://localhost:4000/4bf57d5d79cea64848b0054bb73afebf', '98151f80-b632-11e6-8d25-f19a93b07b6e'),
('3f62b680-b633-11e6-8d25-f19a93b07b6e', 'NodeJS ', 'http://localhost:4000/d87af27b4bf26c26f696036e5aa83cb5', '37ef3630-b633-11e6-8d25-f19a93b07b6e'),
('425218d0-b634-11e6-8d25-f19a93b07b6e', 'Robocode đại chiếnnnnn', 'http://localhost:4000/dff3fb411ad972694ad0c008054445a6', '39d67750-b634-11e6-8d25-f19a93b07b6e');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
