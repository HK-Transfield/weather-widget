-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 15, 2021 at 12:36 AM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `322`
--

-- --------------------------------------------------------

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `ID` int(11) NOT NULL,
  `Town` varchar(30) NOT NULL,
  `CurrentTemp` int(11) NOT NULL,
  `MinTemp` int(11) NOT NULL,
  `MaxTemp` int(11) NOT NULL,
  `Conditions` varchar(50) NOT NULL,
  `Outlook` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `weather`
--

INSERT INTO `weather` (`ID`, `Town`, `CurrentTemp`, `MinTemp`, `MaxTemp`, `Conditions`, `Outlook`) VALUES
(1, 'Hamilton', 24, 7, 26, 'Sunny with some afternoon cloud', 'Rain and high winds'),
(2, 'Tauranga', 26, 9, 29, 'Sunny', 'Some passing cloud later'),
(3, 'Dunedin', 18, 2, 21, 'Overcast', 'Rain and wind'),
(4, 'Auckland', 23, 10, 27, 'Sunny with high humidity', 'Increasing cloud'),
(5, 'Christchurch', 21, 8, 23, 'Sunny with passing cloud  ', 'Fine spells increasing'),
(6, 'Wellington', 18, 7, 20, 'Cloudy with high winds', 'Windy'),
(7, 'Invercargill', 15, 2, 18, 'Overcast', 'Rain'),
(8, 'Nelson', 29, 13, 29, 'Sunny', 'Sunny with some passing cloud'),
(9, 'Rotorua', 23, 6, 26, 'Overcast with a chance of rain later', 'Clearing'),
(10, 'Gisborne', 23, 11, 26, 'Sunny with cloudy intervals', 'Increasing cloud and wind');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `weather`
--
ALTER TABLE `weather`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
