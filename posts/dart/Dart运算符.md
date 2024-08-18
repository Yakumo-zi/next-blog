---
title: Dart运算符
published: 2023-10-02
description: "Dart 基础运算符使用"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

上一篇介绍了关于变量的一些细节，这一篇来介绍一下关于操作符的一些东西，运算符这个东西，每个编程语言都有，但是每个编程语言都有自己特色的东西，那些所有编程语言都有的运算符就不在这里细讲了，本篇只介绍dart中有特色的运算符。

# 运算符

在dart官网上，有这么一张表，上面详细说明了dart所支持的所有运算符。

![image-20230930214724679](/Dart%E8%BF%90%E7%AE%97%E7%AC%A6.assets/1ca9946fe3fba0a91e4ec60151c2e2d5.png)

Dart所支持的这些运算符是按照优先级从高到低排列的（**同一行左边的优先级比右边的高，同一列上面的优先级比下面的高**），并且大部分都是所有编程语言通用的运算符，大家应该也都看的明白，所以就不在赘述了。顺便一提，在Dart中运算符是可以在类中重载的。

**注意：**

在Dart中，对于拥有两个操作数的运算符，最左边的操作数决定使用那种方法。例如：如果有一个Vector对象和一个Point对象，则aVector+aPoint使用的是Vector所重载的加法。

## Dart的Type test 运算符：`as`,`is`,`is!`

`as`,`is`,`is!`，这三个运算符可以方便的在运行时检查类型，来看一下官方给出的定义，以及这三个运算符的作用。

![image-20231001092645894](/Dart%E8%BF%90%E7%AE%97%E7%AC%A6.assets/285e947935679ce53c4216c438f8ffd7.png)

 根据官方的定义可以简单的了解到，`as`是用于类型转换的，`is`适用于判断当前的对象是不是某个类型的，如果是就返回`true`，`is!`则与`is`的作用恰恰相反，如果当前对象不是某个类型，则返回`true`。下面是一些示例：

```dart
void main(List<String> args) {
  Object? devil = Devil.setSalary("devil", 21, 3000);
  (devil as Person).showMeInfo();
  if (devil is Employee) {
    print("${devil.name} is a employee 555555");
  } else {
    print("${devil.name} is a boss !!!!!");
  }
  Object? str = "Hello";
  (str as Devil).showMeSalary();
}

class Person {
  String? name;
  int? age;
  Person(this.name, this.age) {}
  void showMeInfo() {
    print("Name = ${name},Age = ${age}");
  }
}

class Employee {
  double? salary;
  void showMeSalary() {}
}

class Devil extends Person implements Employee {
  String? id;
  Devil(super.name, super.age, this.id) {}
  Devil.setSalary(super.name, super.age, this.salary) {}
  @override
  double? salary;

  @override
  void showMeSalary() {
    print("Salary = ${salary}");
  }
}
```

![image-20231001094345724](/Dart%E8%BF%90%E7%AE%97%E7%AC%A6.assets/197a2654c464cce1b6263ed418c45933.png)

**注意：**

使用`as`运算符要注意的一点是，你必须要明确的知道，你现在的类型和你要转化的类型的关系。如果你要把一个类型转换为另一个不相干的类型，那么肯定是错误的。

使用`is`和`is!`要注意的是，在前面的文章中提到过，每个类都是隐式的定义了接口，所以不关你是继承了这个类或者是实现了这个类，那么`is`的结果都是`true`，`is!`的结果都是`false`。还有就是对于这两个运算符来说，`mixin`定义的mixin类，也是可以参与到判断的，如果一个类混入了某个mixin类，那么`class is mixinClass`则返回的是`true`，`is!`则相反。

## Dart特有的赋值运算符

Dart所支持的赋值运算符如下，本节主要介绍一个特殊的赋值运算符。

![image-20231001095449181](/Dart%E8%BF%90%E7%AE%97%E7%AC%A6.assets/eda3a4750ac8ff8f82e3bfb5c8ea4c87.png)

但是在上表中并没有提到该运算符，该运算符就是：`??=`，这个运算符的意思就是，如果左操作数为空，那么给左操作数复制，否则左操作数保持原值。下面是一个示例：

```dart
void main(List<String> args) {
  //str初始不为空
  String? str = "Hello";
  print("赋值之前 ${str}");
  str ??= "World";
  print("赋值之后 ${str}");

  //test初始为空
  String? test;
  print("赋值之前 ${test}");
  test ??= "Hello,World!";
  print("赋值之后 ${test}");
}

```

![image-20231001100109775](/Dart%E8%BF%90%E7%AE%97%E7%AC%A6.assets/47992dc4069d5d27e20e32f039ecfda3.png)

## Dart特有的条件表达式

Dart中除了常见的if-else statements和三元表达式以外，还有 有一种对空值特殊处理的条件表达式 `expr1 ?? expr2`，如果`expr1`不为空，那么返回`expr1`的结果，否则计算并返回`expr2`。

```dart
String playerName(String? name) => name ?? 'Guest';
```

这个例子中，如果name为空，那么返回'Guest'，如果name不为空，则返回name的值。

## Dart特有的Cascade notation

Dart中的cascade 允许你对同一个对象，执行一系列的操作，例如：**赋值、使用实例的方法**等，它主要使用的运算符是`..`。例如，访问一系列的成员变量，并且赋值：

```dart
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;
```

如果你操作的对象可能为空，那么可以使用`?..`来作为cascade 的第一个运算部分，它会保障后面的cascade 操作不会对 `null`对象进行任何操作。以下是一个官网的例子。

```dart
querySelector('#confirm') // Get an object.
  ?..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'))
  ..scrollIntoView();
```

cascade 操作在Dart中还普遍的用于建造者模式，实例如下：

```dart
final addressBook = (AddressBookBuilder()
      ..name = 'jenny'
      ..email = 'jenny@example.com'
      ..phone = (PhoneNumberBuilder()
            ..number = '415-555-0100'
            ..label = 'home')
          .build())
    .build();
```

综上所述，这个运算符的作用其实是为了简化你创建临时变量的步骤，让你可以一次性的完成对某个实例的全部操作。

**注意：**

+ 该语法必须在（v2.12）之后才能使用。
+ 在使用cascade对函数返回值进行操作的时候，你要确定你操作的函数返回的不是一个`void`，否则会出现错误。

## Dart特有的其他运算符

在Dart的官网上，还给出了如下这些运算符：

![image-20231001102157102](/Dart%E8%BF%90%E7%AE%97%E7%AC%A6.assets/0c5336305cc12e55cbadec18afe59480.png)

# 总结

通过前面这些内容，我们可以看到，其实Dart的运算符和其他语言的并没有什么不同的，唯一不同的可能就是cascade这部分。我们也可以知道Dart对这些运算符的特殊处理，其实主要就是在对空值进行处理，保证`null-safety`。如果有朋友熟悉JS，那么这些运算符你一定能很快掌握，大部分和JS的基本一致，这里面的空值处理其实就和JS的可选链语法差不多。

**以上就是本篇文章的所有内容了，由于作者水平有限，难免在文章中出现错误，如果有朋友发现错误，请及时告知，作者会及时修改，防止误导他人。**