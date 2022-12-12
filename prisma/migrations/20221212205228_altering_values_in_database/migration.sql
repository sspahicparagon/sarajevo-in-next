-- This is an empty migration.

UPDATE `location` SET `Adresa` = 'Glođina'
WHERE `LocationID` = 22;

UPDATE `location` SET `Name` = 'Sarajevo 1878 - 1918'
WHERE `LocationID` = 24;

UPDATE `location` SET `Name` = 'Selfie muzej Sarajevo'
WHERE `LocationID` = 42;

UPDATE `location` SET `Name` = 'Muzej ratnog djetinjstva', `Phone` = '033 535 558'
WHERE `LocationID` = 43;

UPDATE `location` SET `Name` = 'Termalna rivijera Ilidža'
WHERE `LocationID` = 54;

UPDATE `location` SET `Name` = 'Maab Spa centar'
WHERE `LocationID` = 57;

UPDATE `location` SET `Name` = 'Herbal Spa - Ilidža'
WHERE `LocationID` = 58;

UPDATE `location` SET `Name` = 'Herbal Spa Novo Sarajevo - for ladies only'
WHERE `LocationID` = 59;

UPDATE `location` SET `Name` = 'Herbal Spa centar'
WHERE `LocationID` = 62;

UPDATE `location` SET `Name` = 'Ayana Spa'
WHERE `LocationID` = 64;

UPDATE `location` SET `Name` = 'Bilijar klub "Jump" Sarajevo'
WHERE `LocationID` = 6;

UPDATE `location` SET `Name` = 'Narodno pozorište Sarajevo'
WHERE `LocationID` = 45;

UPDATE `location` SET `Name` = 'Pozorište mladih Sarajevo'
WHERE `LocationID` = 46;

UPDATE `location` SET `Name` = 'Sarajevski ratni teatar'
WHERE `LocationID` = 48;

UPDATE `location` SET `Name` = 'West Wood Club & Spa - Hotel Central Sarajevo'
WHERE `LocationID` = 55;

UPDATE `location` SET `Name` = 'Fudbalski tereni Bentbaša'
WHERE `LocationID` = 71;

UPDATE `groupe` SET `Name` = 'Bazen i Spa centar'
WHERE `GroupeID` = 11;

UPDATE `groupe` SET `Name` = 'Rekreacija i Sportski teren'
WHERE `GroupeID` = 12;

UPDATE `groupe` SET `Name` = 'Pozorište'
WHERE `GroupeID` = 8;

UPDATE `worktime` SET `OpenTime` = '10:00:00', `CloseTime` = '16:00:00'
WHERE `LocationID` = 16;

