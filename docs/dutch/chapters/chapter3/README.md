# Hoofdstuk 3: Processorelementen

### Leg de afkorting CISC en de afkorting RISC uit en noem de verschillen tussen beide computerarchitecturen.

CISC `Complex Instruction Set Comuting`, is een computerarchitectuur die gebruik maakt van een groot aantal complexe instructies om taken uit te voeren. De instructies in een CISC architectuur zijn ontworpen om `flexibel` te zijn en om een `grote verscheidenheid` aan bewerkingen uit te voeren, waardoor ze zeer geschikt zijn voor high-level programmeertalen als `C` en `FORTRAN`.

RISC `Reduced Instruction Set Computing`, is een computer architectuur die gebruik maakt van een `kleinere` set `simpler` instructies om taken uit te voeren. De instructies in een RISC architectuur zijn ontworpen om `zeer snel` en `efficiënt` te zijn, maar ze zijn `niet zo flexibel` als die in een CISC architectuur.

### Leg de werking van de 6502 stapelinstructies PHA en PLA uit. De werking van de 6502 stack is volgens het LIFO principe en wat is de relatie met het S-register en de processor flags?

De `6502 microprocessor` heeft een stack die gebruikt wordt voor het opslaan van `tijdelijke gegevens`, zoals geadresseerde retouren en tussenresultaten. De stack werkt volgens het `LIFO (Last In, First Out)` principe.

De **PHA** `Push Accumulator` instructie wordt gebruikt om de inhoud van de `accumulator` (A register) op de stack te duwen. Wanneer deze instructie wordt uitgevoerd wordt de inhoud van het A register `gekopieerd` naar de `top van de stack`, en de `stack pointer` (S register) wordt verlaagd naar de volgende beschikbare plaats op de stack.

De **PLA** `Pull Accumulator` instructie wordt gebruikt om een waarde van de stack te halen en in de `accumulator` te laden. Na uitvoering van deze instructie wordt de waarde bovenaan gekopieerd naar de `accumulator`, en de `stack pointer` wordt dan verhoogd.
