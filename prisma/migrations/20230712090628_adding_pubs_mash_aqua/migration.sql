
-- Insert into location
INSERT INTO `location` (`LocationID`, `Name`, `Phone`, `Adresa`, `Image`, `GroupeID`, `Website`, `Latitude`, `Longitude`) VALUES
(145, 'Mash Lounge & Club', '062 309 178', 'Sarajevo, ul.Branilaca Sarajeva 20/1', '/images/mash-145.webp', 17, 'https://www.instagram.com/mash_lounge_club', '43.85751263922106', '18.421606482403924'),
(146, 'Club AQUA', '061 256 274', 'Mali Kiseljak 8, Sarajevo', '/images/aqua-146.webp', 17, 'https://www.instagram.com/aqua_club_sarajevo', '43.835832762682564', '18.268162167424006');

-- Add opening and closing hours
INSERT IGNORE INTO `worktime` (`DayOfWeek`, `OpenTime`, `CloseTime`, `LocationID`) VALUES
(0, '19:00:00', '01:00:00', 145),
(1, '19:00:00', '01:00:00', 145),
(2, '19:00:00', '01:00:00', 145),
(3, '19:00:00', '01:00:00', 145),
(4, '19:00:00', '01:00:00', 145),
(5, '19:00:00', '01:00:00', 145),
(6, '19:00:00', '01:00:00', 145),

(0, '00:00:00', '00:00:00', 146),
(1, '00:00:00', '00:00:00', 146),
(2, '00:00:00', '00:00:00', 146),
(3, '00:00:00', '00:00:00', 146),
(4, '20:00:00', '04:00:00', 146),
(5, '20:00:00', '04:00:00', 146),
(6, '20:00:00', '04:00:00', 146);