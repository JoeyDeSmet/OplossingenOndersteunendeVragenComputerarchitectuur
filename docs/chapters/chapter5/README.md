# Chapter 5: Hardware-Software Interface

### What do the abbreviations PCI and PCIe mean?

- `PCI`: Peripheral Component Interconnect
- `PCIe`: Peripheral Component Interconnect Express

### Briefly explain the following features that apply to PCI/PCIe

#### Hot plugging

`Hot plugging` refers to the ability to `add or remove` devices from a computer system `without havving to pawer down` the sytem.

#### Automated configuration

`Automated configuration` referes to the ability of the system to `automaticlly` configure and set up new devices that are added to the system, without manual intervention. 

#### Bulk DMA transfer

Bulk `DMA (Direct Memory Access)` transfer referes to a feature that allows data to be `tranfered directly` between devices and system memory, `bypassing the CPU` and reducing the workload on the CPU.

#### Multi-lane serial connections

`Multi-lan serial connections` refer to the use of multiple `parrallel data paths` between devices, rather than a single parallel data path. This allows for faster data transfer rates. 

#### Root Complex

`Root complex` referes to the `central hub` of a PCIe system that connects the CPU, memory and other devices. It acts as a bridge between the CPU and other devices on the bus.

#### End Point

`End point` referes to a device that is `connected to the Root complex` and is able to initiate transactions on the bus. Examples of `End point Devices` include `graphics card`, `storage devices` and `network interfaces`.

### What minimum features should a Linux device driver have? 

- **Initialization and termination**
- **Initialization and termination of communication sessions**
- **Read and Write**

#### One concrete example is the mydevice_init() function. Complete the functions further and explain the purpose of each.

- `int mydevice_init(void)`: Initialization of the device. The operating system calls this function to `initialize` the device at `sytem startup` or at a later time if the device is connected by hot plugging. The function return and integer status code, indicating if the initialization was successful or not.

- `void mydevice_exit(void)`: When the driver is no longer needed, this function is called to `release any system recources` allocated by the driver.

- `int mydevice_open(struct inode* inode, struct file* filp)`: This function attempts to `initiate access` to the device and `reports any errors` that may occur. The `inode` parameter contains required information the driver neeeds. The `flip` parameter contains information obaut the open file.

- `int mydevice_release(struct inode* inode, file* flip)`: This function closes the device or file and `deallocates any resources` allocated by `mydevice_open`.

- `ssize_t mydevice_read(struct file* filp, char* buf, size_t count, loff_t* f_pos)`: This function `reads` the data from the device and transfers the resulting data to a `buffer`. The `Count` paramater indicates the `requested amount of data`, and `f_pos` indicates an offset to be used from the start of the file. The function `returns the actual amount read`.

- `ssize_t mydevice_write(struct file* filp, const char* buf, size_t count, loff_t* f_pos)`: This function writes to the device, it has almost the same parameters as read except for the `buf` which is declared `const`, because this function reads from the buf and writes to the file or device.

### Explain the following abbreviations and explain the terms:

- **BIOS**: `Basic Input/Output System` is firmware that is stored on the motherboard of a computer. It is responsible for performing `basic input/output` function on the computer, and providing an `interface with the hardware`. 

- **POST**: `Power-On Self_test` is a diagnostic test that is run by the `BIOS` when the computer is powered on. It is used to `check` the `basic functionality` of the computers `hardware components`, such as memory and hard drive, before the OS is loaded.

- **UEFI**: `Unified Extensible Firmware Interface` It is the improvment of the `BIOS` for x86 and x86-64 bases PCs. `UEFI` is designed to `improve boot time`, support for `larger hard drives`, and improve `security features`.

### What are the limitations of MBR partitions and explain how UEFI partitions solve these limitations?

#### MBR (Master Boot Record) limitations

- Maximum of `four primary partitions`.
- They use `32-bit logical block addressing (LBA)`, which limit the partition tot a maximum of `2TB`.
- `No security boot` frature.

#### UEFI solution

- Using `GPT (GUID Partition Table)` which support up to `128 partitions` and allows for `larger partition` sizes.
- Using `64-bit LBA`, which remover the 2TB limit on partition sizes.
- Support for `Secure Boot`, which prevent the loading of unsigned or malicious code during the boot process.

### What tasks should the operating system kernel perform during the boot process?

Following the `POST` and `device configuration`, the BIOS begins the `boot process`:

- BIOS attempts to boot from the first device in the configured priority sequence.
- If it is valid the firmwared read the `boot loader` from the `MBR boot sector` and transfers control to it.
- The BIOS firmware has completed execturtion an is no longer active.
- The `boot loader` initiates the proces of `loading` and starting the `OS`.

### What are the differences between threads and processes?

- `Threads` `share` the same `memory space` with other threads in the same process, while `processes` have their own `independent memory space`.
- `Threads` are `lightweight` and have less overhead thhan processes, as the share the same mory space an system resources.
- Threads within a process can communicate witch each other easily as they share the same memory space. Processes have to us `inter-process communication (IPC)` mechanisms to communicate with each other.

#### Summary 

`Threads` are `lightweight` and have `less overhead`, `share memory and resources`, and can `communicate easily` witch each other. 

`Processes` are isolated, have `more overhead`, have their `own memory and resources`, and need to use `IPC mechanisms` to communicate.

### What are the four states that a process can assume and explain each state succinctly?

- **Running**: The process is currently being executed by the CPU.
- **Ready**: The process is ready to be executed by the CPU, but is currently waiting for the CPU to become available.
- **Blocked**: The process is unable to continue execution because it is waiting for a resource sush as I/O or synchronization event.
- **Terminated**: The process has completed execution or has been terminated by the OS.

### What do the abbreviations TCB and PCB mean and briefly explain their function?

#### TCB 

`Thread Control Block`, it's a data structure used by an OS to keep track of the resources and the state of a thread. The TCB contains information such as:

- Thread identification
- [Current state](#what-are-the-four-states-that-a-process-can-assume-and-explain-each-state-succinctly)
- Threads program counter
- Stack pointer
- Any other information needed to manage the thread

#### PCB

`Process Control Block`, it's a data structure used by an OS to keep track of the resources and the state of a process. The PCB contains information such as:

- Process identification
- [Current state](#what-are-the-four-states-that-a-process-can-assume-and-explain-each-state-succinctly)
- Process program counter
- Memory management information
- Any other information needed to manage the process

### Name four scheduling algorithms and discuss the properties of each (non-preemptive/preemptive?, process priority?, ...)

#### First-Come, First-Serverd (FCFS)

FCFS is a `non-preemptive algorithm`, the process that arrives first is executed first as the name suggests. It is easy to implement, but it is not efficient as it can lead to lang wait times for processes that arrive later.

#### Shortest Job First (SJF)

SJF is an `non-preemptive algorithm`, the process with the shortest execution time is executed first. It is effiecient but can be difficult to predict the execution time of a process.

#### Round Robin (RR)

Round Robin is a `preemptive algorithm`. In this algorithm each process is given an fixed time slice (time quantum) and is executed for that amount of time. If a process is not completed in its time quantum, it is moved to the back of the queue and the next process is executed. It is efficienst for time-sharing systems and prevents a process from monopolizing the CPU.

![Round robin graph](/img/round-robin.png)

#### Priority Scheduling

Priority scheduling is a `non-preemptive algorithm` or a `preemptive algorithm`. In this algorithm, each process is assigned a priority and the process with the highes priority is executed first. If two processes have the same priority it is scheduled according to the other scheduling algorithm (FCFS or RR). It is efficient but can lead to starvation of lower-priority processes.

### What is a symmetric multiprocessor architecture and explain the terms SIMD and MIMD?

A `Symmetric MultiProcessor (SMP)` architecture is a computer architecture where multiple processors are connected to a single shared main memory. All processors have equal access to the shared memory and can run any task.

#### SIMD (Single Instruction Multiple Data)

SIMD is a type of computer architecture where multiple processing element perform the same operation on multiple data points simultaneously. In SIMD all processing elements are executing the same instruction at the same time on different data.

#### (Multiple Instructions Multiple Data)

MIMD is a type of computer architecture where multiple processing elements perform different operations of different data simultaneously. In MIMD different processing elements can be executing different instructions on different data.
