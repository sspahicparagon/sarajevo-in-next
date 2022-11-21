-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2022 at 01:56 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `test_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `groupe`
--

CREATE TABLE IF NOT EXISTS `groupe` (
  `GroupeID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groupe`
--

INSERT INTO `groupe` (`GroupeID`, `Name`) VALUES
(1, 'Bilijar'),
(2, 'Karting'),
(3, 'Pikado'),
(5, 'Paintbal'),
(6, 'Park'),
(7, 'Muzej'),
(8, 'Pozoriste'),
(9, 'Kino'),
(10, 'Kuglana'),
(11, 'Bazen i Spa Centar'),
(12, 'Rekreacija i Sportski Teren');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `LocationID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Website` varchar(255) DEFAULT NULL,
  `Image` varchar(1023) NOT NULL,
  `GroupeID` int(11) DEFAULT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `Adresa` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`LocationID`, `Name`, `Phone`, `Website`, `Image`, `GroupeID`, `CreatedAt`, `Adresa`) VALUES
(3, 'Kuglana Zetra', '033 276 210', 'https://www.zoi84.ba/2021/02/04/ideja-za-izlazak-kuglanje/', '', 10, '2022-10-14 11:56:11', 'Alipašina bb Bjelašnica - Babin do Sarajevo, 71000'),
(4, 'Speed Extreme', '061 569 569', NULL, '', 2, '2022-10-14 12:08:31', 'Tržni Centar Bingo (bivši Tuš) - Stupska bb , Sarajevo'),
(5, 'Billiard Darts Club 69 Sarajevo', '033 609-060', 'https://www.instagram.com/bilijar_pikado_69_sarajevo/?hl=hr', '', 1, '2022-10-14 12:09:40', 'Kolodvorska 3, Sarajevo 71000'),
(6, 'Bilijar klub \"Jump\" sarajevo', '062 590 999', 'https://www.instagram.com/bilijarklubjump/?hl=hr', '', 1, '2022-10-14 12:13:44', 'Merhemića trg bb, Sarajevo 71000'),
(7, 'Mr. & Mrs. Cue', '062 908 399', 'https://www.instagram.com/mr.mrs.cue/?hl=hr', '', 1, '2022-10-14 12:13:44', 'Vilsonovo šetalište 13, Sarajevo 71000'),
(8, 'Mercur SBC', '061 999 996', 'https://www.facebook.com/mercursbc/about', '', 1, '2022-10-14 12:13:44', 'b b, Kranjčevićeva, Sarajevo 71000'),
(9, 'SBK Predator', '033 544-164', 'https://www.facebook.com/bilijarklubdobrinja/', '', 1, '2022-10-14 12:13:44', 'Želimira Vidovića - Kelija 5, Sarajevo 71000'),
(10, 'Union Jack', '064 43 33 313', 'https://www.facebook.com/unionjacksnookersarajevo/', '', 1, '2022-10-14 12:13:44', 'Trg heroja 32, Sarajevo 71000'),
(11, 'Dynamic billiard club', '062 272 080', 'https://www.facebook.com/profile.php?id=100057815523166', '', 1, '2022-10-14 12:13:44', 'Enisa Srne 22, Sarajevo 71000'),
(12, 'Billiard Darts Club 69 Sarajevo', '033 609-060', 'https://www.instagram.com/bilijar_pikado_69_sarajevo/?hl=hr\r\n', '', 3, '2022-10-14 12:18:14', 'Kolodvorska 3, Sarajevo 71000'),
(13, 'Mr. & Mrs. Cue', '062 908 399', 'https://www.instagram.com/mr.mrs.cue/?hl=hr', '', 3, '2022-10-14 12:18:14', 'Vilsonovo šetalište 13, Sarajevo 71000'),
(14, 'Union Jack', '064 43 33 313', 'https://www.facebook.com/UnionJackSnookerBilliardClubSarajevo/', '', 3, '2022-10-14 12:18:14', 'Trg heroja 32, Sarajevo 71000'),
(15, 'SBK Predator', '033 544-164', 'https://www.facebook.com/bilijarklubdobrinja/', '', 3, '2022-10-14 12:18:14', 'Želimira Vidovića - Kelija 5, Sarajevo 71000'),
(16, 'Paintball center Jungle Sarajevo', '061 551 881', 'https://www.facebook.com/junglesarajevo/', '', 5, '2022-10-14 12:19:05', 'Dobroševićka bb, Sarajevo 71000'),
(17, 'Park Safet Zajko', '033 774-597', 'https://www.facebook.com/centarsafetzajko/', '/images/AdrenalinPark-SafetZajko.jpg', 6, '2022-10-14 12:22:54', '71160, Sarajevo'),
(18, 'Sarajevska žičara', '033 548-704', 'https://www.zicara.ba/', '/images/AdrenalinPark-ZicaraSarajevo.jpg', 6, '2022-10-14 12:22:54', 'Hrvatin bb, Sarajevo 71000'),
(19, 'Pionirska dolina', '033 560-567', 'https://www.park.ba/?page_id=9931', '/images/AdrenalinPark-PionirskaDolina.jpg', 6, '2022-10-14 12:22:54', 'Patriotske lige 58, Sarajevo 71000'),
(20, 'Sunnyland', '057 991-339', 'https://sunnyland.ba/', '/images/AdrenalinPark-Sunnyland.jpg', 6, '2022-10-14 12:22:54', 'East Sarajevo, Miljevići bb, 71123'),
(21, 'Zemaljski muzej', '+ 387 33 668 027', 'https://www.zemaljskimuzej.ba/', '', 7, '2022-10-14 12:40:52', 'Zmaja od Bosne 7'),
(22, 'Svrzina kuća', '+ 387 33 535 264', 'https://www.muzejsarajeva.ba/svrzina-kuca/', '', 7, '2022-10-14 12:40:52', 'Glodžina 8'),
(23, 'Muzej Jevreja', '+ 387 33 535 688', 'https://www.muzejsarajeva.ba/en/muzej-jevreja/', '', 7, '2022-10-14 12:40:52', 'Velika Avlija bb'),
(24, 'Sarajevo 1878 – 1918', '+ 387 33 533 288', 'https://www.muzejsarajeva.ba/muzej-1878-1918/', '', 7, '2022-10-14 12:40:52', 'Zelenih beretki 1'),
(25, 'Despića kuća', '+ 387 33 215 531', 'https://www.muzejsarajeva.ba/despica-kuca/', '', 7, '2022-10-14 12:40:52', 'Despićeva 2'),
(26, 'Historijski muzej Bosne i Hercegovine', '+ 387 33 226 098', 'https://bs.wikipedia.org/wiki/Historijski_muzej_Bosne_i_Hercegovine', '', 7, '2022-10-14 12:40:52', 'Zmaja od Bosne 5'),
(27, 'Muzej Gazi Husrev-bega', '+ 387 33 233 170', 'https://www.vakuf-gazi.ba/tour/muzej-gazi-husrev-beg/', '', 7, '2022-10-14 12:40:52', 'Sarači 33'),
(28, 'Muzej Gazi Husrev-begove bilioteke', '+ 387 33 238 152', 'https://ghb.ba/muzej-knjige/', '', 7, '2022-10-14 12:40:52', 'Gazi Husrev-begova 46'),
(29, 'Muzej Vijećnica', ' +387 33 292 800', 'https://gradskimuzeji.ba/gradski-muzeji/muzej-vijecnica/', '', 7, '2022-10-14 12:40:52', 'Obala Kulina bana 1, 71000 Sarajevo'),
(30, 'Muzej književnosti i pozorišne umjetnosti-Galerija “Mak”', '+ 387 33 201 861', 'https://mkpubih.com/galerija-mak/', '', 7, '2022-10-14 12:40:52', 'Sime Milutinovića Sarajlije 7'),
(31, 'Olimpijski muzej', '+ 387 33 226 382', 'https://okbih.ba/bs/tekst/olimpijski-muzej/76', '', 7, '2022-10-14 12:40:52', 'Alipašina bb, Olimpijska dvorana Juan Antonio Samaranch'),
(32, 'Stara pravoslavna crkva i muzej', '+ 387 33 571 761', 'https://balkans.aljazeera.net/news/balkan/2015/4/11/muzej-stare-pravoslavne-crkve-u-sarajevu-medu-pet-u-svijetu', '', 7, '2022-10-14 12:40:52', 'Mula-Mustafe Bašeskije 59'),
(33, 'Muzej Alije Izetbegovića', '033 574 271', 'https://muzejalijaizetbegovic.ba/', '', 7, '2022-10-14 12:40:52', 'Ploča bb'),
(34, 'Spomenički kompleks “Tunel spasa”', '+ 387 33 778 672', 'http://tunelspasa.ba/#Dobrodo%C5%A1li', '', 7, '2022-10-14 12:40:52', 'BA, 1, Tuneli, Sarajevo 71000'),
(35, 'Muzej Sarajevske pivare', '+ 387 33 491 138', 'https://sarajevska-pivara.com/muzej/', '', 7, '2022-10-14 12:40:52', 'Franjevačka 15'),
(36, 'Brusa bezistan', ' + 387 33 239 590', 'https://www.muzejsarajeva.ba/en/brusa-bezistan/', '', 7, '2022-10-14 12:40:52', 'Abadžiluk 10'),
(37, 'Art kuća sevdaha', '+387 33 239 943', 'https://www.facebook.com/kucasevdaha/', '', 7, '2022-10-14 12:40:52', 'Halači 5, Velike daire, Baščaršija'),
(38, 'Escape Room Sarajevo', '061 552 334', 'https://www.facebook.com/escaperoomsarajevo/', '', 7, '2022-10-14 12:40:52', 'Ismeta Alajbegovića Šerbe 3, Sarajevo 71000'),
(39, 'KEY Room Escape', '062 114 422', 'https://key.ba/', '', 7, '2022-10-14 12:40:52', 'Jezero, Sarajevo 71000'),
(40, 'No Escape Room', '061 457 047', 'https://www.noescaperoom.net/', '', 7, '2022-10-14 12:40:52', 'Muhameda Ef. Pandže 4C, Sarajevo 71000'),
(41, 'Fox in a Box Room Escape Sarajevo', '061 101 007', 'https://www.foxinabox.ba/', '', 7, '2022-10-14 12:40:52', 'Sime Milutinovića Sarajlije 15, Sarajevo 71000'),
(42, 'Selfie Museum Sarajevo', '062 673 251', 'https://www.instagram.com/selfiemuseumbih/?hl=hr', '', 7, '2022-10-14 12:44:26', 'Hamdije Kreševljakovića 7a, Sarajevo 71000'),
(43, 'MUZEJ RATNOG DJETINJSTVA', '+387 33 53 55 58', 'https://warchildhood.org/ba/', '', 7, '2022-10-14 12:44:26', 'Logavina 32'),
(44, 'Muzej optičkih iluzija Sarajevo', '033 878-000', 'http://moisarajevo.ba/', '', 7, '2022-10-14 12:44:26', 'Skenderija 28, Sarajevo 71000'),
(45, 'Narodno pozorište u Sarajevu', '033 665-959', 'https://www.nps.ba/', '', 8, '2022-10-14 12:47:04', 'Obala Kulina bana 9, Sarajevo 71000'),
(46, 'Sarajevo Youth Theatre', '033 442 572', 'http://www.pozoristemladih.ba/', '', 8, '2022-10-14 12:47:04', 'Kulovića 8, Sarajevo 71000'),
(47, 'Kamerni teatar 55', '033 550-475', 'https://www.kamerniteatar55.ba/', '', 8, '2022-10-14 12:47:04', 'Maršala Tita 56, Sarajevo 71000'),
(48, 'Sarajevo War Theatre', '033 664-070', 'https://sartr.ba/', '', 8, '2022-10-14 12:47:04', 'Gabelina 16, Sarajevo 71000'),
(49, 'Kino Novi Grad', '033 291-162', 'https://kino.novigradsarajevo.ba/', '', 9, '2022-10-14 12:50:38', 'Bulevar Meše Selimovića 97, Sarajevo 71000'),
(50, 'CineStar 4DX Sarajevo (Bingo City Center)', '036 333-340', 'https://www.blitz-cinestar-bh.ba/cinestar-sarajevo', '', 9, '2022-10-14 12:50:38', 'Dzemala Bijedica St 160n, Sarajevo 71000'),
(51, 'Kino Meeting Point', '033 668-186', 'https://kinomeetingpoint.ba/', '', 9, '2022-10-14 12:50:38', 'Hamdije Kreševljakovića 13, Sarajevo 71000'),
(52, 'Cineplexx Sarajevo', 'kino@cineplexx.ba', 'https://cineplexx.ba', '', 9, '2022-10-14 12:50:38', 'Zmaja od Bosne 4, Sarajevo 71000'),
(53, 'Olimpijski bazen Otoka', '033 773-850', 'https://bazen.ba/', '/images/Bazeni-OlimpijskiBazenOtoka.jpg', 11, '2022-10-14 13:05:03', 'Bulevar Meše Selimovića 83b, Sarajevo 71000'),
(54, 'Ilidža Thermal Riviera', ' 033 947 007', 'https://terme-ilidza.ba/', '/images/Bazeni-Terme.jpg', 11, '2022-10-14 13:05:03', 'Butmirska cesta 18, Ilidža'),
(55, 'West Wood Club&SPA - Hotel Central Sarajevo', '033 561-800', 'https://www.hotelcentral.ba/westwood-club-spa/', '/images/Bazeni-West Wood Club&SPA - Hotel Central Sarajev.jpg', 11, '2022-10-14 13:05:03', 'Ajas-pašin dvor, Ćumurija 8, Sarajevo 71000'),
(56, 'Spa & Wellness Centar Malak Regency', '033 777-200', 'http://www.malakregency.com/en/spa-fitness', '/images/Bazeni-Spa & Wellness Centar Malak Regency.jpg', 11, '2022-10-14 13:05:03', 'Hrasnička cesta, Ilidža'),
(57, 'Maab Spa Centar', '033 810-228', 'https://www.maabspa.ba/#maab-1', '/images/Bazeni-Maab Spa Centar.jpg', 11, '2022-10-14 13:05:03', 'Radnička 34, Sarajevo 71000'),
(58, 'Herbal Spa - Ilidza', '033 763 400', 'https://herbalspa.ba/', '/images/Bazeni-Herbal Spa - Ilidza.jpg', 11, '2022-10-14 13:05:03', 'Dr. Mustafe Pintola 25 B, Ilidža 71210'),
(59, 'HERBAL SPA NOVO SARAJEVO - FOR LADIES ONLY', '033 615 935', 'https://herbalspa.ba/', '/images/Bazeni-HERBAL SPA NOVO SARAJEVO - FOR LADIES ONLY.jpg', 11, '2022-10-14 13:05:03', 'Fra Filima Lastrića br 2, 71000'),
(60, 'Iris Lifestyle Wellness & Spa', '033 561-830', 'https://www.instagram.com/sarajevowellness/?hl=hr', '/images/Bazeni-Iris Lifestyle Wellness & Spa.jpg', 11, '2022-10-14 13:05:03', 'VC4G+XG5, Ćumurija, Sarajevo 71000'),
(61, 'Sundara Balinese Thai Massage', '033 267-845', 'https://spa.sundara.ba/', '/images/Bazeni-Sundara Balinese Thai Massage.jpg', 11, '2022-10-14 13:05:03', 'Mis Irbina 6, Sarajevo 71000'),
(62, 'Herbal Spa Centar', '033 529-656', 'https://herbalspa.ba/', '/images/Bazeni-Herbal Spa Centar.jpg', 11, '2022-10-14 13:05:03', 'Alipašina 5, Sarajevo 71000'),
(63, 'GOODLIFE Spa Sarajevo', '061 018 784', 'https://goodlife-spa.com/spasite/en/', '/images/Bazeni-GOODLIFE Spa Sarajevo.jpg', 11, '2022-10-14 13:05:03', 'Dalmatinska 1, Sarajevo 71000'),
(64, 'Ayana spa', '061 767 800', 'https://www.instagram.com/ayanaspaa/', '/images/Bazeni-Ayana spa.jpg', 11, '2022-10-14 13:05:03', 'Dr. Mustafe Pintola 25 B, Ilidža 71210'),
(65, 'Royal Lotus - Body therapy center', '033 872-689', 'https://www.facebook.com/royallotussarajevo/', '/images/Bazeni-Royal Lotus - Body therapy center.jpg', 11, '2022-10-14 13:05:03', 'Branilaca Sarajeva, Sarajevo 71000'),
(66, 'MAARLAS doo', '033 624-759', 'https://maarlas-doo.business.site/', '/images/Bazeni-MAARLAS doo.jpg', 11, '2022-10-14 13:05:03', 'Bojnička 201, Sarajevo 71000'),
(67, 'Teniski centar Stup', '061 130 667', 'https://tenniscenterstup.com/en/home-3/', '', 12, '2022-10-14 13:07:55', 'Nikole Šopa 217, Sarajevo 71000'),
(68, 'Tennis center Koševo', '033 268 760', 'https://www.facebook.com/csrsa.ba+F54', '', 12, '2022-10-14 13:07:55', 'Mis Irbina 10/II 71000 Sarajevo'),
(69, 'Golf klub Sarajevo', '033 261-110', 'http://www.golfsa.ba/', '', 12, '2022-10-14 13:07:55', 'Armije RBiH 17, Sarajevo 71000'),
(70, 'Vistafon', '033 470-119', 'https://www.facebook.com/vistafonsportclub/', '', 12, '2022-10-14 13:07:55', 'Bulevar Meše Selimovića bb, Sarajevo 71000'),
(71, 'Fudbalski tereni benbaša', '033 238-300', 'https://www.facebook.com/terenibentbasa/', '', 12, '2022-10-14 13:07:55', 'Aleja Ambasadora bb, Sarajevo, Bosnia and Herzegovina');

-- --------------------------------------------------------

--
-- Table structure for table `trackimage`
--

CREATE TABLE IF NOT EXISTS `trackimage` (
  `TrackImageID` int(11) NOT NULL,
  `Image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trackimage`
--

INSERT INTO `trackimage` (`TrackImageID`, `Image`) VALUES
(2, '/track-images/track-image-1.jpg'),
(3, '/track-images/track-image-2.JPG'),
(4, '/track-images/track-image-3.jpg'),
(5, '/track-images/track-image-4.JPG'),
(6, '/track-images/track-image-5.JPG'),
(7, '/track-images/track-image-6.JPG'),
(8, '/track-images/track-image-7.JPG'),
(9, '/track-images/track-image-8.JPG'),
(10, '/track-images/track-image-9.JPG'),
(11, '/track-images/track-image-10.jpeg'),
(12, '/track-images/track-image-11.jpeg'),
(13, '/track-images/track-image-12.jpeg'),
(14, '/track-images/track-image-13.jpeg'),
(15, '/track-images/track-image-14.jpeg'),
(16, '/track-images/track-image-15.jpeg'),
(17, '/track-images/track-image-16.jpeg'),
(18, '/track-images/track-image-17.jpeg'),
(19, '/track-images/track-image-18.jpeg'),
(20, '/track-images/track-image-19.png'),
(21, '/track-images/track-image-20.jpeg'),
(22, '/track-images/track-image-21.jpeg'),
(23, '/track-images/track-image-22.jpeg'),
(24, '/track-images/track-image-23.jpeg'),
(25, '/track-images/track-image-24.jpg'),
(26, '/track-images/track-image-25.JPG'),
(27, '/track-images/track-image-26.jpg'),
(28, '/track-images/track-image-27.jpg'),
(29, '/track-images/track-image-28.jpg'),
(30, '/track-images/track-image-29.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `worktime`
--

CREATE TABLE IF NOT EXISTS `worktime` (
  `WorkTimeID` int(11) NOT NULL,
  `DayOfWeek` int(11) NOT NULL,
  `OpenTime` time NOT NULL,
  `CloseTime` time NOT NULL,
  `LocationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groupe`
--
-- ALTER TABLE `groupe`
  -- ADD PRIMARY KEY (`GroupeID`);

--
-- Indexes for table `location`
--
-- ALTER TABLE `location`
  -- ADD PRIMARY KEY (`LocationID`),
  -- ADD KEY `GroupeID` (`GroupeID`);

--
-- Indexes for table `trackimage`
--
-- ALTER TABLE `trackimage`
  -- ADD PRIMARY KEY (`TrackImageID`);

--
-- Indexes for table `worktime`
--
-- ALTER TABLE `worktime`
  -- ADD PRIMARY KEY (`WorkTimeID`),
  -- ADD KEY `LocationID` (`LocationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groupe`
--
-- ALTER TABLE `groupe`
  -- MODIFY `GroupeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `location`
--
-- ALTER TABLE `location`
  -- MODIFY `LocationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `trackimage`
--
-- ALTER TABLE `trackimage`
  -- MODIFY `TrackImageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `worktime`
--
-- ALTER TABLE `worktime`
  -- MODIFY `WorkTimeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `location`
--
-- ALTER TABLE `location`
  -- ADD CONSTRAINT `Location_GroupeID` FOREIGN KEY (`GroupeID`) REFERENCES `groupe` (`GroupeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `worktime`
--
-- ALTER TABLE `worktime`
  -- ADD CONSTRAINT `WorkTime_LocationID` FOREIGN KEY (`LocationID`) REFERENCES `location` (`LocationID`) ON DELETE CASCADE ON UPDATE CASCADE;
-- COMMIT;
