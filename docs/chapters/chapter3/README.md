# Chapter 3: Processor Elements

### Explain the abbreviation CISC and the abbreviation RISC and name the differences between the two computer architectures.

CISC `Complex Instruction Set Comuting`, is a computer architecture that utilizes a large number of complex instructions to perform tasks. The instructions in a CISC architecture are designed to be `flexible` and capable of performing a `wide variety` of operations, making them well-suited for high-level programming languages like `C` and `FORTRAN`.

RISC `Reduced Instruction Set Computing`, is a computer architecture that utilizes a `smaller` set of `simpler` instructions to perform tasks. The instruction in a RISC architecture are designed to be `very fast` and `efficient`, but they may `not be as flexible` as those in a CISC architecture.

### Explain the operation of the 6502 stacking instructions PHA and PLA. The operation of the 6502 stack is according to the LIFO principle and what is its relation to the S-register and processor flags?

The `6502 microprocessor` has a stack that is used to store `temporary data`, such as return addressed and intermediate results. The stack operates according to the `LIFO (Last In, First Out)` princable.

The **PHA** `Push Accumulator` instruction is used to push the contents of the `accumulator` (A register) onto the stack. When this instruction is exectuted the contents of the A register are `copied` to the `top of the stack`, and the `stack pointer` (S register) is decremented to point to the next available location on the stack.

The **PLA** `Pull Accumulator` instruction is used to pop a value off the stack an load it into the `accumulator`. After execution of this instruction the value at the top is copied to the `accumulator`, and the `stack pointer` is than incremented.
