# Chapter 9: Specialiized Processor Extensions

## What is the difference between an interrupt and an exception? How are both processed?

### Interrupts

An **interrupt** is a signal to the **processor** to temporarily halt the normal processing and allow a higher priority process to execute. Interrupts are generated by `external devices`, such as a keyboard or disk drive, to `request service` from the OS. Interrupts are usually `generated by hardware`, but they can also be `generated by software`.

### Exceptions

An **Exception** on the other hand, is an `event` that occurs during the normal execution of a program that `disrupt the normal flow` of instructions. Exceptions are usually `caused by errors`, such as **divide-by-zero** error or an **illegal instruction**. Exceptions are usually `handeled by the OS` or by `special software routines`, such as **hardware exception handler** or a **kernel-level exception handler**.

### Summary

Both **Interrupts and exceptions** are processed by the processor's interrupt handeling hardware. When an interrupt or exception occurs, the processor saves the current state of the program and transfers control to a special routine call an `interrupt handler` or `exception handler`.

The main difference between them is that an interrupt is caused by an `external device`, while an exception is caused by an `error in the program`.



## Within the x86 computer archtectures, two privileged processor modes are supported in Windows and Linux. Which are these modes and what does this mean concretely for the user (administrator, user)?

### Kernel (Administrator) mode

This is the **privileged** mode of operation in which the OS kernel an device drivers execute. In kernel mode, the processor has `complete access` to `all memory` and `hardware resources`, and can `execute any instruction`. This mode is typically used by the OS to perform task that require privileged access, such as managing memory, handeling interrupts, and managing device drivers.

### User mode

This is a **non-privilegged** mode of operation, in which `normal users` programs execute. In user mode, the processor has `limited access` to `memory` and `hardware resources`, and can `only execute a limited set of instructions`. This mode is used to `protect the OS` and `other user programs` from errors or malicious actions of user programs.

### What does this mean for the user?

For a user, this means that when running a program, it will run in `User mode`, and the program will `not` have `access to all memory` and `hardware resources`. This is a `security feature`, as it means that a malicious program or a big in a program cannot cause damage to the system. Hower this means that some operations may require privileged access, such a system wide configuration changes or communicating with certain hardware.



## How are floating point numbers represented according to the IEEE-754 standard? Why is the exponent biased?

According to the IEEE-754 standard, floating point numbers are represented using a 32-bit or 64-bit format, depending on the precision required. Both use the same basic structure, with numbers being represented as:

### Sign bit

A single bit that indicates whether the number is positive or negative.

## Exponent

The exponent is an `8-bit` or an `11-bit` field that represents the `power of 2` by which the `mantissa` should be `multiplied`. The exponent is stored as a `biased number`, which means that is has a `fixed value added` to it before it is stored. 

### Mantissa

The mantissa is a `23-bit` or `52-bit` field that represents the significant digits of the number. It is stored in `normalized form`, which means that the `MSB is always 1`.

![IEEE-754](/img/IEEE-754.png)

### Why bias based?

The exponent bias is used to make sure the exponent field has `a symmetric range` of `representable values`, allowing both large and small numbers to be represented with a similar precision. It also allows for more `efficient comparison` and `representation` of numbers `close to zero`.



## How is integer/floating point instruction processing synchronized within an x86/80x87 computer architecture?

In the x86/80x87 computer architecture, the processing of integer and floating point instructions is synchronized by using two sperate sets of registers:

- Intger register
- Floating point register

The 8087 has a `BUSY output` signal for use by the 8088 host processor to determine whether the 8087 is currently processing an instruction.



## What does DVFS mean in relation to power management of computer architectures? What mathematical relationship applies to determining the power P?

DVFS (Dynamic Voltage and Frequency Scaling) and is a power management technique used in computer architectures to reduce power consumption of a Processor by adjusting its voltage and frequency. 

![Formula](/img/Formula0.png) 

Where P is the `Total power consumption` of the chip, which contains N NMOS transistors. `Ci` is the `cpapcitance` driven by the ith transitor, `vi` is the transistor's `supply voltage`, and `fi` is its `opperating frequency`.

DVFS attempts to minimize overall power consumption by reducing both the supply voltage and processor clock frequency as much as possible.



## Discuss some security technologies to guard the integrity of a computer architecture?

### Password-protected hardware debugger interface

Some processor families support the `addition of a password to the standard hardware debugging interface`. This means that an initial handshake must take place in which the connected system provides a strong password before the processor enables debug functionality.

### Internal encryption engine with key storage

Some processors provide `encryption and decryption capabilities` and `store secret keys got use during operation`. The `keys` must be stored `in the processor during system manufacture` and are not externaly accessible after they have been stored.

### Device memory protection

Many processor families provide several options for the protection of memory regions. For example, `a ROM bank containing code can be locked after programming` to ensure it cannot be reprogamed at a later time.

