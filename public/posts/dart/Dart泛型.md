---
title: Dart 泛型
published: 2023-10-03
description: "Dart 泛型"
image: ""
tags: [Dart,Flutter,大前端]
category: "Dart"
draft: false
---
# 前言

在上一篇关于内置类型的文章中，我们了解了Dart中有那些内置类型，也详细介绍了三种常用的基础数据类型String，num，bool。还有一些数据类型我们没有进行了解，比如集合类型，Record类型，因为在了解集合类型之前，我们需要先了解一下泛型是什么东西，我们才能知道为什么集合类型要这样使用。所以本篇我们就来了解一下Dart中的泛型是怎么回事。

# 泛型

如果有小伙伴们看过我前面的文章，那你应该能发现在我的文章中有使用到一些代码是由`<>`括起来的，这个里面括起来的就是泛型参数，就例如下面这样：

```dart
void main(List<String> arguments){
 Map<String,String> map=Map();   
}
```

这里面的`List<String> arguments`其中`String`就是一个泛型参数的参数化类型，它表示我们这个List中的数据类型都是`String`。 后面这个Map也是一样的，表示key和value的类型都是String。我们也可以将其改成其他的类型，比如：

```dart
void main(List<String> arguments){
 Map<String,String> map=Map();  
 Map<int,String> intMap=Map();   
}
```

这样intMap的key就是int，value就是String了，可以看到我们很方便的就拥有了两个不同类型的Map，如果不使用泛型，我们则要编写两套代码，分别来实现key是int类型的和key是String类型的Map。

所以泛型的主要作用之一，**就是消除重复代码**，同一套代码，如果逻辑一样，仅仅是里面的类型不相同，那么此时我们就可以使用泛型来进行编写，让代码有更好的泛用性，**降低代码的重复程度**。

下面给出一个官网的实例来看看泛型是怎么消除重复代码的：

```dart
abstract class IntCache {
  int getByKey(String key);
  void setByKey(String key, int value);
}
abstract class StringCache {
  String getByKey(String key);
  void setByKey(String key, String value);
}

//泛型参数T可以为int也可以为String
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

可以看到，使用泛型的一份代码，就可以代替上面两份代码的作用，我们只需要给泛型指定不同的参数化类型，就可以得到不同的代码，而不是我们自己去手动再编写一份90%相似只有类型不同的代码。

可能你想说，使用Object不也是可以的吗，使用Object作为类型，某种程度上也可以做到泛型的能力，但是使用Object，你就无法准确的知道，它到底是个什么类型，或许你知道，但是你传入到其他的地方呢，其他的地方就不知道了，要准确的获取到一个Object的类型信息是一件很麻烦的事。并且IDE的提示也非常的不友好，因为在静态分析阶段它无法确定一个Object到底是什么类型的。

使用泛型则不一样，泛型的参数化类型会携带完整的类型信息，在静态分析阶段就能知道是什么类型，对于程序员来说，IDE的提示也更加友好，也能利用Dart的静态分析找出一些潜在的Bug。

我们来给出一个例子，就能看到使用泛型和使用Object的区别了：

![image-20231003094651140](/Dart%E6%B3%9B%E5%9E%8B.assets/897b8110242e6a9f37f2e8682c5c714d.png)

![image-20231003094722548](/Dart%E6%B3%9B%E5%9E%8B.assets/689b96b5f0cc0797e65c0b7c0aa58c09.png)

![image-20231003094818444](/Dart%E6%B3%9B%E5%9E%8B.assets/8a36529a3d943133e5feea382e025386.png)

通过上述示例，我们可以看到，使用ObjectCache和GenericCache，IDE给出的支持完全是两个级别的，ObjectCache编译器完全不知道它是什么类型，只能给出Object上的基础方法，而GenericCache可以通过我们给出的类型信息，来进行静态分析，从而得到更友好的提示。如果想要从ObjectCache中得到提示，则需要使用type check运算符，用as进行转换才可以。

现在我们知道了，为什么要使用泛型，使用泛型有什么好处，接下来我们来看看，怎样去使用泛型编写代码。

# 泛型使用

## 使用集合字面量

在Dart中，List/Map/Set字面量都是可以被参数化的。参数化的字面量就像下面这样：

```dart
var names=<String>['Devil','Yakumo'];
var uniqueNames=<String>{'Echo','Tohsaka'};
var pages=<String,String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
}
```

以上这种形式，就称为参数化字面量的形式，但是对于上面这种不需要类型约束，单一类型的字面量，不使用参数化字面量也是一样可以生效的，就例如：

```dart
var names=['Devil','Yakumo'];
var uniqueNames={'Echo','Tohsaka'};
var pages={
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
}
```

这段代码和上面的代码其实是等价的，类型并没有什么不同，但是上面的代码我们提供了类型信息，可以对类型进行约束，而下面这段代码使用的是Dart中的类型推断机制，根据我们提供的字面量的值，来进行推断，这样的缺点就是可能太过于精确（至于为什么太过于精确我们后面再讲，有兴趣的伙伴们可以去看看官网关于类型系统的介绍）。

## 在构造函数中使用参数化类型

```dart
var nameSet = Set<String>.from(names);
var views = Map<int, View>();
```

我们可以在构造函数中，指定参数化类型，而不是让Dart的类型推断系统来为我们进行推断。

## 泛型类型、方法（函数）的定义

```dart
T first<T>(List<T> ts){
    T tmp=ts[0];
    return tmp;
}
```

泛型函数的定义非常简单，就是在函数名之后加上泛型参数即可，这个泛型参数可以在函数的任何地方使用。

```dart
class GenericCache<K, V> {
  K? key;
  V? value;
  V? getValue() {
    return value;
  }

  void setValue(V? value) {
    this.value = value;
  }

  void setKey(K? key) {
    this.key = key;
  }

  void testGeneric<F extends VoidCallback>(F f) {
    f();
  }
}
```

泛型方法的定义有所不同，泛型方法既可以使用类的泛型参数，也可以自己定义泛型参数，就像setValue和getValue，他们使用的就是类的泛型参数，而testGeneric则使用的是函数自己定义的泛型参数。在testGeneric中有一个`extends`关键字，它的作用是约束泛型参数，我们马上讲到。

## 约束泛型参数

在我们自己定义泛型类型和泛型函数的时候，经常可能会遇到需要约束泛型参数的情况，比如，我期望这个类型实现了某个方法，我期望这个类型可以被调用等等，满足了这些条件，我才能执行，不然可能会报错，所以我们就需要一个约束，来约束传入的参数必须满足这些条件。

在Dart中，我们使用`<type extends constraints_type>`这种语法来进行泛型约束，这种语法表示type必须实现了constraints_type的方法或者说特性，如果没有实现，那么在静态分析的时候就会报错。

![image-20231003101634501](/Dart%E6%B3%9B%E5%9E%8B.assets/1045f5c97ca28661ec0f2aac0a27e5af.png)

就像这里一样，我们的testGeneric期望传入一个可以调用的函数，但是我们传入了一个字符串，字符串是不能被调用的，所以就会给我们报错。

![image-20231003101804555](/Dart%E6%B3%9B%E5%9E%8B.assets/65d0f303cfcc161d8a580cf00ee2c44e.png)

当我们传入一个函数时，这里就可以通过检查了，但是要注意，我们这里F是被一个无返回值无参数可调用的类型约束了，所以我们只能传入一个无返回值无参数可调用的类型，否则还是会无法通过检查。

在实际的代码编写中，我们需要怎么去约束泛型参数，需要根据我们实际的业务来进行调整。

# 最后

Dart中的泛型是携带类型信息的具体类型，也就是说在运行时可以对泛型类型进行判断，而不是像Java那样在运行时会进行类型擦除，就比如，在Dart中你可以判断一个类型是不是为`List<String>`，而在Java中你只能判断一个类型是否是 `List`。因为泛型信息在运行时已经被擦除了，了解这一点，可能会对你在某些方面有所帮助。

**最后，由于作者水平有限，在文章中难免出现错误，如果发现错误，请各位及时告知作者，作者会第一时间修改，以免误导他人，respect！。**