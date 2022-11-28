
INSERT INTO `groupe` (`GroupeID`, `Name`) VALUES
(13, 'Escape Room');

UPDATE `location` SET `GroupeID` = 13 WHERE `LocationID` IN (38, 39, 40, 41);