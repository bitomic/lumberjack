-- CreateTable
CREATE TABLE `Logs` (
    `data` JSON NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` ENUM('DEBUG', 'ERROR', 'INFO', 'WARN') NOT NULL,
    `message` VARCHAR(191) NULL,
    `service` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Logs_service_idx`(`service`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
