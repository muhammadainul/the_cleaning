-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2020 at 06:50 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_thecleaning`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customer`
--

CREATE TABLE `tbl_customer` (
  `id` varchar(50) NOT NULL,
  `firstname` varchar(25) DEFAULT NULL,
  `lastname` varchar(25) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `zipCode` varchar(5) DEFAULT NULL,
  `userLocalId` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_customer`
--

INSERT INTO `tbl_customer` (`id`, `firstname`, `lastname`, `phone`, `address`, `zipCode`, `userLocalId`, `createdAt`, `updatedAt`) VALUES
('kffjj7yl09t6e4a8958tqjtd', 'Apri', 'Lianti', '0895364319737', 'Manggar', '1234', 'kffjj7yc09t6e4a8958or8cs', '2020-09-23 15:26:59', '2020-09-23 15:26:59'),
('kfmbes35018le4a8957pxf8e', 'Muhammad Ainul', 'Yaqin', '081310017814', 'Komplek depag citayam', '', 'kfmbes2v018le4a8957jmy7m', '2020-09-28 09:13:58', '2020-09-28 09:13:58'),
('kfmlxg8b0g2oe4a8957nexmb', 'Test', 'User', '081928192871', 'Komplek depag Depok', '', 'kfmlxg800g2oe4a8957ha1wh', '2020-09-28 14:08:25', '2020-09-28 14:08:25');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee`
--

CREATE TABLE `tbl_employee` (
  `id` varchar(50) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_employee`
--

INSERT INTO `tbl_employee` (`id`, `firstname`, `lastname`, `phone`, `address`, `createdAt`, `updatedAt`) VALUES
('kffhif6s06ige4a895av90sk', 'Mesut', 'Ozil', '081310017814', 'Komplek ciremai permai', '2020-09-23 14:30:22', '2020-09-23 14:30:22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_files`
--

CREATE TABLE `tbl_files` (
  `id` varchar(50) NOT NULL,
  `employeeId` varchar(50) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `filename` varchar(50) DEFAULT NULL,
  `data` varchar(150) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_files`
--

INSERT INTO `tbl_files` (`id`, `employeeId`, `type`, `filename`, `data`, `createdAt`, `updatedAt`) VALUES
('kffhif7206ige4a895b1hwlo', 'kffhif6s06ige4a895av90sk', 'image/jpeg', 'ad.jpg', 'http://localhost:3001/public/uploads/image/file-1600871422552.jpg', '2020-09-23 14:30:22', '2020-09-23 14:30:22');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `id` varchar(50) NOT NULL,
  `customerId` varchar(50) DEFAULT NULL,
  `employeeId` varchar(50) DEFAULT NULL,
  `priceListId` varchar(50) DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  `orderTime` time DEFAULT NULL,
  `orderDuration` int(5) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `notes` varchar(100) DEFAULT NULL,
  `orderStatus` varchar(25) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `customerId`, `employeeId`, `priceListId`, `orderDate`, `orderTime`, `orderDuration`, `location`, `totalPrice`, `notes`, `orderStatus`, `createdAt`, `updatedAt`) VALUES
('kg0dramb0b3he4a895cvymdt', 'kfmlxg8b0g2oe4a8957nexmb', 'kffhif6s06ige4a895av90sk', NULL, '2020-10-07', '08:00:00', 1, 'Jakarta Selatan', '150000.00', 'Yang bersihin mas anu ya', 'Mitra ditemukan', '2020-10-08 05:28:27', '2020-10-08 05:28:27'),
('kg0dvlww0b3he4a8950odwzb', 'kfmlxg8b0g2oe4a8957nexmb', 'kffhif6s06ige4a895av90sk', NULL, '2020-10-08', '09:00:00', 2, 'Jakarta Selatan', '150000.00', 'Yang bersihin mas boim ya', 'Mitra ditemukan', '2020-10-08 05:31:49', '2020-10-08 05:31:49'),
('kggrpva40dg4ae8a7aehj3uw', 'kfmlxg8b0g2oe4a8957nexmb', NULL, 'kggp2q320kdgae8a7adl17f8', '2020-10-20', '10:00:00', 4, 'Pamulang', '150000.00', 'Tambah pewangin biar ena', 'Pesanan diproses', '2020-10-19 16:43:34', '2020-10-19 16:43:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pricelist`
--

CREATE TABLE `tbl_pricelist` (
  `id` varchar(50) NOT NULL,
  `priceName` varchar(50) DEFAULT NULL,
  `idPriceJob` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_pricelist`
--

INSERT INTO `tbl_pricelist` (`id`, `priceName`, `idPriceJob`, `createdAt`, `updatedAt`) VALUES
('kgdxep8104ck7076ae631vcw', 'Springbed', 'kgdxep7604ck7076ae5kgqe4', '2020-10-17 16:59:32', '2020-10-17 16:59:32'),
('kgdxfwkj04ck7076ae90mzmw', 'Springbed', 'kgdxfwjr04ck7076ae8jza1w', '2020-10-17 17:00:28', '2020-10-17 17:00:28'),
('kgdxge4u04ck7076ae53z7f0', 'Springbed', 'kgdxge4104ck7076ae4mpr48', '2020-10-17 17:00:51', '2020-10-17 17:00:51'),
('kgdxixk404ck7076aed4rqkk', 'Cuci Sofa', 'kgdxixjf04ck7076aecpk7ro', '2020-10-17 17:02:50', '2020-10-17 17:02:50'),
('kgdxjgov04ck7076ae9qnw3w', 'Cuci Sofa', 'kgdxjgo104ck7076ae98shx0', '2020-10-17 17:03:15', '2020-10-17 17:03:15'),
('kgdxjtsi04ck7076ae9e98xw', 'Cuci Sofa', 'kgdxjtru04ck7076ae9032tc', '2020-10-17 17:03:31', '2020-10-17 17:03:31'),
('kgdxk8fo04ck7076ae91mfhg', 'Cuci Sofa', 'kgdxk8ex04ck7076ae8l8ubw', '2020-10-17 17:03:50', '2020-10-17 17:03:50'),
('kgdxkqqz04ck7076ae4nfjz4', 'Cuci Sofa', 'kgdxkqq804ck7076ae47gpu8', '2020-10-17 17:04:14', '2020-10-17 17:04:14'),
('kgdxlqye04ck7076ae3di8zs', 'Cuci Sofa', 'kgdxlqxo04ck7076ae2y750w', '2020-10-17 17:05:01', '2020-10-17 17:05:01'),
('kgdxmr7t04ck7076ae3ahcp8', 'Cuci Sofa', 'kgdxmr7104ck7076ae2u0ze4', '2020-10-17 17:05:48', '2020-10-17 17:05:48'),
('kggotv7c0kdgae8a7a93vz4s', 'Salon Kamar Mandi', 'kggotv720kdgae8a7a8yentc', '2020-10-19 15:22:42', '2020-10-19 15:22:42'),
('kggou9un0kdgae8a7a8ubllo', 'Salon Kamar Mandi', 'kggou9ug0kdgae8a7a8pnvhg', '2020-10-19 15:23:01', '2020-10-19 15:23:01'),
('kggouhe90kdgae8a7a55lc34', 'Salon Kamar Mandi', 'kggouhe20kdgae8a7a51f6dk', '2020-10-19 15:23:11', '2020-10-19 15:23:11'),
('kggoxar40kdgae8a7ab48ep8', 'Setrika', 'kggoxaqx0kdgae8a7aaztm9k', '2020-10-19 15:25:22', '2020-10-19 15:25:22'),
('kggoz4x20kdgae8a7a6zenx4', 'Daily Cleaning', 'kggoz4wv0kdgae8a7a6usgz0', '2020-10-19 15:26:48', '2020-10-19 15:26:48'),
('kggp2q320kdgae8a7adl17f8', 'Paket Studio', 'kggp2q2q0kdgae8a7ade1aio', '2020-10-19 15:29:35', '2020-10-19 15:29:35'),
('kggp3kl20kdgae8a7a5sai2c', 'Paket 1 Bedroom', 'kggp3kkv0kdgae8a7a5ns7pc', '2020-10-19 15:30:15', '2020-10-19 15:30:15'),
('kggqkust0iv8ae8a7a5wlxcw', 'Paket 2 Bedroom', 'kggqkus20iv8ae8a7a5gfa7c', '2020-10-19 16:11:41', '2020-10-19 16:11:41');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pricelistjob`
--

CREATE TABLE `tbl_pricelistjob` (
  `id` varchar(50) NOT NULL,
  `jobType` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_pricelistjob`
--

INSERT INTO `tbl_pricelistjob` (`id`, `jobType`, `price`, `unit`, `createdAt`, `updatedAt`) VALUES
('kgdxep7604ck7076ae5kgqe4', 'Cuci Springbed King (180cm-200cm)', '350000.00', 'bed', '2020-10-17 16:59:32', '2020-10-17 16:59:32'),
('kgdxfwjr04ck7076ae8jza1w', 'Cuci Springbed King (160cm-200cm)', '300000.00', 'bed', '2020-10-17 17:00:28', '2020-10-17 17:00:28'),
('kgdxge4104ck7076ae4mpr48', 'Cuci Springbed King (90cm-120cm)', '200000.00', 'bed', '2020-10-17 17:00:51', '2020-10-17 17:00:51'),
('kgdxixjf04ck7076aecpk7ro', 'Cuci Sofa', '50000.00', 'duduk', '2020-10-17 17:02:50', '2020-10-17 17:02:50'),
('kgdxjgo104ck7076ae98shx0', 'Cuci Cuci Kantor', '30000.00', 'duduk', '2020-10-17 17:03:14', '2020-10-17 17:03:14'),
('kgdxjtru04ck7076ae9032tc', 'Cuci Kursi Makan', '25000.00', 'duduk', '2020-10-17 17:03:31', '2020-10-17 17:03:31'),
('kgdxk8ex04ck7076ae8l8ubw', 'Cuci Jok Mobil', '50000.00', 'duduk', '2020-10-17 17:03:50', '2020-10-17 17:03:50'),
('kgdxkqq804ck7076ae47gpu8', 'Cuci Sofa Kulit', '80000.00', 'duduk', '2020-10-17 17:04:14', '2020-10-17 17:04:14'),
('kgdxlqxo04ck7076ae2y750w', 'Bantalan', '20000.00', 'btl', '2020-10-17 17:05:01', '2020-10-17 17:05:01'),
('kgdxmr7104ck7076ae2u0ze4', 'Cuci Sofa Bed', '200000.00', 'unit', '2020-10-17 17:05:48', '2020-10-17 17:05:48'),
('kggotv720kdgae8a7a8yentc', 'Km. Ukuran S', '350000.00', 'all', '2020-10-19 15:22:42', '2020-10-19 15:22:42'),
('kggou9ug0kdgae8a7a8pnvhg', 'Km. Ukuran M', '450000.00', 'all', '2020-10-19 15:23:01', '2020-10-19 15:23:01'),
('kggouhe20kdgae8a7a51f6dk', 'Km. Ukuran l', '550000.00', 'all', '2020-10-19 15:23:11', '2020-10-19 15:23:11'),
('kggoxaqx0kdgae8a7aaztm9k', 'Setrika Pakaian', '65000.00', 'jam', '2020-10-19 15:25:22', '2020-10-19 15:25:22'),
('kggoz4wv0kdgae8a7a6usgz0', 'Dusting, Sweeping, Mooping, Glas Cleaning, Toilet ', '65000.00', 'jam', '2020-10-19 15:26:48', '2020-10-19 15:26:48'),
('kggp2q2q0kdgae8a7ade1aio', 'Jasa Cleaning Studio', '120000.00', 'jam', '2020-10-19 15:29:35', '2020-10-19 15:29:35'),
('kggp3kkv0kdgae8a7a5ns7pc', '1 Bedroom', '120000.00', 'jam', '2020-10-19 15:30:15', '2020-10-19 15:30:15'),
('kggqkus20iv8ae8a7a5gfa7c', '2 Bedroom', '150000.00', 'jam', '2020-10-19 16:11:41', '2020-10-19 16:11:41');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_userlocal`
--

CREATE TABLE `tbl_userlocal` (
  `id` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(35) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `isLoggedIn` varchar(5) NOT NULL DEFAULT 'false',
  `userTokenId` varchar(100) DEFAULT NULL,
  `userSessionId` varchar(50) DEFAULT NULL,
  `lastActive` datetime DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `tbl_userlocal`
--

INSERT INTO `tbl_userlocal` (`id`, `email`, `username`, `password`, `role`, `isVerified`, `isLoggedIn`, `userTokenId`, `userSessionId`, `lastActive`, `createdAt`, `updatedAt`) VALUES
('kffjj7yc09t6e4a8958or8cs', 'aprilianti154@gmail.com', 'aprilianti', '$2a$10$K2EMk.asQurn2aaKNmjdE.I5r1d5ceTrtkOEJuJmKtR3MaWwYGSIu', 'admin', 1, 'false', NULL, NULL, '2020-09-23 22:31:00', '2020-09-23 15:26:59', '2020-09-23 15:26:59'),
('kfmbes2v018le4a8957jmy7m', 'ainulyaqin@dailyact.com', 'ainulyaqin', '$2a$10$NZoj2IMGdfPmJXxyRW9WDOoIvZ6fJmkNv1T2gbMNRzQCg7XGktkfW', 'user', 0, 'false', NULL, NULL, NULL, '2020-09-28 09:13:58', '2020-09-28 09:13:58'),
('kfmlxg800g2oe4a8957ha1wh', 'ainulsaya@gmail.com', 'tester', '$2a$10$BRjSo0JRnrhlV1rshiHYE./1qX/X9tFgO.YnIZU8zoi4KrZTc.wLy', 'admin', 1, 'true', 'kfmlxg0p0g2oe4a8953afpvx', 'kgmk3kqj0f6oae8a7a6rmu8c', '2020-10-24 00:56:54', '2020-09-28 14:08:25', '2020-09-28 14:08:25');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usersession`
--

CREATE TABLE `tbl_usersession` (
  `id` varchar(100) NOT NULL,
  `accessToken` varchar(250) NOT NULL,
  `refreshToken` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_usersession`
--

INSERT INTO `tbl_usersession` (`id`, `accessToken`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
('kfnhab7u07sj3e5826elqqyz', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbnVsc2F5YUBnbWFpbC5jb20iLCJpYXQiOjE2MDEzNTQ3NzMsImV4cCI6MTYwMTM1ODM3M30.LiJDpewfnfR6r8mxMvZ6hXffUHybC6DqXYfEOCnoTu0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbnVsc2F5YUBnbWFpbC5jb20iLCJpYXQiOjE2MDEzNTQ3NzMsImV4cCI6MTYwMTM1ODM3M30.LiJDpewfnfR6r8mxMvZ6hXffUHybC6DqXYfEOCnoTu0', '2020-09-29 04:46:13', '2020-09-29 04:46:13'),
('kfnheuf409xf3e58265twolu', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbnVsc2F5YUBnbWFpbC5jb20iLCJpYXQiOjE2MDEzNTQ5ODUsImV4cCI6MTYwMTM1ODU4NX0.JHcXPK0vvIp0QWYRCuawm4MiijUJl8L-4FcQ-Nucz4E', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbnVsc2F5YUBnbWFpbC5jb20iLCJpYXQiOjE2MDEzNTQ5ODUsImV4cCI6MTYwMTM1ODU4NX0.JHcXPK0vvIp0QWYRCuawm4MiijUJl8L-4FcQ-Nucz4E', '2020-09-29 04:49:45', '2020-09-29 04:49:45'),
('kfqgdhvf0ncbe4a8959dtnpo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbnVsc2F5YUBnbWFpbC5jb20iLCJpYXQiOjE2MDE1MzQ2NDEsImV4cCI6MTYwMTUzODI0MX0.pha9kEFONSKt7PaFb_y12gCSXD4EG7DOWTYqKJrjbMQ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbnVsc2F5YUBnbWFpbC5jb20iLCJpYXQiOjE2MDE1MzQ2NDEsImV4cCI6MTYwMTUzODI0MX0.pha9kEFONSKt7PaFb_y12gCSXD4EG7DOWTYqKJrjbMQ', '2020-10-01 06:44:01', '2020-10-01 06:44:01'),
('kfqi0g3s0fhhe4a895g7qqrf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbnVsc2F5YUBnbWFpbC5jb20iLCJpYXQiOjE2MDE1MzczOTEsImV4cCI6MTYwMTU0MDk5MX0.QqQS8ActaU8quWUfkI24r8UkIu9dKNu2S_z0eGX_28A', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpbnVsc2F5YUBnbWFpbC5jb20iLCJpYXQiOjE2MDE1MzczOTEsImV4cCI6MTYwMTU0MDk5MX0.QqQS8ActaU8quWUfkI24r8UkIu9dKNu2S_z0eGX_28A', '2020-10-01 07:29:51', '2020-10-01 07:29:51'),
('kfqi22w10g7ue4a8952qbh31', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTUzNzQ2NywiZXhwIjoxNjAxNTQxMDY3fQ.1mS7fz1kKpAGbvM9TC0iuLjUXoYKY0ffKth2lgT_xIM', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTUzNzQ2NywiZXhwIjoxNjAxNTQxMDY3fQ.1mS7fz1kKpAGbvM9TC0iuLjUXoYKY0ffKth2lgT_xIM', '2020-10-01 07:31:07', '2020-10-01 07:31:07'),
('kfw6cpnw083ve4a895dovzzf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTg4MDYwNSwiZXhwIjoxNjAxODg0MjA1fQ.0oMMA3Ldeug2S-rKg9PdGoBj1lPLyOQ1nIZF-0eZDD8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTg4MDYwNSwiZXhwIjoxNjAxODg0MjA1fQ.0oMMA3Ldeug2S-rKg9PdGoBj1lPLyOQ1nIZF-0eZDD8', '2020-10-05 06:50:05', '2020-10-05 06:50:05'),
('kfw8y7y507bhe4a8958t435a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTg4NDk2OCwiZXhwIjoxNjAxODg4NTY4fQ.NAbVFHHeE5jD5o1geU1GPqEcLeEzWNJVidmQm-UIt6A', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTg4NDk2OCwiZXhwIjoxNjAxODg4NTY4fQ.NAbVFHHeE5jD5o1geU1GPqEcLeEzWNJVidmQm-UIt6A', '2020-10-05 08:02:48', '2020-10-05 08:02:48'),
('kfwcgqoi0esye4a8957p86cg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTg5MDg3MSwiZXhwIjoxNjAxOTAxNjcxfQ.IF-mhNYsIczTtiDCIlypPBDerMwsUgPYyLcSEWLPJAM', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTg5MDg3MSwiZXhwIjoxNjAxOTAxNjcxfQ.IF-mhNYsIczTtiDCIlypPBDerMwsUgPYyLcSEWLPJAM', '2020-10-05 09:41:11', '2020-10-05 09:41:11'),
('kfxws9aq04ege4a895b3zkmr', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk4NTQ2NiwiZXhwIjoxNjAxOTk2MjY2fQ.kPFH-DL47bnldE-6a_NJziQj0H5MKb2V24MjCq_zOKg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMTk4NTQ2NiwiZXhwIjoxNjAxOTk2MjY2fQ.kPFH-DL47bnldE-6a_NJziQj0H5MKb2V24MjCq_zOKg', '2020-10-06 11:57:46', '2020-10-06 11:57:46'),
('kfyt27vg0eh2e4a8955k1beq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjAzOTY3OSwiZXhwIjoxNjAyMDUwNDc5fQ.NnKu32VJUybrEwjCDR9CR7zj0vOerLAibKa8mIM6b10', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjAzOTY3OSwiZXhwIjoxNjAyMDUwNDc5fQ.NnKu32VJUybrEwjCDR9CR7zj0vOerLAibKa8mIM6b10', '2020-10-07 03:01:19', '2020-10-07 03:01:19'),
('kfyznohv0d40e4a8954vuxjn', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjA1MDc1OCwiZXhwIjoxNjAyMDYxNTU4fQ.pht9ZY8IHUqf8W6A0XIPYanEhKCPTEBGl4f08GflzNI', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjA1MDc1OCwiZXhwIjoxNjAyMDYxNTU4fQ.pht9ZY8IHUqf8W6A0XIPYanEhKCPTEBGl4f08GflzNI', '2020-10-07 06:05:58', '2020-10-07 06:05:58'),
('kfz1uo82043ae4a895cnzqrm', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjA1NDQ0MywiZXhwIjoxNjAyMDY1MjQzfQ.272bm44e5xcsidm6-QcjiyGYnU3VnW7T9JKO3Dl5MF4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjA1NDQ0MywiZXhwIjoxNjAyMDY1MjQzfQ.272bm44e5xcsidm6-QcjiyGYnU3VnW7T9JKO3Dl5MF4', '2020-10-07 07:07:23', '2020-10-07 07:07:23'),
('kfz8pqpe08r6e4a8950syc73', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjA2NTk3MSwiZXhwIjoxNjAyMDc2NzcxfQ.XbbdOH8v1OJFoPk1lBJVkDggrwtM-rIkGQgxnqlw8FQ', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjA2NTk3MSwiZXhwIjoxNjAyMDc2NzcxfQ.XbbdOH8v1OJFoPk1lBJVkDggrwtM-rIkGQgxnqlw8FQ', '2020-10-07 10:19:31', '2020-10-07 10:19:31'),
('kfzhgpg20g9ie4a8950zelt4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjA4MDY2NiwiZXhwIjoxNjAyMDkxNDY2fQ.xGkARad_z5nahmNJU_HUnpzprPhiM42Tv8IVSCmR8Xo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjA4MDY2NiwiZXhwIjoxNjAyMDkxNDY2fQ.xGkARad_z5nahmNJU_HUnpzprPhiM42Tv8IVSCmR8Xo', '2020-10-07 14:24:26', '2020-10-07 14:24:26'),
('kg0dlfr007zse4a89585g1wk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjEzNDYzNCwiZXhwIjoxNjAyMTQ1NDM0fQ.52y-ILrc1aLwYwIZgGqeMc2ABsSh8Hj_himmYMNC1cc', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjEzNDYzNCwiZXhwIjoxNjAyMTQ1NDM0fQ.52y-ILrc1aLwYwIZgGqeMc2ABsSh8Hj_himmYMNC1cc', '2020-10-08 05:23:54', '2020-10-08 05:23:54'),
('kg0dmezw09lke4a8952uyaga', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjEzNDY4MCwiZXhwIjoxNjAyMTQ1NDgwfQ.DStehYCPFrOu-b1LjFxjGsEpa6m24V8U0m0hKZZAAQo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjEzNDY4MCwiZXhwIjoxNjAyMTQ1NDgwfQ.DStehYCPFrOu-b1LjFxjGsEpa6m24V8U0m0hKZZAAQo', '2020-10-08 05:24:40', '2020-10-08 05:24:40'),
('kg0ggd1o0d2te4a89597l2hw', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjEzOTQzNiwiZXhwIjoxNjAyMTUwMjM2fQ.l8PfMfN_SOfFrM291h2ARx-MlIvFT1clKUeuTOk0DEs', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMjEzOTQzNiwiZXhwIjoxNjAyMTUwMjM2fQ.l8PfMfN_SOfFrM291h2ARx-MlIvFT1clKUeuTOk0DEs', '2020-10-08 06:43:56', '2020-10-08 06:43:56'),
('kggr3xr20bucae8a7aao71ik', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMzEyNDc5MSwiZXhwIjoxNjAzMTM1NTkxfQ.OY6RVdLplFh--2xYAy2KBQOoZqIBhQRT0fa4wAeXt1s', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMzEyNDc5MSwiZXhwIjoxNjAzMTM1NTkxfQ.OY6RVdLplFh--2xYAy2KBQOoZqIBhQRT0fa4wAeXt1s', '2020-10-19 16:26:31', '2020-10-19 16:26:31'),
('kgmk3kqj0f6oae8a7a6rmu8c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMzQ3NTgxNCwiZXhwIjoxNjAzNDg2NjE0fQ.LeXt5ZjXK_rWxfopJFmmzxk8QarykF-3Oc1EdhbaY8Q', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImtmbWx4ZzhiMGcyb2U0YTg5NTduZXhtYiIsImVtYWlsIjoiYWludWxzYXlhQGdtYWlsLmNvbSIsImlhdCI6MTYwMzQ3NTgxNCwiZXhwIjoxNjAzNDg2NjE0fQ.LeXt5ZjXK_rWxfopJFmmzxk8QarykF-3Oc1EdhbaY8Q', '2020-10-23 17:56:54', '2020-10-23 17:56:54');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usertoken`
--

CREATE TABLE `tbl_usertoken` (
  `id` varchar(100) NOT NULL,
  `tokenCode` varchar(150) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_usertoken`
--

INSERT INTO `tbl_usertoken` (`id`, `tokenCode`, `createdAt`) VALUES
('kfmlxg0p0g2oe4a8953afpvx', '4971d5b5c6c595170ecb7909cc8d8aa646edc26a181379eaff361fbe7660d0d98f93417f309ab67f100d770af9e8f4760439', '2020-09-28 14:08:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userDetailId` (`userLocalId`),
  ADD KEY `userLocalId` (`userLocalId`);

--
-- Indexes for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_files`
--
ALTER TABLE `tbl_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`employeeId`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `employeeId` (`employeeId`),
  ADD KEY `priceListId` (`priceListId`);

--
-- Indexes for table `tbl_pricelist`
--
ALTER TABLE `tbl_pricelist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPriceJob` (`idPriceJob`);

--
-- Indexes for table `tbl_pricelistjob`
--
ALTER TABLE `tbl_pricelistjob`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_userlocal`
--
ALTER TABLE `tbl_userlocal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `userSessionId` (`userSessionId`),
  ADD KEY `userSessionId_2` (`userSessionId`),
  ADD KEY `userTokenId` (`userTokenId`);

--
-- Indexes for table `tbl_usersession`
--
ALTER TABLE `tbl_usersession`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_usertoken`
--
ALTER TABLE `tbl_usertoken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  ADD CONSTRAINT `tbl_customer_ibfk_1` FOREIGN KEY (`userLocalId`) REFERENCES `tbl_userlocal` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_files`
--
ALTER TABLE `tbl_files`
  ADD CONSTRAINT `tbl_files_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `tbl_employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD CONSTRAINT `tbl_orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `tbl_customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_orders_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `tbl_employee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_orders_ibfk_3` FOREIGN KEY (`priceListId`) REFERENCES `tbl_pricelist` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_pricelist`
--
ALTER TABLE `tbl_pricelist`
  ADD CONSTRAINT `tbl_pricelist_ibfk_1` FOREIGN KEY (`idPriceJob`) REFERENCES `tbl_pricelistjob` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_userlocal`
--
ALTER TABLE `tbl_userlocal`
  ADD CONSTRAINT `tbl_userLocal_ibfk_3` FOREIGN KEY (`userTokenId`) REFERENCES `tbl_usertoken` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_userLocal_ibfk_4` FOREIGN KEY (`userSessionId`) REFERENCES `tbl_usersession` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
