-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: נובמבר 29, 2024 בזמן 11:43 AM
-- גרסת שרת: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_manegment`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `vecations`
--

CREATE TABLE `vecations` (
  `id` int(11) NOT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `vecations`
--

INSERT INTO `vecations` (`id`, `destination`, `description`, `startDate`, `endDate`, `price`, `imagePath`) VALUES
(167, 'prague', 'this is lovely prague', '2024-11-26', '2024-11-30', 120.00, 'uploads\\imagePath-1732655893076-146728927.jpg'),
(168, 'madrid', 'this is lovely madrid', '2024-11-26', '2024-11-30', 1000.00, 'uploads\\imagePath-1732835144879-966625536.jpg'),
(176, 'paris', 'this is lovely paris', '2024-12-05', '2024-12-28', 130.00, 'uploads\\imagePath-1732844113313-582633215.jpg'),
(177, 'budpast', 'this is lovely budpast', '2024-12-04', '2024-12-28', 1130.00, 'uploads\\imagePath-1732844149199-819468307.jpg'),
(178, 'ukraina', 'this is lovely ukraina', '2024-12-04', '2025-01-03', 133.00, 'uploads\\imagePath-1732844183337-640979276.jpg'),
(179, 'israel', 'this is the best country\r\nlovely israel', '2024-11-29', '2024-12-07', 123.00, 'uploads\\imagePath-1732844215368-298887876.jpeg'),
(180, 'germany', 'this is lovely germany', '2024-12-04', '2024-12-26', 1753.00, 'uploads\\imagePath-1732844251055-139597868.jpg'),
(181, 'london', 'this is lovely london', '2024-12-05', '2025-01-07', 131.00, 'uploads\\imagePath-1732844272166-223418633.jpg'),
(182, 'polin', 'this is lovely polin', '2024-12-05', '2024-12-26', 43.00, 'uploads\\imagePath-1732844299662-303077023.jpg'),
(183, 'tokyo', 'this is lovely tokyo', '2024-11-29', '2024-12-03', 123.00, 'uploads\\imagePath-1732844373152-299991753.jpg');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `vecations`
--
ALTER TABLE `vecations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vecations`
--
ALTER TABLE `vecations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
