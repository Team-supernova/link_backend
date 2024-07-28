DROP DATABASE IF EXISTS `link`;
CREATE DATABASE IF NOT EXISTS `link`;

DROP USER IF EXISTS 'supernova_dev'@'localhost';
CREATE USER 'supernova_dev'@'localhost' IDENTIFIED WITH mysql_native_password BY 'supernova_dev_pwd';
GRANT ALL PRIVILEGES ON `link`.* TO 'supernova_dev'@'localhost';
FLUSH PRIVILEGES;
USE `link`;
CREATE TABLE users (
  id CHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  role ENUM('customer', 'vendor') NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE bookings (
  id VARCHAR(255) NOT NULL,
  customer_id CHAR(36) NOT NULL,
  vendor_id CHAR(36) NOT NULL,
  task VARCHAR(255) NOT NULL,
  timeCreated DATETIME NOT NULL,
  agreedPayment DECIMAL(10, 2) NOT NULL,
  agreedTime DATETIME NOT NULL,
  completed TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (vendor_id) REFERENCES users(id)
);
CREATE TABLE reviews (
  id VARCHAR(255) NOT NULL,
  booking_id VARCHAR(255) NOT NULL,
  customer_id VARCHAR(255) NOT NULL,
  vendor_id VARCHAR(255) NOT NULL,
  rating TINYINT(1) NOT NULL,
  review TEXT NOT NULL,
  timeCreated DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (vendor_id) REFERENCES users(id)
);

CREATE TABLE payments (
  id VARCHAR(255) NOT NULL,
  sender_id CHAR(36) NOT NULL,
  receiver_id CHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  time DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);
CREATE TABLE chats (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  message TEXT NOT NULL,
  imageURI VARCHAR(255),
  sender VARCHAR(255) NOT NULL,
  receiver VARCHAR(255) NOT NULL,
  room VARCHAR(255) NOT NULL,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE previews (
  room_hash VARCHAR(255) NOT NULL PRIMARY KEY,
  user1 VARCHAR(255) NOT NULL,
  user2 VARCHAR(255) NOT NULL,
  room VARCHAR(255) NOT NULL
);


CREATE TABLE vendor_profiles (
  id VARCHAR(255) NOT NULL,
  user_id CHAR(36) NOT NULL,
  service VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  website VARCHAR(255) NOT NULL,
  portfolio1 VARCHAR(255),
  portfolio2 VARCHAR(255),
  portfolio3 VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
