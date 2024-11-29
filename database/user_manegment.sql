-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: נובמבר 29, 2024 בזמן 11:42 AM
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
-- מבנה טבלה עבור טבלה `followers`
--

CREATE TABLE `followers` (
  `user_id` int(11) NOT NULL,
  `vecation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `followers`
--

INSERT INTO `followers` (`user_id`, `vecation_id`) VALUES
(48, 167),
(48, 176),
(48, 177),
(48, 179),
(48, 180),
(48, 181),
(48, 182),
(50, 167),
(50, 168),
(50, 176),
(50, 179),
(50, 180),
(50, 183);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `password`, `is_admin`) VALUES
(47, 'manger', 'admin', 'manager@gmail.com', '1234', 1),
(48, 'regular', 'user', 'user@gmail.com', '1234', 0),
(50, 'another ragular', ' - 2user', 'user-2@gmail.com', '1234', 0);

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
-- אינדקסים לטבלה `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`user_id`,`vecation_id`),
  ADD KEY `vecation_id` (`vecation_id`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- אינדקסים לטבלה `vecations`
--
ALTER TABLE `vecations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `vecations`
--
ALTER TABLE `vecations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vecation_id`) REFERENCES `vecations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
