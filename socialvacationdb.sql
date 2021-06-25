-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2021 at 02:55 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `socialvacationdb`
--
CREATE DATABASE IF NOT EXISTS `socialvacationdb`DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `socialvacationdb`;
-- --------------------------------------------------------

--
-- Table structure for table `taggedvacations`
--

CREATE TABLE `taggedvacations` (
  `uuid` varchar(250) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taggedvacations`
--

INSERT INTO `taggedvacations` (`uuid`, `vacationId`) VALUES
('0e92a9f3-e5ac-4a5a-9968-a031d6766a42', 5),
('16f65a3a-8b55-40f7-8e9c-de41a6c14cce', 5),
('17ce78bd-4366-4f8a-a010-08d948e2cdfc', 2),
('2cc16489-ca24-4299-8aa5-e276aa0b8051', 2),
('66eb8806-1781-43eb-96ad-ced29ba66fd1', 1),
('d3b20218-1159-4b15-bb57-e68bf6deeb41', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `uuid` varchar(500) NOT NULL,
  `firstName` varchar(120) NOT NULL,
  `lastName` varchar(120) NOT NULL,
  `userName` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `uuid`, `firstName`, `lastName`, `userName`, `password`, `isAdmin`) VALUES
(1, 'abb48c93-8af4-408d-8654-d637e7d9148a', 'Many', 'tompson', 'bartSimpson', '862ebeb70543a0466541b61b842892f3a4d2f9cb8c767a26f73e6db8470c981f4f5986467e77358e34fc135b175a51cabb5acfb1634cec15fda60fc5d92b69e1', 0),
(2, '2cc16489-ca24-4299-8aa5-e276aa0b8051', 'Mike', 'Roberts', 'Bradey', '261585effdcabdd4eaca602f8aee99e39eb0f31b191926c79bf841b409bad79b58161c5dcd10accbad8a080ab06580b175f01d4ccce04346c7df1c78dc14a6cf', 0),
(3, '66eb8806-1781-43eb-96ad-ced29ba66fd1', 'Yonatan', 'Ben-Shbat', 'BennyG', 'c70ff71aec1be89689375412293c34eaab0e89176c80aafcb40a0b7389fbe7d3229f7a9c2b2b129a84bd2852532f36200ce5886027a06de95fa590453957c002', 0),
(4, '17ce78bd-4366-4f8a-a010-08d948e2cdfc', 'Tommy', 'Ben-Shbat', 'TommyD', 'a8543c9795d9838737acd9eefdfabf401bd1869e4f45d5e9eead5585774dba695cecc046437627f794057fd0d6608be6a0d2b4f7e078a060fc3840b2ec24ddf9', 0),
(5, '65d6387c-1eb3-4a53-9361-86a875ed375c', 'Broke', 'Levin', 'Borkey', 'a8543c9795d9838737acd9eefdfabf401bd1869e4f45d5e9eead5585774dba695cecc046437627f794057fd0d6608be6a0d2b4f7e078a060fc3840b2ec24ddf9', 0),
(6, '16f65a3a-8b55-40f7-8e9c-de41a6c14cce', 'Yonatan', 'Levin', 'Admin', '261585effdcabdd4eaca602f8aee99e39eb0f31b191926c79bf841b409bad79b58161c5dcd10accbad8a080ab06580b175f01d4ccce04346c7df1c78dc14a6cf', 1),
(7, 'd3b20218-1159-4b15-bb57-e68bf6deeb41', 'Yonatan', 'Levin', 'RegularUser', '261585effdcabdd4eaca602f8aee99e39eb0f31b191926c79bf841b409bad79b58161c5dcd10accbad8a080ab06580b175f01d4ccce04346c7df1c78dc14a6cf', 0),
(8, '0e92a9f3-e5ac-4a5a-9968-a031d6766a42', 'Yonatan', 'Levin', 'RegularUser2', '261585effdcabdd4eaca602f8aee99e39eb0f31b191926c79bf841b409bad79b58161c5dcd10accbad8a080ab06580b175f01d4ccce04346c7df1c78dc14a6cf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationName` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `destination` varchar(50) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationName`, `description`, `destination`, `startDate`, `endDate`, `price`) VALUES
(1, 'Blue Travel', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias aperiam suscipit ipsum tempore, optio exercitationem praesentium quibusdam nulla id mollitia molestiae ea sequi? Optio vero adipisci maxime sapiente dolorem.', 'Maroco', '2021-06-10', '2021-06-25', 2500),
(2, 'Thi Travel', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias aperiam suscipit ipsum tempore, optio exercitationem praesentium quibusdam nulla id mollitia molestiae ea sequi? Optio vero adipisci maxime sapiente dolorem.', 'Thiland', '2021-06-23', '2021-06-29', 5000),
(3, 'Crotia Bc', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias aperiam suscipit ipsum tempore, optio exercitationem praesentium quibusdam nulla id mollitia molestiae ea sequi? Optio vero adipisci maxime sapiente dolorem.', 'Croatia', '2021-06-17', '2021-06-30', 8000),
(4, 'Balkan Travel', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias aperiam suscipit ipsum tempore, optio exercitationem praesentium quibusdam nulla id mollitia molestiae ea sequi? Optio vero adipisci maxime sapiente dolorem.', 'Balkan', '2021-06-30', '2021-06-30', 500),
(5, 'Round Travel', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias aperiam suscipit ipsum tempore, optio exercitationem praesentium quibusdam nulla id mollitia molestiae ea sequi? Optio vero adipisci maxime sapiente dolorem.', 'Israel', '2021-06-18', '2021-06-25', 50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `taggedvacations`
--
ALTER TABLE `taggedvacations`
  ADD PRIMARY KEY (`uuid`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`),
  ADD UNIQUE KEY `vacationName` (`vacationName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `taggedvacations`
--
ALTER TABLE `taggedvacations`
  ADD CONSTRAINT `taggedvacations_ibfk_1` FOREIGN KEY (`uuid`) REFERENCES `users` (`uuid`),
  ADD CONSTRAINT `taggedvacations_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
