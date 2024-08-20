---
title: Dart_Metadata 
published: 2023-10-02
description: "Dart Metadata相关信息介绍"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

本篇要介绍的一个概念是`metadata`也可以叫做元信息，在前面的几篇文章中，并没有提及这个概念。不过对于其他语言的学习者来说`metadata`这个概念应该还是了解的。但是在Dart中这个更像是Java的注解。

# Metadata

Dart官方文档中，对`metadata`是这样定义的：

> Use metadata to give additional information about your code. A metadata annotation begins with the character `@`, followed by either a reference to a compile-time constant (such as `deprecated`) or a call to a constant constructor.

这段话告诉我们，元编程其实就是在我们代码中提供更多附加信息的一种手段，一个元信息注解以`@`开头，后面需要跟一个编译时常量的引用或者一个常量的构造函数调用。

Dart官方提供了四个注解，在所有的Dart代码中都能使用，这四个注解分别是：`@Deprecated`,`@deprecated`,`@override`,`@pragma`，其中的`@override`在前面的文章中已经使用过了，就是用来表示一个重写的标识符，而`@Deprecated`和`@deprecated`的作用基本一致，只是使用`@deprecated`时不需要提供提示消息，使用`@Deprecated`则需要显示的指定一个提示消息。

注解的使用是非常方便，并且简单的，示例如下：

```dart
class Television {
  @Deprecated('Use turnOn instead')
  void activate() {
    turnOn();
  }
  void turnOn() {...}
}
```

# 实现自己的注解

Dart中实现一个自己的注解还是很方便的，只需要定义一个拥有常量构造函数的类即可。示例如下：

```dart
class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}
@Todo('Dash', 'Implement this function')
void doSomething() {
  print('Do something');
}
```

但是这只是定义一个注解，我们没有办法通过注解拿到被该注解修饰的数据，Dart也没有提供直接获取被修饰数据的手段，所以要通过一些其他的手段来获取，比如遍历AST，或者使用反射。能获取到被修饰的信息，注解才能发挥真正的威力，就如同JAVA中的那样，需要一些框架的支持，才能让注解变得强大。

**作者水平有限，以上内容可能有解释不当，或者解释有误，请及时指正，作者看到会第一时间修改。**