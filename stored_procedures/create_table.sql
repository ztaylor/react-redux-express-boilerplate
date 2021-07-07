CREATE TABLE `finervision_schema`.`user_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `emailAddress` varchar(45) NOT NULL,
  `telephone` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `dob` datetime NOT NULL,
  `comments` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=ARCHIVE AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci