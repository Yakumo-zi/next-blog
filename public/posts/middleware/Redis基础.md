---
title: Redis基础 
published: 2023-09-23
description: "Redis基础操作"
image: ""
tags: [redis,中间件]
category: "中间件"
draft: false
---
# Redis基础

开源，在内存中存储数据，主要用于分布式系统，速度极快，中间件。

# Redis的优点

* 内存数据结构，主要通过键值对的方式存储组织数据，key都是string，value可以有多种数据结构
* 可编程的，可以通过一些脚本进行批量操作
* 扩展能力，可以在Redis原有的功能基础上进行扩展，Redis提供了一组API用来编写一些扩展
* 持久化，Redis会在内存和硬盘都存储一份，内存为主，硬盘为辅，相当于对内存中的数据备份了一次，如果Redis重启了，就会从硬盘中加载数据
* 集群
* 高可用，核心就是冗余/备份

# Redis为什么快

redis虽然是单线程模型，为什么效率这么高？速度这么快？（参照物是像mysql这样的数据库）
 1. redis是直接访问内存，数据库则是访问硬盘，访问内存的速度要被访问硬盘的速度快得多。
 2. redis核心功能，比数据库的核心功能更简单。
 3. 单线程模型，避免了一些不必要的线程竞争开销。
 4. 处理网络IO的时候，使用epool这样的IO多路复用机制

# Redis最主要的应用场景

* 实时的数据存储，把Redis当作数据库
* 缓存和会话存储
* 消息队列

# Redis操作

## 核心命令

`get`：通过`key`得到`value`,如果`key`不存在会返回`nil`

`set`：设置`key`和`value`，`key`和`value`都是字符串，但是使用中不需要加上`" "`，设置成功会返回OK

## 常用全局命令

> 能够搭配任意一个数据结构来使用的命令

`keys`：用来查询当前服务器上匹配的key，通过一些通配符来描述key的模样，匹配该模样的key就能被查询出来

语法：`keys pattern`

`exists`：判定key是否存在，可以一次判定多个key，返回key存在的个数

语法：`exists key [key ...]` 

`del`：删除指定的key，可以一次删除一个或者多个，返回删掉key的个数

语法：`del key [key ...]`

`type`：返回key对应的value的类型，redis中的所有key都是string类型的，但是value可以有多种类型，返回值有`none`,`string`,`list`,`set`,`hash`,`stream`等。

语法：`type key`

`expire`：给指定的key设置过期时间，key存活时间超过指定的值就会自动删除，设置成功返回1，设置失败返回0

语法：`expire key seconds`

`pexpire`：和`expire`一样

语法：`pexpire key milliseconds`

`ttl`：查询过期时间还剩多少,-1表示没有设置过期时间,-2表示key不存在

语法：`ttl key`

> redis的key的过期策略是怎么实现的？redis是怎么知道那些key已经要过期要被删除，那些key还没过期？
>
> redis整体的策略是以下两者相结合
>
> 1. 定期删除：每隔一段时间抽取一部分设置了过期时间的key进行验证过期时间，过期了就删除。
> 2. 惰性删除：假设key已经到过期时间了，但是暂时还没有删除它，key还存在，紧接着，后面又一次访问，正好用到这个key的时候，于是这次访问就会让redis服务器触发删除key的操作，同时再返回一个key。
>
> redis为了对上述进行补充，还提供了内存淘汰策略。
>
> 定时器：在某个时间到达之后，执行指定的任务。
>
> 定时器实现方式：
>
> 1. 基于优先级队列：将要执行的任务插入到优先级队列中，通过一个线程去检查队头的时间有没有过期，如果队头没有过期，那么该队列中的所有任务都没有过期，线程休眠到队头要过期的时间，如果休眠期间有新的任务加入，则唤醒线程，查看当前队头是否过期。
> 2. 基于时间轮：把时间划分为很多个小段，每个小段挂上对应的任务，指针每隔一个周期，往后走一段，并且尝试对链表上的任务进行删除。
>
> redis中并没有采取定时器的方案。

# Redis中的数据类型

> 同一个数据类型，背后可能的编码实现方是不同的，会根据特定场景优化，redis底层会自动适应，在使用redis的时候感知不到。

## **string**

`raw`：最基本的字符串，底层就是持有一个char数组。

`int`：redis通常也可以实现一些计数功能，当value是一个整数时，redis就有可能使用int来保存

`embstr`：针对短字符串的特殊优化

## hash

`hashtable`：最基本的哈希表。

`ziplist`：在哈希表里面元素比较少的时候，可能优化成ziplist。

## list

`linkedlist`：链表。

`ziplist`：压缩列表。

从redis 3.2开始，就是用`quicklist`代替了上述的两个数据结构，来实现list，把空间和效率都折中的兼顾到，类似C++中的std::deque

## set

`hashtable`：最基本的哈希表。

`intset`：如果集合中都是整数，就会优化成intset，是针对特殊场景的优化

## zset

`skiplist`：跳表，也是链表，不同于普通链表，每个节点上有多个指针域，巧妙的搭配这些指针域的指向，就可以做到从跳表上查询元素的时间复杂度是O(logN)

`ziplist`：压缩列表。

## 查看内部编码方式

`object encoding`：可以通过该命令，查看到key对应的value的内部编码方式

语法：`object encoding key`

# Redis单线程模型

> 只使用一个线程来处理所有的命令请求，不是说一个redis进程内部只有一个线程，其实也有多个线程，多个线程是在处理 网络 IO

redis是单线程的，所以一次只能执行一个命令，多个请求到达redis服务器，也是要在队列中排队，再等待redis服务器一个一个取出里面的命令再执行，微观上讲，redis服务器是串行执行多个命令的。

redis能够使用单线程模型很好的工作，原因主要是在于redis的核心业务逻辑，都是短平快，不太消耗cpu资源也就不太吃多核。

**弊端：**redis必须要特别小心，某个操作占用时间长，就会阻塞其它命令的执行。

# Redis中的数据类型操作

## string

> redis中的字符串，直接就是按照二进制数据的方式存储的，不会做任何编码转换，存的是啥，取出来就是啥，redis对string类型限制了最大的大小为512M。

`set`：如果key不存在，创建新的键值对，如果key存在，则是让新的value覆盖旧的value，可能会改变原来的数据类型，**原来这个key的ttl也会失效**。

语法：`set key value [expiration EX seconds | PX milliseconds] [NX|XX]`

解析：`NX`参数说明如果key不存在才设置，如果key存在，则不设置返回`nil`,`XX`参数，如果key存在才设置，相当于更新key的value如果key不存在，则不设置，返回`nil`。

扩展命令：`setnx`,`setex`,`psetex`

`setnx`：设置成功返回1，设置失败返回0

`setex`：设置key时以秒为时间单位指定过期时间,`psetex`时间单位为毫秒

语法：`setex key seconds value`

`pttl`：可以查看毫秒的过期时间



`get`：指定一个key，获取对应的值，只支持字符串类型的value，如果value是其他类型，使用get获取就会出错

`flushall`：可以把redis上所有的键值对都带走。

`mset`：一次设置多个键值对

语法：`mset key value [key value...]`

`mget`：一次得到多个key所对应的value

语法：`mget key [key...]`



`incr`：针对value+1，要求此时key对应的value必须得是一个整数，并且value不能超出数字能表述的范围，返回值为+1后的值。如果key不存在，则会创建新key，并且把新key之前的值当做0来使用，则新key的值被incr增加后为1。

语法：`incr key`

`incrby`：针对value+n

语法：`incrby key incrment`

`decr`：针对value-1，要求和`incr`一样

语法：`decr key`

`decrby`：针对value-n

语法：`decrby key decrment`

`incrbyfloat`：针对value [+|-] 小数



`append`：如果key已经存在，并且是一个string，命令会将value追加到已有的string后面，返回值是追加之后整个字符串的长度。如果key不存在，则会将当前key当做空字符串，然后向该key追加value

语法：`append key value`

`getrange`：返回key对应的string的子串，由start和end确定。redis指定的区间是闭区间。可以使用负数，表示倒数索引，如果区间偏移量超过string ，会根据string的长度调整成正确的值。如果字符串中保存的是汉字，进行子串切分，切出来可能不是完整的汉字。

语法：`getrange key start end`

`setrange`：将原来的value中offset位置开始替换成新的value。返回值为替换过后新的字符串的长度。如果key不存在，则会从指定的offset位置创建一个新的字符串，offset以前的内容会被使用`0x00`填充。

语法：`setrange key offset value`

`strlen`：获取长度单位的是字节（一个中文三个字节），如果key不存在则返回0，并且strlen只能用于string类型的value

语法：`strlen key`

### string补充

1. redis中存储小数，本质上还是当做字符串来存储，意味着每次进行算数运算，都需要把字符串转换成小数，进行运算，结果再转回字符串。
2. 整数直接使用int来存。

### string的应用场景

1. 缓存
2. 计数
3. 共享session

## hash

> hash类型中的映射关系通常称为field-value，用于区分Redis的键值对，注意这里的value是指field对应的值，不是key对应的值。

`hset`：

语法：`hset key field value [field value ...]`

`hget`：

语法：`hget key filed`

`hexists`：返回1代表存在，返回0代表不存在

语法：`hexists key filed`

`hdel`：删除hash中的指定filed，返回值为本次操作删除的filed个数

语法：`hdel key filed [filed...]`



`hkeys`：获取到hash中所有的filed

语法：`hkeys key`

`hvals`：操作复杂度也hkeys一样也是O(N),N是哈希中的元素个数

语法：`hvals key`

`hgetall`：获取所有的filed和value

语法：`hgetall key`

>  以上三个命令都存在一些风险，hash的元素太多可能会阻塞redis

`hmget`：可以一次查询多个filed

语法：`hmget key [key ...]`

`hlen`：获取hash中所有的元素个数

语法：`hlen key`

`hsetnx`：不存在的时候，才能设置成功。

语法：`hsetnx key filed value`

hash这里的value，也可以当做数字来处理，可以使用`hincrby`,`hyincrbyfloat`，来加减。

### hash补充

内部编码：

* ziplist：如果hash中元素个数比较少，或者每个value的值长度比较短，则会使用ziplist，否则使用hashtable，阈值可以通过redis.conf里的配置项来调整
* hashtable：

## List

![image-20230912132158973](./Redis%E5%9F%BA%E7%A1%80.assets/c4e1a5339b3bb217e0571d00d3e9cf16-1723993777404-4.png)

> List内部的编码方式不是一个简单的数组，而是更接近deque，两侧都可以高效的插入删除，**lindex**能够获取到元素中的值，**lrem**也能返回被删除的元素的值，列表中的元素是允许重复的。
>
> 当前的List，头尾都能高效的插入删除元素，就可以把这个List当过一个栈

`lpush`：把一个或者多个元素从左侧（头插）插入到list里面，返回值为插入后list的长度

`rpush`

语法：`lpush key element [element ...]`

`lpushx`：如果key存在，则插入到list中，如果key不存在则什么都不做

`rpushx`



`lrange`：查看list中指定范围的元素，闭区间描述，下标支持负数，如果给出给定区间非法，redis会尽可能的获取对应的内容。

语法：`lrange key start stop`



`lpop`：如果List中没有元素，则会返回nil,count描述了这次要删几个元素 

语法：`lpop key [count]`

`rpop`：

语法：`rpop key [count]`



`lindex`：获取给定下标的元素，如果下标非法，返回的是nil，支持负数下标

语法：`lindex key index`

`linsert`：插入一个元素到指定位置之前或者之后，返回值是插入之后新的list的元素

语法：`linsert key before|after pivot element`

`llen`：获取指定List的长度

语法：`llen key`

`lrem`：count>0，从左往右删除，count<0，从右往左删，count=0，删除所有该元素

语法：`lrem key count element`

`ltrim`：指定一个范围，范围内的保留，范围外的全部删除

语法：`ltrim key start top`



`ACL`：访问控制列表，@write，@list，@slow，从Redis 6 开始支持。acl可以给每个命令打上一些标签，打好标签后，管理员就可以给每个redis用户配置不同的权限，允许该用可以执行那些标签对应的命令



`lset`：根据下标，修改元素

语法：`lset key index element`



`blpop`和`brpop`：如果list中存在元素，这两个命令和`lpop`，`lrpop`效果一样，如果没有元素，则List会阻塞一段时间，可以显式设置阻塞时间，不一定是无休止的等待，阻塞期间Redis可以执行其它命令。可以尝试获取多个list中的元素，那个list有元素，就会返回那个list的元素。



### list补充

* 从Redis 3 开始，List的内部编码就采用的是quicklist 而不是 ziplist和linkedlist了。quicklist的每个节点都是一个ziplist，可以通过配置来调整每个ziplist的大小



## Set

> 集合中的元素是无需的，集合中的元素是不能重复的。和list类似，集合中的每个元素都是string类型，可以使用json这样的格式，来进行结构化的数据存储。

`sadd`：将一个或多个元素添加到集合中

语法：`sadd key member [member ...]`

`smembers`：获取到元素中的所有元素，元素间是无序的

语法：`smembers key`

`sismember`：判定当前的元素是否在集合中

语法：`sismember key number`

`spop`：随机删除集合中的一个或几个元素

语法：`spop key [count]`

`srandmember`：随机取得一个元素

语法：`srandmember key [count]`

`smove`：从一个集合中取出一个元素，移动到另一个元素

语法：`smove source destination member`

`srem`：移除一个集合中的若干个元素

语法：`srem key member [member...]`

`scard`：获取集合中元素的个数

### 集合间操作

`sinter`：求若干个集合的交集

语法：`sinter key [key ...]`

`sinterstore`：求若干个集合的交集，将元素放入到指定集合中

语法：`sinterstore destination key [key...]`

`sunion`：求若干个集合的并集

`sunionstore`：求若干个集合的并集，将元素放入到指定集合中

`sdiff`：求若干个集合的差集

`sdiffstore`：求若干个集合的差集，将元素放入到指定集合中

### 应用场景

1. 使用Set来保存用户的“标签”
2. 去重

## zset

> 有序集合，给集合中的每个元素给予了一个float类型的score，用于在zset中排序。zset中的member仍然是唯一的。

`zadd`：

语法：`zadd key [NX|XX] [GT|LT] [CH] [INCR] score member [score member ...]`

`zcard`：获取一个集合中元素的个数

`zcount`：获取集合中一个区间中有多少个元素

语法：`zcount key min max`

`zrange`：获取指定区间内的元素

语法：`zrange key start stop [withscores]`

`zrevrange`：按照分数降序进行打印

`zrangebyscore`：根据分数区间进行查找

语法：`zrangebyscore key min max [withscores]`

`zpopmax`：删除并返回分数最高的count个元素

语法：`zpopmax key [count]`

`bzpopmax`：阻塞取出最大值，可以设置timeout

语法：`bzpopmax key [key ...] timeout`

`zrank`：返回member的下标，从前往后算的

语法：`zrank key member`

`zrevrank`：获取member的下标，反着算

`zscore`：查询指定元素的分数

语法：`zscore key member`

`zrem`：删除指定元素

`zremrangebyrank`：范围删除，按排名

语法：`zremrangebyrank key start stop`

`zremrangebyrscore`：范围删除，按分数

`zincrby`：不光会修改分数内容，同时也会移动元素位置，保持整个有序集合依然是升序的。

语法：`zincrby key increment member`

`zpopmax`：删除并返回分数最高的count个元素

语法：`zpopmax key [count]`

`bzpopmax`：阻塞取出最大值，可以设置timeout

语法：`bzpopmax key [key ...] timeout`

`zrank`：返回member的下标，从前往后算的

语法：`zrank key member`

`zrevrank`：获取member的下标，反着算

`zscore`：查询指定元素的分数

语法：`zscore key member`

`zrem`：删除指定元素

`zremrangebyrank`：范围删除，按排名

语法：`zremrangebyrank key start stop`

`zremrangebyrscore`：范围删除，按分数

`zincrby`：不光会修改分数内容，同时也会移动元素位置，保持整个有序集合依然是升序的。

语法：`zincrby key increment member`