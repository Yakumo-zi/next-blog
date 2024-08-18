---
title: Dart概览
published: 2023-09-30
description: "Dart 语言概览"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# Dart概览

Dart是一种针对客户端优化的语言，用于在任何平台上开发高性能的应用程序。它设计的初衷就是考虑客户端的开发，并且对开发效率（**热重载**）和跨平台（**一份代码可以编译成多个平台的应用程序，web，桌面，移动端，一次编写，多处运行**）提供了更高优先级的支持。

Dart也是流行客户端框架**Flutter**的基础，为Flutter提供运行时支持，也为开发人员提供了很多开发工具，比如格式化代码、代码分析、代码测试等。

关于Dart语言本身，它是一门强类型的语言，但是Dart提供了类型推断，可以让我们在编写声明变量的时候不用显示指定每个变量的类型。并且Dart具有内置的`null safety`，可以让我们的Dart代码在运行时免受`null`的折磨，在`edit time`和`compile time`的时候，Dart就会检测出对`null`的引用。

Dart也拥有丰富的标准库支持，提供了日常开发所必须的各种库。

+ 集合类型
+ 不同数据间的编码转换
+ 常用的数学函数、常亮支持
+ I/O支持：包括文件、http、以及其它I/O
+ 异步运行时、ffi、并发编程、模板解析、加密解密……

# Dart安装

1. 去[Dart](https://dart.dev/get-dart)官网下载安装
2. 使用系统的包管理器下载
   1. `Arch Linux`：`sudo pacman -S dart`
   2. `Ubuntu`：`sudo apt install dart`
   3. `Windows`：`scoop install dart`

# Dart特性概览

在接下来的部分，我会笼统的介绍一下Dart语言中的主要部分，包括变量、控制流、函数、注释、包、继承等等，不过只是笼统的介绍一下这些语法长什么样，基本的使用是怎么使用的，不会细致的介绍每一部分的所有机制，我会在后续的文章中对这篇文章中介绍的每一部分进行细致的介绍。

## Hello,Dart

每个app都需要一个**top-level**的`main`函数，因为应用会从这里开始执行，这个main函数不需要显示的返回一个值，它的返回类型是`void`，下面这段代码会在控制台打印`Hello,Dart!`。

```dart
void main() {
  print("Hello,Dart!");
}
```

> 创建一个后缀名为`.dart`的文件，将该代码复制到该文件中，使用`dart run filename.dart`即可运行该代码。

![image-20230930141818626](/Dart%E4%BB%8B%E7%BB%8D.assets/8343a144dacb89fe786817fe38f25dc1.png)

## 变量(Variable)

在Dart中变量是类型安全的，但是你也不需要为所有变量声明类型，而是使用`var`关键字声明变量，让Dart自己来推断这些变量的类型。这些变量的类型，由你给它的初始值决定。

下面这段代码演示了，Dart类型推断的作用。这样的类型推断的机制，减轻了我们编写程序的负担，但是我们也需要明确，我们给Dart用于类型推断的值是什么类型的，这样才能写出健壮的代码。

```dart
void main(List<String> args) {
  var name = "Devil";
  var year = 2002;
  var doubleNumber = 1.9;
  var flyOjbect = {'Hello', "Dart", 'Devil', "Study"};
  var maps = {
    "url": "http://www.url.com",
    'tags': 'Love leanning',
  };
  print(name.runtimeType);
  print(year.runtimeType);
  print(doubleNumber.runtimeType);
  print(flyOjbect.runtimeType);
  print(maps.runtimeType);
}
```

![image-20230930142936530](/Dart%E4%BB%8B%E7%BB%8D.assets/bf3ae0669b9606526f3acf25f34749bb.png)

> dart中所有的类型都是一个对象，而dart中的对象基本都是继承自 `object` （为什么说基本，后面会解释），并且dart支持反射，所以可以很容易的获取到对象的元信息，所以可以通过`object`提供的`runtimeType`属性，来获取到当前对象的类型。

## 控制流(Control flow)

Dart中的控制流和其他语言中的基本也是一致的，没有什么差别，至于示例代码中用到的一些奇怪语法比如`final`会在后续进行讲解的，如果好奇也可以自己去官网看看。

```dart
void main(List<String> args) {
  var year = 2002;
  var flyOjbect = {'Hello', "Dart", 'Devil', "Study"};
  if (year <= 2003) {
    print("哈哈，二十多岁老男人！");
  } else {
    print("哟，还是个小辣椒呢！");
  }
  for (final obj in flyOjbect) {
    print(obj);
  }
  for (var month = 1; month <= 12; month++) {
    print(month);
  }
  while (year < 2077) {
    year += 1;
  }
  print("欢迎来到赛博朋克${year}!");
}

```

![image-20230930144642598](/Dart%E4%BB%8B%E7%BB%8D.assets/de885c77ffeed1ce0f49d2183a742c63.png)

## 函数(Function)

在Dart中，函数可以在不同的地方以多种形式定义，现在主要介绍以下两种定义方式，类C的函数定义以及与JavaScript基本相同的箭头函数定义。

类C的函数定义语法格式为：

```
return_type function_name(argument_type1 argument1,[argument_type2 argument2...]){

}
```

箭头函数定义：

```
var arrow_function=(str)=>{handle str}
```

箭头函数在处理可迭代对象时非常有用，因为在Dart中，函数是“**一等公民**“，一等公民的意思也就是说，函数可以被当做变量使用，可以当做参数传入给其他函数使用，也可以实现高阶函数、匿名函数等等常用的效果。

```dart
void main(List<String> args) {
  print(fib(20));
  var flyOjbect = {'Hello', "Dart", 'Devil', "Study"};
  flyOjbect.where((element) => element.contains('Study')).forEach(print);
}

int fib(int n) {
  if (n == 1 || n == 0) return n;
  return fib(n - 1) + fib(n - 2);
}

```

在这个例子中，`fib`就是类c的函数定义，而`flyObect.where()`的参数则是一个匿名的箭头函数。

![image-20230930145710827](/Dart%E4%BB%8B%E7%BB%8D.assets/8a98cf6a3947d74d3bb79fb85c624270.png)

## 注释(Comment)

注释在编程中可是必不可少的，如果你在维护别人代码的时候，看见大段大段的代码，而没有写注释，你可能有种想砍死他的心情。所以在Dart中提供了三种注释，单行注释，文档注释，以及多行注释。

```dart
// 这种就是单行注释以 '//'开头，一次只能注释一行

/* 多行注释 */

/// 这种就是文档注释 以'///'，用途很广泛，经常用于库，类，类成员等注释，该类型的注释可以被IDE和dartdoc
/// 等工具检查到，该注释支持markdown类型的文档，你可以使用markdown语法来编写该种类型的注释
/// 可以在你审查代码，或者编写代码时给你一个拥有特殊格式或者高亮的良好提示。
```

## 类(Class)

在面向对象编程中，一个不可缺少的因素就是类或者类似的什么东西，因为使用类或者其他类似的东西，可以让用户自定义类型，可以实现面向对象的特性：继承、封装、多态，提高代码的复用率，保证数据的安全性等等。接下来用一段代码来演示Dart中的类怎样定义和使用。

```dart
void main(List<String> args) {
  //初始化两个实例custom1和custom2，一个是构造所有成员变量，一个是只构造name这个成员变量
  var custom1 = MyType("Devil", DateTime(2023, 9, 30));
  custom1.showInfo();
  var custom2 = MyType.InitialName("Devil");
  custom2.showInfo();
}

class MyType {
  //定义类成员
  String? name;
  DateTime? runTime;
  int? get runTimeYear => runTime?.year;

  //构造函数，这是Dart提供的一种语法糖，可以直接给成员函数复制
  MyType(this.name, this.runTime) {
    //在这里可以进行其他的初始化工作
  }

  //命名构造函数，只初始化指定的成员变量
  MyType.InitialName(this.name) {}

  void showInfo() {
    //字符串插值语法，前面已经讲解过了
    print("Name=${name},Runtime=${runTime},RuntimeYear=${runTimeYear}");
  }
}
```

> 在上面这段代码中用到了一些奇怪的语法比如`String?` 这个语法其实就是表明该变量可以为`null`，如果是`String`，就表明该变量不能为`null`，初始化时必须给一个`non-null`的值，还有一个就是` int? get runTimeYear => runTime?.year; `这个是定义属性的方法，这个段代码表示定义了一个只读属性，因为只使用了`get`进行修饰，现在只需要知道，访问`runTimeYear`这个属性时，只能读，不能写，它的结果是`runTime`中的`year`。在后续的文章中会详细介绍属性和成员变量的区别，以及怎样使用属性。有兴趣的也可以自己去查阅一下官方文档。

![image-20230930152816678](/Dart%E4%BB%8B%E7%BB%8D.assets/e5ab922429507b71f6af78eb916a5cd6.png)

## 枚举(Enum)

**枚举是预定义的一组值或者实例的方法，可以确保不存在该类型的任何其他实例**。这句话是官方文档上关于`Enum`的概括，念起来有点拗口。

但是根据官网文档更详细的解释，可以这么理解，枚举类型，在Dart中是一种特殊的类，用于表示固定数量的常量值，也就是一个**枚举类**，枚举类里面可以定义不同的**枚举值**，枚举值的个数在定义之后就是固定的了，无法通过任何途径进行枚举值的个数的更改。**并且每一个枚举类，在全局都是唯一的**，它们不能被除了枚举类的其他类嵌入，不能被当做接口或者抽象类实现，不能被继承，不能被minx混入，也不能被显示的实例化。

接下来使用一段官方文档上的代码进行演示枚举的使用：

```dart
void main(List<String> args) {
  //枚举值的实例化
  var earth = Planet.earth;
  if (earth.isGiant) {
    print("我去，地球变成巨大气态行星了？");
  } else {
    print("还好不是，不然我得起飞了！");
  }
}

enum PlanetType { terrestrial, ice, gas }

enum Planet {
  /// 按照枚举类构造函数的限制，生成不同的枚举值
  mercury(planetType: PlanetType.terrestrial, moons: 0, hasRings: false),
  venus(planetType: PlanetType.terrestrial, moons: 0, hasRings: false),
  uranus(planetType: PlanetType.ice, moons: 27, hasRings: true),
  neptune(planetType: PlanetType.ice, moons: 14, hasRings: true),
  earth(planetType: PlanetType.terrestrial, moons: 1, hasRings: false);

  /// 枚举值生成的限制
  const Planet(
      {required this.planetType, required this.moons, required this.hasRings});

  /// 枚举的成员
  final PlanetType planetType;
  final int moons;
  final bool hasRings;

  /// 枚举的属性或者方法
  bool get isGiant =>
      planetType == PlanetType.gas || planetType == PlanetType.ice;
}
```

> 在上面这段代码中，除了枚举的定义，又见了许多不同的语法，但是别着急，会在后面一一介绍，现在只对其进行简单的解释。
>
> 首先要明确一个概念，在上述代码中Planet是枚举类，而earth是Planet的一个枚举值。
>
> 在常量枚举生成的限制中，使用了`required` 关键字，顾名思义，就是在创建枚举值的时候，必须初始化枚举类中的某个变量。
>
> `const`和`final`，效果都是生成一个常量类型，表明初始化后无法更改，final修饰的变量，只能被设置一次值，也就是只能初始化。而const修饰的变量，会生成一个编译期常量。具体的区别会在后续的文章中详细解释。

![image-20230930161031023](/Dart%E4%BB%8B%E7%BB%8D.assets/e0b0e60fbef8242cac05aceaf7fea171.png)

## 继承(Inheritance)、混入(Mixins)

继承的主要作用是，为了复用代码，子类可以拥有父类的成员和特性，不用自己再额外编写一遍重复的代码， 由于多继承会带来菱形继承，代码二义性等等问题，所以Dart只提供了单继承，实例如下：

```dart
void main(List<String> args) {
  var child = Derive("Devil", 21, DateTime(2002, 9, 30));
  child.showInfo();
}

class Base {
  String? name;
  int? age;
  Base(this.name, this.age) {}
  void showInfo() {
    print("Name=${name},Age=${age}");
  }
}

// 使用 extends 继承父类
class Derive extends Base {
  DateTime? birthday;
  Derive(super.name, super.age, this.birthday) {}
  void showInfo() {
    super.showInfo();
    print("Birthday=${birthday}");
  }
}
```

![image-20230930162306660](/Dart%E4%BB%8B%E7%BB%8D.assets/4e028406e442f52a41e5516066202353.png)

虽然Dart只支持单继承，但是可以通过混入(mixins)的方式，来实现对多个已定义好的代码的复用，使用`mixin`关键字来定义mixin类，mixin不能拥有`extends`子句，意思就是不能继承其他类型，并且不需要声明任何构造函数，只需要给类中的所有成员变量给初值就好，mixin类可以被其他类使用`with`关键字混入，实例如下：

```dart
void main(List<String> args) {
  var child = Derive("Devil", 21, DateTime(2002, 9, 30));
  child.showAttackValue();
  child.showDefendValue();
}

class Base {
  String? name;
  int? age;
  Base(this.name, this.age) {}
  void showInfo() {
    print("Name=${name},Age=${age}");
  }
}

class Derive extends Base with Attack, Defend {
  DateTime? birthday;
  Derive(super.name, super.age, this.birthday) {}
  void showInfo() {
    super.showInfo();
    print("Birthday=${birthday}");
  }
}

mixin Attack {
  int attackValue = 100;
  void showAttackValue() {
    print("我的战斗力还在上涨！当前战斗力为${attackValue}！");
    attackValue++;
  }
}

mixin Defend {
  int defendValue = 100;
  void showDefendValue() {
    print("我的防御力还在上涨！当前防御力为${defendValue}！");
    defendValue++;
  }
}
```

![image-20230930163426286](/Dart%E4%BB%8B%E7%BB%8D.assets/9bdc87045cc4496f646816792c408ae0.png)

## 接口和抽象类(Interface and abstract)

### 接口

在Dart中，**所有的类(class)都隐式的定义了一个包含当前类所有成员实例以及所有该类实现的接口的接口。**意思就是，Dart中**所有类**都隐式定义了一个接口，该接口包含了该**类所有成员实例**，以及包含了该类实现的所有接口。所以在Dart中你不仅可以使用`implements`实现一个接口，也可以实现一个类，因为所有类都定义了一个接口。在Dart中也可以使用关键字`interface class` 定义一个单独的接口，实例如下：

```dart
void main(List<String> args) {
  var child = Child();
  var adult = Adult();
  child.name = "Yakumo";
  child.Drink("warter");
  child.Hi("Devil");
  adult.name = "Devil";
  adult.Drink("wine");
}

interface class SayHi {
  void Hi(String who) {
    print("${who},Hi!");
  }
}

class Adult {
  String? name;
  void Drink(String something) {
    print("Adult ${name} drink ${something}");
  }
}

class Child implements Adult, SayHi {
  @override
  void Hi(String who) {
    print("Child say hi to ${who}");
  }

  @override
  void Drink(String something) {
    print("Child ${name} drink ${something}");
  }

  @override
  String? name;
}
```

![image-20230930165618497](/Dart%E4%BB%8B%E7%BB%8D.assets/74cee5db9e4185b5dd10f14c1dd4177d.png)

### 抽象类

在Dart中可以创建一个由具体类扩展或者实现的抽象类，抽象类可以包含抽象方法（空方法）。可以通过`extends`或者`implements`来实现该抽象类。抽象类的定义方式如下：

```dart
abstract class Describable {
  void describe();

  void describeWithEmphasis() {
    print('=========');
    describe();
    print('=========');
  }
}
```

## 异步(Async)

异步的工作机制比较复杂，在这里简单介绍一下异步的使用方式。主要是使用两个关键字`async`和`await`。

```dart
const oneSecond = Duration(seconds: 1);

// 定义一个异步函数，异步函数的返回值需要使用一个Future类型进行包裹，并且需要带上 async 关键字的后缀
Future<void> printWithDelay(String message) async {
  await Future.delayed(oneSecond);
  print(message);
}

// 使用方法如下，注意在main函数中要使用await等待一个异步函数，也需要给main函数加上一个 async后缀 
void main(List<String> args) async {
  await printWithDelay(Duration.zero, "Hello,Async function!");
}
```

上述代码等价于：

```dart
Future<void> printWithDelay(String message) {
  return Future.delayed(oneSecond).then((_) {
    print(message);
  });
}
```

获取一个异步函数的返回值：

```dart
void main(List<String> args) async {
  //让异步函数先执行，后续才获取返回值，先拿到一个future
  var future = printWithDelay(Duration(seconds: 1), "Hello,My async function!");
  await Future.delayed(Duration(seconds: 2));
  print("Do something ...");
  //如果到这里异步函数执行完成，那么会直接拿到返回值，否则会阻塞到该函数执行完成之后
  var ans = await future;
  print("Async function result = ${ans}");
}

Future<int> printWithDelay(Duration duration, String? message) async {
  await Future.delayed(duration);
  print(message);
  return 1;
}

```

如果有熟悉JavaScript的朋友肯定不陌生，以上的用法和JavaScript中的用法基本一致，但是还是有些不同。

## 异常(Exceptions)

这里简单介绍一下怎样抛出异常和怎样捕获异常，在Dart中，抛出异常使用关键字`throw`，而捕获异常使用`try catch`和其他语言的异常捕获没有什么不同。具体语法如下：

```dart
//抛出异常
void throwException(int astronauts){
   if (astronauts == 0) {
  		throw StateError('No astronauts.');
	}
}
//捕获异常
Future<void> describeFlybyObjects(List<String> flybyObjects) async {
  try {
    for (final object in flybyObjects) {
      var description = await File('$object.txt').readAsString();
      print(description);
    }
  } on IOException catch (e) {
    print('Could not describe object: $e');
  } finally {
    flybyObjects.clear();
  }
}
```

在Dart中，可以使用`on`子句指定要捕获的异常的类型，并且可以使用多条`catch`语句捕获不同类型的异常，以下是官方文档中的例子。

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```

## 重要概念

通过上述部分的概览，你应该对Dart有一个初步的印象了，这时我们可以来看一下**官方文档中的所给的重要概念**，理解这些概念可以帮助我们更好的学习和使用dart。

+ 在Dart中，可以放入变量中的任何内容，都是一个对象，每个对象都是类的实例，数字、函数、字符串，甚至连null都不例外，都是对象。所有对象都继承自Object类，除了开启了`null safety`的null对象（这就是比我在前面为什么说基本都是继承自`Object`，这还有个例外呢）。
+ 虽然Dart是一个强类型语言，但是大多数情况下我们可以依靠Dart提供的类型推断，而不需要自己显示的写明变量的类型。
+ 如果你开启了`null safety`，那么所有变量**默认不能包含`null`**，除非你显示的指明该变量可以为` null`。可以使用`type?`，语法来指明一个变量是否可以为`null`，在前面我们已经使用过该语法了。
+ 如果你想显示的指明一个变量可以接受任何类型，你可以使用`Object?`、`Object`类型来定义变量，或者你需要在运行时进行类型检查，那么可以使用`dynamic`关键字（这个关键字前面没有涉及到，后续会讲）。
+ Dart支持泛型，在前面使用异步的时候我们就见过了泛型语法，例如：`Future<int>,List<String>`，都是泛型的使用，但是当时没有讲。
+ Dart也支持`top-level`的函数和变量，`top-level`可以简单的理解为全局作用域。
+ Dart中的函数是一等公民，可以在函数内创建嵌套函数或者本地函数，可以讲函数作为一个变量使用。
+ Dart中使用下划线控制访问权限，使用下划线修饰的标识符，仅在当前library中可见，即使没有使用 library 指令创建一个库，**Dart中的每一个文件就是一个library**。
+ Dart中既有表达式(expressions)也有语句(statements)，这两者的区别就是，表达式的结果是一个值，而语句的结果是没有值的，并且一个语句可以包含多个表达式，但是一个表达式不能直接包含一个语句。
+ Dart工具的报错只有两种问题，warnings和errors，warnings只是表明代码可能无法工作，但是不会让程序挂掉，而errors可能是编译时错误，也有可能是运行时错误，编译时错误会导致编译失败，运行时错误会导致程序执行时崩溃，引发异常。

**作者水平有限，以上内容可能有解释不当，或者解释有误，请及时指正，作者看到会第一时间修改。**

本篇文章参考的是[Dart的官方文档](https://dart.dev/language)，朋友们可自己查看官方文档进行学习，或者对作者进行指正，欢迎大家多多交流。