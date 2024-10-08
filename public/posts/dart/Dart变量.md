---
title: Dart变量
published: 2023-10-01
description: "Dart 变量相关知识"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

在前面一篇文章中，我”囫囵吞枣“的介绍了一下Dart中的一些特性，在接下来的文章中我会仔细的介绍，Dart语言中的一些细节，主要内容来源还是[官方文档]()，有兴趣的朋友也可以直接去查看官方文档，本篇主要介绍Dart变量相关的一些知识。

# 再谈变量

虽然在前面已经介绍过怎么声明和使用变量，但是关于Dart中的变量，还有很多细节没有讲，接下来我会分为四个板块来介绍变量：

1. `null safety`，这个词语我们在前面已经多次提到，本篇会详细介绍一下。
2. 默认值，看看显示指定类型，不给初始值的变量里面到底装的啥？
3. `late`关键字，懒初始化变量。
4. `final`和`const`关键字，使用这两个关键字怎么定义常量，以及他们两定义常量到底有啥区别？

首先来回顾一下上篇文章关于变量部分的内容，上篇文章我介绍了关于变量的两种定义方式，以及`nullable`类型的变量怎么定义，还是比较简单，写一段代码展示一下应该就明白了：

```dart
void main(List<String> args){
    //定义一个 non-nullable类型的变量name
    String name="Devil";
    //使用Dart的类型推断定义变量
    var age=18;
    //定义一个nullable类型的变量，出生日期都能为空啊？从石头缝里蹦出来的？
    DateTime? birthday;
}
```

回顾完后，我们接着看后面变量的内容。

## 变量引用

在官网的介绍中，有这么一句话**Variables store references**，所以我们可以知道，在Dart中，所有**变量**存储的都是引用，因为基本所有类型都是派生自`Object`，所以我们在使用Dart中的变量时，要明白这一点。但是这个引用和其他语言的引用是有一定区别的，因为在Dart中引用指的是**变量引用**，而其他语言中是指某个**类型是引用类型**。

在Dart中，引用分为可变引用和不可变引用（暂时这么称呼它，在官网没有看到相关的名词，如果有朋友知道请提醒作者更改）。给出一个示例介绍可变引用和不可变引用：

```dart
var a=["A","B"];
var b = a;
print(a); // [A,B]
print(b); // [A,B]
```

![image-20230930184009146](./Dart%E5%8F%98%E9%87%8F.assets/5b18e9768caf1fe03456c27870afa7ef-1723995080654-36.png)

以上代码，a和b都指向同一个对象，打印出来的结果都是`[A,B]`，但是一旦对其中某个变量进行修改：

```dart
var a=["A","B"];
var b = a;
a=["C"];
print(a); //[C]
print(b); //[A,B]
```

![image-20230930184038931](./Dart%E5%8F%98%E9%87%8F.assets/90eea2db0b16649ed0f5d32b0536cc12-1723995080654-37.png)

可以看到，并没有修改b的值，b还是指向原来的对象（**在大多数语言中，应该都是这样的结果，但是在JavaScript中，就不会是这种结果，JS中b的值也会跟随a的修改而修改，所以在这里拿出来说一下**），我们再看另一组代码：

```dart
var a=["A","B"];
var b = a;
a.clear();
a.add("C");
print(a); //[C]
print(b); //[C]
```

![image-20230930184310868](./Dart%E5%8F%98%E9%87%8F.assets/e90b4bf8a8db3e0d841878f73e99eeda-1723995080654-38.png)

可以看到，b的值也随着a的值的修改而修改了。

所以我们在这里可以得出一个简单的结论，在Dart中所有变量存储的都是引用，直接对变量进行赋值，其实更改的是变量引用的指向，所以就算两个变量指向同一个对象，那么其中一个变量更改引用的指向，当然不会影响到另外一个变量。但是，使用两个变量所指向的对象的方法进行修改，那么对两个变量进行访问的时候，值都会受到影响。

根据我们上面说的可变引用和不可变引用的说法，那么可变引用都会提供可以修改对象内部值的方法，使用该方法对对象进行修改，才能起到作用，比如：`List`,`Map`,`Set`等等，都提供了修改内部值的方法，那么指向这些类型的引用就是可变引用，而不可变引用则不提供修改对象的方法，比如：`String`，`bool`，`int`等等，这些没有提供修改方法的就是不可变引用，只能使用赋值来改变引用的指向。

> Dart使用这种巧妙的方法，统一了变量的类型，都是引用类型，不分什么值类型。并且也限制了对基础类型，如`Stirng`,`bool`等的更改。

**注意：**

在Dart中，如果要更改某个变量所指对象的值，请使用该对象提供的方法（method）进行更改，不然你的更改是无效的。

## Null safety

在Dart高版本中（Dart3），强制执行了完全的`null safety`机制，那么什么是`null safety`机制？

如果学习过C/C++，我们可以知道，对于一个空指针，最不安全的行为，就是对其进行解引用（dereference），所以null safety机制，主要就是防止该事件的发生，防止你误操作，解引用了一个空指针。

在Dart没有引入null safety的时候，你如果使用一个`nullable`的对象，去调用它的方法，那么会造成空指针解引用错误，导致程序崩溃，例如：

```dart
int? v;
v.abs();
```

在引入null safety之后，你可以在`compile time`或者`edit time`发现该错误，IDE或者编译器会直接给你一个报错，你不能使用一个未初始化的`nullable` 变量。

在引入null safety之后出现了三个关键的变化（官网上这么说的）：

1. 当你给一个变量、参数、或者其它相关组件明确指定了类型，那么你可以控制它是否可以允许为空。(就是使用`Type?`语法)
2. 在你使用一个变量之前，你必须初始化它。`nullable`的变量默认值为null。Dart不会为`non-nullable`类型的变量设置一个初始值，它强制你为`non-nullable`类型初始化。Dart也不允许你监听或者观察一个没有初始化的值。还有就是当一个方法的`receiver`（熟悉Go语言的朋友肯定不陌生这个词）可以为`null`时，如果`receiver`为`null`，那么你无法使用这个`receiver`调用方法或者属性。
3. 当一个表达式为`nullable`类型时，无法使用该表达式访问属性或者方法。

> null safety 还有两个例外的函数 就是 hashCode和toString，这两个函数在receiver为null时也可以访问。

**综上所述：**

null safety，就是帮你在`edit-time`或者`compile time`消除潜在的空指针解引用`runtime errors`。

## 默认值（Default value）

在Dart中，当一个类型是`nullable`时，它会被初始化为`null`，不论是：`String`,`int`，还是其他什么类型，只要被标记为`nullable`，在没有显示初始化时，那么就会被初始化为`null`。

但是对于`non-nullable`的变量，由于`null safety`的限制，你在**使用该变量之前**，必须对它进行初始化。所以也就没有默认值一说了。

## Late

`late`关键字主要用在两个地方：

+ 声明一个在**声明位置之后**初始化的`non-nullable` 变量
+ 懒初始化一个变量

使用`late`关键字，可以将一个变量标记为，稍后初始化。如果你确定某个变量在使用前会初始化，但是Dart不同意，给出一个报错或者警告，此时你就可以在变量前加上`late`关键字，来告诉Dart你会在稍后初始化它，示例如下：

```dart
late String description;

void main() {
  description = 'Feijoada!';
  print(description);
}
```

所以，如果使用了`late`关键字，那么就需要你自己去保障该变量会初始化，如果初始化失败，那么在运行时使用该变量的时候，会造成错误，可能会导致程序崩溃。

使用`late`也会提供一些性能上的优势，**如果你在声明的时候直接初始化一个使用`late`声明的变量**，那么在后续代码中如果没有使用该变量，不会带来额外的开销，因为`late`声明的变量，只有在第一次使用时才会被初始化。

```dart
late String temperature = readThermometer();
```

## final和const

这两个关键字都是用来定义常量的，但是有所区别，final修饰的变量只能被赋值一次（可以在任何地方赋值，但是只能赋值一次），const修饰的变量会在编译时替换为常量。(const变量隐式就是final的)

```dart
final name="Devil";
final int age=18;
const baz=[];
```

如果要在类中使用const定义常量，那么需要使用`static const variable`来定义。

```dart
class MyClass{
    static const test=10;
}
```

常量还有如下几种定义方式：

```dart
var foo = const [];
final bar = const [];
const baz = []; // 等价于 `const []`
```

以上代码中 foo，没有使用 final和const 进行修饰，所以可以对foo的变量指向进行修改。

```dart
foo = [1, 2, 3];  //这种修改是不会报错的，因为foo没有被final和const修改
baz = [100];      //这种修改是会报错的，因为baz被const修饰了
```

**以上就是作者对变量这部分简单介绍，如果有哪些地方不对，或者错误，请读者指出，作者会及时修改。**