-- This is an empty migration.

ALTER TABLE `location` ADD COLUMN IF NOT EXISTS `Description` VARCHAR(1024);

UPDATE `location` SET `Description` = 'Paintball centar Jungle nalazi se nekoliko kilometara od centra grada, u sarajevskom naselju Dobroševići, na površini od oko 7000m². Ima kapacitet za 20 osoba.
Dobrodošli su svi oni koji žele provesti dan u prirodi uz odličnu zabavu, druženje, adrenalin i avanturu.
Zakažite svoj termin na vrijeme. Čekamo te.
' WHERE `location`.`LocationID` = 16;

UPDATE `location` SET `Description` = 'Vrelo Bosne je izvor u centralnoj Bosni i Hercegovini, ispod planine Igman. Izvor je rijeke Bosne, i jedan od najpoznatijih obilježja Bosne i Hercegovine. Nalazi se na periferiji Sarajeva, pored Ilidže. Jedno od najpoznatijih scena prirodne ljepote u regionu, smješteno je u metro području Sarajeva.
Nakon nedostatka održavanja tokom 1990-tih, velika revitalizacija projekta je pokrenuta 2000. godine. Lokalni tinejdžeri, vođeni internacionalnim ekološkim organizacijama, vratili su Vrelo Bosne u svoju prijašnju raskoš.
Danas je Vrelo Bosne poznata turistička atrakcija za strane turiste, ali i za obližnje posjetioce koji žele uživati u prirodi. Sastoji se od više malih otočiča povezanih mostovima preko brojnih manjih potoka. Mnoge životinje se takođe nalaze u parku, poput patki i labudova. Tu su također druge zanimljivosti u parku, poput fijakera, mjesta za izlet i restorana.
'
WHERE `LocationID` = 72;

UPDATE `location` SET `Description` = 'U kompleksu nekadašnje kasarne „Safet Zajko“ otvoren je Centar za edukaciju, sport i rekreaciju, namijenjen cijeloj porodici, penzionerima, sportistima i rekreativcima.
Centar je smješten u središtu Novog Grada, udaljen pet minuta od tramvajskog i autobuskog saobraćaja. Povezan je s gradom pješačkim stazama i mostom izgrađenim u Nedžarićima, biciklističkim stazama i nedavno obnovljenom saobraćajnicom, pa građani do Centra mogu doći pješke, biciklom i automobilom. Ipak, centar će biti zatvoren za vozila, ograđen, čuvan i zatvoren noću, kako bi se zaštitio od oštećivanja.
U centralnom dijelu Centra su fontana, šadrvan i ljetna pozornica namijenjena za kulturno-zabavne manifestacije, oko koje će biti postavljene ljetne bašte za posjetioce, a u blizini se nalazi prostor za fitnes na otvorenom. Ispunjen je zelenilom,  šetnicama i klupama za sjedenje.
Park sadrži atletsku stazu, fudbalski teren sa vještačkom travom, teren za skok udalj, košarkaški teren, svlačionice, dječija igrališta i teren za odbojku na pijesku.
'
WHERE `LocationID` = 17;

UPDATE `location` SET `Description` = 'Trebevićka žičara, ili kako su je starije Sarajlije zvale - uspinjača, sa radom je počela 3. maja 1959, postavši jednim od prepoznatljivih simbola glavnog grada BiH.
Trasa žičare, koja je povezivala naselje Bistrik na lijevoj obali Miljacke sa Trebevićem, omiljenim gradskim izletištem, „plućima Sarajeva“, bila je dugačka 2.100 metara. 
Na stanicama su se nalazili i mali bifei, a na Vidikovcu je kasnije sagrađen istoimeni restoran, sa predivnom baštom i očaravajućim panoramskim pogledom na grad.
Već sa prvim danima rata 1992. godine žičara je uništena, a Trebević je postao prvom linijom fronte.
Obnovljena trebevička žičara ponovo je puštena u promet u aprilu 2018. godine.
Žičara ima 33 gondole, u gondolu staje 10 osoba, a vožnja do Trebevića traje oko osam minuta.
Cijena jednosmjerne vožnje žičarom za građane BiH je 4 KM, dok povratna karta košta 6 KM, dok jednosmjerna karta za turiste košta 15 KM, a povratna 20 KM. Vožnja žičarom se ne naplaćuje djeci do sedam godina, putnici koji imaju bicikl uslugu plaćaju dodatne 4 KM, a ulazak u kabine omogućen je i ljubimcima.
Za sad se karte mogu kupiti samo na polaznoj stanici, a uskoro će se moći kupiti i u Vijećnici, kao i na dolaznoj stanici.
Na dolaznoj stanici žičare nalazi se Coffee2Go, ugostiteljski objekat s fantastičnim pogledom na Sarajevo.
Na samom Trebeviću, posjetioci mogu uživati u prelijepom pogledu na panoramu Sarajeva, kao i u šetnji prirodom do izletišta Brus ili Prvi šumar u blizini hotela Pino Nature. Moguć je i obilazak ostataka olimpijske bob staze i opservatorija Čolina kapa, ali i opuštanje u nekom od brojnih ugostiteljskih objekata, kao što su Pino Nature, Brus, Trebevićki raj, Level Up i Vila Andrea.
'
WHERE `LocationID` = 18;

UPDATE `location` SET `Description` = 'Pionirska dolina je rekreativno–zabavni centar i zoološki vrt koji se nalazi u sarajevskom naselju Koševo, u gradskoj općini Centar. 
Prostire se na površini od 8,5 hektara. Osim ZOO vrta, u Pionirskoj dolini nalaze se i igrališta i različite animacije što ovaj centar čini jednom je od najomiljenijih porodičnih destinacija u Sarajevu.
Centrom upravlja preduzeće KJKP Park.
'
WHERE `LocationID` = 19;

UPDATE `location` SET `Description` = 'Sunnyland je jedinstveni zabavni park za djecu i odrasle u ovom dijelu regiona, a glavna atrakcija je adrenalinski alpine coaster namijenjen za sve generacije, dug 600 metara.
Udaljen je samo deset minuta vožnje od centra grada, a za posjetioce je obezbijeđen i besplatni autobuski prevoz iz Sarajeva svakog dana (za red vožnje posjetite www.sunnyland.ba).
Maksimalna brzina koju vozilo na alpine coasteru može razviti je 40 kilometara na sat, a može se korigovati pomoću poluge fiksirane na vozilo. Alpine coaster dostupan je tokom cijele godine, a smješten je na padini okrenutoj prema Sarajevu pa tokom vožnje možete uživati u prelijepom pogledu na grad.
Gostima je na raspolaganju međunarodni restoran Oxygen iz kojeg se također pruža pogled na Sarajevo, a restoran raspolaže i sa dvije igraonice za djecu. Tokom toplih dana možete uživati na velikoj otvorenoj terasi restorana.
Uz početnu stanicu alpine coastera nalazi se i Café Noova iz kojeg možete uživati u pogledu na cijeli zabavni park.
Posjetiocima Sunnylanda dostupna su dva velika parkinga.
'
WHERE `LocationID` = 20;

UPDATE `location` SET `Description` = 'Zemaljski muzej Bosne i Hercegovine u Sarajevu je muzejska institucija u Bosni i Hercegovini, osnovana 1888. godine, za vrijeme Austro-Ugarske vladavine.
Kao jedna od još uvijek neistraženih zemalja Balkana, Bosna i HercegovinaBosna i Hercegovina je privlačila zanimanje mnogih znanstvenika, naročito onih iz Austro-Ugarske, ali i pozornost pseudoznanstvenika i lovaca na blago. To je već prvih godina austrougarske okupacije rezultiralo iznošenjem spomenika kulture s prostora Bosne i Hercegovine. Takvo je stanje ubrzalo je ostvarivanje ideje o osnivanju muzeja: prvo je osnovano Muzejsko društvo, a zatim i Zemaljski muzej 1. veljače 1888. godine. Zemaljska vlada, kao osnivač institucije, imenovala je za ravnatelja Muzeja vladinog savjetnika Kostu Hörmanna.
U početku je muzej bio smješten u neuvjetnim prostorijama, da bi regulacijskim planom iz 1909. godine načinjena skica muzeja i predviđena njegova izgradnja u središnjem dijelu grada Sarajeva, na današnjem Trgu Bosne i Hercegovine. Arhitekt Karlo Paržik je uradio projekt za zgradu muzeja, koja se sastoji od četiri zasebna paviljona, međusobno povezana terasama, s unutrašnjim atrijom gdje je smješten botanički vrt. Zgrada je rađena u neorenesansnom stilu. Zanimljivo je da je to jedina zgrada muzeja u jugoistočnoj Europi koja je namjenski građena za tu svrhu.
'
WHERE `LocationID` = 21;

UPDATE `location` SET `Description` = 'Svrzina kuća je privatna kuća u Sarajevu izgrađena u tradicionalnom bosanskom stilu, koja danas služi kao muzej bosanske arhitekture. Kuća je apsolutno čuvala intimu obiteljskog života i pružala uvid u život sokaka. Ona je najljepši očuvani primjerak izuzetnosti sarajevskog stambenog graditeljstva u osmanskom razdoblju.
Svrzina kuća se navodi u mnogim arhitektonskim znanstvenim teorijama kao primjer bosanske arhitekture osmanskog razdoblja, koja je definirala bosanski arhitektonski sklop. Po mnogim teorijama sastoji se iz sljedećih komponenata: ograda, koja je određivala ulicu i jasno odvajala privatni od javnog prostora, dvorište, koje je bilo obloženo oblim kamenom, radi lakšeg održavanja, šadrvan (vodoskok), fontana ili česma, koji su služili za održavanje higijene prije ulaska u kuću, hajat, prizemlje, gdje se okupljala obitelj, te divanhana na katu, koja je bila privatnog karaktera, a korištena uglavnom za odmor i uživanje pogleda na čaršiju ili u prirodu. Kuća je posjedovala cvjetnjak đul-bašču i povrtnjak. Sagrađena je od nepečene opeke ćerpiča i drveta. Kuću su karakterizirala dva jasno odvojena dijela: muški i ženski, što govori o patrijarhalnim odnosima u obitelji, specifičnim za cjelokupno razdoblja osmanske vlasti, koji su se dugo zadržali i ostavili svoje tragove sve do novijeg vremena.
'
WHERE `LocationID` = 22;

UPDATE `location` SET `Description` = 'Muzej Jevreja Bosne i Hercegovine (Il Kal Grandi -Veliki hram, ili Il Kal Vježu -Stari hram ili Stara sinagoga) jest dio Muzeja Sarajevo smješten u prostoru nekadašnjeg Starog hrama, u najstarijoj sinagogi u Bosni i Hercegovini.[1] Komisija za očuvanje nacionalnih spomenika, na sjednici održanoj od 7. do 11. oktobra 2003. donijela je odluka da se Muzej Jevreja proglasi za nacionalni spomenik Bosne i Hercegovine. Ovu odluku Komisija je donijela u sljedećem sastavu: Zeynep Ahunbay, Amra Hadžimuhamedović (predsjedavajuća), Dubravko Lovrenović, Ljiljana Ševo i Tina Wik.'
WHERE `LocationID` = 23;

UPDATE `location` SET `Description` = 'Muzej "Sarajevo 1878-1918." depandans je Muzeja Sarajeva čija stalna postavka prikazuje Sarajevo u vrijeme austro-ugarske uprave. Smješten je u zgradi nekadašnje Schillerove radnje na uglu Obale Kulina bana i Ulice Zelenih beretki, pred kojom se 28. juna 1914. dogodio Sarajevski atentat, ubistvo austro-ugarskog prestolonasljednika Franje Ferdinanda i njegove supruge Sofije, koja je počinio sarajevski gimnazijalac Gavrilo Princip, pripadnik organizacije Mlada Bosna. Za ovaj atentat Austro-Ugarska je smatrala Srbiju neposredno odgovornom, pa joj je 23. jula uputila ultimatum, a ubrzo i objavila rat. Nakon toga je počeo Prvi svjetski rat.'
WHERE `LocationID` = 24;

UPDATE `location` SET `Description` = 'Despića kuća je muzej-kuća u Sarajevu. Kuća prikazuje kulturu stanovanja bogate, trgovačke, pravoslavne obitelji Despić.
Nalazi se na uglu Obale Kulina bana i Despićeve ulice u starom dijelu Sarajeva, nedaleko od Latinske ćuprije i u vlasništvu je Muzeja Sarajeva, kao njegov depandans.[1]
Despića kuća je proglašena nacionalnim spomenikom Bosne i Hercegovine 2005. godine.
'
WHERE `LocationID` = 25;

UPDATE `location` SET `Description` = 'Muzej je osnovan 28. novembra 1945. godine kao "Muzej narodnog oslobođenja u Sarajevu", prema zakonu koji je donijelo tadašnje Predsjedništvo narodne skupštine Bosne i Hercegovine kao zemaljska ustanova pod neposrednim nadzorom Ministarstva prosvjete "Narodne vlade Bosne i Hercegovine". Današnji naziv Historijski muzej Bosne i Hercegovine stupa na snagu 1994. godine, kada Muzej proširuje djelokrug rada na historiju BiH od dolaska Slavena na Balkanski poluotok do savremene i nezavisne Bosne i Hercegovine. Historijski muzej BiH je jedini muzej koji tretira kompletnu historiju Bosne i Hercegovine od njenog prvog spominjanja u historijskim izvorima (949. godine, Konstantin VII Porfirogenet) do savremene i nezavisne Bosne i Hercegovine.
'
WHERE `LocationID` = 26;

UPDATE `location` SET `Description` = 'Muzej Gazi Husrev-beg posvećen je liku i djelu Gazi Husrev-bega (1480 - 1541), upravitelja Bosne i najvećeg vakifa (dobročinitelja) Sarajeva.
Muzej je smješten u prostoru Kuršumli medrese, jedne od brojnih građevina koje je Gazi Husrev-beg podigao u Sarajevu.
Muzejska postavka sastoji se od osam tematskih cjelina raspoređenih po nekadašnjim učeničkim sobama Kuršumli medrese.

Posjetitelji se kroz ove cjeline mogu upoznati sa Gazi Husrev-begom kao historijskom ličnošću, sa njegovim Vakufom, kao i sa Gazi Husrev-begovom medresom.

U centralnoj prostoriji Kuršumli medrese - dershani (predavaonici) smještena je kolekcija raritetnih predmeta Gazi Husrev-begovog vakufa, tu je i soba sa instrumentima za određivanje vremena (muvekkithana), soba sa starim fotografijama Gazi Husrev-begovog vakufa, kao i soba posvećena stradanju objekata Vakufa tokom opsade Sarajeva od 1992. do 1995. godine.

U jednoj od prostorija može se pogledati i dokumentarni film o Gazi Husrev-begu, nastanku njegovog vakufa i vakufskim objektima izgrađenim u Sarajevu.
'
WHERE `LocationID` = 27;

UPDATE `location` SET `Description` = 'U kolekciji Muzeja Gazi Husrev-begove biblioteke nalazi se više od 1200 eksponata, koji su podijeljeni u pet tematskih cjelina: Islamska umjetnost / Kaligrafija, obrazovanje, vjerski život, etnologija, biblioteka u ratu.
Islamska kaligrafija predstavlja zbirku radova bh. majstora kaligrafije, dok se u sklopu tematske cjeline Mjerenje vremena nalaze predmeti korišteni za izračunavanje tačnog vremena, među kojima su i dva ručno rađena globusa čuvenog sarajevskog muvekita (osoba zadužena za tačno izračunavanje namaskih vremena) Saliha Sidki-efendije Muvekkita.
U sklopu tematske cjeline Ulema predstavljeni su radovi (u rukopisu, ili štampani) čuvenih pripadnika bh. uleme (učenjaka), gdje se oni pojavljuju kao autori, prepisivači, ili komentatori djela.
Dio zbirke pod nazivom Džamija i tekija obuhvata predmete iz bh. džamija i tekija, poput levhi, lustera, rahli, tespiha, ručno tkanih ćilima i sedžada ...
U sklopu tematske cjeline Hadž izloženi su predmeti koje su bosanskohercegovačke hadžije donosile sa svojih hodočašća, dok se u dijelu muzejske postavke pod nazivom Svakodnevni život nalaze predmeti koje su Bošnjaci stoljećima koristili u svakodnevnom životu, poput odjeće i obuče, namještaja, posuđa, predmeta za održavanje higijene...
'
WHERE `LocationID` = 28;

UPDATE `location` SET `Description` = 'Muzej Vijećnica smješten je u podrumu sarajevske Vijećnice, građevine koja je jedan od prepoznatljivih simbola glavnog grada BiH, te svojevrsni svjetski simbol susreta civilizacija. 
U skladu sa projektom obnove Vijećnice planirano je da u ovom prostoru bude izložena stalna muzejska postavka o izgradnji, paljenju i obnovi Vijećnice, kao i o značajnim događajima kojima je ova građevina svjedočila tokom svoje burne historije.
Posjetitelji Muzeja mogu pogledati izložbu "Sarajevska Vijećnica još jednom", autora Nedžada Mulaomerovića, koja priča priču o obnovi Vijećnice koja je trajala gotovo dvije decenije.
U saradnji sa Javnom ustanovom Muzej Sarajeva u Muzeju Vijećnica postavljena je i izložba „Sarajevo 1914-2014“, koja se bavi životom u Sarajevu tokom prošlog stoljeća, čiji je jedan od simbola upravo sarajevska Vijećnica.
'
WHERE `LocationID` = 29;

UPDATE `location` SET `Description` = 'Galerija Mak je izložbeni prostor Muzeja književnosti i pozorišne umjetnosti Bosne i Hercegovine. 
Smještena je u prizemlju zgrade Muzeja, stare porodične kuće Despića iz 19. stoljeća, koja je kulturno-historijski spomenik prve kategorije.
Prostor Galerije, koja je sa radom započela 1992. godine, prevashodno se koristi za prezentiranje izložbi Muzeja književnosti i pozorišne umjetnosti, ali i gostujućih izložbi, te organizaciju književnih večeri.
U galeriji se često dešavaju i pozorišne i muzičke manifestacije, te naučne konferencije i seminari.
'
WHERE `LocationID` = 30;

UPDATE `location` SET `Description` = 'Olimpijski muzej Sarajevo otvoren je 8. februara 1984. godine na dan otvaranja XIV zimskih olimpijskih igara.
Muzej je otvoren s ciljem da trajno čuva i baštini sjećanje na organizaciju jednoga od najvećih sportskih događaja održanog na području Jugoistočne Evrope.[1]
Od 1984. do 1992. godine Muzej je djelovao u reprezentativnoj vili u centru Sarajeva gdje je realizovano više od 300 tematskih programa.[2] 27. aprila 1992. godine, tokom rata u Bosni i Hercegovini, zgrada Muzeja je zapaljena i uništeni su mnogi vrijedni eksponati. Spašeni eksponati su ponovno postavljeni u novom Olimpijskom muzeju, 2004. godine, u povodu obilježavanja 20. godišnjice XIV ZOI, koji se nalazi u kompleksu Zetra u prostorijama Olimpijskog komiteta BiH.
Muzej posjeduje dokumentarnu postavku o organizaciji, pripremi i realizaciji ZOI 84 te umjetničku kolekciju doniranih djela umjetnčkih djela, kolekcija Mapa svjetske grafike "Art and Sport" sa djelima umjetnika: Henry Moore, Andy Warhol, Michelangelo Pistoletto, kao i kolekcija savremenih bosanskohercegovačkih umjetnika: Mersad Berber, Boško Kućanski, Mehmed Zaimović.[3]
Zgradu Olimpijskog muzeja projektovao je češki arhitekta Karlo Paržik kao vilu za sarajevskog advokata i političara Nikolu Mandića 1903. godine i rađena je po uzora na luksuzne evropske vile iz istog perioda.[4] Nakon Drugog svjetskog rata objekat je nacionaliziran i proglašen je društvenom svojinom. Zgrada Olimpijskog muzeja proglašena je za nacionalni spomenik Bosne i Hercegovine kao dio graditeljske cjeline vila iz austrougarskog perioda u Petrakijinoj ulici.[5] Grad Sarajevo je poduzeo aktivnosti kako bi Muzej bio otvoren prije EYOF-a 2019. koji organizuju Sarajevo i Istočno Sarajevo.
'
WHERE `LocationID` = 31;

UPDATE `location` SET `Description` = 'Stara pravoslavna crkva u Sarajevu, koja je posvećena Svetim arhandželima Mihailu i Gavrilu, jedan je od najstarijih sakralnih objekata u Sarajevu. 
Pretpostavlja se da je izgrađena sredinom 16. stoljeća, i to na mjestu gdje je prije stajala još starija crkva.
U toku svoje historije Crkva je više puta gorjela, ali je svaki put obnavljana, pa je zadržala autentični izgled. Zadnji put je iz temelja obnovljena 1726. godine.
Uz Crkvu se nalazi i Muzej Stare pravoslavne crkve, osnovan 1889. godine, a koji se, po vrijednostima ikona koje posjeduje, smatra jednim od najznačajnijih pravoslavnih muzeja u svijetu.
U muzeju se čuvaju i veoma vrijedni rukopisi, od kojih je najpoznatiji novokanon (zakonik) Sarajevska krmčija iz 1307. godine, te zbirka starog novca, odjeće, oružja...
'
WHERE `LocationID` = 32;

UPDATE `location` SET `Description` = 'Muzej "Alija Izetbegović" smješten je u prostoru stare gradske utvrde u Sarajevu, u vratničkim kapi-kulama Ploča i Širokac. Otvoren je 19. oktobra 2007. i posvećen je životu i djelu prvog predsjednika Predsjedništva Bosne i Hercegovine Aliji Izetbegoviću. 
Prvobitno je bio otvoren kao jedan od depandansa Muzeja Sarajeva, a odlukom Skupštine Kantona Sarajevo 2009. godine postaje zasebna javna ustanova ovog kantona
'
WHERE `LocationID` = 33;

UPDATE `location` SET `Description` = 'Tunel spasa je naziv za sarajevski ratni tunel koji je napravljen tokom opsade Sarajeva 1993. godine. Tunel je napravljen ispod aerodromske piste i povezivao je dvije teritorije koje su bile pod kontrolom Armije Republike Bosne i Hercegovine (Dobrinja i Butmir), pa se tako i tunel zvao "Tunel D-B". Tunel je dužine 785,5 m, širine oko 1 m i visine oko 1,5 m, iako je na nekim dijelovima visina i do 1,8 m. Tunel se u zvaničnim razgovorima ARBIH i UN vodio pod imenom "Tunel kojeg nema". Tunel je bio najstrožija tajna Sarajeva jer su kroz tunel u Sarajevo stizali hrana, oružje, cigarete itd.
Tokom 1994. tunelom su postavljene male šine po kojima su išla mala kolica.
Također tokom 1994. godine za tunel je saznala vojska Republike Srpske tako da je Ratko Mladić kontaktirao Aerodrom koji su držali UN i tražio da se tunel sruši i zatvori. Potom je VRS pokušala kopanjem drugog tunela i preusmjeravanjem rijeke Željeznice da potopi tunel i tako ga onesposobi, međutim ta im namjera nije uspjela.
'
WHERE `LocationID` = 34;

UPDATE `location` SET `Description` = 'Muzej Sarajevske pivare smješten je u tvorničkom krugu Sarajevske pivare, koju je 1864. godine osnovao bečki industrijalac Heinrich Lewy kao prvo industrijsko postrojenje u BiH i prvu tvornicu piva u tadašnjem Osmanskom carstvu. 
Postavku Muzeja čine zanimljivi eksponati iz više od 150 godina duge tradicije ove fabrike.
Posjetitelji u Muzeju tako mogu vidjeti stare boce Sarajevskog piva, raznorazne etikete i natpise, posude za skladištenje i konzumiranje piva, te brojne druge zanimljive predmete vezane uz Sarajevsku pivaru iz perioda Osmanskog carstva, Austro-Ugarske monarhije, te Kraljevine i Socijalističke Jugoslavije.
Muzej je opremljen NFC tehnologijom, koja doprinosi potpunijem iskustvu posjetitelja, jer oni putem svojih pametnih telefona mogu saznati detalje o svakom od izloženih eksponata.
'
WHERE `LocationID` = 35;

UPDATE `location` SET `Description` = 'Brusa bezistan sa svojih 6 krovnih kupola jedna je od historijskih građevina na sarajevskoj Baščaršiji iz doba Osmanlijskog Carstva. Pravougaone je osnove i ima četiri ulaza na sve četiri strane, a povezuje zanatske ulice Kundurdžiluk, Veliki i Mali Čurčiluk s Abadžilukom i čaršijom. Izgrađen je naredbom velikog vezira Rustem-paše Opukovića[2] 1551. godine. Bezistan je dobio ime po turskom gradu Bursi, iz kog je dovožena i u bezistanu prodavana svila. Za razliku od Gazi Husrev-begovog bezistana, u kom su se prvobitno prodavale namirnice, u Brusa bezistanu su se, pored svile, prodavale kućne potrepštine i manji namještaj. Danas je to jedan od muzeja u gradu.'
WHERE `LocationID` = 36;

UPDATE `location` SET `Description` = 'Muzej Art kuća sevdaha posvećen je tradicionalnoj gradskoj lirskoj pjesmi - sevdalinci i čuvenim izvođačima sevdaha. 
Muzej je smješten u prostoru Velikih daira na Baščaršiji, izgrađenih u doba osmanske vladavine za potrebe skladištenja roba sarajevskih trgovaca.
U nekadašnjim magazama danas se nalazi muzejska postavka, koju dobrim dijelom čine predmeti koji su pripadali najvećim majstorima sevdaha kao što su: Himzo Polovina, Zaim Imamović, Ismet Alajbegović – Šerbo, Safet Isović, Zehra Deović, Nada Mamula, Zora Dubljević...
U Muzeju se nalaze njihove biografije, instrumenti na kojima su svirali, značajne nagrade koje su dobili, plakati kojima su najavljivani njihovi nastupi, arhivski snimci, odjeća koju su nosili...
U središnjem dijelu prostora, natkrivenom dvorištu Velikih daira, nalazi se Sevdah kahva, u kojoj posjetitelji mogu odmoriti uz kahvu i najljepše sevdalinke, a u Muzeju djeluje i suvenirnica u kojoj se mogu kupiti CD-ovi, knjige i brojni drugi predmeti sa tematikom sevdaha.
'
WHERE `LocationID` = 37;

UPDATE `location` SET `Description` = 'Muzej ratnog djetinjstva otvoren je u Sarajevu u januaru 2017. godine. Nalazi se u starom gradskom jezgru.
U Muzeju je predstavljena kolekcija ličnih predmeta (kao što su komadi odjeće i igračke), priča, audio i video svjedočenja, fotografija, pisama, crteža, i drugih dokumenata i eksponata koje su preživjeli donirali Muzeju. Izložba dočarava jedinstveno iskustvo odrastanja u ratu. 
Osnovu današnje kolekcije Muzeja čini materijal prikupljan od 2010. godine za potrebe pisanja knjige Djetinjstvo u ratu: Sarajevo 1992–1995, autora Jasminka Halilovića, objavljene 2013. godine. Upravo prikupljeni materijal i potresne priče i svjedočenja nekoliko stotina učesnika kao i ne postojanje slične ustanove koja će budućim generacijama pružiti bar djelimični uvid na teškoće odrastanja u ratu bila je ideja vodilja za osnivanje muzeja.[2]
Bosanskohercegovački teniser Damir Džumhur, rođen za vrijeme rata, imenovan je za ambasadora Muzeja 2016. godine.
Autor znaka Muzeja ratnog djetinjstva je bosanskohercegovački grafički dizajner Anur Hadžiomerspahić. 
Osim izložbenog dijela, Muzej trenutno radi istraživanja i edukaciju.
'
WHERE `LocationID` = 43;

UPDATE `location` SET `Description` = 'Narodno pozorište Sarajevo najveća je pozorišna kuća u Bosni i Hercegovini i jedna od najznačajnijih u Jugoistočnoj Evropi. Otvoreno je 17. novembra 1921. godine, a svečani čin otvaranja pripao je Branislavu Nušiću, tadašnjem načelniku Umjetničkog odjeljenja Ministarstva prosvjete. Tri večeri za redom izvođeni su muzičko-dramski programi i tako je ozvaničen početak rada kuće.
U počecima svog postojanja Narodno pozorište Sarajevo je djelovalo isključivo kao dramsko pozorište. Od 1946. u ovo pozorište se uvode i muzički oblici djelovanja, pa će tako bogatoj historiji ovog pozorišta izuzetno pridonijeti Opera, odnosno Balet. Narodno pozorište Sarajevo je središnja pozorišna kuća države BiH i ono je svojim umjetničkim rezultatima, radom generacija umjetnika, a posebno načinom organizacije (tri ansambla Opera, Drama i Balet), veoma važan element pozorišnog i uopšte duhovnog života u BiH. 9. novembra 1946. započela je svoju umjetničku djelatnost Sarajevska opera, svečanom premijerom "Prodana nevjesta" Bedricha Smetane. Time je učinjen veliki napredak u razvijanju muzičke kulture u Bosni i Hercegovini.
'
WHERE `LocationID` = 45;

UPDATE `location` SET `Description` = 'Nakon Drugog svetskog rata nove jugoslovenske komunističke vlasti su započele veliki program kulturne i umetničke ekspanzije. 1950. godine u Sarajevu su osnovana dva pozorišta namijenjena djeci: Pionirsko pozorište i Pozorište lutaka. Prvi nije imao svoj profesionalni ansambl, ali bi angažovao glumce iz poznatijih jugoslovenskih pozorišta za pojedinačne produkcije. Potonji, kojim upravlja Adolf Pomezni, uglavnom se fokusirao na produkcije bazirane na marionetama. Godine 1961. Pionirsko pozorište, kojim je u to vrijeme rukovodio osnivač Međunarodnog pozorišnog festivala MESS Jurislav Korenić, formirao je svoj prvi profesionalni ansambl i promijenio naziv u Sarajevsko pozorište mladih.
Godine 1977. Pozorište lutaka spojeno je sa Sarajevskim pozorištem mladih. U to vrijeme zapažene produkcije su Srećko među bubama J.Skupe-K.Veniga, Kekec Josipa Vandota, Pinokio D.Bibanovića, Alisa u zemlji čuda L.Paljetke, Šimićeva Palčić Dugonja i Pepeljuga, Na Lutkarskoj D.Todorovića, Temperov Shakespeareov i Komedija grešaka, Aristofanove Ptice, Homerova Odiseja, Alfreda Jarryja Ubu Roi, Držićeva Novela od Stanca, Eugènea Ionescoa Izlaz kralja, Kurićeva ljepotica i zvijer, Lukićeva I opet Nušić i Bašeskija i mnogi drugi, san o Sarajevu.
Početkom opsade Sarajeva i rata u BiH 1992. godine, pozorište je nastavilo sa radom i, u saradnji sa Međunarodnim pozorišnim festivalom MESS i punom rukom pozorišnih profesionalaca, među kojima su bili i Haris Pašović i Gradimir Gojer, nastavilo da održava pozorišne predstave. Brojni renomirani reditelji, uključujući Susan Sontag, režirali su produkcije u pozorištu tokom opsade. Komercijalno je ponovo otvoren 1997. godine, a obnovljen je 2016. godine.
'
WHERE `LocationID` = 46;

UPDATE `location` SET `Description` = 'Kamerni teatar 55 počeo je sa radom 1955. godine, a na njegovoj sceni obično se prikazuje repertoar avangardnog i eksperimentalnog teatra.
Jedan od osnivača i glavnih inicijatora pokretanja Malog pozorišta, danas Kamernog teatra 55 bio je Jurislav Korenić. On je bio upravnik ove teatarske kuće od 1958. do 1966. godine, ali i režiser 44 predstave koje su postavljene na sceni Kamernog teatra 55.
Više od 60 godina Kamerni teatar 55 djeluje u Napretkovoj palači, jednoj od najljepših zgrada izgrađenih u stilu secesije u Sarajevu.
Sa svojim isturenim scenskim prostorom, kojeg sa tri strane okružuje publika, Kamerni teatar 55 ima privilegiju da može uspostaviti intimniji odnos sa publikom, za razliku od klasičnih scena sa tzv. rampom.
Ova teatarska kuća može se pohvaliti impozantnom historijom – na sceni Kamernog teatra 55 je izvedeno preko 300 premijera, a samo u ratnom periodu, od 1992. do 1995, na scenu je postavljeno 28 predstava.
U ovom pozorištu izvođene su predstave renomiranih svjetskih autora: Becketta, Čehova, Shakespearea, Brechta..., ali i domaćih pisaca: Abdulaha Sidrana, Dževada Karahasana, Ive Andrića, Maka Dizdara...
'
WHERE `LocationID` = 47;

UPDATE `location` SET `Description` = 'Sarajevski ratni teatar (bosanski: Sarajevski ratni teatar SARTR) je pozorište u Sarajevu, Bosna i Hercegovina. Osnovan je 17. maja 1992. godine na inicijativu Dubravka Bibanovića, Gradimira Gojera, Đorđa Mačkića i Safeta Plakala tokom opsade Sarajeva. To je bilo mjesto okupljanja pozorišnih profesionalaca i studenata Akademije scenskih umjetnosti za vrijeme rata.[5] Danas je to komercijalno pozorište i vrhunska eksperimentalna izložba u Bosni i Hercegovini. Jedno je od mjesta održavanja Međunarodnog teatarskog festivala MESS i jedino mjesto održavanja Otvorenog univerziteta u Sarajevu.'
WHERE `LocationID` = 48;