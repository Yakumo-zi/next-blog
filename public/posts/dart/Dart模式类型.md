---
title: Dart模式类型
published: 2023-10-11
description: "Dart 模式类型"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

在前面的一篇文章中，我们学习了如何使用Dart中的模式进行模式匹配，解构，还学习了switch表达式和switch语句，但是我们只是用了一些模式，没有详细的介绍每种模式，本篇就是对前面的补充，在本篇会详细介绍前面所用的模式。

# 模式的分类

## 逻辑模式

逻辑模式，分为逻辑或模式，逻辑与模式，我们首先来看看逻辑或模式：

```dart
var isPrimary = switch (color) {
  Color.red || Color.yellow || Color.blue => true,
  _ => false
};
```

通过这段代码我们可以知道，所谓的逻辑或模式，其实就是有多个模式，**只要其中任意一个模式匹配成功**，就算匹配成功，与之相对的是逻辑与模式：

```dart
switch ((1, 2)) {
  case (var a, var b) && (var c, var d): // ...
}
```

和逻辑或模式不同的就是，逻辑与模式的所有模式都需要匹配成功，那么整个模式才算成功，并且在逻辑与中，我们不能在其不同的子模式中声明相同名字的变量，否则会报错，因为**逻辑与中声明的变量都属于同一个作用域**，相当于你在同一个作用域内声明两个相同名称的变量，就比如下面这段代码：

```dart
switch ((1, 2)) {
  case (var a, var b) && (var b, var c): // ...
}
```

这段代码就会报错。

## 关系模式

关系模式，也可以叫做比较模式，主要就是用来进行比较的，具体用法如下：

```dart
String asciiCharType(int char) {
  const space = 32;
  const zero = 48;
  const nine = 57;

  return switch (char) {
    < space => 'control',
    == space => 'space',
    > space && < zero => 'punctuation',
    >= zero && <= nine => 'digit',
    _ => ''
  };
}
```

从这段代码中可以看到，关系模式其实就是我们平常的比较运算，只要传入的对象在经过比较运算之后返回true那么就算匹配成功。并且我们可以看到，在Dart中多种模式是可以混用的，这里就混用了比较模式和逻辑与模式。

## 类型转换模式

类型转换模式，顾名思义就是用来进行类型转换的，这种模式允许你在解构的过程中进行类型转换，然后将值传递给模式中的一个子模式，说起来可能有点难理解，但是用起来很简单，代码如下：

```dart
(num, Object) record = (1, 's');
var (i as int, s as String) = record;
```

要注意的是，在类型转换模式下，如果类型转换失败了，那么会抛出一个异常。

## Null-check模式

该模式可以匹配一个空值的情况下匹配失败而不是抛出异常，因为该模式会对传入的值进行`null check`，该模式的主要用途就是在我们传入的值可能为空时，就可以使用该模式，并且该模式匹配成功后并不会为空，而是返回一个`non-nullable`的值，具体用法如下：

```dart
String? maybeString = 'nullable with base type String';
switch (maybeString) {
  // 如果maybeString为空，那么会匹配失败，而不是将空值匹配给s
  case var s?:
}
```

## Null-assert模式

这个与`Null-check`模式正好相反，`Null-check`模式在匹配空值的时候会被视为匹配失败，而不是抛出异常，而是用该模式的时候，如果匹配的是一个空值，那么就会抛出异常，用法与`Null-check`模式一致，示例如下：

```dart
List<String?> row = ['user', null];
switch (row) {
  // 在匹配 name! 时会抛出异常
  case ['user', var name!]:
}
```

## 常量模式

这个模式在前面已经详细介绍过了，在这里就只介绍一下特殊的用法，就是在使用常量模式匹配map和lsit的字面量时，需要在模式前面加上 const，示例如下：

```dart
case const [a, b]: 
```

## 括号模式

就是可以使用括号来更改模式间的优先级的模式，用法也特别简单，示例如下：

```dart
x || y && z => 'matches true',
(x || y) && z => 'matches false',
```

## Rest 模式

这个语法在JavaScript中非常常用，Dart也支持这种语法，具体的语法格式如下：

```dart
var [a, b, ...rest, c, d] = [1, 2, 3, 4, 5, 6, 7];
// Prints "1 2 [3, 4, 5] 6 7".
print('$a $b $rest $c $d');
```

## 弃元模式（Wildcard Pattern）

就是在匹配的时候丢弃掉其中的某些值，这种模式称为Wildcard 模式，而弃元模式这个名称是作者从C#里偷来的，所以并不准确，具体用法如下：

```dart
var list = [1, 2, 3];
var [_, two, _] = list; // 在这里丢弃掉了第一个和最后一个元素
```

## 对象模式

这个模式主要用在解构一个对象的情况上，我们可以直接将对象中公开的值绑定到临时变量上，在上一篇文章中也使用过，具体语法如下：

```dart
switch (shape) {
  case Rect(width: var w, height: var h): 
}
```

如果对象内的变量名和解构之后要赋值的变量名相似的话，那么可以使用语法糖，语法格式如下：

```dart
var Point(:x, :y) = Point(1, 2);
```

# 总结

本篇内容不多，主要是对上篇文章的补充，介绍了一些关于Dart中模式的分类，以及一些上篇文章中没有讲解的模式，不过由于作者水平有限，并没有写的十分深入，文章中也可能存在错误还请见谅。