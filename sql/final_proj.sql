-- phpMyAdmin SQL Dump
-- version 4.4.15.9
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 12, 2019 at 03:14 AM
-- Server version: 5.6.37
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final_proj`
--

-- --------------------------------------------------------

--
-- Table structure for table `Business`
--

CREATE TABLE IF NOT EXISTS `Business` (
  `business_id` int(20) NOT NULL,
  `business_name` varchar(200) NOT NULL,
  `fax` varchar(20) NOT NULL,
  `website` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Business`
--

INSERT INTO `Business` (`business_id`, `business_name`, `fax`, `website`) VALUES
(1, 'test business', '999999999', 'website@website.com'),
(2, 'business place', '123456789', 'websitename@www.com');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE IF NOT EXISTS `Category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`category_id`, `category_name`) VALUES
(1, 'test'),
(2, 'test2');

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE IF NOT EXISTS `Customer` (
  `customer_id` int(20) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `zipcode` int(20) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `business_id` int(20) DEFAULT NULL,
  `state_id` int(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Customer`
--

INSERT INTO `Customer` (`customer_id`, `first_name`, `last_name`, `address`, `zipcode`, `phone`, `business_id`, `state_id`) VALUES
(1, 'customer', 'regular', '123 address street', 44444, '2147483647', NULL, 2),
(2, 'customer', 'business', '789 street rd', 65478, '9875652222', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE IF NOT EXISTS `Products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(4000) NOT NULL,
  `quantity_remaining` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`product_id`, `name`, `price`, `description`, `quantity_remaining`, `category_id`) VALUES
(2, 'product3', 2.43, 'description here ', 100, 1),
(3, 'test', 9.99, 'description', 3, 1),
(6, 'product2', 3.4, 'description here', 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Purchases`
--

CREATE TABLE IF NOT EXISTS `Purchases` (
  `purchase_id` int(20) NOT NULL,
  `product_id` int(20) DEFAULT NULL,
  `quantity_sold` int(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Purchases`
--

INSERT INTO `Purchases` (`purchase_id`, `product_id`, `quantity_sold`) VALUES
(1, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `State`
--

CREATE TABLE IF NOT EXISTS `State` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `State`
--

INSERT INTO `State` (`state_id`, `state_name`) VALUES
(1, 'Alabama'),
(2, 'Alaska');

-- --------------------------------------------------------

--
-- Table structure for table `Transactions`
--

CREATE TABLE IF NOT EXISTS `Transactions` (
  `trans_id` int(20) NOT NULL,
  `customer_id` int(20) DEFAULT NULL,
  `purchase_id` int(20) DEFAULT NULL,
  `purchase_date` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Transactions`
--

INSERT INTO `Transactions` (`trans_id`, `customer_id`, `purchase_id`, `purchase_date`) VALUES
(1, 2, 1, '2019-04-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Business`
--
ALTER TABLE `Business`
  ADD PRIMARY KEY (`business_id`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `FK_BusinessId` (`business_id`),
  ADD KEY `FK_StateId` (`state_id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FK_CategoryId` (`category_id`);

--
-- Indexes for table `Purchases`
--
ALTER TABLE `Purchases`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `FK_ProductID` (`product_id`);

--
-- Indexes for table `State`
--
ALTER TABLE `State`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD PRIMARY KEY (`trans_id`),
  ADD KEY `FK_CustomerID` (`customer_id`),
  ADD KEY `FK_PurchaseID` (`purchase_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Business`
--
ALTER TABLE `Business`
  MODIFY `business_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Customer`
--
ALTER TABLE `Customer`
  MODIFY `customer_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `Purchases`
--
ALTER TABLE `Purchases`
  MODIFY `purchase_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `State`
--
ALTER TABLE `State`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Transactions`
--
ALTER TABLE `Transactions`
  MODIFY `trans_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Customer`
--
ALTER TABLE `Customer`
  ADD CONSTRAINT `FK_BusinessId` FOREIGN KEY (`business_id`) REFERENCES `Business` (`business_id`),
  ADD CONSTRAINT `FK_StateId` FOREIGN KEY (`state_id`) REFERENCES `State` (`state_id`);

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `FK_CategoryId` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`);

--
-- Constraints for table `Purchases`
--
ALTER TABLE `Purchases`
  ADD CONSTRAINT `FK_ProductID` FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`);

--
-- Constraints for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD CONSTRAINT `FK_CustomerID` FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`),
  ADD CONSTRAINT `FK_PurchaseID` FOREIGN KEY (`purchase_id`) REFERENCES `Purchases` (`purchase_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
