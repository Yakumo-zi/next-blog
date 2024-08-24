---
title: context底层原理
published: 2024-08-23
description: "context底层原理"
image: ""
tags: [Go, 学习笔记]
category: "Go"
draft: false
---

# context介绍

>  context是golang中的经典工具，主要在异步场景中用于实现并发协调以及对goroutine的生命周期控制，除此之外，context还具有一定的数据存储能力。

# context核心数据结构

## context.Context

在go中Context是一个接口，定义了四个核心API：

+ `Deadline`：返回context的过期时间。
+ `Done`：返回context中的`channel`。
+ `Err`：返回错误。
+ `Value`：返回context中的对应key的值。

```go
type Context interface{
    Deadline() (deadline time.Time,ok bool)
    Done() <-chan struct{}
    Err() error
    Value(key any) any
}
```

## context中的error

![image-20240823221832763](./context%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.assets/image-20240823221832763.png)

+ Canceled：context被cancel时会触发该错误
+ DeadlineExceeded：context超时会触发该错误

# 标准库中对context.Context的实现

## emptyCtx

该context没有任何属性，没有任何元素，是所有其他context的祖先。

![image-20240823222115519](./context%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.assets/image-20240823222115519.png)

+ emptyCtx是一个空的context，本质上类型为一个空结构体。
+ Deadline会返回一个公元元年时间以及false的flag，标识当前context不会存在过期时间。
+ Done方法永远返回一个nil通道，用户无论往nil通道中读写数据均会被阻塞。
+ Err返回的错误永远为nil
+ Value方法返回的value同样为nil

## context.Background()与context.TODO()

在1.22标准库的实现中，`context.Background()` 返回的是一个 backgroundCtx的结构体，而`context.TODO() `返回的是一个todoCtx结构体，这两个结构体本质上没有太大的区别，都只是在结构体内部嵌入了emptyCtx这个结构体而已。

唯一的区别它们分别实现了context.stringer接口，`backgroundCtx.String()`会返回"context.Background"，`todoCtx.String()`会返回"context.TODO"，标准库中的实现如下：

![image-20240823222842693](./context%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.assets/image-20240823222842693.png)、

## cancelCtx

cancelCtx是Go异步编程中一个常用的Context，该Context可以取消一条下行链路中所有的Context

```go
type cancelCtx struct {
	Context
	mu       sync.Mutex            // protects following fields
	done     atomic.Value          // of chan struct{}, created lazily, closed by first cancel call
	children map[canceler]struct{} // set to nil by the first cancel call
	err      error                 // set to non-nil by the first cancel call
	cause    error                 // set to non-nil by the first cancel call
}
```

