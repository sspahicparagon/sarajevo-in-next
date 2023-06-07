-- Change from "Muzej Gazi Husrev-begove bilioteke" to "Muzej Gazi Husrev-begove biblioteke"
UPDATE `location` SET `location`.`Name` = 'Muzej Gazi Husrev-begove biblioteke' WHERE `location`.`LocationID` = 28;

-- Change from "033 261 110" to "033 261 111"
UPDATE `location` SET `location`.`Phone` = '033 261 111' WHERE `location`.`LocationID` = 69;

-- Added Adress
UPDATE `location` SET `location`.`Adresa` = 'Hum, Sarajevo 71000' WHERE `location`.`LocationID` = 79;

-- Rename Pub to Pub i klub
UPDATE `groupe` SET `groupe`.`Name` = 'Pub i klub' WHERE `groupe`.`GroupeID` = 17;

-- Move from Restaurant to Pub i klub
UPDATE `location` SET `location`.`GroupeID` = 17 WHERE `location`.`LocationID` IN (131, 121, 144);