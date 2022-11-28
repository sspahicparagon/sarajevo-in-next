INSERT INTO `location` (`LocationID`, `Name`, `Phone`, `Website`, `Image`, `GroupeID`, `Adresa`, `Latitude`, `Longitude`) VALUES
(72, 'Vrelo Bosne', '033 580 999', NULL, '/images/AdrenalinPark-VreloBosne.jpg', 6, 'R799+GPH, Ilidža, Sarajevo 71000', '43.8187', '18.2682');

INSERT IGNORE INTO `worktime` (`WorkTimeID`, `DayOfWeek`, `OpenTime`, `CloseTime`, `LocationID`) VALUES
(484, 0, '09:00:00', '21:00:00', 72),
(485, 1, '09:00:00', '21:00:00', 72),
(486, 2, '09:00:00', '21:00:00', 72),
(487, 3, '09:00:00', '21:00:00', 72),
(488, 4, '09:00:00', '21:00:00', 72),
(489, 5, '09:00:00', '21:00:00', 72),
(490, 6, '09:00:00', '21:00:00', 72);