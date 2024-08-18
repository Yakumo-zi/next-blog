---
title: defer与异常处理
published: 2023-11-07
description: ""
image: ""
tags: [Go, 学习笔记]
category: "Go"
draft: false
---

# `defer`与异常处理

在本篇文章中，介绍关于Go语言中`defer`的使用以及注意事项，还有如何在Go语言中使用`defer`去处理异常。`defer`是Go语言提供的关键字，它的作用是，当你声明了注册了`defer`语句，那么该语句会在函数**返回时**被执行。

## 为什么要使用`defer`

在`C\C++`或者其它需要手动管理某些资源（包括但不限于内存、文件描述符等）的语言中，我们可能会存在以下情况，那就是我们开辟了一块新的内存，或者打开了一个新的文件描述符，刚开始我们可能记着要释放，但是写代码写着写着，写到最后我们可能就忘了有这么一回事了，这样就可能导致资源泄露，所以各种语言都提供了一种或者多种机制，用于在代码块结束、函数调用结束、变量生命周期结束的时机释放资源。例如C++提供了RAII用于当前对象声明周期结束后使用析构函数释放资源、Rust提供了生命周期的方式用来保证资源正确释放，而`defer`就是Go语言提供的用于释放资源的方式。

`defer`在Go语言中，可以用于释放互斥锁、增加`waitGroup`的计数、回滚数据库事务以及处理各种函数调用的`Epilogue`。虽然是手动的，但是功能非常强大。

## 怎样使用`defer`

`defer`的基础使用方式如下：

```go
func deferExample1() {
	defer fmt.Println("deferExample1's defer Invoke!")
	fmt.Println("deferExample1 Invoke!")
}
```

![image-20231107220137706](/defer%E5%8E%9F%E7%90%86.assets/f54c5912d1664675b58757611dfaef50tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

可以看到实现执行了函数内部的其他代码，最后才执行的`defer`语句，`defer`关键字之后不仅可以跟一条语句，还可以跟一个函数的调用语句，示例如下：

```go
func deferExample2() {
	defer func() {
		fmt.Println("deferExample2's defer function Invoke!")
	}()
	fmt.Println("deferExample2 Invoke!")
}
```

![image-20231107220524459](/defer%E5%8E%9F%E7%90%86.assets/f92ba71d46d843899cabe9a38628e349tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

并且在一个函数中可以使用`defer`关键字注册多个函数的调用语句，或者普通语句，示例如下：

```go
func deferExample3() {
	defer fmt.Println("deferExample3's defer statement 1 execute!")
	defer func() {
		fmt.Println("deferExample3's defer function 2 execute!")
	}()
	defer func() {
		fmt.Println("deferExample3's defer function 3 execute!")
	}()
	defer fmt.Println("deferExample3's defer statement 4 execute!")
	fmt.Println("deferExample3 Invoke!")
}
```

![image-20231107220939503](/defer%E5%8E%9F%E7%90%86.assets/7f53639d4e754d0494e1328b527b8348tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

这里我们可以看到，`defer`注册语句的执行顺序与注册顺序相反，我们是按照1,2,3,4的顺序注册的，而调用是按照4,3,2,1的顺序调用的。这是因为在Go语言的运行时在函数执行期间维护了一个“链栈”，每次调用`defer`就会在这个“链栈”中新增一项，而我们知道栈这种数据结构具有FILO（First In Last Out）的特性的，所以最先注册的`defer`语句会被最后调用，具体的过程如下所示：

![image-20231107222133876](/defer%E5%8E%9F%E7%90%86.assets/5dd1b7cf4da6400fb80a7aea8af22393tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

这张图清晰的解释了`defer`的整个工作流程，可以看到`defer`语句是如何注册，如何执行的。并且还有关键的一点就是，`derfer`并不是在函数返回完成之后执行的，**而是在函数返回期间执行的**，因为函数的返回并不是一个原子操作，返回期间要做很多事情，比如处理函数栈帧时，就要释放局部变量、给返回值寄存器赋值等等，所以`defer`语句也是在返回期间完成的。

## 使用`defer`的注意事项

在面试的时候关于`defer`关键字，除了上述的执行流程，一般还会有给你一段代码让你说出代码的执行结果这种问题，所以我们也来看看关于`defer`使用的细枝末节。

### 预计算参数

在使用`defer`时，这是一个比较常见的场景，就是在`defer`中使用一个当前函数的变量，以一个示例来了解：

```go
func deferExample4() {
	i := 5
	defer fmt.Println("deferExample4's defer i = ", i)
	i = 10
	fmt.Println("deferExample4's i = ", i)
}
```

![image-20231107223215404](/defer%E5%8E%9F%E7%90%86.assets/bea71a589d00499ca07d52464bac0917tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

我们可以看到这里函数内部打印的值为10，`defer`语句中打印的值为5，因为`defer`语句具有预计算参数的作用，意思就是我们在注册`defer`语句的时候，`defer`语句中的值就已经被计算出来了，所以`defer`语句中的`i`在注册时就被赋值了。

这种情况，与我们使用`defer`进行函数调用时，将函数体内部的变量以参数的方式传递到`defer`注册的函数中时一致，示例如下：

```go
func deferExample5() {
	i := 5
	defer func(i int) {
		fmt.Println("deferExample5's defer i = ", i)
	}(i)
	i = 10
	fmt.Println("deferExample5's i = ", i)
}
```

![image-20231107223834078](/defer%E5%8E%9F%E7%90%86.assets/43bf2c43a0924750ba21160e69129866tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

但是在**使用闭包捕获函数体内的变量到`defer`注册的函数中**时，情况就会发生变化，示例如下：

```go
func deferExample6() {
	i := 5
	defer func() {
		fmt.Println("deferExample6's defer i = ", i)
	}()
	i = 10
	fmt.Println("deferExample6's i = ", i)
}
```

![image-20231107224112457](/defer%E5%8E%9F%E7%90%86.assets/573768b7567b4a85a915a2f9838f33dctplv-k3u1fbpfcp-jj-mark3024000q75.webp)

在这里我们得到了相同的输出，这是因为`defer`函数在注册时将该变量捕获到函数内部了，而`defer`语句是在函数返回期间执行的，这里`defer函数`内部的`i`和函数内部的`i`指向的是同一个变量地址，所以`defer函数`会和函数打印同样的值。

不过在这里还有一种特殊情况，那就是当返回值是一个命名返回值时，它又会出现不同的结果，示例如下：

```go
func deferExample7() (i int) {
	i = 5
	defer func() {
		fmt.Printf("deferExample7's defer i = %d,addr = %p\n", i, &i)
	}()
	i = 10
	fmt.Printf("\"deferExample7's  i = %d,addr = %p\n", i, &i)
	i = 3
	return i + 2
}
```

![image-20231107225428455](/defer%E5%8E%9F%E7%90%86.assets/aa44ff9bd6a145cbab745c2976e0342etplv-k3u1fbpfcp-jj-mark3024000q75.webp)

如果根据上面的闭包规则，那么我们预期得到的结果应该是3，因为在最后3被赋予了i，但是由于这是一个命名返回参数，而`defer`语句又是在返回期间执行的，所以我们得到了5，用下面这张图来解释这个现象：

![image-20231107230151521](/defer%E5%8E%9F%E7%90%86.assets/5a5bd3a259dc4495be4e1cd0b9329935tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

这样我们就清晰的知道，为什么用闭包捕获一个命名返回值会出现这种不同的作用了，这是由于`defer`语句是在函数返回期间执行的，而`defer`语句又在注册的时候闭包捕获了命名返回值i获得了i的地址，所以函数在返回的时候将返回值赋给命名返回值，此时命名返回值i的值就发生了变化，而赋予返回值之后，才开始执行函数调用的清理工作，比如释放栈帧和执行`defer`语句，所以`defer`语句中使用的命名返回值是最新的值5。

还有一点就是，我们在使用`defer`的时候，不能只在`defer`关键字之后定义一个匿名函数，而不调用它，这样是错误的。

![image-20231109200855177](/defer%E5%8E%9F%E7%90%86.assets/4b1c3674021f4aefa423719df1b4b565tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

综上所述，我们使用`defer`时要注意如下几点：

*   `defer`**关键字之后只能跟一条语句，而不能跟一个匿名函数的定义！**

*   `defer`语句是在函数返回过程中执行的，而不是函数返回后执行的。

*   `defer`语句具有预计算值的功能，当我们没有使用闭包捕获函数内部的变量时，`defer`语句在注册时就会计算出要使用的值。

*   `defer`函数闭包捕获函数内部的变量，在`defer`函数执行时会获取到该变量最新的值，因为`defer`函数获取了该变量的地址。

*   `defer`函数闭包捕获命名返回值时，如果函数内部**显示指定**了返回值，那么这个**返回值会作为命名返回值最新值**，`defer`函数在执行时也会使用最新的值。

## 什么是异常和错误

Go语言中的异常与错误和其他语言中的异常与错误有一定的区别，所以我们主要来了解在Go语言中什么是异常和错误，简单的来说，Go语言中的异常就是程序在运行过程中由`panic`引发异常，这种异常如果没有恢复则会导致程序崩溃，而Go语言中的错误就是实现了`error`接口的类型，我们可以在函数的返回值中返回一个实现了`error`接口的值，用于告诉函数的调用者，当前函数是否正常执行，如果没有正常执行，那么错误信息是什么。

## 怎样处理异常和错误

在Go语言中，处理异常和错误我们一般使用以下的两种方式。

对于错误（error），我们一般是这样处理的：

![Copypasting "if err!= nil {return err;} everywhere : r/golang](/defer%E5%8E%9F%E7%90%86.assets/93003b410d5f4008ad66f72f0d16bfb2tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

咳咳，正经的说，因为Go语言中的error是一个接口，所以返回的错误总是一个值，我们可以通过对这个值进行判断来了解当前发生了什么错误，并且知道该如何处理该错误。例如：

```go
if err == ErrSomething { … }
```

在这里，如果当前发生的错误是`ErrorSomething`我们就执行对该错误的处理，如果是其他错误，也是一样的。但是我们最常用的，还是上面这张图中的代码（每个Gopher都需要这样一个键盘！），因为我们一般不会在当前函数中处理当前函数发生的错误，一般是将错误传播回去，由上层来决定如何处理。

而对于异常，也就是由`panic`引发的，异常一般会导致程序崩溃，这代表发生了非常严重的错误，如果在开发环境中我们一般不会去处理该错误，而是借助该错误来Debug，如果是线上的运行环境，我们担心发生了panic，那我们一般会使用`recover`函数来捕获这个`panic`然后将其当做一个错误传递出去，具体的示例如下：

```go
package main
import "fmt"
func mayPanic(){
    panic("a problem")
}

func main(){
    defer func(){
        if err:=recover();err!=nil{
            fmt.Println(err)
        }
    }()
    mayPanic()
}
```

在这段代码中，我们使用了`recover`来捕获发生的`panic`然后将其打印出来。在实际的环境中，我们也可以使用这样的方式，来防止程序崩溃。

在Go语言中对于异常和错误的处理，一般情况就是以上的两种方式。

## 处理异常和错误的注意事项

除了以上的方式，还有一些特殊的情况需要了解，接下来我们来看一个特殊的例子，那就是在`defer`执行的函数中发生了`panic`会怎么样呢？示例如下：

```go
func mayPanic() {
	defer func() {
		fmt.Println("may Panic 1")
	}()
	defer func() {
		panic("I'll panic!")
	}()
	defer func() {
		fmt.Println("may Panic 2")
	}()
	fmt.Println("mayPanic Invoke")
}

func main() {
	defer func() {
		fmt.Println("main function defer invoke")
	}()
	mayPanic()
	fmt.Println("main function invoke!")
}
```

对于这段代码，运行的结果如下：

![image-20231109202428036](/defer%E5%8E%9F%E7%90%86.assets/358a3121180b43808b92004cfc244709tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

我们再来看一个例子，对比着看：

```go
func mayPanic() {
	defer func() {
		fmt.Println("may Panic 1")
	}()
	defer func() {
		panic("I'll panic!")
	}()
	defer func() {
		fmt.Println("may Panic 2")
	}()
	panic("It's problem")
    defer func(){
        fmt.Println("may Panic 3")
    }()
}

func main() {
	defer func() {
		fmt.Println("main function defer invoke")
	}()
	mayPanic()
	fmt.Println("main function invoke!")
}
```

这个例子的输出如下：

![image-20231109202517472](/defer%E5%8E%9F%E7%90%86.assets/3758accab0844e4da8ea0728be9b2bd9tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

从以上的两个例子中，我们可以简单的得出一个结论，**当一个函数内部发生了`panic`，如果在发生`panic`之前，函数内部注册了`defer`语句，那么`panic`会被推迟到所有`defer`语句执行完毕。如果注册了多个`defer`语句，这多个`defer`语句中有一个或者多个发生了`panic`，都不会影响剩下的`defer`语句执行，只是会将`panic`的信息记录下来，直到所有`defer`语句执行完毕，再和函数内部发生的`panic`一起返回到上层函数，如果上层函数没有捕获，那么该`panic`就会导致程序崩溃。**

至于为什么会发生这种情况，那当然是因为，我们要在`defer`语句中捕获`panic`，而编译器不知道哪个`defer`语句才会捕获，就只能全部执行。如果当前函数中没有注册`defer`语句，那么该函数就会直接将`panic`传播到上层。

而对于`defer`语句中发生的`panic`，如果需要捕获，那就在`defer`语句中套娃，示例如下：

```go
func mayPanic() {
	defer func() {
		fmt.Println("may Panic 1")
	}()
	defer func() {
        defer func(){
            if err:=recover();err!=nil{
                fmt.Println(err)
            }
        }()
        panic("I'll panic!")
	}()
	defer func() {
		fmt.Println("may Panic 2")
	}()
	panic("It's problem")
    defer func(){
        fmt.Println("may Panic 3")
    }()
}
```

关于`panic`的内容暂且就这么多，接下来看看关于`error`的内容，这一部分我们主要了解，除了：

```go
if err!=nil{
    return nil,err
}
```

之外的处理方式，比如自定义错误，前面我们说了，在Go语言中，只要一个类型实现了`error`接口，那么该类型就可以当做一个错误使用，比如：

```go
type MyError struct{
    name string
    age int
}

func (m *MyError) Error() string {
	return m.name + string(m.age)
}
```

这样我们就自定义了一个错误， 当我们需要使用的时候，就可以将这个类型，当做一个错误来进行处理。
