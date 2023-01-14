# Chapter 6: Specialized Computing Domains

## How do soft real time, hard real time and firm real time systems differ from each other?

### Soft real-time Systems

these systems have some real-time constrains, but missing a deadline does not result in a catastrophic failure. 

**Example of Soft real-time systems**:

`Multimedia systems`, where missing a frame may result in a visual artifact but the system can still continue to operate.

### Hard real-time Systems

These systems have strict real-time constrains, and missing a deadline can result in a catastrophic failure.

**Example of Hard real-time systems**:

`Avionic systems (Airplane)`, where missing a deadline can result in a crash.

### Firm real-time Systems

These systems have strict real-time constrains, but missing a deadline does not result in catastrophic failure. Instead the system will degrade in some way.

**Example of Firm real-time Systems**:

`Power plants`, where missing a deadline can result in a reduction in power output, but the system can continue to operate.



## What are the differences between a Real Time Operating System (RTOS) and a General Purpose Operating System (GPOS)?

### Real Time Operating System (RTOS)

RTOSs are designed to handle real-time applications that require deterministic behaviors, such as control systems and other time-critical systems. A RTOS will typically have a small footprint, fast interrupt response, and a high degree of configurability to meet the needs of different real-time applications.

### General Purpose Operating Systems (GPOS)

GPOSs are designed for a wide range of applications and is not focused on real-time performance. Examples of GPOSs include Linux, Windows, ..., etc. GPOSs have a larger footprint, may have slower interrupt response, and less configurability. GPOSs are often better suited for non-real-time tasks such as running web servers, databases, and other non-time-critical applications.

### Summary

In summary, the main difference between RTOS and GPOS is the focus on real-time performance, predictability and low overhead in RTOS, while GPOSs are more flexible and general-purpose.



## How does a mutex function with shared resources in an RTOS?

A Mutex short for "Mutual exclusion" in a synchronization mechanism used is RTOSs to protect shared resources from concurrent access. When a thread wants to access a shared resource, it must first request ownership of the mutex associated with that resource. If the mutex is available, the task acquires ownership of the mutex associated to that resource. If the mutex is already owned the task enters a blocking state until the owner releases the mutex. 

In essence it is just a variable that is 0 when unlocked, when a task request the ownership of the mutex the variable must be set to 1 in one clock cycle (atomic operation), such that no other task can acquire it at the same time.

### Explain the principle of thread preemption.

Thread preemption is the ability of a RTOS to interrupt a running task and temporarily replace it with a higher-priority task. This allows the system to respond to high-priority events in timely manner, even if a lower priority task is currently running. 

### Explain the principle of priority inversion.

Priority inversion is a situation that can occur in RTOS systems when a low-priority task holds a mutex that is needed by a higher-priority task. The higher-priority task is therefore blocked while a lower-priority task is running. To avoid this RTOSs usually include priority inheritance mechanism, where the priority of the that holds the mutex is temporarily increased to the priority level of the highest priority task waiting for the mutex.



## How does a semaphore function with shared resources in an RTOS and what is a counting semaphore?

A semaphore is a synchronization mechanism used in RTOS to protect shared resources from concurrent access, similar to a [mutex](#how-does-a-mutex-function-with-shared-resources-in-an-rtos).

A counting semaphore is a special type of semaphore that can be used to control access to a shared resource that can be used by multiple tasks simultaneously. A counting semaphore is initialized with a positive integer value. When a task want to use the shared resource the value is decremented. When the value is at 0, the task trying to acquire the semaphore is blocked until the value in increased again.

This mechanism allows multiple tasks to access the same resource simultaneously, while ensuring that the resource is not over-utilized. This is useful in situations where resources are limited and need to be shared.



## What is a critical section and how does one guarantee the undisturbed processing of this section?

A critical section is a piece of code or a block of instructions that accesses shared resources and needs to be executed by a single task or thread at a time. To guarantee the undisturbed processing of a critical section, synchronization primitives (mutexes, semaphores, critical section objects) are used to constrol the access to shared resources and prevent concurren access. 



## Name the 3 ways to expand a computer with a GPU. Why is the performance of a computer architecture is increased if the architecture is extended with a GPU?

- **External GPU (eGPU)**: An external GPU is an add-on device that connects to a computer via a peripheral interface such as Thundrebolt or USB-C.
- **Internal GPU**: An internal GPU is installend inside a computer, typaclly as a PCIe card. 
- **Integrated GPU**: An integated GPU is build into the computer's main processor, such as Intel's HD Graphics.

The performance of a computer architecture is increased if extended by a GPU for several reasons:

- A GPU is designed to perform many calculations in parallel, which can signifficantly accelerate the processing of large amounts of data.
- A GPU can offload some of the computational workload from the CPU, which can help to reduce power consumption and increase battery life for laptops.



## Give some concrete examples of applications that benefit greatly from the use of a GPU.

- Gaming
- Video and image processing
- Machine learning
- Scientific simulations
- Cryptocurrency mining
- Autonomous systems

