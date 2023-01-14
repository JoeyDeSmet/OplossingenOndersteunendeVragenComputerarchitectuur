# Chapter7: Processor and Memory Architecures

## Discuss the differences between a von Neumann, Harvard and modified Harvard architecture.

In summary, the von Neumann architecture uses a single memory to store both instructions and data. The Harvard architecture uses separte memory spaces for instructions and data. And the modified Harvard architecture uses separte memory spaces for instructions and data, but share the same memory bus.

So the main differences between these architectures is the way the memory is organised and accessed.

### VonNeuman architecture

![VonNeuman](/img/VonNeumann.jpg)

### Harvard architecture
![HarvardArchiecture](/img/Harvard.png)



## Briefly explain the following "von Neumann" security issues:

### Self-modifying code

Programs that write code into memory and execute it are implementing self-modifying code. Because the Von Neumann architecture uses the same memory for data and for instructions, a program can change it's own instructions while it's running. This poses a security risk as it allows an attacker to potentialy inject malicious code into a running program, which will be executed with the same privilages as the running program.

### Buffer overflow

A buffer overflow occurs when a program requests input and stores that input in a fixed-lenght data buffer. If the code is not carefull to check the lenght of the input, it is posible for the user to enter an input that is longer than the available storage. Which in term will overwrite memory intended for other purposes. If the buffer being attacked is stored on the programs stack, it is posible to modify the return address thus taking full control over the program.



## How does the DOS terminate and stay resident program concept (TSR) for multiprogramming work?

The terminate and stay resident program concept is a technique use is the DOS OS to allow multiple programs to run simultaneously. TSR programs are small programs that are loaded into memory and remain resident even after they have completed their primary function. This allows the program to continue running in the background, while the user continues to work with other programs.

When a TSR program is executed, it first performs its primary function, and than returns control to the OS. It then remains in memory so it can be quickly re-activated later, without needing to reload the program from the disk. It can be activated again by using a hotkey, or by running a command from the command prompt. 

A TSR program can also be terminated by the user, in which case it will be removed from memory and will no longer be resident.



## Discuss how the 32-bit virtual address $00402003 is converted into a physical address, using the Windows NT paging model, which uses CR3, a page table directory, page table and page offset.

- Processor wants to execute `mov al, [ebx]`, but this doen't work because of the virtual address, a page fault get created and gets send to the OS.
- The virtual address gets `shifted by 22 bit to the right`, leaving the 10-bit `directory offset`. Which leaves `value 1` in this example.
- The `directory offset` is `shifted left by 2 bit` positions, and is `added` to the contents of the `processor register CR3`. The result is the `page table directory` containing the address of the relevant page table.
- The requested virtual address is shifted right by 12 bits, and masked to leave only the `10-bit table offset`, which has `value 2` in this example.
- The `table offset` is `shifted left by 2 bit` and `added` to the `page table address (from page table directory)`. 

TODO: DO THIS TOMOROW YOU ARE TO TIRED

## Discuss how the conversion of virtual addresses to physical addresses is accelerated by using a Memory Management Unit (MMU) and a Translation Lookaside Buffer (TLB).



