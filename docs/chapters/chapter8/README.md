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


  
### Full-associative cache

