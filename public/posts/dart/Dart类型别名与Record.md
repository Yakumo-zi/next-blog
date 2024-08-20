---
title: Dart类型别名与Record
published: 2023-10-04
description: "Dart 类型别名与Record"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

在前面的文章里，我们已经学习了Dart中的常用基础类型、泛型的使用与定义、集合类型的使用，可以说这基本上囊括了我们日常开发所需要的大部分类型，但是Dart中还有一个类型我们也需要了解一下，它既不属于基础类型，也不属于集合类型，是一个单独的类型，但是在有时候很有用，它就是`Record`类型。顾名思义，记录类型，那就是用来记录了，记录了的东西就不能修改了，就像一张打印好的照片一样。本章就着重介绍这个类型，并附带介绍一下关于类型别名定义的知识。

# Record

在Dart中，对于Record是这样定义的，它是一个匿名的、不可变的聚合类型。就像集合类型一样，允许你绑定多个对象在一个Record上。但是与集合类型不一样的是，它的大小是固定的，并且是一个异构的类型。异构的类型，就是在一个Record，可以存在多种不同的类型，而不像集合那样，一个集合中只能有同一种类型，接下来我们就来了解一下Record类型怎样使用。

## Record语法

在Dart中，定义Record的方式，是通过一对`()`，然后将里面的值通过`,`分割开来，这样定义出来的就是一个Record了。

```dart
var record = ('first', a: 2, b: true, 'last');
```

定义了Record，我们就可以来使用Record了，根据Record定义方式的不同，使用的方式也不同，我们来看一下上述代码中的record如何使用：

```dart
print(record.$1); // 'first'
print(record.$2); // 'last'
print(record.a);  //   2
print(record.b);  //  true
```

可以看到，当我们要访问一个Record中的匿名字段时，我们需要使用`$`加上一个序号来访问，这个序号值得是要访问第几个匿名字段，而不是在record中排序第几个，而对于命名的字段来说，直接使用名字就可以访问了。所以Record使用起来非常简单。但是要注意对于匿名字段的访问。

至于为什么这样访问，我们来看看这个Record的类型就知道了，这个Record的类型如下所示：

```dart
(String,String,{int a,bool b}) record= ('first', a: 2, b: true, 'last');
```

Dart将Record中的匿名字段和命名字段分开了，匿名字段先放在前面，命名字段放在后面，所以我们访问匿名字段就是通过是第几个匿名字段来访问的。

## Record的惯用法

#### 作为函数参数和返回值：

```dart
(int, int) swap((int, int) record) {
  var (a, b) = record;
  return (b, a);
}
```

在上述代码示例中，我们使用了一个Record作为返回值，一个Record作为参数，这样做的好处就是我们可以一次获取到**多个返回值**。这里我们还看到了，对于一个Record我们可以使用，解构的语法，将Record中的每个元素都拿出来。这个在我们后面讲模式匹配的时候再细讲，现在只用知道是怎么回事就好了。

####  匿名字段赋值和命名字段赋值：

```dart
//命名字段赋值
({int a, int b}) recordAB = (a: 1, b: 2);
({int x, int y}) recordXY = (x: 3, y: 4);
//匿名字段赋值
(int a, int b) recordAB = (1, 2);
(int x, int y) recordXY = (3, 4);
```

看到这里你可能疑惑了，明明两个都有 名称，为什么一个是匿名字段，一个是命名字段。因为在Dart中，像匿名字段那样定义的方式，叫做`positional fields`，也就是位置参数，只是占个位而已，就像函数中的参数一样，这样的位置参数，不会影响函数的签名，并且进行访问的时候也只能通过匿名字段的访问方式进行访问，所以说这个名称其实没什么用。

但是命名字段就不一样了，他的类型就可以看做一个自定义结构体，你需要对里面相应的字段进行赋值才可以，否则会报错。所以我们只需要牢记，**在Record的类型注释中，用花括号包起来的，并且带有名字的就是命名字段，其他的都是匿名字段**就好了。

还有一点要注意的是，就是我们在没有给出具体的类型注释，让Dart自动取推导一个Record的类型时，只要给出的值中含有这种形式`identifier:value`，那么这个就是一个命名字段，并且这个表达式中，所有的命名字段会组成一个自定义的结构体类型，放在Record的最末尾。就像我们最开始定义的那个Record一样。

```dart
x var record = ('first', a: 2, b: true, 'last');
//其中a和b是符合命名字段的形式的，那么他它们就会组成一个{int a,bool b}的结构，放到Record的末尾。
```

#### Record的比较：

Record的比较也要分为有命名字段Record的比较和没有命名字段Record的比较。

当没有命名字段的比较时，比较两个Record，则首先判断它们类型是否相等，这个类型包括，有多少字段、每个字段是什么类型的，并且对于**没有命名字段的Record来说，它们之中字段的顺序很重要，不同的顺序就是不同的类型**，通过了类型判断，然后再对其中字段的值进行判断，当所有值都相等，那么这两个Record就是相等的了。

```dart
(int x, int y, int z) point = (1, 2, 3);
(int r, int g, int b) color = (1, 2, 3);
print(point == color); // 'true'.

(int x, int y, int z) point = (1, 3, 2);
(int r, int g, int b) color = (1, 2, 3);
print(point == color); // 'false'.

(int x, String y, int z) point = (1, "2", 3);
(int r, int g, String b) color = (1, 3, "2");
print(point == color); // 'false'

(int x, String y, int z) point = (1, "2", 3);
(int r, String g, int b) color = (1, "2", 3);
print(point == color); // 'true'
```

而对于有命名字段的Record来说，其中匿名字段的判断方式还是一致的，首先还是个数、类型、顺序、值这样来判断匿名字段。然后判断命名字段，命名字段的名称，也是它类型的一部分，所以命名字段要相等，那么首先它的字段个数、字段类型、字段名称要相等，**对于命名字段来说，它的顺序反而不重要，因为它们是有名字的**。

```dart
({int x, int y, int z}) point = (x: 1, y: 2, z: 3);
({int r, int g, int b}) color = (r: 1, g: 2, b: 3);
print(point == color); // 'false'

({int r, int g, int b}) point = (r: 1, g: 2, b: 3);
({int r, int g, int b}) color = (r: 1, g: 2, b: 3);
print(point == color); //  'true'

(int, int, {int r, int g, int b}) point = (10, 20, r: 1, g: 2, b: 3);
(int, int, {int r, int g, int b}) color = (10, 20, r: 1, g: 2, b: 3);
print(point == color); //  'true'

(int, int, {int r, int g, int b}) point = (10, 20, g: 2, b: 3, r: 1);
(int, int, {int r, int g, int b}) color = (10, 20, r: 1, g: 2, b: 3);
print(point == color); //  'true'
```

# 类型别名

当一个类型的类型注释特别长，而我们又想知道该类型是什么类型，想显示的指定，而不是依靠Dart的类型推断，或者我们想为一个类型取一个在当前业务中有实际意义的名字，那么此时我们就可以使用`typedef`关键字来为一个类型取一个别名，具体用法如下：

```dart
typedef IntList = List<int>;
IntList il = [1, 2, 3];
```

并且类型别名也可以拥有类型参数，就像泛型一样，实例如下：

```dart
typedef ListMapper<X> = Map<X, List<X>>;
Map<String, List<String>> m1 = {};
ListMapper<String> m2 = {};
```

还有一个经常使用的方式，就是给一个函数定义一个类型别名，可以更方便的区分某一类函数的作用，并且可以用作类型注释，表示我需要一个怎样的函数，实例如下：

```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```

# 总结

本篇文章讲述了，Dart中Record的使用，定义，以及比较的方式，命名字段和匿名字段的区别等等，相信通过这篇文章，你对Dart中的Record也会有一些新的了解，最后我们还讲了怎样在Dart中为一个类型取别名，并且知道了Dart中的类型别名也可以拥有类型参数。

**最后，由于作者水平有限，在文章中难免出现错误，如果发现错误，请各位及时告知作者，作者会第一时间修改，以免误导他人，respect！。**