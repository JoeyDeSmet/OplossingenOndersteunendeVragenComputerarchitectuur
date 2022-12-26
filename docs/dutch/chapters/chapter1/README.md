# Hoofdstuk 1: Inleiding tot de computerarchitectuur

### Verklaar enkele technologische problemen die Charles Babbage ondervond bij het ontwerpen van zijn Analytical Engine

- De toenmalige technologie was niet toereikend om de complexe onderdelen te produceren.
- De financiering was moeilijk.

### Waar staat ENIAC voor en bespreek kort de Von Neumann architectuur?

ENIAC `Electronic Numerical Integrator And Computer`, de eerste programmeerbare elektronische computer voor algemeen gebruik.

#### Von Neuman architectuur

De `Von Neumann architectuur` is een gecentraliseerd ontwerp dat bestaat uit vier hoofdcomponenten:

- Processor
- Geheugen
- Invoer/uitvoer apparatuur
- Een bus die deze componenten verbindt

![VonNeumanDiagram](/img/VonNeumann.jpg)

In de Von Neumann architectuur wordt het `geheugen` gebruikt om zowel programma's als gegevens op te slaan. 
De `processor` leest instructies uit het geheugen en voert ze uit. De `input/output apparatuur` wordt gebruikt om gegevens van externe bronnen te lezen en gegevens naar externe apparaten te sturen. 
De `bus` verbindt deze componenten met elkaar en stelt de processor in staat gegevens en instructies uit het geheugen te lezen en naar de in- en uitvoerapparatuur te sturen.

### De microprocessor van de oorspronkelijke IBM PC is de Intel 8088, die behoort tot de Intel 80x86 microprocessorfamilie. Deze i80x86 microprocessoren werken met een gesegmenteerd geheugenmodel:

#### Wat is een segment?

Een `segment` is een deel van het beschikbare geheugen dat een specifieke functie heeft.
Op de `Intel 80x86` microprocessor familie, werden segmenten gebruikt om het geheugen op te delen in logische blokken, die elk toegankelijk waren via een specifiek segment register.

#### Wat zijn de voordelen van het gesegmenteerde geheugenmodel?

- Geeft **processor** toegang tot meer geheugen dan hij direct kan aanspreken met zijn instructieset.
- Verbeterde `organisatie van het geheugen`, door verschillende segmenten voor verschillende doeleinden te gebruiken.
- Verbeterde **processor** `prestaties`, door het geheugen sneller te kunnen benaderen.

#### Ondanks de 16-bit architectuur van de registers is de adresseerbare geheugenruimte 1 MB. Leg uit.

In het `segmented memory model` gebruikt de processor een 16-bit segment register om de locatie van verschillende segmenten in het geheugen bij te houden. 

Elk segment heeft een specifiek startadres en een lengte, en het segmentregister bevat een nummer dat het startadres van het segment aangeeft.

De processor kan dan het segmentregister en een offset gebruiken om het werkelijke geheugenadres te berekenen waartoe hij toegang moet krijgen.

![Geheugensegmentatie](/img/memotySegmentation.png)

##### Voorbeeld

Als het segment register de waarde `0x1000` bevat en de offset is `0x0100`, dan heeft de processor toegang tot het geheugenadres `0x1100` (0x1000 + 0x0100). Op deze manier heeft de processor toegang tot meer geheugen dan wanneer hij het geheugen rechtstreeks benadert met zijn 16-bits instructieset.

### Beschrijf de Wet van Moore. Bespreek enkele grenzen die de linearisatie van deze wet niet ondersteunt.

De Wet van Moore is een voorspelling dat het aantal transistors op een computerchip ongeveer elke twee jaar zou verdubbelen.

![MoorseLaw](/img/moorseLaw.png)

#### Beperkingen

- Er zijn `fysische grenzen` aan hoe klein een transistor kan worden
- Meer vatbaar voor `oververhitting`.
- De `kosten` van het ontwerpen en produceren van chips zijn aanzienlijk gestegen naarmate de complexiteit ervan is toegenomen.

### Leg de afkortingen CPU en GPU uit en verklaar enkele essentiële verschillen tussen de werking van een CPU en een GPU.

CPU `Central Processing Unit`, is de primaire verwerkingseenheid van een computer. Hij is verantwoordelijk voor het uitvoeren van de meeste instructies die de computer ontvangt. 

GPU `Graphics Processing Unit`, is een gespecialiseerd type processor dat speciaal is ontworpen voor het uitvoeren van grafische taken.

#### Verschillen

- **Architectuur**: `CPU's` zijn meestal ontworpen met een enkele kern die één instructie tegelijk kan uitvoeren, terwijl `GPU's` veel kleinere kernen hebben die meerdere instructies tegelijk kunnen uitvoeren.
- **Snelheid**: CPU's` zijn over het algemeen sneller in het uitvoeren van enkele instructies dan een `GPU`, maar `GPU's` kunnen veel instructies tegelijk verwerken.
- **Energieverbruik**: Omdat `GPU's` veel kleinere kernen hebben, verbruiken ze meestal meer stroom dan `CPU's`.

### Oefeningen op 6502 instructieset

#### Oefening 1
Schrijf 6502 assemblagecode om twee 16-bits waarden op te slaan op de adressen $00-$01 en $02-$03.
Tel deze twee 16-bits waarden op en sla het resultaat op de adressen $04-$05 op. Denk aan de carry.

```asm
; 6502 Asambly

; Storing first number
LDA #$05 ; Load MSB in A register
STA $00  ; Store contents of A register at address 0x00

LDA #$FF ; Load LSB
STA $01

; Storing second number
LDA #$00
STA $02

LDA #$01
STA $03

CLC ; Clear the carry flag
ADC $01 ; Add value stored at address 0x01 to A register
STA $05 ; Store result at address 0x05

LDA $00
ADC $02
STA $04
CLC
```

#### Oefening 2
schrijf 6502 assembly code om het verschil te berekenen van twee 16-bit waarden opgeslagen op
adressen $00-$01 en $02-$03. Sla het resultaat op de adressen $04-$05 op. Houd rekening met de lening.

```asm
LDA #$00   ; Load the least significant byte of the first value
STA $00    ; Store it at address $00
LDA #$78   ; Load the most significant byte of the first value
STA $01    ; Store it at address $01
LDA #$00   ; Load the least significant byte of the second value
STA $02    ; Store it at address $02
LDA #$33   ; Load the most significant byte of the second value
STA $03    ; Store it at address $03

LDA $00   ; Load the least significant byte of the first value
SEC       ; Set the carry flag to 1
SBC $02   ; Subtract the least significant byte of the second value
STA $04   ; Store the result in the least significant byte of the result
LDA $01   ; Load the most significant byte of the first value
SBC $03   ; Subtract the most significant byte of the second value
STA $05   ; Store the result in the most significant byte of the result
```

#### Oefening 3
Schrijf 6502 assembly code om twee 32-bit waarden op te slaan op de adressen $00-$03 en $04-$07.
Tel de twee 32-bit waarden op via een lus/jump constructief, die alle bytes itereert. Sla het
resultaat op de adressen $08-$0B. Denk aan de carry.

```asm
; 6502 Assambly

; Number 1
LDA #$01
STA $00

LDA #$01
STA $01

LDA #$01
STA $02

LDA #$01
STA $03

; Number 2
LDA #$01
STA $04

LDA #$01
STA $05

LDA #$01
STA $06

LDA #$01
STA $07

; Make a loop/jump to add these numbers and store at addresses 0x08-0x0B

CLC ; Clear carry flag
LDX #$03 ; Load 0x03 into X register

loop:
  LDA $00, X ; Load value at address 0x00 + value in X register
  ADC $04, X ; Add value at address 0x04 + value in X register to A register
  STA $08, X ; Store value in A register at address 0x08 + value stored in X register
  
  DEX ; Decrement X register
  CPX #$ff ; Check if X register == 0xff
  BNE loop ; Break if X == 0xff
```
