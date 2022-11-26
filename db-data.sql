SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `users`(`id` MEDIUMINT NOT NULL AUTO_INCREMENT, `username` CHAR(30) NOT NULL UNIQUE, `password` CHAR(30) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`username`, `password`) VALUES 
    ('user1', 'password1'),
    ('user2', 'password2'),
    ('user3', 'password3');

CREATE TABLE IF NOT EXISTS `cities`(`id` MEDIUMINT NOT NULL AUTO_INCREMENT, `name` CHAR(30) NOT NULL, `coordinate` POINT NOT NULL, SPATIAL INDEX `SPATIAL` (`coordinate`), PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cities` (`name`, `coordinate`) VALUES
    ('Poznań', POINT(52.409538, 16.931992)),
    ('Gdańsk', POINT(54.372158, 18.638306)),
    ('Gdynia', POINT(54.372158, 18.638306)), 
    ('Wrocław', POINT(51.107883, 17.038538)),
    ('Kraków', POINT(50.049683, 19.944544));

CREATE TABLE IF NOT EXISTS `users_cities` (`id` MEDIUMINT NOT NULL AUTO_INCREMENT, `userId` MEDIUMINT NOT NULL, `cityId` MEDIUMINT NOT NULL, KEY `userId` (`userId`), KEY `cityId` (`cityId`), CONSTRAINT `users_cities_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`), CONSTRAINT `users_cities_ibfk_2` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;