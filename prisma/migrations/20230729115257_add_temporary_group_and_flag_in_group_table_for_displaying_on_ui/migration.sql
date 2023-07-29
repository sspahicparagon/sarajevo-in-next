-- This is an empty migration.


-- Add IsShown group column

ALTER TABLE `groupe` ADD COLUMN `Visible` BIT NOT NULL DEFAULT TRUE;

INSERT INTO `groupe` (`GroupeID`, `Name`, `Visible`) VALUES (18, 'Temporary', FALSE);