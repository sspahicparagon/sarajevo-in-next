CREATE TABLE IF NOT EXISTS `custom_ad` (
  `CustomAdID` int(11) NOT NULL,
  `EndDate` DATETIME(0) NOT NULL,
  `Image` VARCHAR(1023) NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Url` VARCHAR(1023) NULL,
  `Order` int(11) NOT NULL,
  `CustomAdTypeID` int(11) NOT NULL,
  `CreatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `EditedAt` DATETIME(0) NULL,
  PRIMARY KEY (`CustomAdID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `custom_ad_type` (
  `CustomAdTypeID` int(11) NOT NULL,
  `Width` VARCHAR(15) NOT NULL,
  `Height` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`CustomAdTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `custom_ad` ADD CONSTRAINT `CustomAd_CustomAdTypeID` FOREIGN KEY (`CustomAdTypeID`) REFERENCES `custom_ad_type`(`CustomAdTypeID`) ON DELETE CASCADE ON UPDATE CASCADE;