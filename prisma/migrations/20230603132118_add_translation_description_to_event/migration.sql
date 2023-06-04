
CREATE TABLE `event_translation` (
    `EventTranslationID` INTEGER NOT NULL AUTO_INCREMENT,
    `EventID` INTEGER NOT NULL,
    `Language` varchar(5) NOT NULL,
    `Key` varchar(255) NOT NULL,
    `Translation` varchar(2048) NOT NULL,

    PRIMARY KEY (`EventTranslationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `event_translation` ADD CONSTRAINT `EventTranslation_EventID` FOREIGN KEY (`EventID`) REFERENCES `event`(`EventID`) ON DELeTE CASCADE ON UPDATE CASCADE;