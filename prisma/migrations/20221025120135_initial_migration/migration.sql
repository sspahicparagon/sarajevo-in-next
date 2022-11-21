-- CreateTable
CREATE TABLE `groupe` (
    `GroupeID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`GroupeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `LocationID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NULL,
    `Phone` VARCHAR(255) NULL,
    `Website` VARCHAR(255) NULL,
    `Image` VARCHAR(1023) NOT NULL,
    `GroupeID` INTEGER NULL,
    `CreatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Adresa` VARCHAR(255) NULL,

    INDEX `GroupeID`(`GroupeID`),
    PRIMARY KEY (`LocationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trackimage` (
    `TrackImageID` INTEGER NOT NULL AUTO_INCREMENT,
    `Image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`TrackImageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `worktime` (
    `WorkTimeID` INTEGER NOT NULL AUTO_INCREMENT,
    `DayOfWeek` INTEGER NOT NULL,
    `OpenTime` TIME(0) NOT NULL,
    `CloseTime` TIME(0) NOT NULL,
    `LocationID` INTEGER NOT NULL,

    INDEX `LocationID`(`LocationID`),
    PRIMARY KEY (`WorkTimeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `Location_GroupeID` FOREIGN KEY (`GroupeID`) REFERENCES `groupe`(`GroupeID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `worktime` ADD CONSTRAINT `WorkTime_LocationID` FOREIGN KEY (`LocationID`) REFERENCES `location`(`LocationID`) ON DELETE CASCADE ON UPDATE CASCADE;
