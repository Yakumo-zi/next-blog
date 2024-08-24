---
title: Linux网络编程基础API
published: 2024-08-10
description: ""
image: ""
tags: [Linux, Cpp, 网络编程]
category: "Linux"
draft: false
---

# Linux 网络编程基础 API

#### 简介

socket 地址 API。socket 最开始的含义是一个 IP 地址和端口对（ip，port）。它唯一地表示了使用 TCP 通信的一端。

socket 基础 API。socket 的主要 API 都定义在 sys/socket.h 头文件中，包括创建 socket、命名 socket、监听 socket、接受连接、发起连接、读写数据、获取地址信息、检测带外标记，以及读取和设置 socket 选项。

#### socket 地址 API

##### 网络字节序和主机字节序：

> 现代 CPU 的累加器一次都能装载（至少）4 字节（这里考虑 32 位机，下同），即一个整数。那么这 4 字节在内存中排列的顺序将影响它被累加器装载成的整数的值。这就是字节序问题。字节序分为大端字节序（big endian）和小端字节序（little endian）。大端字节序是指一个整数的高位字节（23 ～ 31 bit）存储在内存的低地址处，低位字节（0 ～ 7 bit）存储在内存的高地址处。小端字节序则是指整数的高位字节存储在内存的高地址处，而低位字节则存储在内存的低地址处。

小端字节序通常被称为，主机字节序。大端字节序通常被称为，网络字节序。

linux 提供了如下 4 个函数来完成，主机字节序和网络字节序之间的转换。

```c
#include＜netinet/in.h＞
unsigned long int htonl(unsigned long int hostlong);
unsigned short int htons(unsigned short int hostshort);
unsigned long int ntohl(unsigned long int netlong);
unsigned short int ntohs(unsigned short int netshort);
```

##### 通用 socket 地址

socket 网络编程中表示 socket 地址的结构体是`socaddr`，其定义如下：

```c
#include＜bits/socket.h＞
struct sockaddr{
    sa_family_t sa_family;
    char sa_data[14];
}
```

`sa_family`成员是地址簇类型的变量。地址族类型通常与协议族类型对应。常见的协议族（也称 domain）和对应的地址族如下：

|  协议族  |  地址族  |       描述        |
| :------: | :------: | :---------------: |
| PF_UNIX  | AF_UNIX  | UNIX 本地域协议族 |
| PF_INET  | AF_INET  |  TCP/IPv4 协议族  |
| PF_INET6 | AF_INET6 |  TCP/IPv6 协议族  |

PF\_\*与 AF\_\*宏具有完全相同的值，所以经常混用。

`sa_data`成员用于存放 socket 地址的值。但是不同协议族的地址值具有不同的含义和长度，如下：

|  协议族  |                             地址含义和长度                              |
| :------: | :---------------------------------------------------------------------: |
| PF_UNIX  |                   本地的文件路径名，长度可达 108 字节                   |
| PF_INET  |                16bit 端口号和 32bit IPv4 地址，供 6 字节                |
| PF_INET6 | 16bit 端口号，32bit 流标识，128bit IPv6 地址，32bit 范围 ID，供 26 字节 |

所以`sa_data`无法完全容纳多数协议族的地址值，linux 因此定义了新的通用 socket 地址结构体。

```c
#include <bits/socket.h>

struct sockaddr_storage{
    sa_family_t sa_family;
    unsigned long int__ss_align;
    char __ss_padding[128-sizeof(__ss_align)];
}
```

##### 专用 socket 地址

通用 socket 地址结构体不够好用，使用起来非常繁琐，涉及到各种位操作，所以 linux 为各个协议族都提供了专门的 socket 地址结构体。

UNIX 本地域协议族使用如下专用 socket 地址结构体：

```c
#include<sys/un.h>
struct sockaddr_un{
	sa_family_t sin_family;/*地址族：AF_UNIX*/
    char sun_path[108];/*文件路径名*/
}
```

TCP/IP 协议族有 sockaddr_in 和 sockaddr_in6 两个专用 socket 地址结构体，它们分别用于 IPv4 和 IPv6：

```c
struct sockaddr_in{s
    a_family_t sin_family;/*地址族：AF_INET*/
    u_int16_t sin_port;/*端口号，要用网络字节序表示*/
    struct in_addr sin_addr;/*IPv4地址结构体，见下面*/
};
struct in_addr{
    u_int32_t s_addr;/*IPv4地址，要用网络字节序表示*/
};
struct sockaddr_in6{
    sa_family_t sin6_family;/*地址族：AF_INET6*/
    u_int16_t sin6_port;/*端口号，要用网络字节序表示*/
    u_int32_t sin6_flowinfo;/*流信息，应设置为0*/
    struct in6_addr sin6_addr;/*IPv6地址结构体，见下面*/
    u_int32_t sin6_scope_id;/*scope ID，尚处于实验阶段*/
};
struct in6_addr{
    unsigned char sa_addr[16];/*IPv6地址，要用网络字节序表示*/
};
```

##### IP 地址转换函数

将点分十进制的 IPv4 地址和十六进制字符串表示的 IPv6 地址转换为整数，linux 提供了以下三个函数用于 IPv4 地址的转换。

```c
#include＜arpa/inet.h＞
in_addr_t inet_addr(const char*strptr);
int inet_aton(const char*cp,struct in_addr*inp);
char*inet_ntoa(struct in_addr in);
```

inet_addr：将点分十进制字符串表示 IPv4 地址转换为网络字节序表示的 IPv4 地址。失败时返回`INADDR_NONE`。

inet_aton：完成和 inet_addr 同样的功能，但是将转化结果存放在指针指向的结构体 inp 中，成功返回 1，失败返回 0

inet_ntoa：将网络字节序整数表示的 IPv4 地址转换为用点分十进制字符串表示的 IPv4 地址。该函数内部用一个静态变量存储转化结果，函数的返回值指向该静态内存，因此**该函数是不可重入的**。

下面这对更新的函数也能完成和前面 3 个函数同样的功能，并且它们同时适用于 IPv4 地址和 IPv6 地址：

```c
#include＜arpa/inet.h＞
int inet_pton(int af,const char*src,void*dst);
const char*inet_ntop(int af,const void*src,char*dst,socklen_tcnt);
```

inet_pton：af 指定地址族（AF_INET、AF_INET6），src 传入用点分十进制表示的 IPv4 地址或者用十六进制表示的 IPv6 地址看，并将转换结果存储于 dst 指向的内存中。成功返回 1，失败返回 0，并设置 errno。

inet_ntop：进行相反的转换，前三个参数的含义与 inet_pton 相同，最后一个参数指定目标存储单元的大小，可以使用以下两个宏来指定：

```c
#include＜netinet/in.h＞
#define INET_ADDRSTRLEN 16
#define INET6_ADDRSTRLEN 46
```

#### socket 基础 API

UNIX./Linux 的一个哲学是：所有东西都是文件。socket 也不例外，它就是可读、可写、可控制、可关闭的文件描述符。下面的 socket 系统调用可创建一个 socket：

```c
#include＜sys/types.h＞
#include＜sys/socket.h＞
int socket(int domain,int type,int protocol);
```

domain：表示协议族，对于 TCP/IP 协议族应该设置为 AF_INET、AF_INET6，对于本地协议族应该设置为 AF_UNIX。

type：指定服务类型，SOCK_STREAM 用于 TCP 协议，SOCK_DGRAM 用于 UDP 协议，SOCK_CLOEXEC 用 fork 调用创建子进程时在子进程中关闭该 socket，SOCK_NONBLOCK 将 socket 设置为非阻塞。

protocol：在前两个参数构成的协议集合下，在选择一个具体的协议。不过这个值通常是唯一的，前两个参数完全决定了它的值。几乎所有情况下都应该将其设置为 0，表示使用默认的协议。

socket 系统调用成功时返回一个 socket 文件描述符，失败返回-1 并设置 errno。

##### socket 绑定

创建 socket 时，制定了地址族，但是并未指定具体的 socket 地址。在服务端程序中，我们通常需要将 socket 和 socket 地址进行绑定，只有绑定后，客户端的才知道如何连接它。客户端通常不需要绑定 socket，而是采用匿名的方式。

socket 绑定的 API 如下：

```c
#include＜sys/types.h＞
#include＜sys/socket.h＞
int bind(int sockfd,const struct sockaddr*my_addr,socklen_taddrlen);
```

bind 成功时返回 0，失败返回-1 并设置 errno。两种常见的的 errno 是 EACCES、EADDRINUSE。

- EACCES，表示被绑定的地址是受保护的地址，仅 root 用户能够访问。比如普通用户将 socket 地址绑定到知名服务端口（0~1023）上，就会触发该错误。
- EADDRINUSE，被绑定的地址正在使用中。比如将 socket 绑定到一个处于 TIME_WAIT 状态的 socket 地址。

##### socket 监听

socket 被绑定后，还不能马上接受客户连接，我们需要使用如下系统调用来创建一个监听队列以存放待处理的客户连接：

```c
#include＜sys/socket.h＞
int listen(int sockfd,int backlog);
```

backlog 参数提示内核监听队列的最大长度。监听队列的长度如果超过 backlog，**服务器将不受理新的客户连接，客户端也将收到 ECONNREFUSED 错误信息**。在内核版本 2.2 之前的 linux 中，backlog 参数是指所有处于半连接状态（SYS_RCVD）和全连接状态（ESTABLISHED）的 socket 的上限。2.2 以后它只表示处于全连接状态的 socket 的上限，而处于半连接状态的 socket 的上限则由`/proc/sys/net/ipv4/tcp_max_syn_backlog`内核参数定义。backlog 参数的典型值是 5。

listen 函数成功返回 0，失败返回-1 并设置 errno。

```c
#include <arpa/inet.h>
#include <assert.h>
#include <libgen.h>
#include <netinet/in.h>
#include <signal.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <strings.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <unistd.h>

static bool stop = false;

static void handle_term(int sig) { stop = true; }

int main(int argc, char *argv[]) {
  signal(SIGTERM, handle_term);
  if (argc <= 3) {
    printf("usage:%s ip_address port_number backlog\n", basename(argv[0]));
    return 1;
  }

  const char *ip = argv[1];
  int port = atoi(argv[2]);
  int backlog = atoi(argv[3]);

  int sock = socket(AF_INET, SOCK_STREAM, 0);
  assert(sock >= 0);
  struct sockaddr_in addr;
  bzero(&addr, sizeof(addr));
  inet_pton(AF_INET, ip, &addr.sin_addr);
  addr.sin_family = AF_INET;
  addr.sin_port = htons(port);
  int ret = bind(sock, (struct sockaddr *)&addr, sizeof(addr));
  assert(ret != -1);
  ret = listen(sock, backlog);
  assert(ret != -1);
  while (!stop) {
  }
  close(sock);
  return 0;
}

```

使用 netstat 或者 ss 命令观察连接状态，发现只有 backlog+1 个链接处于 ESTABLISHED 状态，其余链接都处于 SYN_SNET 状态。不同的系统运行结果会有差别，不过监听队列中 ESTABLISHED 状态的链接通常比 backlog 值略大。

##### 接受连接

```c
#include＜sys/types.h＞
#include＜sys/socket.h＞
int accept(int sockfd,struct sockaddr*addr,socklen_t*addrlen);
```

sockfd 参数是执行过 listen 系统调用的监听 socket。addr 参数用来获取远端的 socket 地址，该 soscket 地址的长度由 addrlen 参数指出。

accept 成功返回一个新的 socket，失败返回-1 并设置 errno。

如果监听队列中处于 ESTABLISHED 状态的链接对应的客户端出现网络异常，或者提前退出，那么服务端对这个链接执行 accept 调用是否成功？

依然成功，accept 只是从监听队列中取出链接，而不论链接处于何种状态（例如 ESTABLISHED 和 CLOSE_WAIT），更不关心网络状况如何变化。

##### 发起连接

```c
#include＜sys/types.h＞
#include＜sys/socket.h＞
int connect(int sockfd,const struct sockaddr*serv_addr,socklen_taddrlen);
```

connect 成功返回 0，一旦成功建立连接，sockfd 就唯一的标识了这个链接，客户端就可以通过读写 sockfd 来与服务器通信。connect 失败则返回-1 并设置 errno。两种常见的 errno 是 ECONNREFUSED 和 ETIMEOUT。

- ECONNREFUSED，目标端口不存在，连接被拒绝。
- ETIMEOUT，连接超时

##### 关闭连接

```c
#include＜unistd.h＞
int close(int fd);
```

fd 参数是待关闭的 socket。不过，close 系统调用并非总是立即关闭一个连接，而是将 fd 的引用计数减 1。只有当 fd 的引用计数为 0 时，才真正关闭连接。多进程程序中，一次 fork 系统调用默认将使父进程中打开的 socket 的引用计数加 1，因此我们必须在父进程和子进程中都对该 socket 执行 close 调用才能将连接关闭。

如果无论如何都要立即终止连接（而不是将 socket 的引用计数减 1），可以使用如下的 shutdown 系统调用（相对于 close 来说，它是专门为网络编程设计的）：

```c
#include＜sys/socket.h＞
int shutdown(int sockfd,int howto);
```

howto 决定 shutdown 的行为：

- SHUT_RD：关闭读
- SHUT_WR：关闭写
- SHUT_RDWR：同时关闭读写

成功返回 0，失败返回-1 并设置 errno。

##### 数据读写

对文件的读写操作 read 和 write 同样适用于 socket。但是 socket 编程接口提供了几个专门用于 socket 数据读写的系统调用，它们增加了对数据读写的控制。其中用于 TCP 流数据读写的系统调用是：

```c
#include＜sys/types.h＞
#include＜sys/socket.h＞
ssize_t recv(int sockfd,void*buf,size_t len,int flags);
ssize_t send(int sockfd,const void*buf,size_t len,int flags);
```

recv 读取 sockfd 上的数据，buf 和 len 参数分别指定读缓冲区的位置和大小，flags 参数的含义见后文，通常设置为 0 即可。recv 成功时返回实际读取到的数据的长度，它可能小于我们期望的长度 len。因此我们可能要多次调用 recv，才能读取到完整的数据。recv 可能返回 0，这意味着通信对方已经关闭连接了。recv 出错时返回-1 并设置 errno。

send 往 sockfd 上写入数据，buf 和 len 参数分别指定写缓冲区的位置和大小。send 成功时返回实际写入的数据的长度，失败则返回-1 并设置 errno。

flags 参数为数据收发提供了额外的控制。

socket 编程接口中用于 UDP 数据报读写的系统调用是：

```c
#include＜sys/types.h＞
#include＜sys/socket.h＞
ssize_t recvfrom(int sockfd,void*buf,size_t len,int flags,structsockaddr*src_addr,socklen_t*addrlen);
ssize_t sendto(int sockfd,const void*buf,size_t len,intflags,const struct sockaddr*dest_addr,socklen_t addrlen);
```

socket 编程接口还提供了一对通用的数据读写系统调用。它们不仅能用于 TCP 流数据，也能用于 UDP 数据报：

```c
#include＜sys/socket.h＞
ssize_t recvmsg(int sockfd,struct msghdr*msg,int flags);
ssize_t sendmsg(int sockfd,struct msghdr*msg,int flags);
struct msghdr{
    void*msg_name;/*socket地址*/
    socklen_t msg_namelen;/*socket地址的长度*/
    struct iovec*msg_iov;/*分散的内存块，见后文*/
    int msg_iovlen;/*分散内存块的数量*/
    void*msg_control;/*指向辅助数据的起始位置*/
    socklen_t msg_controllen;/*辅助数据的大小*/
    int msg_flags;/*复制函数中的flags参数，并在调用过程中更新*/
};
struct iovec{
    void*iov_base;/*内存起始地址*/
    size_t iov_len;/*这块内存的长度*/
};
```

msg_name 成员指向一个 socket 地址结构变量。它指定通信对方的 socket 地址。对于面向连接的 TCP 协议，该成员没有意义，必须被设置为 NULL。这是因为对数据流 socket 而言，对方的地址已经知道。msg_namelen 成员则指定了 msg_name 所指 socket 地址的长度。

在某些情况下，我们想知道一个连接 socket 的本端 socket 地址，以及远端的 socket 地址。下面这两个函数正是用于解决这个问题：

```c
#include＜sys/socket.h＞
int getsockname(int sockfd,structsockaddr*address,socklen_t*address_len);
int getpeername(int sockfd,structsockaddr*address,socklen_t*address_len);
```

getsockname 获取 sockfd 对应的本端 socket 地址，并将其存储于 address 参数指定的内存中，该 socket 地址的长度则存储于 address_len 参数指向的变量中。如果实际 socket 地址的长度大于 address 所指内存区的大小，那么该 socket 地址将被截断。getsockname 成功时返回 0，失败返回-1 并设置 errno。

##### socket 选项：

如果说 fcntl 系统调用是控制文件描述符属性的通用 POSIX 方法，那么下面两个系统调用则是专门用来读取和设置 socket 文件描述符属性的方法：

```c
#include＜sys/socket.h＞
int getsockopt(int sockfd,int level,intoption_name,void*option_value,socklen_t*restrict option_len);
int setsockopt(int sockfd,int level,int option_name,constvoid*option_value,socklen_t option_len);
```

sockfd 参数指定被操作的目标 socket。level 参数指定要操作哪个协议的选项（即属性），比如 IPv4、IPv6、TCP 等。option_name 参数则指定选项的名字。option_value 和 option_len 参数分别是被操作选项的值和长度。
![image-20240810210412926](./Linux%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8BAPI.assets/image-20240810210412926.png)

getsockopt 和 setsockopt 这两个函数成功时返回 0，失败时返回-1 并设置 errno。
