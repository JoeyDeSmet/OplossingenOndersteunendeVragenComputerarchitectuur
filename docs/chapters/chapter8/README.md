# Chapter 8: Performance-Enhancing Techniques

## How does a cache controller determine a cache hit or a cache miss?

When caching is in use, each attempt to access a memory location begins with a `search of the cache`. If the data is present, the processor retrieves and uses it immediately. (`Cache hit`).

If the cache search fails (`Cache miss`), the data must be retrieved from the backing store. In the process of the a copy is stored in cache for anticipated future use.



## A cache functions according to the locality of reference principle. Explain.

Locality of reference referes to the `reuse of data that has been accessed recently` (**temporal locality**) and to the `access of data in physical proximity to data that has been accessed previously` (**spatial locality**).



## Discuss the architecture and operation of the following 3 cache architectures:

### Direct-mapped cache

A direct-mapped cache is a block of memory organized as a `one dimentional array of cache sets`. Where each address in the main memory maps to a single set in cache.

Each `cache set` consists of the following:
- A **Cache line**, containing a block of data read from main memory.
- A **Tag value**, indicating the location in main memory corresponding to the cached data.
- A **Valid bit**, indicating wheter the set contains data.

![Direct-mapped](/img/DirectCaching.png) 

### Set-associative Cache

In a two way Set-associative cache, the mormory is `divided` into two equal-sized caches. The hardware consults both caches in `parallel` on each memory access and a hit may occur in either one. 

![Set-associative cache](/img/SetAssociativeCache.png)
  
### Full-associative cache

A Full-associative cache is just a Set-associative cache, but spilt in so much more parallel chaches that each cache only contains one line. So here every memory access keads to a `parallel comparison` with the `Tag values` stored in all of the cache lines. This can provide a **very high hit rate**, though at a `substantial cost in circuit complexity` and a corresponding `consumption of integrated circuit die area`. The extra circuitry also result in a `higher power consumption`.



## Discuss the following terms:

### cache line

A **cache line** is the `smallest unit of data` that can be transfered between a `cache an main memory`. It typically contains multiple bytes, such as 64 or 128 bytes.

### Split caches

In processors with **Split chaches** the `L1 D-cache` is simular to the L1 I-cache, except that the circuitry must `permit` the processor to `write to memory` as well as `read from it`.

### write-through cache

A **write-through cache** is a cache that `immediately writes` modifications to `DRAM` every time the processor writes data to memory. It will also write the modifications back to cache.

### write-back cache

This policy `holds the modified data in the cache` until the line is about to be evicted from cache. For this to work it must have an additional status bit (`dirty bit`), indicating if the data has been modified since it was read from DRAM. 

### Write-behind cache

CPU writes are cached, writes to main memory may be buffered.



## What is the cache coherence problem with multiple processor cores sharing a shared main memory?

It is the problem that arises when multiple cores have a common main memory and each of the core has their own cache. The proble is that when a core modifies a memory location, the change may not be immediately visable to the other cores, because the other cores may still have an older copy of the data in their own chaches.



## How does the snoopy cache-coherence protocol work?

The snoopy chache-coherence protocol is a type of cache coherence protocal that is used to maintain consistency among the caches of multiple processors. It opperates on a bus-based system where all the processors are connected to a common bus and can communicate to each other. 

The basic idea behind it is that each processor snoops the bus to see if an other processor is requesting data thais is currently stored in its cache. If a processor finds that an other processor is requesting data that it has in its cache, it sends a copy of the data to the requesting processor.

The protocol use a combination of bus-based an point-to-poin communication. When a processor requests data it sends a bus-based broadcast message to all other processors. Also when a processor modifies data it sends a bus-based broadcast message invalidating the copy of the data in all other caches. 



## Why does instruction pipelining increase the performance of a microprocessor?

To understand this we have to break down the `Execution of a single processor instruction` into a sequence of discrete steps:

- `Fetch`: The processor will fetch the next instruction based on some previous values such as previous instruction, predefined reset value if program counter, etc.
- `Decode`: The control unit determines the actions to be taken during instruction execution.
- `Execute`: The control unit executes the requested operation, invoking an ALU operation if required.
- `Writeback`: The control unit writes the result of instruction execution to register or memory locations, an the program counter is updated to the next address of the next instruction to be executed.

With the use of instructionn pipelining we can increase the number of instructions per clock cycle, because while we wait for other hardware to finish it's process we can already fetch the next instruction or execute an instruction.

![instruction pipelining](/img/InstructionPipelining.png) 



## What are the differences between a superscalar and a superpipelined processor architecture?

### Superscalar processor architecture

A `superscalar processor architecture` is a type of processor architecture that is designed to increase the instruction throughput by allowing multiple instructions to be executed simultaneously. It achieves this by incorporating `multiple execution units` such as `ALUs` an `FPUs (floating-point units)` within the processor, allowing multiple instruction to executed in parallel.
  
### Superpipelined processor architecture

A `superpipelined processor architecture` on the other hand, is a type of processor architecture that is designed to increase the instruction throughput by allowing multiple instructions to be in different stages of execution simultaneously. It does this by breaking complex instructions into a larger number of smaller simpler stages, so more pipelining can be done.



## What is the principle of Out-of-Order execution? How does it work?

Out-of-Order execution is a technique use to reduce the likelihood of an `pipeline bubble` or at least shortening its duration. It will look at instructions an exectute instructions out of order if they will have the same outcome.

### Example

The following assambly code increments the value stored in the eax register. Than it will add the value stored in de eax register to the value stored in the ebx register. Than it will move the value of ecx register into the edx register, which has nothing to do with the previous instructions.

```x86asm
inc eax
add ebx, eax
mov ecx, edx
```

So when using OOO the processor will execute the previous assambly in the following order so it will be faster.

```x86asm
inc eax
mov ecx, edx
add ebx, eax
```



## What is the difference between static and dynamic branch prediction?

- Static branch prediction
  - Decided before run time
  - Examples:
    - Always-Not taken
    - Always taken
    - Backwards taken, forward not taken
    - Profile-driven prediction
- Dynamic branch prediction 
  - Prediction decisions may change during the exectution of the program



## Explain the principle of simultaneous multithreading?

It is the process of `simultaneously executing instruction from different threads`.

![simultaneous multithreading](/img/SimultaneousMultithreading.png) 



## Explain the following terms for processor instruction processing:

### SISD (Single Instruction Single Data)

A single instruction is executed on one data value. (Traditional von Neumann single CPU computer)

### SIMD (Single Instruction Multiple Data)

A single instruction is executed on multiple data values. (Vector processors fine grained data Parallel computers)

### MISD (Multiple Instruction Single Data)

Multiple instruction are executed from a single data stream. (May be pipelined computers)

### MIMD (Multiple Instruction Multiple Data)

Multiple instructions are executed from multiple data streams. (Multi computers Multiprocessors)

![Processing types](/img/ProcessingTypes.png) 



## Explain following terms:

### SSE

SSE (Streaming SIMD Extensions), provide a set of processor instructions and executions facilities for simultaneously operating on 128-bit arrays. The data contained in the array can consist of integers or floating-point values. 

### AVX

AVX (Advanced Vector Extensions), the latest iteration of SSE-type capabilities provides `register widths of 512 bits`. AVX include among other features, instructions optimized to support neural network algorithms. 

