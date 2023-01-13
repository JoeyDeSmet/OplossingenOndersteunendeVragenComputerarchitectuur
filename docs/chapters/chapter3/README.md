# Chapter 3: Processor Elements

## Explain the abbreviation CISC and the abbreviation RISC and name the differences between the two computer architectures.

CISC `Complex Instruction Set Comuting`, is a computer architecture that utilizes a large number of complex instructions to perform tasks. The instructions in a CISC architecture are designed to be `flexible` and capable of performing a `wide variety` of operations, making them well-suited for high-level programming languages like `C` and `FORTRAN`.

RISC `Reduced Instruction Set Computing`, is a computer architecture that utilizes a `smaller` set of `simpler` instructions to perform tasks. The instruction in a RISC architecture are designed to be `very fast` and `efficient`, but they may `not be as flexible` as those in a CISC architecture.

## Explain the operation of the 6502 stacking instructions PHA and PLA. The operation of the 6502 stack is according to the LIFO principle and what is its relation to the S-register and processor flags?

The `6502 microprocessor` has a stack that is used to store `temporary data`, such as return addressed and intermediate results. The stack operates according to the `LIFO (Last In, First Out)` princable.

The **PHA** `Push Accumulator` instruction is used to push the contents of the `accumulator` (A register) onto the stack. When this instruction is exectuted the contents of the A register are `copied` to the `top of the stack`, and the `stack pointer` (S register) is decremented to point to the next available location on the stack.

The **PLA** `Pull Accumulator` instruction is used to pop a value off the stack an load it into the `accumulator`. After execution of this instruction the value at the top is copied to the `accumulator`, and the `stack pointer` is than incremented.

## Explain the difference between a maskable and non-maskable interrupt. What are the addresses of the interrupt service routines of both interrupts and which interrupt is level- or edge-sensitive?

### Maskable interupt (IRQ)

A `maskable interupt (IRQ)` is a interupt that can be `enabled or disabled` by the programmer. When the interupt enable flag is set, the processor will respond to an IRQ by saving it's current state and executing an `interupt service routine (ISR)`.

The interupt vector for maskable interupts is located at addresses `$FFFE-$FFFF`.

`Level sensitive`.

### Non-maskable interupt (NMI)

A `non-maskable interupt (NMI)` is the same as a maskable interupt but that it cannot be disables by the programmer.

The interupt vector for non-maskable interupts is located at addresses `$FFFA-$FFFB`.

`Edge-sensitive` that triggers on the falling edge of the signal.

## Explain the 3 ways of I/O processing and what are the differences between port-mapped I/O and memory-mapped I/O?

### Polled- (or programmed) driven I/O

In this approach, the processor `regularly checks` the status of the `I/O devices` to determine if they are ready for data transfer. When the device is ready the `processor` initiates the data transfer. Here the processor does everything which is `not effiecient`.

### Interupt driven I/O

In this approach, the `I/O devices` ar connected to the processor using `interupts`. When a device is ready it send an interupt signal to the processor, which causes the processor to save its current state and execute an IRS. This method is `more effiecient`, because the processor is only interupted when a device is ready to transfer data.

### Direct memory access (DMA)

In this approach a `special controller` is used to transfer data directly between the `I/O devices` and the `main memory`, without involving the processor. The `processor` can initiate a `DMA transfer` by writing to a `special register`. Than it can perfor other task while data is being transfered. This is the `most efficient` way to transfer data.

## Exercise

- When transferring blocks of data over an error-prone transmission medium, it is common to use a checksum to determine whether any data bits were lost or corrupted during transmission.
- The checksum is typically appended to the transferred data record.
- One checksum algorithm uses these steps:
  - Add all of the bytes in the data record together, retaining only the lowest 8 bits of the sum.
  - The checksum is the two’s complement of the 8-bit sum.
  - Append the checksum byte to the data record.

- After receiving a data block with the appended checksum, the processor can determine whether the checksum is valid by simply adding all the bytes in the record, including the checksum, together.
- The checksum is valid if the lowest 8 bits of the sum are zero.
- Implement this checksum algorithm using 6502 assembly language.
- The data bytes begin at the memory location stored in address $10-$11 and the number of bytes (including the checksum byte) is provided as an input in the X register.
- Set the A register to 1 if the checksum is valid, and to 0 if it is invalid.

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
