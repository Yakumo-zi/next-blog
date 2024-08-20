---
title: Dart函数
published: 2023-10-11
description: "Dart 函数使用"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

对于函数我们肯定不陌生，在前面的文章里也经常使用，但是还没有系统性的介绍关于Dart中的函数，那么本篇我们就来系统性的学习关于函数的知识。

# 再谈函数

由于Dart是一个纯面向对象的语言，所以在Dart中函数也是对象，并且它具有一个`Function`类型。这就意味着函数可以作为变量或者作为函数参数传递给其他函数。这也就是我们前面所说的关于函数是“一等公民”的意思。通过这个特性，我们可以在Dart中实现很多函数式编程的技巧和一些方便的用法。比如`map`,`foreach`,`where`等，这些都是应为Dart中的函数是一等公民才得以使用的。

## 一般函数定义的方式

由于Dart的类型推断特别给力，所以我们在定义函数的时候可以衍生出不同的定义方式，类C语言的定义，动态语言的定义，箭头函数定义等等，具体示例如下：

类C语言定义：

```dart
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

类似动态语言的定义：

```dart
isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

箭头函数定义：

```dart
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

注意：箭头函数的函数体中只能有一个表达式，不能出现语句和分号，也不能出现if语句，但是可以使用三元表达式来进行条件判断（不推荐）

## 函数参数

### 位置参数

Dart中的位置参数，就是我们在C语言或者其他语言中所定义参数，但是有一点不同的是，Dart的位置参数之后是可以跟可选位置参数和命名参数的。

```dart
String say(String from, String msg) {
  var result = '$from says $msg';
  return result;
}
```

其中from和msg就是位置参数

### 命名参数

Dart中的命名参数，就是你在给函数传递参数时，可以通过指定名称，来指定要传递给那个参数，命名参数的声明是通过`{}`括起来的，花括号中间的就是命名参数。

```dart
void enableFlags({bool? bold, bool? hidden}) {...}
```

这个函数定义中，`bold`和`hidden`就是两个命名参数，我们在使用这个函数的时候可以这样使用

```dart
enableFlags(bold:true,hidden:false);
```

如果有读者仔细看了作者前面的文章，应该能发现，这里的命名参数的类型是一个`nullable`的类型，所以是可空的，也就是不传递参数给该函数时，该函数得到两个`null`。

![image-20231014105836648](/Dart%E5%87%BD%E6%95%B0.assets/1927dc0c751a250e20431348358df4d0.png)

那么我们希望得到一个不为`null`的值呢？有同学可能想到，我们去掉`?`这个可空标记不就行了吗。我们来试试看：

![image-20231014105908756](/Dart%E5%87%BD%E6%95%B0.assets/260fa684c12d68f5d5ce5c915517c3fa.png)

我们可以看到，当我们去掉可空标记`?`的时候，编辑器直接给我们报错了，告诉我们这两个值是可能隐式为`null`的，因为我们不能确保用户一定会传递参数。这时我们就可以引出一个新的关键字，那就是`required`，这个关键字的意思，顾名思义，就是需要，用在函数命名参数中，就是我需要一个参数，你必须传！具体用法如下：

```dart
void enableFlags({required bool bold, required bool hidden}) {
  
}
```

![image-20231014110232855](/Dart%E5%87%BD%E6%95%B0.assets/c438d6e75596055ef87e3b3c76eb04f2.png)

我们可以看到，当我们加上`required`关键字之后，编辑器就不报错了，但是这时候我们使用该函数的时候必须传递两个参数，否则编译是不通过的，我们来看一下例子：

![image-20231014110334231](/Dart%E5%87%BD%E6%95%B0.assets/0b7959a948773f9c909cbeda05043233.png)

编辑器告诉我们，这里有个必须要传递的参数你没有传，这么搞是不正确的！

关于命名参数的具体内容就这些，我们可以来总结一下：

1. 命名参数是一对由`{}`括起来的参数
2. 如果我们希望用户必须传递某个参数，那么可以在该命名参数的类型前面加上`required`关键字
3. 如果没有加上`required`关键字，那么该参数的类型必须是一个`nullable`的类型，否则会报错

最后要注意的一点是：`non-nullable`类型的参数必须是由`required`修饰的，但是由`required`修饰的参数不一定是`non-nullable`的，给个例子如下：

```dart
const Scrollbar({super.key, required Widget? child});
```

所以`required`的功能是保证用户一定会传递某个参数，而不保证参数是否是`nullable`的，这一点可以由我们自己来控制。

### 可选位置参数

在Dart中还有另一类函数参数，就是可选位置参数，它不像命名参数具有名字，也不像位置参数必须传递，但它有位置又是可选的，我们可以在函数参数中使用`[]`来声明可选位置参数，具体示例如下：

```dart
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

它的使用注意事项如下：

1. 当你不确定是否要传递某个参数的时候，那么可以使用可选位置参数，因为是可选的那么这个参数传递或者不传递都没有关系，你可以自己在函数内部去校验是否传递
2. 如果你没有给可选位置参数一个默认值，那么位置参数的类型必须为`nullable`类型

```dart
// 给可选位置参数赋予默认值的语法
String say(String from, String msg, [String device = 'carrier pigeon']) {
  var result = '$from says $msg with a $device';
  return result;
}
```

## 函数一等公民特性的具体应用

由于Dart中的函数是`first-class`的，所以我们可以像如下这样使用：

```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

list.forEach(printElement);
```

这个例子会打印list中所有的所有元素，因为list的`foreach`方法接收一个函数，该函数具有一个参数，这个参数的类型就是List中元素的类型，并且`foreach`是个终结方法。

有读者可能会问，什么是终结方法呢，我们先来看一下list提供的其他函数，再来聊这个话题，在list中，还提供了一系列方法，包括`where`,`map`,`take`等等，其中有一部分的返回值为`Iterable<T>`，返回值为这类的方法称作非终结方法，而无返回值，或者返回值为一个具体类型的方法称之为终结方法。因为非终结方法返回的是一个`Iterable<T>`，它是惰性的，在终结方法被调用之前，所有非终结方法的调用都是没有效果的，具体实例如下：

![image-20231014132503899](/Dart%E5%87%BD%E6%95%B0.assets/0f801aaeebee7675d0288b6e6568353b.png)

我们可以看到，虽然返回了一个迭代器，但是迭代器是不能直接被赋值给一个list的，这时候我们需要一个终结方法`toList`来将迭代器转换为一个list，这样我们对list的操作才算生效了。

![image-20231014132650285](/Dart%E5%87%BD%E6%95%B0.assets/767c4e2526089bdc3b08a80b23ff7cf5.png)

这样我们就得到了我们操作的结果，**所以终结方法，就是终结非终结方法的，可以将一个`Itearble<T>`终结为一个具体类型。**

我们再来看几个例子可以更深入的理解终结方法和非终结方法，以及函数的一等公民特性给我们带来的好处。

假设我们现在有这样一个List：

```dart
var list = [1,2,3,4,5,6,7,8,9];
```

现在的第一个问题，我要找出里面所有比5大的值，然后将所有比5大的值*2，然后拿走操作后的第一个值，并将d第一个值转换为一个`Set`。

这个问题不算复杂，我们通过遍历也可以简单的做出来：

```dart
void main(List<String> args) {
  var list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var set = Set<int>();
  for (var item in list) {
    if (item > 5) {
      item = item * 2;
      set.add(item);
      break;
    }
  }
}
```

这段代码就可以实现我们的要求，那我们再来看看使用函数式的方式，怎样完成这个需求：

```dart
void main(List<String> args) {
  var list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var set =
      list.where((element) => element > 5).map((e) => e * 2).take(1).toSet();
}

```

可以看到代码简洁很多，并且可读性提高了很多，这种写法更接近我们自然语言，就像说话一样。这里我们又使用了一个新的方法`toSet`，读者可能就发现了，`Iterable<T>`类型可以使用`toList`转换为List，也可以使用`toSet`，那他多半也可以`toMap`，我们来看看到底有没有这方法：

![image-20231014134044131](/Dart%E5%87%BD%E6%95%B0.assets/719d938fdca41d6495c921567f1d134a.png)

通过IDE的提示，我们可以看到，并没有`toMap`这种方法，主要的原因还是，List和Set他的构造是一样的，都只存放一个元素，而Map是存放的一个键值对，没有办法直接转换，但是可以通过遍历List和Set来构造一个Map。所以我们要记住，`Iterable<T>`的`toXXX`方法中，没有`toMap`，遇到这种情况的时候咱们可以自己去查看一下API，来验证自己的猜想是否正确。

我们再来看第二个例子：

我们有一个Student类型如下：

```dart
import 'dart:math';

void main(List<String> args) {
  var students = generateStudents();
  students.forEach((element) {
    element.showMe();
  });
}

List<Student> generateStudents() {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  var rand = Random();
  var studentNums = rand.nextInt(100);
  List<Student> students = List.empty(growable: true);
  for (int i = 0; i < studentNums; i++) {
    var studentNameCount = rand.nextInt(15) + 5;
    var student = Student();
    student.id = i;
    student.name = '';
    for (var j = 0; j < studentNameCount; j++) {
      var tmp = rand.nextInt(26);
      student.name = student.name + chars[tmp];
    }
    student.age = rand.nextInt(20);
    student.score = rand.nextInt(100);
    students.add(student);
  }
  return students;
}

class Student {
  late int id;
  late String name;
  late int age;
  late int score;
  void showMe() {
    print("Id:$id---Name:[$name]---Age:$age---Score:$score");
  }
}
```

以上代码可以帮助我们随机生成数量为100以内的学生，我们接下里有几个需求

1.找出名字中含有a并且年龄大于15的成绩最好的学生，我们使用函数式的方法，可以这么做

```dart
void main(List<String> args) {
  var students = generateStudents();
  students.sort((sa, sb) => sb.score.compareTo(sa.score));
  students
      .where((element) => element.name.contains('a'))
      .where((element) => element.age > 15)
      .take(1)
      .forEach((element) {
    element.showMe();
  });
}
```

![image-20231014141543697](/Dart%E5%87%BD%E6%95%B0.assets/baf40ccec19f1d61ac587fca1147beae.png)

2.找出年龄大于10、成绩大于60、名字中不含b、名字长度大于7的学生

```dart
void main(List<String> args) {
  var students = generateStudents();
  students
      .where((element) => element.age > 10)
      .where((element) => element.score > 60)
      .where((element) => !element.name.contains('b'))
      .where((element) => element.name.length > 7)
      .forEach((element) {
    element.showMe();
  });
}
```

![image-20231014141904100](/Dart%E5%87%BD%E6%95%B0.assets/54722abc58e9f530b36b34b566a9fb67.png)

这些需求通过迭代来做并不难，但是通过这种函数式的方式，充分利用函数在Dart中是一等公民的特性，可以让我们写代码更加轻松，代码的可读性更高，一眼就能看出我们在做什么，所以这种函数式的方式，是需要我们掌握的。

## 闭包

本篇将函数的大部分应用都讲的差不多了，最后以一个闭包的方式来收尾，闭包在许多编程语言中都不罕见，甚至可以说是非常常见，它提供给我们一个可以捕获外部变量到函数内部保存的机制，让我们编写函数更加灵活，但是要用好闭包是需要大量的实践的，作者只能简单介绍一下闭包是怎么使用的，剩下关于闭包的学习，只能通过在项目中使用闭包去解决一些实际问题，这里我们套用一个官方的例子来了解一下闭包：

```dart
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);

```

在上面的例子中，makeAdder返回一个函数，该函数捕获了makeAdder的参数，这样我们在调用makeAdder返回的函数时，这个参数都会生效，因为他已经被闭包捕获到函数中了。

在上述`add2(3)`中，其实内部是`3+2`，这个2就是在使用makeAdder生成add2时被捕获到函数内部的。

# 总结

本篇介绍了Dart中大部分函数的使用方式，还有一些用的比较少的例如生成器函数，作者就不在这里细说了，这个主要是用于在异步环境下构建Stream和在同步环境中构建Iterable，用起来还是比较简单，大家去看一下示例就会用了。**本篇内容由于作者水平有限，所以在文章中难免会出现错误，如有错误请大家及时指正，作者会及时修改，以免误导他人。**