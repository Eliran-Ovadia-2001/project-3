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
