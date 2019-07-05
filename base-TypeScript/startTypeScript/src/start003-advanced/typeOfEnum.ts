
// 枚举
// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。



// =======================================================
// =======================================================
// 简单的例子
// 枚举使用 enum 关键字来定义：
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true



// =======================================================
// =======================================================
// 手动赋值
// 我们也可以给枚举项手动赋值：
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days2["Sun"] === 7); // true
console.log(Days2["Mon"] === 1); // true
console.log(Days2["Tue"] === 2); // true
console.log(Days2["Sat"] === 6); // true


// 上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增。
// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：
enum Days3 {Sun = 5, Mon = 3, Tue, Wed, Thu, Fri, Sat};

console.log(Days3["Sun"] === 5); // true
console.log(Days3["Wed"] === 5); // true
console.log(Days3[5] === "Sun"); // false
console.log(Days3[5] === "Wed"); // true

// 上面的例子中，'Tue' 由于未手动赋值 接着 'Mon' 的枚举项递增为 4。
// 'Wed' 递增到 5 的时候与前面的 Sun 的取值重复了，
// 但是 TypeScript 并没有报错，导致 Days[5] 的值先是 "Sun"，而后又被 "Wed" 覆盖了。
// 所以使用的时候需要注意，最好不要出现这种覆盖的情况。

// 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：
enum Days4 {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};

// 当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1：
enum Days5 {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};



// =======================================================
// =======================================================
// 常数项和计算所得项
// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
// 前面我们所举的例子都是常数项，一个典型的计算所得项的例子：
enum Color {Red, Green, Blue = "blue".length};

// 上面的例子中，"blue".length 就是一个计算所得项。
// 上面的例子不会报错，但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错：
enum Color2 {Red = "red".length, Green, Blue};



// =======================================================
// =======================================================
// 下面是常数项和计算所得项的完整定义，部分引用自中文手册 - 枚举：
// 当满足以下条件时，枚举成员被当作是常数：
// ** 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 1。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 0。
// ** 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
// **   ** 数字字面量
// **   ** 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
// **   ** 带括号的常数枚举表达式
// **   ** +, -, ~ 一元运算符应用于常数枚举表达式
// **   ** +, -, *, /, %, <<, >>, >>>, &, |, ^ 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错
// 所有其它情况的枚举成员被当作是需要计算得出的值。



// =======================================================
// =======================================================
// 常数枚举
// 常数枚举是使用 const enum 定义的枚举类型：
const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directionsDemo = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

// 假如包含了计算成员，则会在编译阶段报错：
const enum Color3 {Red, Green, Blue = "blue".length};



// =======================================================
// =======================================================
// 外部枚举
// 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型：
declare enum Directions2 {
  Up,
  Down,
  Left,
  Right
}

let directionsDemo2 = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// 之前提到过，declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

// 外部枚举与声明语句一样，常出现在声明文件中。
// 同时使用 declare 和 const 也是可以的：
declare const enum Directions3 {
  Up,
  Down,
  Left,
  Right
}

let directionsDemo3 = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];