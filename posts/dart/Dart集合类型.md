---
title: Dart 集合类型
published: 2023-10-03
description: "Dart 集合类型"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

在上一篇中，我们详细介绍了泛型的作用，怎样定义泛型和使用泛型。那么有了上一篇内容的基础，我们本篇就要来学习怎样使用Dart提供的集合类型了。集合类型顾名思义就是一个集合，里面会包含很多值，只是组织方式的不同，Dart内置了三种集合类型List、Set和Map。本篇会一一介绍它们的使用。

# List

在许多编程语言中最常见的集合类型被称为数组或者一组有序的对象。不过在Dart中，数组就是一个List对象，大家也叫其列表。

在Dart中，List的字面量是在方括号中使用逗号分隔的表达式列表或者值列表，例如：

```dart
var list=[1,2,3];
```

这就是一个Dart中的List，它的类型被推断为`List<int>`，也就是说，后续我们只能往里面增加int类型的值，否则在运行时会出现错误。

List是可以通过下标来进行随机访问的，它的索引范围为`0-list.length-1`，0是第一个元素，`list.lenght-1`是最后一个元素。访问的语法为`list[index]`，这样就能获取到第`index+1`个元素了，实例如下：

```dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```

在List中进行增删查改：

```dart
var list = [1, 2, 3];
list.add(4);
list.remove(2);
list[0]=3;
//在List中进行查找，需要对List进行遍历
for(final e in list){
    if(e==4){
        print(4);
        break;
    }
}
//或者使用函数式的方式来进行查找
  list.where((element) => element == 4).forEach((element) {
    print(element);
  });
```

如果我们需要创建一个List类型的编译时常量，我们可以在字面量前增加一个`const`关键字，例如：

```dart
var constantList = const [1, 2, 3]
```

在创建完成之后，我们就不能再对这个常量列表做任何更改了，否则会报错。

# Set

在Dart中一个Set就是一个没有重复元素且无序的集合，对于Set来说，Dart也支持从字面量进行创建，语法格式如下：

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

和List的创建方法基本一致，只是将中括号换成了花括号，它也和List一样，不能在其中添加其他类型的元素，例如现在这Set，它的类型被推断为`Set<String>`，那么就只能在其中添加String类型的元素，否则就会发生运行时错误。

在泛型那一章节中，我们也说了，可以通过参数化字面量的方式来进行创建，语法如下：

```dart
var names=<String>{};
```

在Set中进行增删查改：

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
  halogens.add("Test");
  //一次添加多个
  halogens.addAll(halogens);
  halogens.remove("Test");
  halogens.contains("Test");
```

在Set中一般不回去查找或者修改某元素，使用Set的场景一般都是用于判断某个元素在不在集合当中。

创建一个Set类型的编译期常量：

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
```

# Map

在Dart中，Map存放的是一个个键值对对象，并且在Map中Key是不能重复的，如果你使用重复的Key进行赋值，那么只会保留最后一个值。

Map和Set一样，都可以使用字面量和参数化字面量来进行初始化，示例如下：

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases =<int,String> {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

在这个例子中gifts使用字面量进行初始化，nobleGases使用参数化字面量进行初始化。

Map中的增删查改：

```dart
//如果'first'存在，则修改它的值，如果不存在就新建一个键值对{"first":"partridge"}
gifts['first'] = 'partridge';
gifts.remove('first');
var find=gifts['first'];
```

创建一个编译期常量的Map

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

# 关于集合类型的特殊操作符

在Dart中，也和JS一样支持 **spread opeartor**，并且还结合Dart的null-safety特性，支持了 **null-aware spread operator**。这些两个操作符在list，map和set上都可以使用。

示例如下：

```dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```

如果要操作的集合可能为空，那么就可以像这样来说使用：

```dart
var list2 = [0, ...?list];
assert(list2.length == 1);
```

在Dart中还有一种特殊的操作符，和Python中的列表推导式差不多，但是在Dart中叫做control-flow operator。使用示例如下：

```dart
var nav = ['Home', 'Furniture', 'Plants', if (promoActive) 'Outlet'];

// 这个是Dart中的模式匹配，后面会再详细介绍
var nav = ['Home', 'Furniture', 'Plants', if (login case 'Manager') 'Inventory'];

var listOfInts = [1, 2, 3];
var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];
assert(listOfStrings[1] == '#1');
```

# 总结

本篇介绍了Dart所支持的三种集合类型List/Map/Set使用起来都很方便，都可以通过字面量、参数字面量、构造函数的方式来创建。并且它们的特性也都基本相同，比如一个集合只能存储同一个类型的元素，存入不同类型的元素时会报错，可以通过`const`来创建一个编译期常量的集合等等。

还介绍了关于集合类型的特殊操作符，以及怎样去使用这些特殊操作符，如果读者对这方面比较感兴趣，可以去阅读官方文档，更深入的了解一下这方面的知识。

**最后，由于作者水平有限，在文章中难免出现错误，如果发现错误，请各位及时告知作者，作者会第一时间修改，以免误导他人，respect！。**
可以通过`const`来创建一个编译期常量的集合等等。