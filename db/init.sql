CREATE TABLE IF NOT EXISTS `Reservations` (
  `reservation_number` varchar(36) UNIQUE NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_count` int NOT NULL,
  `reservation_date` date NOT NULL,
  PRIMARY KEY (`reservation_number`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;