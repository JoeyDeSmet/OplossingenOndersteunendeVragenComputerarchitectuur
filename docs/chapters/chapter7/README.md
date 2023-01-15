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

![virtual to physical memory](/img/virtual2physical.png) 

The following steps describes the translation process:

1. The processor attemt to execute `mov al, [ebx]` instruction, but it fails because it is a virtual address. This generates a `page fault`, which transfers control to the OS so that it can `resolve the address translation`.

2. The virtual address is `shifted right by 22 bits`. Leaving the `10-bit directory offset`. **In this example has the value 1**.

3. The `directory offset` is `shifted left by 2 bits` and is added to the contents of the `processor register CR3`. The result is the address of the page table directory containing the `address` of the `relevant page table`.

4. The virtual address is `shifted right by 12 bits` and than masked to leave only the `10-bit table offset`. **In this example has the vaule 2**.

5. The `table offset` is `shifted left by 2 bits` and added to the page table address. The 32-bit address read from this location is the `physical address of the page frame` containing the requested data.

6. The processor stores the translation in its `translation cache`.

7. The processor restarts the `mov al, [ebx]` instruction, which will now succeed. The lower 12 bits if the virtual address (`frame offset`) are added to the page frame address computed in step 5 to access the requested byte. **In this example has the value 3**.


## Discuss how the conversion of virtual addresses to physical addresses is accelerated by using a Memory Management Unit (MMU) and a Translation Lookaside Buffer (TLB).

A `Memory Management Unit (MMU)` is a hardware component that translates virtual memory addresses to physical memory addresses. The `Translation Lookaside Buffer (TLB)` is a small, fast memory cache that stores recent virtual-to-physical address translations. When a program generates a virtual memory reference, the MMU uses the page table and the TLB to translate the virtual address to a physical address. 

![MMU and TLB](/img/MMU_TLB.png) 

If the translation is found in the TLB, it is used to quickly access the requested memory page. If the translation is not found int the TLB, the MMU accesses the page table in main memory, which can be slower. The table entry is than loaded into the TLB for future us, accelerating future meory references to the same page.

