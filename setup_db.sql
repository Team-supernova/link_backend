DROP DATABASE IF EXISTS `link`;
CREATE DATABASE IF NOT EXISTS `link`;
USE `link`;
CREATE USER 'supernova_dev'@'localhost' IDENTIFIED BY 'supernova_dev_pwd';
GRANT ALL PRIVILEGES ON `link`.* TO 'supernova_dev'@'localhost';