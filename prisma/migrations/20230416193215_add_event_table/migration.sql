-- This is an empty migration.

-- CreateTable
CREATE TABLE `event` (
    `EventID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NULL,
    `Time` VARCHAR(255) NULL,
    `Date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Price` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `Image` VARCHAR(1023) NOT NULL,
    `LocationID` INTEGER NULL,

    INDEX `LocationID`(`LocationID`),
    PRIMARY KEY (`EventID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_LocationID` FOREIGN KEY (`LocationID`) REFERENCES `location`(`LocationID`) ON DELETE CASCADE ON UPDATE CASCADE;