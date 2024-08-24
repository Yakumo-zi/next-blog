---
title: Dart基础数据类型
published: 2023-10-03
description: "Dart 基础数据类型"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

在前面的几篇文章中，我们已经详细的学习了关于Dart的基础语法，接下来的几篇文章中，我们将继续学习Dart中的数据类型，包括基础数据类型、集合类型、泛型、Dart的类型系统的概念等等。本篇我们将首先学习Dart的基础数据类型，让我们看看Dart的基础数据类型到底是怎么个事儿！

# Dart内置数据类型

在具体介绍Dart中的某些数据类型之前，我们先来看看Dart中到底有那些数据类型，以及这些类型在Dart中到底有什么作用。

首先，在Dart的官方文档中，明确说明了对以下类型有特殊支持（这些也是我们常用的数据类型）：

* Numbers(`int`,`double`)：数字类型，Dart只有两种数字类型，double和int
* Strings(`String`)：和其他语言的字符串类型没什么不同
* Booleans(`bool`)：布尔类型，和其他语言也一样
* Records((`value1,value2`))：这个有点意思，类似Python的元组，Java和C#中也有类似的Record支持，主要就是创建一个只读类型。
* Lists(`List`)：也可以叫做数组
* Sets(`Set`)：集合，和其他语言中的set一样
* Maps(`Map`)：Map，也就是键值对的集合
* Runes(`Runes`)：对字符的特殊支持，通常用来替换chars这种遍历，Go中也有这个类型。
* Symbols(`Symbol`)：表示Dart中的标识符或者运算符，应该和JS中的Symbol差不多
* 空值(`Null`)：懂得都懂

对于以上这些类型，在Dart中都**可以使用字面量(`literals`)的方式来进行创建**，但是也可以通过构造函数去创建。这是因为Dart中所有变量都是引用自一个对象或者一个类的实例，所以在Dart中许多内置类型都有自己的构造函数。

例如，当我们想要创建一个map的时候，我们有可以选择使用字面量的方式去创建一个map，也可以使用构造函数的方式去创建一个map：

```dart
void main(List<String> args) {
  Map<String, String?> map1 = Map();
  map1["Hello"] = "World";
  var map2 = {
    "Hello": "Devil",
    "Test": null,
  };
  print("Map1 = ${map1},Map2 = ${map2}");
  print("Map1Type = ${map1.runtimeType},Map2Type = ${map2.runtimeType}");
}

```

![image-20231002134639367](./Dart%E5%9F%BA%E7%A1%80%E7%B1%BB%E5%9E%8B.assets/3fb7dcf6e41f4ef6baa88e11f0831ae2.png)

可以看到，我们使用字面量创建的`map`和使用构造函数创建的`map`并没有什么不同，类型都是一样的。

除了上述有特殊支持的类型外，还有一些没有特殊支持的类型，但是在我们使用Dart的时候也是会经常遇见，是一个绕不过的坎，因为它们通常都有一些特殊的规则，或者特殊的作用。这就意味着我们可以不用，但是我们不能不知道，不然可能有时候会遇到奇奇怪怪的bug。

这些有特殊规则或者特殊作用的类型如下：

+ **Object**：这个不用多说，一生万物，Dart中除了`Null`类型，所有类型都是继承自它。
+ **Enum**：这个看名字就知道是所有`enum`的父类。
+ **Future**和**Stream**：这个主要是异步编程中会使用到的两个类型，熟悉支持异步编程语言的朋友应该不陌生这两个类型，因为现代语言的异步编程模型都是大同小异的，基本都会支持这两个类型，即使不支持`Stream`也会支持`Future`。
+ **Iterable**：迭代器嘛，用来支持`for..in`循环的，就像C++中的迭代器用来支持`range for`一样，也是一个必不可少的类型。
+ **Never**：这个应该和TS中的`never`差不多，表示一个表达式或者一个函数永远没有返回值。当一个函数总会抛出异常时 ，那么它的返回值就是`Never`了。
+ **dynamic**：这个就和TS或者Go中的`any`差不多，表示禁止静态的类型检查。将类型检查移动到运行期进行检查。但是这个类型通常也可以使用`Object`和`Object?`进行替代。
+ **void**： 表示一个值永远不会被使用（官网上是这么说的，没太懂什么意思）。通常用于函数的返回值。

通过以上的介绍，大体可以明白在Dart中我们常用的类型有那些，这些类型有什么作用。接下来就详细的介绍Dart中每个类型的相关知识。

# Dart基础数据类型

Dart中的基础数据类型，有如下几种：`Numbers`，`Strings`，`Booleans`，`Runes`，`Symbols`。接下来将一一介绍这几类型的使用，与一些细节知识。

## Numbers

在Dart中为了减少编程的负担，对于数字类型就只有两种形态，一种是整数，一种是小数，其中整数的类型为`int`，小数的类型为`double`。

首先来了解一下Dart语言中对这两种类型的定义。

**int**的定义，是一个**不大于64bit，并且依赖于平台的整数值**。在原生平台上（如Windows，Android等），int值的范围是在 **-2<sup>63</sup>——2<sup>63</sup>-1**,在Web平台上，它的表现和JavaScript中的数字一致，他的精度为**-2<sup>53</sup>——2<sup>53</sup>-1**。

**double**的定义为一个**64bit**，并且是**IEE754**标准的浮点数。不了解IEE754标准的朋友可以自行搜索了解一下，这里就不在展开了。

在Dart中，这两个类型都是继承自同一个类型`num`，这个`num`类型包含了许多数值操作的运算符重载，常用的加减乘除还有其他的运算符都有，也支持常用的数值运算函数比如求绝对值abs()，取整函数ceil()和floor()等等。不过像一些int支持double不支持的方法，那么就只会在int上定义而不在double上定义，比如位运算，double是不支持位运算的，所以它就只定义在了int类型上。

如果`num`类型中常用的函数不满足你的要求，你还可以使用Dart官方提供的数学库`dart:math`，如果还不行，那就只能寻找第三方库和手搓咯。

接下来我们来了解一下怎样定义这两个类型的变量，如果你要定义一个int类型的变量，那么你只需要给变量赋予一个没有小数点的数字就可以了，如果有小数点这个值就会被认为是double类型的。实例如下：

```dart
var x=1;       //这是int类型的
var y=1.0;     //这是double类型的
var ex=1.42e5; /./Dart也支持科学计数法
```

要注意的是，在Dart中你无法给一个int类型的赋予一个double类型的值。但是我们知道int和double都是继承自`num`，所以需要将一个int赋予给double，我们可以声明一个num类型的值来接收（**虽然你不能将一个double类型的值赋予给一个int类型的，但是你可以将一个int类型的值赋予给一个double类型**）：

![image-20231002142843182](./Dart%E5%9F%BA%E7%A1%80%E7%B1%BB%E5%9E%8B.assets/be066399028db58936233316ef0f1ae4.png)

## Strings

在Dart中，一个字符串就是持有一系列的UTF-16编码单元的对象。我们可以使用单引号或者双引号来创建一个字符串。示例如下：

```dart
var s1 = 'Single quotes work well for string literals.'; //单引号创建
var s2 = "Double quotes work just as well."; // 双引号创建
```

并且Dart中的字符串也支持插值语法，插值语法的格式就是在字符串中使用`${expression}`，如果`expression`是一个标识符，那么可以直接省略`{}`，就如同下面一段示例代码所示：

```dart
var s = 'string interpolation';
//这两种写法是相同的，只是在{}中你还可以执行一些方法或者运算。
var s1= 'Dart has $s, which is very handy.';
var s2= 'Dart has ${s}, which is very handy.';

var s3= 'Dart has ${s.toUpperCase()}, which is very handy.';
```

在Dart中，如果要拼接字符串，那么可以使用`+`，就和其他语言一样：

```dart
var s1="str1";
var s1=s1+"str2"; //"str1str2"
```

如果要判断两个字符串是否相等，可以使用`==`来进行判断，它判断的依据，就是两个字符串是否持有相同的UTF-16编码单元。如果相同就返回true。示例如下：

```dart
var s2 = 'The + operator ' + 'works, as well.';
assert(s2 == 'The + operator works, as well.'); //判断两个字符串是否相等
```

如果需要创建一个多行字符串，那么可以使用三个单引号或者三个双引号，将多行字符串括起来。

```dart
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```

如果需要创建一个原生字符串（原生字符串就是不用对字符串中的任何符号进行转义，你输入的字符串长什么样，你访问的时候它就长什么样），可以使用`r"str"`的方式进行创建。

```dart
var s = r'In a raw string, not even \n gets special treatment.';
```

Dart的String类型还提供了很多关于字符串操作的方法，例如find，replace等等，可以通过查阅官方文档的API进行学习，这里就不多赘述，也不建议朋友们去背这些API，用的时候查阅文档就好了，只需要知道有这么个东西就OK。

通过上面的描述，我们对字符串和数字也有一定基本的了解了，接下来我们来了解一下关于字符串和数字之间转换的问题。这个问题在Dart中还是很简单的，因为Dart提供了相应的API来进行互相转换，我们只需要调用API即可，接下来就是一些官网的示范案例：

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

还要就是，如果我们需要**获取某个对象对应的字符串**，那么我们直接调用那个对象的`toString()`方法即可，在Dart中基本所有类型都拥有这个方法。

关于字符串和数字的最后一点，在Dart中，**字符串和数字的字面量都是编译时常量**，并且只要一个表达式中只有编译时常量，那么这个表达式的结果也是一个编译时常量，就比如字符串中插值语法只要`expression`是一个常量，那么这个插值语法产生的结果字符串也是一个常量字符串，对于数字也是一样，只要数字的表达式里只包含编译时常量，那么结果也是一个编译时常量。这个在某些场景需要优化的情况下还是有一定作用的，不需要每次都去计算。

Dart官网的示例如下：

```dart
// These work in a const string.
const aConstNum = 0;
const aConstBool = true;
const aConstString = 'a constant string';

// These do NOT work in a const string.
var aNum = 0;
var aBool = true;
var aString = 'a string';
const aConstList = [1, 2, 3];

const validConstString = '$aConstNum $aConstBool $aConstString';
// const invalidConstString = '$aNum $aBool $aString $aConstList';
```

## Booleans

在Dart中，只有两个对象有布尔类型，分别是字面量`ture`和字面量`false`，并且他们两个字面量都是编译时常量。使用方法也和其他语言的一样。

但是要注意的一点是，在Dart中，由于是类型安全的，就意味着你不能将其他类型隐式的转换为布尔值。就例如：

```dart
var fullName = '';
assert(fullName); // 这在Dart中是不允许的，在其他语言中可能会将他判断为true或者false，看语言的具体实现。

//在Dart中我们如果要判断一个字符串是否为空，或者一个类型是否为null，我们需要显示的去判断
assert(fullName.isEmpty);

var nonvalue=null;
assert(nonvalue==null);
//assert(nonvalue);  //这样是错误的

var number=0;
assert(number==0);
//assert(number); //这样是错误的
```

# 总结

本篇主要介绍了一下Dart中有那些常用的类型，以及介绍了String，Number，Boolean三种常用的基础类型和对应的注意事项，对于两种不是很常用的基础类型，没有做出介绍，读者感兴趣可以去官网了解一下（官网给出的介绍也不多）。

**最后，由于作者水平有限，在文章中难免出现错误，如果发现错误，请各位及时告知作者，作者会第一时间修改，以免误导他人，respect！。**