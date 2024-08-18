---
title: Dart库和导入 
published: 2023-10-02
description: "Dart 包管理相关"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

在前面已经将Dart的语法基础介绍的差不多了，本篇则是语法基础的最后一篇，重点用来介绍Dart 中的 Library和import。我们平时的开发中，总会使用一些我们自己编写的工具，或者使用第三方的工具库，来提高我们的开发效率，或者简化我们的某些操作，所以库是必不可少的，但是有了库，我们还得知道在一门编程语言中怎样使用库。

# Libraries和imports

在Dart中，有一个和其他语言不太一样的概念就是，**权限的保护**，在Dart里，没有所谓的private和public,protected这些关键字来保护类中的成员变量，而是使用下划线(_)，来区分私有变量和共有变量，但是这个私有变量也和其他语言的私有变量不同。

Dart中私有变量所私有的范围，不是在一个类中，而是在一个**library**中，举个例子，你在一个文件中定义了一个类，也在类外定义了其他函数。但是在这个文件中，即使你类中的成员变量使用了下划线来保护，这个文件中的类外函数还是可以访问你类中被保护的变量，因为他们处于同一个library中。

那么在Dart中，library怎么定义？

官方文档中是这么写的，**在Dart中每个Dart文件都是一个library**。所以，在这里我们就可以明白了，类中下划线保护的变量的保护范围，其实就是当前文件，意思就是在当前文件中无论你是否保护，对于当前文件的其他函数或者其他类来说都是公有的。
明确了这个，我们就知道了，Dart中的library到底是怎么界定的。
下面给出一个示例：
**library1.dart**
```dart
class Lib1Class {
  String? _privateString;
  String? publicString;
  Lib1Class.launchPrivateString(this._privateString) {}
  void showString() {
    print("Private = ${_privateString},Public = ${publicString}");
  }
}

```
testLibrary1.dart
```dart
import 'library1.dart';

void main(List<String> args) {
  var testLib = Lib1Class.launchPrivateString("Private String Test");
  testLib.publicString = "Public String Set";
  testLib.showString();
  //以下这段代码会报错
  //testLib._privateString = "Reset Private Variable";
}

```
![请添加图片描述](/Dart%E5%BA%93%E5%92%8C%E5%AF%BC%E5%85%A5.assets/99fe8ccdbb7fb10773ca08a93d3fa6f2.png)
![在这里插入图片描述](/Dart%E5%BA%93%E5%92%8C%E5%AF%BC%E5%85%A5.assets/f08d256bb63b41b0393fd044aa74e960.png)
将以上代码示例放入同一目录的两个dart文件中即可运行。

## 导入Libraries

在Dart中，可以使用`import`指令来导入一个库，语法如下：

```dart
import "dart:html";
import "package:test/test.dart"
import "path/libname.dart"
```

可以看到我们导入的库是有不同的`shceme`的，对于内置的库，它的`shceme`就是`dart:`，对于第三方库，它的`scheme`就是`package:`，然后后面跟一个URI用来定位library的位置。这里的`scheme`你可以理解为就是http和https然后后面跟一串URL，大概意思都是差不多的。而对于自己本地的库，则只需要根据文件路径引入即可。

我们还可以为导入的库指定一个前缀，来避免不同的库之间重名的标识符冲突。使用方法如下：

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// Uses Element from lib1.
Element element1 = Element();

// Uses Element from lib2.
lib2.Element element2 = lib2.Element();
```

我们还可以只导入一个库的某一部分，使用两个指令来指定`show`和`hide`，这两个指令就是顾名思义了，一个是暴露那些，一个是隐藏那些。使用方法如下：

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

**作者水平有限，以上内容可能有解释不当，或者解释有误，请及时指正，作者看到会第一时间修改。**