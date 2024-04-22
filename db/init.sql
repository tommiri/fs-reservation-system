CREATE TABLE IF NOT EXISTS `Reservations` (
  `reservation_number` varchar(50) UNIQUE NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_count` int NOT NULL,
  `reservation_datetime` datetime NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`reservation_number`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
  `Reservations` (
    `reservation_number`,
    `customer_name`,
    `customer_email`,
    `customer_count`,
    `reservation_datetime`
  )
VALUES
  (
    '056b5cfe-3b59-413c-b518-5f31aad36d7e',
    'John Doe',
    'john@example.com',
    2,
    '2025-01-01 12:00:00' -- Saved to database as ISO Time
  ),
  (
    '36902f33-7d0c-4f79-a208-4cfb5583b1dc',
    'Jane Doe',
    'jane@example.com',
    4,
    '2025-01-02 12:00:00'
  );