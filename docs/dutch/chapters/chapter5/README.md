# Hoofdstuk 5: Interface tussen hardware en software

### Wat betekenen de afkortingen PCI en PCIe?

- `PCI`: Peripheral Component Interconnect
- `PCIe`: Peripheral Component Interconnect Express

### Leg de volgende kenmerken van PCI/PCIe kort uit

#### Hot plugging

Hot plugging" verwijst naar de mogelijkheid om apparaten aan een computersysteem toe te voegen of eruit te verwijderen zonder het systeem te moeten uitschakelen.

#### Geautomatiseerde configuratie

Geautomatiseerde configuratie` verwijst naar de mogelijkheid van het systeem om `automatisch` nieuwe apparaten die aan het systeem worden toegevoegd te configureren en in te stellen, zonder handmatige tussenkomst. 

#### Bulk DMA overdracht

Bulk DMA (Direct Memory Access)-overdracht verwijst naar een functie waarmee gegevens direct tussen apparaten en het systeemgeheugen kunnen worden `overgebracht`, waarbij de CPU wordt `omzeild` en de CPU minder wordt belast.

#### Multi-lane seriële verbindingen

Multi-lane seriële verbindingen` verwijzen naar het gebruik van meerdere `parallelle datapaden` tussen apparaten, in plaats van een enkel parallel datapad. Dit maakt snellere gegevensoverdracht mogelijk. 

#### Wortelcomplex

Root complex` verwijst naar de `centrale hub` van een PCIe systeem dat de CPU, het geheugen en andere apparaten met elkaar verbindt. Het fungeert als brug tussen de CPU en andere apparaten op de bus.

#### Eindpunt

Eindpunt" verwijst naar een apparaat dat "verbonden is met het rootcomplex" en dat transacties op de bus kan initiëren. Voorbeelden van `Eindpuntapparaten` zijn `grafische kaart`, `opslagapparaten` en `netwerkinterfaces`.

### Welke eigenschappen moet een Linux apparaatstuurprogramma minimaal hebben? 

- **Initialisatie en beëindiging**
- **Initialisatie en beëindiging van communicatiesessies**
- **Lezen en schrijven**

#### Een concreet voorbeeld is de functie mydevice_init(). Vul de functies verder aan en leg het doel van elke functie uit.

- `int mydevice_init(void)`: Initialisatie van het apparaat. Het besturingssysteem roept deze functie aan om het apparaat te `initialiseren` bij `sytem startup` of op een later tijdstip als het apparaat is aangesloten door middel van hot plugging. De functie geeft een integer statuscode terug, die aangeeft of de initialisatie succesvol was of niet.

- `void mydevice_exit(void)`: Wanneer het stuurprogramma niet langer nodig is, wordt deze functie aangeroepen om `de door het stuurprogramma toegewezen systeembronnen` vrij te geven.

- `int mydevice_open(struct inode* inode, struct file* filp)`: Deze functie probeert `toegang` tot het apparaat te krijgen en `meldt eventuele fouten`. De `inode` parameter bevat vereiste informatie die het stuurprogramma nodig heeft. De `flip` parameter bevat informatie over het geopende bestand.

- `int mydevice_release(struct inode* inode, file* flip)`: Deze functie sluit het apparaat of bestand en `dealloceert eventuele resources` die door `mydevice_open` zijn toegewezen.

- `ssize_t mydevice_read(struct file* filp, char* buf, size_t count, loff_t* f_pos)`: Deze functie `leest` de gegevens van het apparaat en brengt de resulterende gegevens over naar een `buffer`. De `Count` parameter geeft de `gevraagde hoeveelheid gegevens` aan, en `f_pos` geeft een offset aan die gebruikt moet worden vanaf het begin van het bestand. De functie `geeft de werkelijk gelezen hoeveelheid terug`.

- `ssize_t mydevice_write(struct file* filp, const char* buf, size_t count, loff_t* f_pos)`: Deze functie schrijft naar het apparaat, het heeft bijna dezelfde parameters als lezen behalve de `buf` die `const` is gedeclareerd, omdat deze functie leest van de buf en schrijft naar het bestand of apparaat.

### Leg de volgende afkortingen uit en verklaar de termen:

- **BIOS**: `Basic Input/Output System` is firmware die is opgeslagen op het moederbord van een computer. Het is verantwoordelijk voor het uitvoeren van `basis input/output` functie op de computer, en biedt een `interface met de hardware`. 

- **POST**: `Power-On Self_test` is een diagnostische test die wordt uitgevoerd door het `BIOS` wanneer de computer wordt aangezet. Het wordt gebruikt om de `basis functionaliteit` van de `hardware componenten` van de computer te `controleren`, zoals geheugen en harde schijf, voordat het OS wordt geladen.

- **UEFI**: `Unified Extensible Firmware Interface` Het is de verbetering van het `BIOS` voor x86 en x86-64 bases PCs. `UEFI` is ontworpen om `de opstarttijd` te verbeteren, `grotere harde schijven` te ondersteunen en `veiligheidsfuncties` te verbeteren.

### Wat zijn de beperkingen van MBR-partities en hoe lossen UEFI-partities deze beperkingen op?

#### MBR (Master Boot Record) beperkingen

- Maximaal `vier primaire partities`.
- Ze gebruiken `32-bit logical block addressing (LBA)`, wat de partitie beperkt tot maximaal `2TB`.
- Geen security boot functie.

#### UEFI oplossing

- Gebruik van `GPT (GUID Partition Table)` die tot `128 partities` ondersteunt en `grotere partities` toelaat.
- Gebruik van `64-bit LBA`, die de 2TB limiet op partitiegroottes opheft.
- Ondersteuning voor `Secure Boot`, waarmee het laden van niet-ondertekende of kwaadaardige code tijdens het opstartproces wordt voorkomen.


### Welke taken moet de kernel van het besturingssysteem uitvoeren tijdens het opstartproces?

Na de `POST` en `apparaat configuratie`, begint de BIOS het `boot proces`:

- BIOS probeert op te starten vanaf het eerste apparaat in de geconfigureerde prioriteitsvolgorde.
- Als het geldig is, leest de firmware de `boot loader` van de `MBR boot sector` en draagt de besturing ernaar over.
- De BIOS firmware heeft de uitvoering voltooid en is niet langer actief.
- De `boot loader` start het proces van `laden` en starten van het `OS`.

### Wat zijn de verschillen tussen threads en processen?

- Threads` `delen` dezelfde `geheugenruimte` met andere threads in hetzelfde proces, terwijl `processen` hun eigen `onafhankelijke geheugenruimte` hebben.
- Threads` zijn `lichtgewicht` en hebben minder overhead dan processen, omdat ze dezelfde geheugenruimte en systeembronnen delen.
- Threads binnen een proces kunnen gemakkelijk met elkaar communiceren omdat ze dezelfde geheugenruimte delen. Processen moeten `inter-proces communicatie (IPC)` mechanismen gebruiken om met elkaar te communiceren.

#### Samenvatting 

`Threads` zijn `lichtgewicht` en hebben `minder overhead`, `delen geheugen en bronnen`, en kunnen `gemakkelijk` met elkaar communiceren. 

`Processen` zijn geïsoleerd, hebben `meer overhead`, hebben hun `eigen geheugen en bronnen`, en moeten `IPC mechanismen` gebruiken om te communiceren.

### Wat zijn de vier toestanden die een proces kan aannemen en leg elke toestand kort uit?

- **Running**: Het proces wordt momenteel uitgevoerd door de CPU.
- **Ready**: Het proces is klaar om uitgevoerd te worden door de CPU, maar wacht tot de CPU beschikbaar is.
- **Blocking**: Het proces kan de uitvoering niet voortzetten omdat het wacht op een bron zoals I/O of een synchronisatiegebeurtenis.
- **Terminated**: Het proces heeft de uitvoering voltooid of is beëindigd door het OS.

### Wat betekenen de afkortingen TCB en PCB en leg kort hun functie uit?

#### TCB 

`Thread Control Block`, is een datastructuur die door een OS wordt gebruikt om de resources en de status van een thread bij te houden. De TCB bevat informatie zoals:

- Thread identificatie
- Huidige staat](#wat-zijn-de-vier-staten-die-een-proces-kan-verzinnen-en-uitleggen-elke-staat-succesvol)
- Threads programmateller
- Stapelwijzer
- Alle andere informatie die nodig is om de thread te beheren

#### PCB

`Process Control Block`, dit is een datastructuur die door een OS wordt gebruikt om de resources en de status van een proces bij te houden. Het PCB bevat informatie zoals:

- Proces identificatie
- Huidige status](#wat-zijn-de-vier-staten-die-een-proces-kan-aanpakken-en-uitleggen-elke-staat-succesvol)
- Proces programmateller
- Informatie over geheugenbeheer
- Alle andere informatie die nodig is om het proces te beheren

### Noem vier planningsalgoritmen en bespreek de eigenschappen van elk ervan (niet-preemptief/preemptief?, procesprioriteit?, ...).

#### Wie het eerst komt, het eerst maalt (FCFS).

FCFS is een `niet-preemptief algoritme`, het proces dat het eerst aankomt wordt het eerst uitgevoerd, zoals de naam al aangeeft. Het is eenvoudig te implementeren, maar het is niet efficiënt omdat het kan leiden tot lange wachttijden voor processen die later aankomen.

#### Kortste baan eerst (SJF)

SJF is een `niet-preemptief algoritme`, het proces met de kortste uitvoeringstijd wordt als eerste uitgevoerd. Het is efficiënt, maar kan moeilijk zijn om de uitvoeringstijd van een proces te voorspellen.

#### Round Robin (RR)

Round Robin is een `preemptief algoritme`. In dit algoritme krijgt elk proces een vaste tijdschijf (tijdhoeveelheid) en wordt gedurende die tijd uitgevoerd. Als een proces niet klaar is in zijn tijdquantum, wordt het naar de achterkant van de wachtrij verplaatst en wordt het volgende proces uitgevoerd. Dit is efficiënt voor systemen met gedeelde tijd en voorkomt dat een proces de CPU monopoliseert.

![Round robin grafiek](/img/round-robin.png)

#### Prioriteitsplanning

Prioriteitsplanning is een `niet-preemptief algoritme` of een `preemptief algoritme`. In dit algoritme krijgt elk proces een prioriteit toegewezen en wordt het proces met de hoogste prioriteit eerst uitgevoerd. Als twee processen dezelfde prioriteit hebben wordt het gepland volgens het andere planningsalgoritme (FCFS of RR). Dit is efficiënt, maar kan leiden tot verhongering van processen met een lagere prioriteit.

### Wat is een symmetrische multiprocessorarchitectuur en leg de termen SIMD en MIMD uit?

Een `Symmetrische Multiprocessor (SMP)` architectuur is een computerarchitectuur waarbij meerdere processoren zijn aangesloten op een enkel gedeeld hoofdgeheugen. Alle processoren hebben gelijke toegang tot het gedeelde geheugen en kunnen elke taak uitvoeren.

#### SIMD (Single Instruction Multiple Data)

SIMD is een type computerarchitectuur waarbij meerdere verwerkingselementen dezelfde bewerking op meerdere gegevenspunten tegelijk uitvoeren. In SIMD voeren alle verwerkingselementen tegelijkertijd dezelfde instructie uit op verschillende gegevens.


#### (Multiple Instructions Multiple Data)

MIMD is een type computerarchitectuur waarbij meerdere verwerkingselementen tegelijkertijd verschillende bewerkingen op verschillende gegevens uitvoeren. In MIMD kunnen verschillende verwerkingselementen verschillende instructies uitvoeren op verschillende gegevens.