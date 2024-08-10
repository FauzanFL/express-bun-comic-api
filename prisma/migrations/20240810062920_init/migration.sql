-- CreateTable
CREATE TABLE `comics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `synopsys` VARCHAR(191) NULL,
    `genre` VARCHAR(255) NOT NULL,
    `release` DATETIME(3) NOT NULL,
    `status` ENUM('ongoing', 'complete') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
