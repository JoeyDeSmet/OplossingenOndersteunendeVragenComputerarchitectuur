# Hoofdstuk 3: Processorelementen

### Leg de afkorting CISC en de afkorting RISC uit en noem de verschillen tussen beide computerarchitecturen.

CISC `Complex Instruction Set Comuting`, is een computerarchitectuur die gebruik maakt van een groot aantal complexe instructies om taken uit te voeren. De instructies in een CISC architectuur zijn ontworpen om `flexibel` te zijn en een `grote verscheidenheid` aan bewerkingen uit te voeren, waardoor ze zeer geschikt zijn voor high-level programmeertalen als `C` en `FORTRAN`.

RISC `Reduced Instruction Set Computing`, is een computer architectuur die gebruik maakt van een `kleinere` set `simpler` instructies om taken uit te voeren. De instructies in een RISC architectuur zijn ontworpen om `zeer snel` en `efficiënt` te zijn, maar ze zijn `niet zo flexibel` als die in een CISC architectuur.

### Leg de werking van de 6502 stapelinstructies PHA en PLA uit. De werking van de 6502 stack is volgens het LIFO principe en wat is de relatie met het S-register en de processor flags?

De `6502 microprocessor` heeft een stack die gebruikt wordt voor het opslaan van `tijdelijke gegevens`, zoals geadresseerde retouren en tussenresultaten. De stack werkt volgens het `LIFO (Last In, First Out)` principe.

De **PHA** `Push Accumulator` instructie wordt gebruikt om de inhoud van de `accumulator` (A register) op de stack te duwen. Wanneer deze instructie wordt uitgevoerd wordt de inhoud van het A register `gekopieerd` naar de `top van de stack`, en de `stack pointer` (S register) wordt verlaagd naar de volgende beschikbare plaats op de stack.

De **PLA** `Pull Accumulator` instructie wordt gebruikt om een waarde van de stack te halen en in de `accumulator` te laden. Na uitvoering van deze instructie wordt de waarde bovenaan gekopieerd naar de `accumulator`, en de `stack pointer` wordt dan verhoogd.

### Leg het verschil uit tussen een maskeerbare en niet-maskeerbare interrupt. Wat zijn de adressen van de interrupt service routines van beide interrupts en welke interrupt is level- of edge-gevoelig?

#### Maskeerbare interupt (IRQ)

Een `maskeerbare interupt (IRQ)` is een interupt die door de programmeur kan worden `aan- of uitgezet`. Wanneer de interupt enable flag is gezet, zal de processor reageren op een IRQ door zijn huidige status op te slaan en een `interupt service routine (ISR)` uit te voeren.

De interuptvector voor maskeerbare interupts bevindt zich op de adressen `$FFFE-$FFFFFF`.

`Level gevoelig`.

#### Niet-maskeerbare interupt (NMI)

Een `non-maskable interupt (NMI)` is hetzelfde als een maskeerbare interupt, maar kan niet worden uitgeschakeld door de programmeur.

De interuptvector voor niet-maskerbare interupts bevindt zich op de adressen `$FFFA-$FFFB`.

`Edge-sensitive` die triggert op de neergaande flank van het signaal.

### Leg de 3 manieren van I/O-verwerking uit en wat zijn de verschillen tussen port-mapped I/O en memory-mapped I/O?

#### Polled- (of geprogrammeerde) gedreven I/O

Bij deze aanpak controleert de processor `regelmatig` de status van de `I/O apparaten` om te bepalen of ze klaar zijn voor dataoverdracht. Als het apparaat gereed is, start de `processor` de data-overdracht. Hier doet de processor alles wat `niet efficiënt` is.

#### Interupt driven I/O

In deze benadering worden de `I/O apparaten` verbonden met de processor door middel van `interupts`. Wanneer een apparaat gereed is, stuurt het een interuptsignaal naar de processor, waardoor de processor zijn huidige status opslaat en een IRS uitvoert. Deze methode is `efficiënter`, omdat de processor alleen wordt onderbroken wanneer een apparaat klaar is om gegevens over te dragen.

#### Directe geheugentoegang (DMA)

In deze benadering wordt een `speciale controller` gebruikt om data direct tussen de `I/O apparaten` en het `hoofdgeheugen` over te brengen, zonder de processor hierbij te betrekken. De `processor` kan een `DMA overdracht` starten door naar een `speciaal register` te schrijven. Dan kan hij andere taken uitvoeren terwijl data wordt overgedragen. Dit is de `efficiëntste` manier om gegevens over te dragen.

### Oefening

- Bij de overdracht van blokken gegevens over een foutgevoelig transmissiemedium is het gebruikelijk een controlesom te gebruiken om te bepalen of er tijdens de overdracht gegevensbits verloren zijn gegaan of beschadigd zijn geraakt.
- De controlesom wordt meestal aan de overgedragen gegevens toegevoegd.
- Eén controlesomalgoritme gebruikt de volgende stappen:
  - Tel alle bytes in de gegevensrecord bij elkaar op, waarbij alleen de laagste 8 bits van de som overblijven.
  - De controlesom is het tweevoudige van de 8-bits som.
  - Voeg de controlesombyte toe aan de gegevensrecord.

- Na ontvangst van een gegevensblok met de toegevoegde controlesom kan de processor bepalen of de controlesom geldig is door eenvoudig alle bytes in de record, inclusief de controlesom, bij elkaar op te tellen.
- De controlesom is geldig als de laagste 8 bits van de som nul zijn.
- Implementeer dit controlesomalgoritme met 6502 assemblagetaal.
- De databytes beginnen op de geheugenplaats die is opgeslagen op adres $10-$11 en het aantal bytes (inclusief de controlesombyte) wordt als invoer in het X-register gegeven.
- Zet het A register op 1 als de controlesom geldig is, en op 0 als deze ongeldig is.

```assembly
; 6502 asambly

LDX #$05 ; Data lenght is 5

; Set data to 0xea
data_prep:
  LDA #$EA
  STA $10, X
  
  DEX ; Decrement X register
  CPX #$FF
  BNE data_prep
  
LDX #$05 ; Data lenght is 5

LDA #$6E ; Store actual checksum
STA $10, X

checksum:
  DEX ; Decrement X because last byte is the checksum

  sum_loop:
    CLC ; Clear the carry flag
    LDA $10, X
    ADC $20 ; Add value stored at address $20 to A register
    STA $20 ; Store sum at address $20
    
    DEX
    CPX #$FF
    BNE sum_loop

  ; Two's compilent
  SEC ; Set carry flag
  LDA #$00
  SBC $20 ; Subtract with carry
  STA $20 ; Store two's compilment at address $20

LDX #$05
LDA $10, X
CMP $20

BNE end
JMP checksum_succes

end:
  JMP end

checksum_succes:
  LDA #$01
  JMP end  
```
