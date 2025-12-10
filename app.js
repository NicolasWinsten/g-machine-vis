(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.$9.c2 === region.jM.c2)
	{
		return 'on line ' + region.$9.c2;
	}
	return 'on lines ' + region.$9.c2 + ' through ' + region.jM.c2;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.j4,
		impl.lU,
		impl.lo,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		bi: func(record.bi),
		f5: record.f5,
		fR: record.fR
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.bi;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.f5;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.fR) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.j4,
		impl.lU,
		impl.lo,
		function(sendToApp, initialModel) {
			var view = impl.lW;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.j4,
		impl.lU,
		impl.lo,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.f_ && impl.f_(sendToApp)
			var view = impl.lW;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.i8);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.lI) && (_VirtualDom_doc.title = title = doc.lI);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.kK;
	var onUrlRequest = impl.kL;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		f_: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.h4 === next.h4
							&& curr.g$ === next.g$
							&& curr.h_.a === next.h_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		j4: function(flags)
		{
			return A3(impl.j4, flags, _Browser_getUrl(), key);
		},
		lW: impl.lW,
		lU: impl.lU,
		lo: impl.lo
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { jZ: 'hidden', jm: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { jZ: 'mozHidden', jm: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { jZ: 'msHidden', jm: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { jZ: 'webkitHidden', jm: 'webkitvisibilitychange' }
		: { jZ: 'hidden', jm: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		$8: _Browser_getScene(),
		dw: {
			z: _Browser_window.pageXOffset,
			R: _Browser_window.pageYOffset,
			cI: _Browser_doc.documentElement.clientWidth,
			bL: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		cI: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bL: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			$8: {
				cI: node.scrollWidth,
				bL: node.scrollHeight
			},
			dw: {
				z: node.scrollLeft,
				R: node.scrollTop,
				cI: node.clientWidth,
				bL: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			$8: _Browser_getScene(),
			dw: {
				z: x,
				R: y,
				cI: _Browser_doc.documentElement.clientWidth,
				bL: _Browser_doc.documentElement.clientHeight
			},
			jK: {
				z: x + rect.left,
				R: y + rect.top,
				cI: rect.width,
				bL: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.ks) { flags += 'm'; }
	if (options.jk) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { z: a[0], R: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.z, r.R]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { z: a[0], R: a[1], ex: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.z, r.R, r.ex]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { z: a[0], R: a[1], ex: a[2], iD: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.z, r.R, r.ex, r.iD]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.hj;
    m[1] = r.hn;
    m[2] = r.hr;
    m[3] = r.hv;
    m[4] = r.hk;
    m[5] = r.ho;
    m[6] = r.hs;
    m[7] = r.hw;
    m[8] = r.hl;
    m[9] = r.hp;
    m[10] = r.ht;
    m[11] = r.hx;
    m[12] = r.hm;
    m[13] = r.hq;
    m[14] = r.hu;
    m[15] = r.hy;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        hj: m[0], hn: m[1], hr: m[2], hv: m[3],
        hk: m[4], ho: m[5], hs: m[6], hw: m[7],
        hl: m[8], hp: m[9], ht: m[10], hx: m[11],
        hm: m[12], hq: m[13], hu: m[14], hy: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.B) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.F),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.F);
		} else {
			var treeLen = builder.B * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.J) : builder.J;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.B);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.F) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.F);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{J: nodeList, B: (len / $elm$core$Array$branchFactor) | 0, F: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {gT: fragment, g$: host, hX: path, h_: port_, h4: protocol, h5: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$Uninitialized = {$: 0};
var $author$project$Main$WindowResized = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $author$project$Main$CompilationError = function (a) {
	return {$: 2, a: a};
};
var $arturopala$elm_monocle$Monocle$Lens$Lens = F2(
	function (get, set) {
		return {eY: get, eh: set};
	});
var $author$project$Main$accessProgram = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function ($) {
		return $.db;
	},
	F2(
		function (p, m) {
			return _Utils_update(
				m,
				{db: p});
		}));
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$Backend$CannotFindMainFunction = {$: 1};
var $author$project$Backend$MainFunctionCannotHaveFormals = {$: 2};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $author$project$Backend$ParseFailure = function (a) {
	return {$: 3, a: a};
};
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Backend$POP = function (a) {
	return {$: 8, a: a};
};
var $author$project$Backend$UNWIND = {$: 6};
var $author$project$Backend$UPDATE = function (a) {
	return {$: 7, a: a};
};
var $mgold$elm_nonempty_list$List$Nonempty$append = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var xs = _v0.b;
		var y = _v1.a;
		var ys = _v1.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			x,
			_Utils_ap(
				xs,
				A2($elm$core$List$cons, y, ys)));
	});
var $author$project$Backend$ALLOC = function (a) {
	return {$: 4, a: a};
};
var $author$project$Backend$MKAP = {$: 9};
var $author$project$Backend$PUSHARG = function (a) {
	return {$: 1, a: a};
};
var $author$project$Backend$PUSHGLOBAL = function (a) {
	return {$: 0, a: a};
};
var $author$project$Backend$PUSHINT = function (a) {
	return {$: 3, a: a};
};
var $author$project$Backend$SLIDE = function (a) {
	return {$: 10, a: a};
};
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm_community$basics_extra$Basics$Extra$uncurry = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		return A2(f, a, b);
	});
var $author$project$Backend$augmentMapping = F3(
	function (bindings, mapping, context) {
		return A3(
			$elm$core$List$foldl,
			$elm_community$basics_extra$Basics$Extra$uncurry($elm$core$Dict$insert),
			mapping,
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, _v0) {
						var name = _v0.a;
						return _Utils_Tuple2(name, (i + context) + 1);
					}),
				bindings));
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $mgold$elm_nonempty_list$List$Nonempty$head = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return x;
};
var $mgold$elm_nonempty_list$List$Nonempty$tail = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return xs;
};
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $mgold$elm_nonempty_list$List$Nonempty$concat = function (_v0) {
	var xs = _v0.a;
	var xss = _v0.b;
	var tl = _Utils_ap(
		$mgold$elm_nonempty_list$List$Nonempty$tail(xs),
		$elm$core$List$concat(
			A2($elm$core$List$map, $mgold$elm_nonempty_list$List$Nonempty$toList, xss)));
	var hd = $mgold$elm_nonempty_list$List$Nonempty$head(xs);
	return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, hd, tl);
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$Backend$getStackPos = F2(
	function (name, mapping) {
		return A2($elm$core$Dict$get, name, mapping);
	});
var $mgold$elm_nonempty_list$List$Nonempty$singleton = function (x) {
	return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, _List_Nil);
};
var $author$project$Backend$compileInstantiation = F4(
	function (e, numFormals, mapping, context) {
		switch (e.$) {
			case 0:
				var name = e.a;
				var _v2 = A2($author$project$Backend$getStackPos, name, mapping);
				if (!_v2.$) {
					var offset = _v2.a;
					return $mgold$elm_nonempty_list$List$Nonempty$singleton(
						$author$project$Backend$PUSHARG((context - offset) + 1));
				} else {
					return $mgold$elm_nonempty_list$List$Nonempty$singleton(
						$author$project$Backend$PUSHGLOBAL(name));
				}
			case 4:
				var x = e.a;
				return $mgold$elm_nonempty_list$List$Nonempty$singleton(
					$author$project$Backend$PUSHINT(x));
			case 1:
				var e1 = e.a;
				var e2 = e.b;
				return $mgold$elm_nonempty_list$List$Nonempty$concat(
					A2(
						$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
						A4($author$project$Backend$compileInstantiation, e2, numFormals, mapping, context),
						_List_fromArray(
							[
								A4($author$project$Backend$compileInstantiation, e1, numFormals, mapping, context + 1),
								$mgold$elm_nonempty_list$List$Nonempty$singleton($author$project$Backend$MKAP)
							])));
			case 2:
				var _v3 = e.a;
				var name = _v3.a;
				var def_ = _v3.b;
				var body = e.b;
				return $mgold$elm_nonempty_list$List$Nonempty$concat(
					A2(
						$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
						A4($author$project$Backend$compileInstantiation, def_, numFormals, mapping, context),
						_List_fromArray(
							[
								A4(
								$author$project$Backend$compileInstantiation,
								body,
								numFormals,
								A3($elm$core$Dict$insert, name, context + 1, mapping),
								context + 1),
								$mgold$elm_nonempty_list$List$Nonempty$singleton(
								$author$project$Backend$SLIDE(1))
							])));
			default:
				var bindings = e.a;
				var body = e.b;
				var mapping_ = A3($author$project$Backend$augmentMapping, bindings, mapping, context);
				var context_ = context + $elm$core$List$length(bindings);
				return $mgold$elm_nonempty_list$List$Nonempty$concat(
					A2(
						$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
						A4($author$project$Backend$compileLetRecBindings, bindings, numFormals, mapping_, context_),
						_List_fromArray(
							[
								A4($author$project$Backend$compileInstantiation, body, numFormals, mapping_, context_),
								$mgold$elm_nonempty_list$List$Nonempty$singleton(
								$author$project$Backend$SLIDE(context_ - context))
							])));
		}
	});
var $author$project$Backend$compileLetRecBindings = F4(
	function (bindings, numFormals, mapping, context) {
		var numBindings = $elm$core$List$length(bindings);
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			$author$project$Backend$ALLOC(numBindings),
			$elm$core$List$concat(
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (i, _v0) {
							var name = _v0.a;
							var e = _v0.b;
							return _Utils_ap(
								$mgold$elm_nonempty_list$List$Nonempty$toList(
									A4($author$project$Backend$compileInstantiation, e, numFormals, mapping, context)),
								_List_fromArray(
									[
										$author$project$Backend$UPDATE(numBindings - i)
									]));
						}),
					bindings)));
	});
var $author$project$Backend$compileBody = F3(
	function (body, stackPos, context) {
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$append,
			A4($author$project$Backend$compileInstantiation, body, context, stackPos, context),
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				$author$project$Backend$UPDATE(context + 1),
				_Utils_ap(
					(!context) ? _List_Nil : _List_fromArray(
						[
							$author$project$Backend$POP(context)
						]),
					_List_fromArray(
						[$author$project$Backend$UNWIND]))));
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $author$project$Backend$formalsToStackPosition = function (formals) {
	var num = $elm$core$List$length(formals);
	return $elm$core$Dict$fromList(
		A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, name) {
					return _Utils_Tuple2(name, num - i);
				}),
			formals));
};
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === -2) {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $author$project$Backend$compileSuperCombinator = function (_v0) {
	var name = _v0.a;
	var formals = _v0.b;
	var body = _v0.c;
	var stackPositionsOfFormals = $author$project$Backend$formalsToStackPosition(formals);
	var numFormals = $elm$core$Dict$size(stackPositionsOfFormals);
	return {
		gz: A3($author$project$Backend$compileBody, body, stackPositionsOfFormals, numFormals),
		cn: name,
		hO: numFormals
	};
};
var $author$project$Backend$SuperCombinatorNameClash = function (a) {
	return {$: 0, a: a};
};
var $author$project$Backend$getGlobal = $elm$core$Dict$get;
var $author$project$Backend$defineGlobal = F2(
	function (global, env) {
		var _v0 = A2($author$project$Backend$getGlobal, global.cn, env);
		if (!_v0.$) {
			var existingGlobal = _v0.a;
			return $elm$core$Result$Err(
				$author$project$Backend$SuperCombinatorNameClash(global.cn));
		} else {
			return $elm$core$Result$Ok(
				A3($elm$core$Dict$insert, global.cn, global, env));
		}
	});
var $author$project$Backend$emptyEnv = $elm$core$Dict$empty;
var $author$project$Backend$compileASTs = A2(
	$elm$core$List$foldl,
	A2(
		$elm$core$Basics$composeR,
		$author$project$Backend$compileSuperCombinator,
		A2($elm$core$Basics$composeR, $author$project$Backend$defineGlobal, $elm$core$Result$andThen)),
	$elm$core$Result$Ok($author$project$Backend$emptyEnv));
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $elm_community$result_extra$Result$Extra$combine = A2(
	$elm$core$List$foldr,
	$elm$core$Result$map2($elm$core$List$cons),
	$elm$core$Result$Ok(_List_Nil));
var $author$project$Frontend$SC = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {gA: col, jw: contextStack, h1: problem, ib: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.ib, s.gA, x, s.j));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.aj),
			s.d) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $author$project$Frontend$SCApp = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0;
	return function (s0) {
		var _v1 = parse(s0);
		if (_v1.$ === 1) {
			var x = _v1.b;
			return A2($elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _v1.b;
			var s1 = _v1.c;
			return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $Punie$elm_parser_extras$Parser$Expression$initOps = {cj: _List_Nil, co: _List_Nil, ct: _List_Nil, cu: _List_Nil, cv: _List_Nil};
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $Punie$elm_parser_extras$Parser$Expression$splitOp = F2(
	function (operator, ops) {
		var rassoc = ops.cv;
		var lassoc = ops.cj;
		var nassoc = ops.co;
		var prefix = ops.cu;
		var postfix = ops.ct;
		switch (operator.$) {
			case 0:
				switch (operator.b) {
					case 0:
						var op = operator.a;
						var _v1 = operator.b;
						return _Utils_update(
							ops,
							{
								co: A2($elm$core$List$cons, op, ops.co)
							});
					case 1:
						var op = operator.a;
						var _v2 = operator.b;
						return _Utils_update(
							ops,
							{
								cj: A2($elm$core$List$cons, op, ops.cj)
							});
					default:
						var op = operator.a;
						var _v3 = operator.b;
						return _Utils_update(
							ops,
							{
								cv: A2($elm$core$List$cons, op, ops.cv)
							});
				}
			case 1:
				var op = operator.a;
				return _Utils_update(
					ops,
					{
						cu: A2($elm$core$List$cons, op, ops.cu)
					});
			default:
				var op = operator.a;
				return _Utils_update(
					ops,
					{
						ct: A2($elm$core$List$cons, op, ops.ct)
					});
		}
	});
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $Punie$elm_parser_extras$Parser$Expression$makeParser = F2(
	function (ops, term) {
		var ambiguous = F2(
			function (assoc, op) {
				return $elm$parser$Parser$backtrackable(
					A2(
						$elm$parser$Parser$andThen,
						function (_v3) {
							return $elm$parser$Parser$problem('ambiguous use of a ' + (assoc + ' associative operator'));
						},
						op));
			});
		var _v0 = A3($elm$core$List$foldr, $Punie$elm_parser_extras$Parser$Expression$splitOp, $Punie$elm_parser_extras$Parser$Expression$initOps, ops);
		var rassoc = _v0.cv;
		var lassoc = _v0.cj;
		var nassoc = _v0.co;
		var prefix = _v0.cu;
		var postfix = _v0.ct;
		var lassocOp = $elm$parser$Parser$oneOf(lassoc);
		var ambiguousLeft = A2(ambiguous, 'left', lassocOp);
		var nassocOp = $elm$parser$Parser$oneOf(nassoc);
		var ambiguousNon = A2(ambiguous, 'non', nassocOp);
		var postfixOp = $elm$parser$Parser$oneOf(postfix);
		var postfixP = $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					postfixOp,
					$elm$parser$Parser$succeed($elm$core$Basics$identity)
				]));
		var prefixOp = $elm$parser$Parser$oneOf(prefix);
		var prefixP = $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					prefixOp,
					$elm$parser$Parser$succeed($elm$core$Basics$identity)
				]));
		var termP = A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						F3(
							function (pre, x, post) {
								return post(
									pre(x));
							})),
					prefixP),
				term),
			postfixP);
		var rassocOp = $elm$parser$Parser$oneOf(rassoc);
		var ambiguousRight = A2(ambiguous, 'right', rassocOp);
		var lassocP = function (x) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$andThen,
						function (_v2) {
							var f = _v2.a;
							var y = _v2.b;
							return lassocP1(
								A2(f, x, y));
						},
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								$elm$parser$Parser$succeed($elm$core$Tuple$pair),
								lassocOp),
							termP)),
						ambiguousRight,
						ambiguousNon
					]));
		};
		var lassocP1 = function (x) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						lassocP(x),
						$elm$parser$Parser$succeed(x)
					]));
		};
		var nassocP = function (x) {
			return A2(
				$elm$parser$Parser$andThen,
				function (_v1) {
					var f = _v1.a;
					var y = _v1.b;
					return $elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								ambiguousRight,
								ambiguousLeft,
								ambiguousNon,
								$elm$parser$Parser$succeed(
								A2(f, x, y))
							]));
				},
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed($elm$core$Tuple$pair),
						nassocOp),
					termP));
		};
		var rassocP = function (x) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(
								F2(
									function (f, y) {
										return A2(f, x, y);
									})),
							rassocOp),
						A2($elm$parser$Parser$andThen, rassocP1, termP)),
						ambiguousLeft,
						ambiguousNon
					]));
		};
		var rassocP1 = function (x) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						rassocP(x),
						$elm$parser$Parser$succeed(x)
					]));
		};
		return A2(
			$elm$parser$Parser$andThen,
			function (x) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							rassocP(x),
							lassocP(x),
							nassocP(x),
							$elm$parser$Parser$succeed(x)
						]));
			},
			termP);
	});
var $Punie$elm_parser_extras$Parser$Expression$buildExpressionParser = F2(
	function (operators, simpleExpr) {
		return A3($elm$core$List$foldl, $Punie$elm_parser_extras$Parser$Expression$makeParser, simpleExpr, operators);
	});
var $elm_community$basics_extra$Basics$Extra$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $author$project$Frontend$SCInt = function (a) {
	return {$: 4, a: a};
};
var $elm$parser$Parser$ExpectingBinary = {$: 4};
var $elm$parser$Parser$ExpectingFloat = {$: 5};
var $elm$parser$Parser$ExpectingHex = {$: 2};
var $elm$parser$Parser$ExpectingInt = {$: 1};
var $elm$parser$Parser$ExpectingNumber = {$: 6};
var $elm$parser$Parser$ExpectingOctal = {$: 3};
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (!maybe.$) {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {gA: s.gA + (newOffset - s.d), j: s.j, n: s.n, d: newOffset, ib: s.ib, aj: s.aj};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.d, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.aj);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.ib, s.gA - (floatOffset + s.d), invalid, s.j));
		} else {
			if (_Utils_eq(s.d, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.d, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.d, floatOffset, s.aj));
						if (_v1.$ === 1) {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return function (s) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.d, s.aj)) {
			var zeroOffset = s.d + 1;
			var baseOffset = zeroOffset + 1;
			return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.aj) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.kc,
				c.jY,
				baseOffset,
				A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.aj),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.aj) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.kc,
				c.kG,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.aj),
				s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.aj) ? A5(
				$elm$parser$Parser$Advanced$finalizeInt,
				c.kc,
				c.i7,
				baseOffset,
				A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.aj),
				s) : A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.kc,
				c.gQ,
				c.kb,
				c.jT,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				$elm$parser$Parser$Advanced$finalizeFloat,
				c.kc,
				c.gQ,
				c.kb,
				c.jT,
				A3($elm$parser$Parser$Advanced$consumeBase, 10, s.d, s.aj),
				s);
		}
	};
};
var $elm$parser$Parser$number = function (i) {
	return $elm$parser$Parser$Advanced$number(
		{
			i7: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingBinary, i.i7),
			gQ: $elm$parser$Parser$ExpectingNumber,
			jT: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingFloat, i.jT),
			jY: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingHex, i.jY),
			kb: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingInt, i.kb),
			kc: $elm$parser$Parser$ExpectingNumber,
			kG: A2($elm$core$Result$fromMaybe, $elm$parser$Parser$ExpectingOctal, i.kG)
		});
};
var $author$project$Frontend$intLit = $elm$parser$Parser$number(
	{
		i7: $elm$core$Maybe$Nothing,
		jT: $elm$core$Maybe$Nothing,
		jY: $elm$core$Maybe$Nothing,
		kb: $elm$core$Maybe$Just($author$project$Frontend$SCInt),
		kG: $elm$core$Maybe$Nothing
	});
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _v0 = thunk(0);
		var parse = _v0;
		return parse(s);
	};
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $Punie$elm_parser_extras$Parser$Expression$AssocLeft = 1;
var $author$project$Frontend$SCIdent = function (a) {
	return {$: 0, a: a};
};
var $Punie$elm_parser_extras$Parser$Expression$Infix = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.aj);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.d, offset) < 0,
					0,
					{gA: col, j: s0.j, n: s0.n, d: offset, ib: row, aj: s0.aj});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.d, s.ib, s.gA, s);
	};
};
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $Punie$elm_parser_extras$Parser$Expression$binaryOp = F2(
	function (fn, opParser) {
		return A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(fn),
				opParser),
			$elm$parser$Parser$spaces);
	});
var $Punie$elm_parser_extras$Parser$Expression$infixOperator = F3(
	function (fn, opParser, assoc) {
		return A2(
			$Punie$elm_parser_extras$Parser$Expression$Infix,
			A2($Punie$elm_parser_extras$Parser$Expression$binaryOp, fn, opParser),
			assoc);
	});
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.d, s.ib, s.gA, s.aj);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{gA: newCol, j: s.j, n: s.n, d: newOffset, ib: newRow, aj: s.aj});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$Frontend$operator = function (op) {
	return A3(
		$Punie$elm_parser_extras$Parser$Expression$infixOperator,
		F2(
			function (left, right) {
				return A2(
					$author$project$Frontend$SCApp,
					A2(
						$author$project$Frontend$SCApp,
						$author$project$Frontend$SCIdent(op),
						left),
					right);
			}),
		$elm$parser$Parser$symbol(op),
		1);
};
var $author$project$Frontend$operators = A2(
	$elm$core$List$map,
	$elm$core$List$map($author$project$Frontend$operator),
	_List_fromArray(
		[
			_List_fromArray(
			['*', '/']),
			_List_fromArray(
			['+', '-']),
			_List_fromArray(
			['=='])
		]));
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $elm$parser$Parser$ExpectingVariable = {$: 7};
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {gA: col, j: context, n: indent, d: offset, ib: row, aj: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$variable = function (i) {
	return function (s) {
		var firstOffset = A3($elm$parser$Parser$Advanced$isSubChar, i.$9, s.d, s.aj);
		if (_Utils_eq(firstOffset, -1)) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, i.gQ));
		} else {
			var s1 = _Utils_eq(firstOffset, -2) ? A7($elm$parser$Parser$Advanced$varHelp, i.j5, s.d + 1, s.ib + 1, 1, s.aj, s.n, s.j) : A7($elm$parser$Parser$Advanced$varHelp, i.j5, firstOffset, s.ib, s.gA + 1, s.aj, s.n, s.j);
			var name = A3($elm$core$String$slice, s.d, s1.d, s.aj);
			return A2($elm$core$Set$member, name, i.kZ) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, i.gQ)) : A3($elm$parser$Parser$Advanced$Good, true, name, s1);
		}
	};
};
var $elm$parser$Parser$variable = function (i) {
	return $elm$parser$Parser$Advanced$variable(
		{gQ: $elm$parser$Parser$ExpectingVariable, j5: i.j5, kZ: i.kZ, $9: i.$9});
};
var $author$project$Frontend$identifier = $elm$parser$Parser$variable(
	{
		j5: function (c) {
			return $elm$core$Char$isAlphaNum(c) || (c === '_');
		},
		kZ: $elm$core$Set$empty,
		$9: $elm$core$Char$isAlpha
	});
var $author$project$Frontend$scident = A2($elm$parser$Parser$map, $author$project$Frontend$SCIdent, $author$project$Frontend$identifier);
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $Punie$elm_parser_extras$Parser$Extras$manyHelp = F2(
	function (p, vs) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						function (v) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, v, vs));
						}),
					A2($elm$parser$Parser$ignorer, p, $elm$parser$Parser$spaces)),
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return $elm$parser$Parser$Done(
							$elm$core$List$reverse(vs));
					},
					$elm$parser$Parser$succeed(0))
				]));
	});
var $Punie$elm_parser_extras$Parser$Extras$many = function (p) {
	return A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		$Punie$elm_parser_extras$Parser$Extras$manyHelp(p));
};
var $Punie$elm_parser_extras$Parser$Extras$some = function (p) {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm$core$Tuple$pair),
			A2($elm$parser$Parser$ignorer, p, $elm$parser$Parser$spaces)),
		$Punie$elm_parser_extras$Parser$Extras$many(p));
};
function $author$project$Frontend$cyclic$expr() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$elm$parser$Parser$backtrackable(
				$author$project$Frontend$cyclic$arith()),
				$author$project$Frontend$cyclic$app()
			]));
}
function $author$project$Frontend$cyclic$app() {
	return A2(
		$elm$parser$Parser$map,
		function (_v2) {
			var t1 = _v2.a;
			var rest = _v2.b;
			return A3(
				$elm$core$List$foldl,
				$elm_community$basics_extra$Basics$Extra$flip($author$project$Frontend$SCApp),
				t1,
				rest);
		},
		$Punie$elm_parser_extras$Parser$Extras$some(
			A2(
				$elm$parser$Parser$ignorer,
				$author$project$Frontend$cyclic$term(),
				$elm$parser$Parser$spaces)));
}
function $author$project$Frontend$cyclic$arith() {
	return A2(
		$Punie$elm_parser_extras$Parser$Expression$buildExpressionParser,
		$author$project$Frontend$operators,
		$elm$parser$Parser$lazy(
			function (_v1) {
				return $author$project$Frontend$cyclic$app();
			}));
}
function $author$project$Frontend$cyclic$term() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				$author$project$Frontend$scident,
				$author$project$Frontend$intLit,
				$author$project$Frontend$cyclic$group()
			]));
}
function $author$project$Frontend$cyclic$group() {
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$elm$parser$Parser$symbol('(')),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$lazy(
					function (_v0) {
						return $author$project$Frontend$cyclic$expr();
					}),
				$elm$parser$Parser$spaces),
			$elm$parser$Parser$symbol(')')));
}
var $author$project$Frontend$expr = $author$project$Frontend$cyclic$expr();
$author$project$Frontend$cyclic$expr = function () {
	return $author$project$Frontend$expr;
};
var $author$project$Frontend$app = $author$project$Frontend$cyclic$app();
$author$project$Frontend$cyclic$app = function () {
	return $author$project$Frontend$app;
};
var $author$project$Frontend$arith = $author$project$Frontend$cyclic$arith();
$author$project$Frontend$cyclic$arith = function () {
	return $author$project$Frontend$arith;
};
var $author$project$Frontend$term = $author$project$Frontend$cyclic$term();
$author$project$Frontend$cyclic$term = function () {
	return $author$project$Frontend$term;
};
var $author$project$Frontend$group = $author$project$Frontend$cyclic$group();
$author$project$Frontend$cyclic$group = function () {
	return $author$project$Frontend$group;
};
var $elm$parser$Parser$Mandatory = 2;
var $elm$parser$Parser$Advanced$revAlways = F2(
	function (_v0, b) {
		return b;
	});
var $elm$parser$Parser$Advanced$skip = F2(
	function (iParser, kParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$parser$Parser$Advanced$revAlways, iParser, kParser);
	});
var $elm$parser$Parser$Advanced$sequenceEndForbidden = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				$elm$parser$Parser$Advanced$sequenceEndForbidden,
				ender,
				ws,
				parseItem,
				sep,
				A2($elm$core$List$cons, item, revItems));
		};
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$map,
								function (item) {
									return $elm$parser$Parser$Advanced$Loop(
										A2($elm$core$List$cons, item, revItems));
								},
								parseItem))),
						A2(
						$elm$parser$Parser$Advanced$map,
						function (_v0) {
							return $elm$parser$Parser$Advanced$Done(
								$elm$core$List$reverse(revItems));
						},
						ender)
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEndMandatory = F4(
	function (ws, parseItem, sep, revItems) {
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$Advanced$map,
					function (item) {
						return $elm$parser$Parser$Advanced$Loop(
							A2($elm$core$List$cons, item, revItems));
					},
					A2(
						$elm$parser$Parser$Advanced$ignorer,
						parseItem,
						A2(
							$elm$parser$Parser$Advanced$ignorer,
							ws,
							A2($elm$parser$Parser$Advanced$ignorer, sep, ws)))),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return $elm$parser$Parser$Advanced$Done(
							$elm$core$List$reverse(revItems));
					},
					$elm$parser$Parser$Advanced$succeed(0))
				]));
	});
var $elm$parser$Parser$Advanced$sequenceEndOptional = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var parseEnd = A2(
			$elm$parser$Parser$Advanced$map,
			function (_v0) {
				return $elm$parser$Parser$Advanced$Done(
					$elm$core$List$reverse(revItems));
			},
			ender);
		return A2(
			$elm$parser$Parser$Advanced$skip,
			ws,
			$elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							$elm$parser$Parser$Advanced$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$Advanced$map,
										function (item) {
											return $elm$parser$Parser$Advanced$Loop(
												A2($elm$core$List$cons, item, revItems));
										},
										parseItem),
										parseEnd
									])))),
						parseEnd
					])));
	});
var $elm$parser$Parser$Advanced$sequenceEnd = F5(
	function (ender, ws, parseItem, sep, trailing) {
		var chompRest = function (item) {
			switch (trailing) {
				case 0:
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndForbidden, ender, ws, parseItem, sep));
				case 1:
					return A2(
						$elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4($elm$parser$Parser$Advanced$sequenceEndOptional, ender, ws, parseItem, sep));
				default:
					return A2(
						$elm$parser$Parser$Advanced$ignorer,
						A2(
							$elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								$elm$parser$Parser$Advanced$skip,
								sep,
								A2(
									$elm$parser$Parser$Advanced$skip,
									ws,
									A2(
										$elm$parser$Parser$Advanced$loop,
										_List_fromArray(
											[item]),
										A3($elm$parser$Parser$Advanced$sequenceEndMandatory, ws, parseItem, sep))))),
						ender);
			}
		};
		return $elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2($elm$parser$Parser$Advanced$andThen, chompRest, parseItem),
					A2(
					$elm$parser$Parser$Advanced$map,
					function (_v0) {
						return _List_Nil;
					},
					ender)
				]));
	});
var $elm$parser$Parser$Advanced$sequence = function (i) {
	return A2(
		$elm$parser$Parser$Advanced$skip,
		$elm$parser$Parser$Advanced$token(i.$9),
		A2(
			$elm$parser$Parser$Advanced$skip,
			i.lg,
			A5(
				$elm$parser$Parser$Advanced$sequenceEnd,
				$elm$parser$Parser$Advanced$token(i.jM),
				i.lg,
				i.kf,
				$elm$parser$Parser$Advanced$token(i.lb),
				i.lR)));
};
var $elm$parser$Parser$Advanced$Forbidden = 0;
var $elm$parser$Parser$Advanced$Mandatory = 2;
var $elm$parser$Parser$Advanced$Optional = 1;
var $elm$parser$Parser$toAdvancedTrailing = function (trailing) {
	switch (trailing) {
		case 0:
			return 0;
		case 1:
			return 1;
		default:
			return 2;
	}
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$sequence = function (i) {
	return $elm$parser$Parser$Advanced$sequence(
		{
			jM: $elm$parser$Parser$toToken(i.jM),
			kf: i.kf,
			lb: $elm$parser$Parser$toToken(i.lb),
			lg: i.lg,
			$9: $elm$parser$Parser$toToken(i.$9),
			lR: $elm$parser$Parser$toAdvancedTrailing(i.lR)
		});
};
var $author$project$Frontend$formalsList = $elm$parser$Parser$sequence(
	{jM: '', kf: $author$project$Frontend$identifier, lb: '', lg: $elm$parser$Parser$spaces, $9: '', lR: 2});
var $author$project$Frontend$def = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($author$project$Frontend$SC),
			$author$project$Frontend$identifier),
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2($elm$parser$Parser$ignorer, $author$project$Frontend$formalsList, $elm$parser$Parser$spaces),
				$elm$parser$Parser$symbol('=')),
			$elm$parser$Parser$spaces)),
	A2($elm$parser$Parser$ignorer, $author$project$Frontend$expr, $elm$parser$Parser$end));
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {j3: index, cl: match, kE: number, ln: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{jk: false, ks: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm_community$string_extra$String$Extra$regexFromString = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$fromString,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never));
var $elm_community$string_extra$String$Extra$isBlank = function (string) {
	return A2(
		$elm$regex$Regex$contains,
		$elm_community$string_extra$String$Extra$regexFromString('^\\s*$'),
		string);
};
var $elm$core$String$lines = _String_lines;
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {gA: col, h1: problem, ib: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.ib, p.gA, p.h1);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{gA: 1, j: _List_Nil, n: 1, d: 0, ib: 1, aj: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $author$project$Frontend$parse = function (sourceProgram) {
	return $elm_community$result_extra$Result$Extra$combine(
		A2(
			$elm$core$List$map,
			$elm$parser$Parser$run($author$project$Frontend$def),
			A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm_community$string_extra$String$Extra$isBlank),
				$elm$core$String$lines(sourceProgram))));
};
var $author$project$Backend$compile = A2(
	$elm$core$Basics$composeR,
	$author$project$Frontend$parse,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Result$mapError($author$project$Backend$ParseFailure),
		$elm$core$Result$andThen($author$project$Backend$compileASTs)));
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$GMachine$GFunc = function (a) {
	return {$: 1, a: a};
};
var $author$project$GMachine$Unwinding = function (a) {
	return {$: 1, a: a};
};
var $author$project$GMachine$Multiple = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $author$project$GMachine$isTermination = function (update) {
	isTermination:
	while (true) {
		switch (update.$) {
			case 3:
				return true;
			case 2:
				return true;
			case 9:
				var updates = update.b;
				var $temp$update = updates;
				update = $temp$update;
				continue isTermination;
			default:
				return false;
		}
	}
};
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$GMachine$andThen = F2(
	function (procedure, _v0) {
		var machine = _v0.a;
		var previousUpdate = _v0.b;
		return $author$project$GMachine$isTermination(previousUpdate) ? _Utils_Tuple2(machine, previousUpdate) : A2(
			$elm$core$Tuple$mapSecond,
			$author$project$GMachine$Multiple(previousUpdate),
			procedure(machine));
	});
var $author$project$GMachine$EnteredCode = function (a) {
	return {$: 5, a: a};
};
var $author$project$GMachine$StackFrame = function (a) {
	return {$: 0, a: a};
};
var $author$project$GMachine$accessCtx = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function ($) {
		return $.b7;
	},
	F2(
		function (ctx, machine) {
			return _Utils_update(
				machine,
				{b7: ctx});
		}));
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$GMachine$getRightChild = function (node) {
	switch (node.$) {
		case 0:
			var right = node.b;
			return $elm$core$Maybe$Just(right);
		case 1:
			return $elm$core$Maybe$Nothing;
		case 2:
			return $elm$core$Maybe$Nothing;
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$GMachine$accessStack = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function (ctx) {
		if (!ctx.$) {
			var frame = ctx.a;
			return frame.di;
		} else {
			var stack = ctx.a;
			return stack;
		}
	},
	F2(
		function (stack, ctx) {
			if (!ctx.$) {
				var frame = ctx.a;
				return $author$project$GMachine$StackFrame(
					_Utils_update(
						frame,
						{di: stack}));
			} else {
				return $author$project$GMachine$Unwinding(stack);
			}
		}));
var $arturopala$elm_monocle$Monocle$Lens$compose = F2(
	function (outer, inner) {
		var set = F2(
			function (c, a) {
				return function (b) {
					return A2(outer.eh, b, a);
				}(
					A2(
						inner.eh,
						c,
						outer.eY(a)));
			});
		return A2(
			$arturopala$elm_monocle$Monocle$Lens$Lens,
			A2($elm$core$Basics$composeR, outer.eY, inner.eY),
			set);
	});
var $author$project$GMachine$stackLens = A2($arturopala$elm_monocle$Monocle$Lens$compose, $author$project$GMachine$accessCtx, $author$project$GMachine$accessStack);
var $author$project$GMachine$getStack = $author$project$GMachine$stackLens.eY;
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$GMachine$StackException = function (a) {
	return {$: 2, a: a};
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $author$project$GMachine$getFromStack = F2(
	function (offset, gmachine) {
		return A2(
			$elm$core$Result$fromMaybe,
			$author$project$GMachine$StackException(offset),
			A2(
				$elm_community$list_extra$List$Extra$getAt,
				offset,
				$author$project$GMachine$getStack(gmachine)));
	});
var $author$project$GMachine$NodeDoesNotExist = function (a) {
	return {$: 1, a: a};
};
var $author$project$GMachine$retrieveNode = F2(
	function (addr, _v0) {
		var graph = _v0.bJ;
		return A2(
			$elm$core$Result$fromMaybe,
			$author$project$GMachine$NodeDoesNotExist(addr),
			A2($elm$core$Dict$get, addr, graph));
	});
var $author$project$GMachine$loadStackPointer = F2(
	function (offset, gmachine) {
		return A2(
			$elm$core$Result$andThen,
			A2($elm_community$basics_extra$Basics$Extra$flip, $author$project$GMachine$retrieveNode, gmachine),
			A2($author$project$GMachine$getFromStack, offset, gmachine));
	});
var $staeter$ziplist$ZipList$Zipper = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $staeter$ziplist$ZipList$new = F2(
	function (elem, list) {
		return A3($staeter$ziplist$ZipList$Zipper, _List_Nil, elem, list);
	});
var $elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$GMachine$enter = F2(
	function (global, gmachine) {
		var _v0 = global.gz;
		var first = _v0.a;
		var rest = _v0.b;
		var stack = $author$project$GMachine$getStack(gmachine);
		var newCtx = $author$project$GMachine$StackFrame(
			{
				dD: A2($staeter$ziplist$ZipList$new, first, rest),
				eW: global,
				di: $author$project$GMachine$getStack(gmachine)
			});
		var fPtr = A2(
			$elm$core$Maybe$withDefault,
			-99,
			$elm$core$List$head(stack));
		var args = A2(
			$elm$core$List$filterMap,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Result$toMaybe,
				$elm$core$Maybe$andThen($author$project$GMachine$getRightChild)),
			A2(
				$elm$core$List$map,
				function (addr) {
					return A2($author$project$GMachine$loadStackPointer, addr, gmachine);
				},
				A2($elm$core$List$range, 1, global.hO)));
		return _Utils_Tuple2(
			A2($author$project$GMachine$accessCtx.eh, newCtx, gmachine),
			$author$project$GMachine$EnteredCode(
				{i_: args, eW: global, jV: fPtr}));
	});
var $author$project$GMachine$NewNodeAllocated = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$GMachine$incNodeCounter = function (gmachine) {
	return _Utils_update(
		gmachine,
		{c9: gmachine.c9 + 1});
};
var $arturopala$elm_monocle$Monocle$Lens$modify = F2(
	function (lens, f) {
		var mf = function (a) {
			return function (b) {
				return A2(lens.eh, b, a);
			}(
				f(
					lens.eY(a)));
		};
		return mf;
	});
var $author$project$GMachine$push = function (node) {
	return A2(
		$arturopala$elm_monocle$Monocle$Lens$modify,
		$author$project$GMachine$stackLens,
		$elm$core$List$cons(node));
};
var $author$project$GMachine$updatePointer = F3(
	function (id, node, gmachine) {
		return _Utils_update(
			gmachine,
			{
				bJ: A3($elm$core$Dict$insert, id, node, gmachine.bJ)
			});
	});
var $author$project$GMachine$mkNodeAndPush = F2(
	function (node, gmachine) {
		var nodeId = gmachine.c9;
		return A3(
			$elm_community$basics_extra$Basics$Extra$flip,
			$elm$core$Tuple$pair,
			A2($author$project$GMachine$NewNodeAllocated, nodeId, node),
			A2(
				$author$project$GMachine$push,
				nodeId,
				$author$project$GMachine$incNodeCounter(
					A3($author$project$GMachine$updatePointer, nodeId, node, gmachine))));
	});
var $author$project$Backend$DIV = {$: 14};
var $author$project$Backend$EVAL = {$: 5};
var $author$project$Backend$Global = F3(
	function (name, numFormals, code) {
		return {gz: code, cn: name, hO: numFormals};
	});
var $author$project$Backend$divInt = A3(
	$author$project$Backend$Global,
	'/',
	2,
	A2(
		$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
		$author$project$Backend$PUSHARG(2),
		_List_fromArray(
			[
				$author$project$Backend$EVAL,
				$author$project$Backend$PUSHARG(2),
				$author$project$Backend$EVAL,
				$author$project$Backend$DIV,
				$author$project$Backend$UPDATE(3),
				$author$project$Backend$POP(2),
				$author$project$Backend$UNWIND
			])));
var $author$project$Backend$EQU = {$: 15};
var $author$project$Backend$equ = A3(
	$author$project$Backend$Global,
	'==',
	2,
	A2(
		$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
		$author$project$Backend$PUSHARG(2),
		_List_fromArray(
			[
				$author$project$Backend$EVAL,
				$author$project$Backend$PUSHARG(2),
				$author$project$Backend$EVAL,
				$author$project$Backend$EQU,
				$author$project$Backend$UPDATE(3),
				$author$project$Backend$POP(2),
				$author$project$Backend$UNWIND
			])));
var $author$project$Backend$JFALSE = function (a) {
	return {$: 17, a: a};
};
var $author$project$Backend$JUMP = function (a) {
	return {$: 18, a: a};
};
var $author$project$Backend$LABEL = function (a) {
	return {$: 16, a: a};
};
var $author$project$Backend$if_ = A3(
	$author$project$Backend$Global,
	'if',
	3,
	A2(
		$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
		$author$project$Backend$PUSHARG(1),
		_List_fromArray(
			[
				$author$project$Backend$EVAL,
				$author$project$Backend$JFALSE(1),
				$author$project$Backend$PUSHARG(3),
				$author$project$Backend$JUMP(2),
				$author$project$Backend$LABEL(1),
				$author$project$Backend$PUSHARG(4),
				$author$project$Backend$LABEL(2),
				$author$project$Backend$EVAL,
				$author$project$Backend$UPDATE(5),
				$author$project$Backend$POP(4),
				$author$project$Backend$UNWIND
			])));
var $author$project$Backend$SUB = {$: 12};
var $author$project$Backend$minusInt = A3(
	$author$project$Backend$Global,
	'-',
	2,
	A2(
		$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
		$author$project$Backend$PUSHARG(2),
		_List_fromArray(
			[
				$author$project$Backend$EVAL,
				$author$project$Backend$PUSHARG(2),
				$author$project$Backend$EVAL,
				$author$project$Backend$SUB,
				$author$project$Backend$UPDATE(3),
				$author$project$Backend$POP(2),
				$author$project$Backend$UNWIND
			])));
var $author$project$Backend$MUL = {$: 13};
var $author$project$Backend$multInt = A3(
	$author$project$Backend$Global,
	'*',
	2,
	A2(
		$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
		$author$project$Backend$PUSHARG(2),
		_List_fromArray(
			[
				$author$project$Backend$EVAL,
				$author$project$Backend$PUSHARG(2),
				$author$project$Backend$EVAL,
				$author$project$Backend$MUL,
				$author$project$Backend$UPDATE(3),
				$author$project$Backend$POP(2),
				$author$project$Backend$UNWIND
			])));
var $author$project$Backend$ADD = {$: 11};
var $author$project$Backend$plusInt = A3(
	$author$project$Backend$Global,
	'+',
	2,
	A2(
		$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
		$author$project$Backend$PUSHARG(2),
		_List_fromArray(
			[
				$author$project$Backend$EVAL,
				$author$project$Backend$PUSHARG(2),
				$author$project$Backend$EVAL,
				$author$project$Backend$ADD,
				$author$project$Backend$UPDATE(3),
				$author$project$Backend$POP(2),
				$author$project$Backend$UNWIND
			])));
var $author$project$Backend$stdLib = A3(
	$elm$core$List$foldl,
	function (def) {
		return A2($elm$core$Dict$insert, def.cn, def);
	},
	$author$project$Backend$emptyEnv,
	_List_fromArray(
		[$author$project$Backend$plusInt, $author$project$Backend$minusInt, $author$project$Backend$multInt, $author$project$Backend$divInt, $author$project$Backend$equ, $author$project$Backend$if_]));
var $author$project$GMachine$setup = F2(
	function (env, mainFunction) {
		return A2(
			$author$project$GMachine$andThen,
			$author$project$GMachine$enter(mainFunction),
			A2(
				$author$project$GMachine$mkNodeAndPush,
				$author$project$GMachine$GFunc(mainFunction),
				{
					eL: $author$project$Backend$stdLib,
					b7: $author$project$GMachine$Unwinding(_List_Nil),
					be: _List_Nil,
					eU: env,
					bJ: $elm$core$Dict$empty,
					c9: 0
				}));
	});
var $author$project$GMachine$createMachine = function (source) {
	return A2(
		$elm$core$Result$andThen,
		function (env) {
			var _v0 = A2($elm$core$Dict$get, 'main', env);
			if (!_v0.$) {
				var mainFunction = _v0.a;
				return (!(!mainFunction.hO)) ? $elm$core$Result$Err($author$project$Backend$MainFunctionCannotHaveFormals) : $elm$core$Result$Ok(
					A2($author$project$GMachine$setup, env, mainFunction));
			} else {
				return $elm$core$Result$Err($author$project$Backend$CannotFindMainFunction);
			}
		},
		$author$project$Backend$compile(source));
};
var $author$project$Main$Running = function (a) {
	return {$: 1, a: a};
};
var $elm_community$graph$Graph$Graph = $elm$core$Basics$identity;
var $elm_community$intdict$IntDict$Empty = {$: 0};
var $elm_community$intdict$IntDict$empty = $elm_community$intdict$IntDict$Empty;
var $elm_community$graph$Graph$empty = $elm_community$intdict$IntDict$empty;
var $gampleman$elm_visualization$Force$State = $elm$core$Basics$identity;
var $elm$core$Basics$pow = _Basics_pow;
var $gampleman$elm_visualization$Force$simulation = function (forces) {
	return {
		b2: 1.0,
		eB: 1 - A2($elm$core$Basics$pow, 0.001, 1 / 300),
		gt: 0.0,
		gS: forces,
		fp: 0.001,
		dv: 0.6
	};
};
var $author$project$GMachine$GHole = {$: 3};
var $author$project$Main$accessNode = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function ($) {
		return $.bm;
	},
	F2(
		function (n, ctx) {
			return _Utils_update(
				ctx,
				{bm: n});
		}));
var $author$project$Main$nodeToEntity = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function ($) {
		return $.ar;
	},
	F2(
		function (e, n) {
			return _Utils_update(
				n,
				{ar: e});
		}));
var $author$project$Main$accessEntity = A2($arturopala$elm_monocle$Monocle$Lens$compose, $author$project$Main$accessNode, $author$project$Main$nodeToEntity);
var $author$project$Main$accessLayout = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function ($) {
		return $.as;
	},
	F2(
		function (l, m) {
			return _Utils_update(
				m,
				{as: l});
		}));
var $elm_community$intdict$IntDict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			switch (dict.$) {
				case 0:
					return acc;
				case 1:
					var l = dict.a;
					return A3(f, l.ha, l.iz, acc);
				default:
					var i = dict.a;
					var $temp$f = f,
						$temp$acc = A3($elm_community$intdict$IntDict$foldl, f, acc, i.f),
						$temp$dict = i.g;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldl;
			}
		}
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm_community$intdict$IntDict$Inner = function (a) {
	return {$: 2, a: a};
};
var $elm_community$intdict$IntDict$size = function (dict) {
	switch (dict.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		default:
			var i = dict.a;
			return i.ei;
	}
};
var $elm_community$intdict$IntDict$inner = F3(
	function (p, l, r) {
		var _v0 = _Utils_Tuple2(l, r);
		if (!_v0.a.$) {
			var _v1 = _v0.a;
			return r;
		} else {
			if (!_v0.b.$) {
				var _v2 = _v0.b;
				return l;
			} else {
				return $elm_community$intdict$IntDict$Inner(
					{
						f: l,
						cu: p,
						g: r,
						ei: $elm_community$intdict$IntDict$size(l) + $elm_community$intdict$IntDict$size(r)
					});
			}
		}
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm_community$intdict$IntDict$highestBitSet = function (n) {
	var shiftOr = F2(
		function (i, shift) {
			return i | (i >>> shift);
		});
	var n1 = A2(shiftOr, n, 1);
	var n2 = A2(shiftOr, n1, 2);
	var n3 = A2(shiftOr, n2, 4);
	var n4 = A2(shiftOr, n3, 8);
	var n5 = A2(shiftOr, n4, 16);
	return n5 & (~(n5 >>> 1));
};
var $elm_community$intdict$IntDict$signBit = $elm_community$intdict$IntDict$highestBitSet(-1);
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm_community$intdict$IntDict$isBranchingBitSet = function (p) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$Bitwise$xor($elm_community$intdict$IntDict$signBit),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Bitwise$and(p.b4),
			$elm$core$Basics$neq(0)));
};
var $elm_community$intdict$IntDict$higherBitMask = function (branchingBit) {
	return branchingBit ^ (~(branchingBit - 1));
};
var $elm_community$intdict$IntDict$lcp = F2(
	function (x, y) {
		var branchingBit = $elm_community$intdict$IntDict$highestBitSet(x ^ y);
		var mask = $elm_community$intdict$IntDict$higherBitMask(branchingBit);
		var prefixBits = x & mask;
		return {b4: branchingBit, aO: prefixBits};
	});
var $elm_community$intdict$IntDict$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm_community$intdict$IntDict$leaf = F2(
	function (k, v) {
		return $elm_community$intdict$IntDict$Leaf(
			{ha: k, iz: v});
	});
var $elm_community$intdict$IntDict$prefixMatches = F2(
	function (p, n) {
		return _Utils_eq(
			n & $elm_community$intdict$IntDict$higherBitMask(p.b4),
			p.aO);
	});
var $elm_community$intdict$IntDict$update = F3(
	function (key, alter, dict) {
		var join = F2(
			function (_v2, _v3) {
				var k1 = _v2.a;
				var l = _v2.b;
				var k2 = _v3.a;
				var r = _v3.b;
				var prefix = A2($elm_community$intdict$IntDict$lcp, k1, k2);
				return A2($elm_community$intdict$IntDict$isBranchingBitSet, prefix, k2) ? A3($elm_community$intdict$IntDict$inner, prefix, l, r) : A3($elm_community$intdict$IntDict$inner, prefix, r, l);
			});
		var alteredNode = function (mv) {
			var _v1 = alter(mv);
			if (!_v1.$) {
				var v = _v1.a;
				return A2($elm_community$intdict$IntDict$leaf, key, v);
			} else {
				return $elm_community$intdict$IntDict$empty;
			}
		};
		switch (dict.$) {
			case 0:
				return alteredNode($elm$core$Maybe$Nothing);
			case 1:
				var l = dict.a;
				return _Utils_eq(l.ha, key) ? alteredNode(
					$elm$core$Maybe$Just(l.iz)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode($elm$core$Maybe$Nothing)),
					_Utils_Tuple2(l.ha, dict));
			default:
				var i = dict.a;
				return A2($elm_community$intdict$IntDict$prefixMatches, i.cu, key) ? (A2($elm_community$intdict$IntDict$isBranchingBitSet, i.cu, key) ? A3(
					$elm_community$intdict$IntDict$inner,
					i.cu,
					i.f,
					A3($elm_community$intdict$IntDict$update, key, alter, i.g)) : A3(
					$elm_community$intdict$IntDict$inner,
					i.cu,
					A3($elm_community$intdict$IntDict$update, key, alter, i.f),
					i.g)) : A2(
					join,
					_Utils_Tuple2(
						key,
						alteredNode($elm$core$Maybe$Nothing)),
					_Utils_Tuple2(i.cu.aO, dict));
		}
	});
var $elm_community$graph$Graph$applyEdgeDiff = F3(
	function (nodeId, diff, graphRep) {
		var updateOutgoingEdge = F2(
			function (upd, node) {
				return _Utils_update(
					node,
					{
						fz: A3($elm_community$intdict$IntDict$update, nodeId, upd, node.fz)
					});
			});
		var updateIncomingEdge = F2(
			function (upd, node) {
				return _Utils_update(
					node,
					{
						g4: A3($elm_community$intdict$IntDict$update, nodeId, upd, node.g4)
					});
			});
		var flippedFoldl = F3(
			function (f, dict, acc) {
				return A3($elm_community$intdict$IntDict$foldl, f, acc, dict);
			});
		var edgeUpdateToMaybe = function (edgeUpdate) {
			if (!edgeUpdate.$) {
				var lbl = edgeUpdate.a;
				return $elm$core$Maybe$Just(lbl);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var updateAdjacency = F3(
			function (updateEdge, updatedId, edgeUpdate) {
				var updateLbl = updateEdge(
					$elm$core$Basics$always(
						edgeUpdateToMaybe(edgeUpdate)));
				return A2(
					$elm_community$intdict$IntDict$update,
					updatedId,
					$elm$core$Maybe$map(updateLbl));
			});
		return A3(
			flippedFoldl,
			updateAdjacency(updateOutgoingEdge),
			diff.fz,
			A3(
				flippedFoldl,
				updateAdjacency(updateIncomingEdge),
				diff.g4,
				graphRep));
	});
var $elm_community$graph$Graph$Insert = function (a) {
	return {$: 0, a: a};
};
var $elm_community$graph$Graph$Remove = function (a) {
	return {$: 1, a: a};
};
var $elm_community$graph$Graph$crashHack = function (msg) {
	crashHack:
	while (true) {
		var $temp$msg = msg;
		msg = $temp$msg;
		continue crashHack;
	}
};
var $elm_community$graph$Graph$emptyDiff = {g4: $elm_community$intdict$IntDict$empty, fz: $elm_community$intdict$IntDict$empty};
var $elm_community$graph$Graph$computeEdgeDiff = F2(
	function (old, _new) {
		var collectUpdates = F3(
			function (edgeUpdate, updatedId, label) {
				var replaceUpdate = function (old_) {
					var _v5 = _Utils_Tuple2(
						old_,
						edgeUpdate(label));
					if (!_v5.a.$) {
						if (_v5.a.a.$ === 1) {
							if (!_v5.b.$) {
								var oldLbl = _v5.a.a.a;
								var newLbl = _v5.b.a;
								return _Utils_eq(oldLbl, newLbl) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
									$elm_community$graph$Graph$Insert(newLbl));
							} else {
								return $elm_community$graph$Graph$crashHack('Graph.computeEdgeDiff: Collected two removals for the same edge. This is an error in the implementation of Graph and you should file a bug report!');
							}
						} else {
							return $elm_community$graph$Graph$crashHack('Graph.computeEdgeDiff: Collected inserts before removals. This is an error in the implementation of Graph and you should file a bug report!');
						}
					} else {
						var _v6 = _v5.a;
						var eu = _v5.b;
						return $elm$core$Maybe$Just(eu);
					}
				};
				return A2($elm_community$intdict$IntDict$update, updatedId, replaceUpdate);
			});
		var collect = F3(
			function (edgeUpdate, adj, updates) {
				return A3(
					$elm_community$intdict$IntDict$foldl,
					collectUpdates(edgeUpdate),
					updates,
					adj);
			});
		var _v0 = _Utils_Tuple2(old, _new);
		if (_v0.a.$ === 1) {
			if (_v0.b.$ === 1) {
				var _v1 = _v0.a;
				var _v2 = _v0.b;
				return $elm_community$graph$Graph$emptyDiff;
			} else {
				var _v4 = _v0.a;
				var ins = _v0.b.a;
				return {
					g4: A3(collect, $elm_community$graph$Graph$Insert, ins.fz, $elm_community$intdict$IntDict$empty),
					fz: A3(collect, $elm_community$graph$Graph$Insert, ins.g4, $elm_community$intdict$IntDict$empty)
				};
			}
		} else {
			if (_v0.b.$ === 1) {
				var rem = _v0.a.a;
				var _v3 = _v0.b;
				return {
					g4: A3(collect, $elm_community$graph$Graph$Remove, rem.fz, $elm_community$intdict$IntDict$empty),
					fz: A3(collect, $elm_community$graph$Graph$Remove, rem.g4, $elm_community$intdict$IntDict$empty)
				};
			} else {
				var rem = _v0.a.a;
				var ins = _v0.b.a;
				return _Utils_eq(rem, ins) ? $elm_community$graph$Graph$emptyDiff : {
					g4: A3(
						collect,
						$elm_community$graph$Graph$Insert,
						ins.fz,
						A3(collect, $elm_community$graph$Graph$Remove, rem.fz, $elm_community$intdict$IntDict$empty)),
					fz: A3(
						collect,
						$elm_community$graph$Graph$Insert,
						ins.g4,
						A3(collect, $elm_community$graph$Graph$Remove, rem.g4, $elm_community$intdict$IntDict$empty))
				};
			}
		}
	});
var $elm_community$intdict$IntDict$insert = F3(
	function (key, value, dict) {
		return A3(
			$elm_community$intdict$IntDict$update,
			key,
			$elm$core$Basics$always(
				$elm$core$Maybe$Just(value)),
			dict);
	});
var $elm_community$intdict$IntDict$filter = F2(
	function (predicate, dict) {
		var add = F3(
			function (k, v, d) {
				return A2(predicate, k, v) ? A3($elm_community$intdict$IntDict$insert, k, v, d) : d;
			});
		return A3($elm_community$intdict$IntDict$foldl, add, $elm_community$intdict$IntDict$empty, dict);
	});
var $elm_community$intdict$IntDict$get = F2(
	function (key, dict) {
		get:
		while (true) {
			switch (dict.$) {
				case 0:
					return $elm$core$Maybe$Nothing;
				case 1:
					var l = dict.a;
					return _Utils_eq(l.ha, key) ? $elm$core$Maybe$Just(l.iz) : $elm$core$Maybe$Nothing;
				default:
					var i = dict.a;
					if (!A2($elm_community$intdict$IntDict$prefixMatches, i.cu, key)) {
						return $elm$core$Maybe$Nothing;
					} else {
						if (A2($elm_community$intdict$IntDict$isBranchingBitSet, i.cu, key)) {
							var $temp$key = key,
								$temp$dict = i.g;
							key = $temp$key;
							dict = $temp$dict;
							continue get;
						} else {
							var $temp$key = key,
								$temp$dict = i.f;
							key = $temp$key;
							dict = $temp$dict;
							continue get;
						}
					}
			}
		}
	});
var $elm_community$intdict$IntDict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm_community$intdict$IntDict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm_community$graph$Graph$unGraph = function (graph) {
	var rep = graph;
	return rep;
};
var $elm_community$graph$Graph$update = F2(
	function (nodeId, updater) {
		var wrappedUpdater = function (rep) {
			var old = A2($elm_community$intdict$IntDict$get, nodeId, rep);
			var filterInvalidEdges = function (ctx) {
				return $elm_community$intdict$IntDict$filter(
					F2(
						function (id, _v0) {
							return _Utils_eq(id, ctx.bm.cg) || A2($elm_community$intdict$IntDict$member, id, rep);
						}));
			};
			var cleanUpEdges = function (ctx) {
				return _Utils_update(
					ctx,
					{
						g4: A2(filterInvalidEdges, ctx, ctx.g4),
						fz: A2(filterInvalidEdges, ctx, ctx.fz)
					});
			};
			var _new = A2(
				$elm$core$Maybe$map,
				cleanUpEdges,
				updater(old));
			var diff = A2($elm_community$graph$Graph$computeEdgeDiff, old, _new);
			return A3(
				$elm_community$intdict$IntDict$update,
				nodeId,
				$elm$core$Basics$always(_new),
				A3($elm_community$graph$Graph$applyEdgeDiff, nodeId, diff, rep));
		};
		return A2(
			$elm$core$Basics$composeR,
			$elm_community$graph$Graph$unGraph,
			A2($elm$core$Basics$composeR, wrappedUpdater, $elm$core$Basics$identity));
	});
var $elm_community$graph$Graph$remove = F2(
	function (nodeId, graph) {
		return A3(
			$elm_community$graph$Graph$update,
			nodeId,
			$elm$core$Basics$always($elm$core$Maybe$Nothing),
			graph);
	});
var $elm_community$graph$Graph$edges = function (graph) {
	var flippedFoldl = F3(
		function (f, dict, list) {
			return A3($elm_community$intdict$IntDict$foldl, f, list, dict);
		});
	var prependEdges = F2(
		function (node1, ctx) {
			return A2(
				flippedFoldl,
				F2(
					function (node2, e) {
						return $elm$core$List$cons(
							{c$: node1, ar: e, dn: node2});
					}),
				ctx.fz);
		});
	return A3(
		flippedFoldl,
		prependEdges,
		$elm_community$graph$Graph$unGraph(graph),
		_List_Nil);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $gampleman$elm_rosetree$Tree$Continue = function (a) {
	return {$: 0, a: a};
};
var $gampleman$elm_rosetree$Tree$depthFirstFoldHelp = F5(
	function (f, acc, parents, trees, nextSets) {
		depthFirstFoldHelp:
		while (true) {
			if (!trees.b) {
				if (nextSets.b) {
					var _v2 = nextSets.a;
					var p = _v2.a;
					var set = _v2.b;
					var sets = nextSets.b;
					var $temp$f = f,
						$temp$acc = acc,
						$temp$parents = p,
						$temp$trees = set,
						$temp$nextSets = sets;
					f = $temp$f;
					acc = $temp$acc;
					parents = $temp$parents;
					trees = $temp$trees;
					nextSets = $temp$nextSets;
					continue depthFirstFoldHelp;
				} else {
					return acc;
				}
			} else {
				var _v3 = trees.a;
				var d = _v3.a;
				var ch = _v3.b;
				var rest = trees.b;
				var _v4 = A4(f, acc, parents, d, ch);
				if (!_v4.$) {
					var a = _v4.a;
					if (!ch.b) {
						var $temp$f = f,
							$temp$acc = a,
							$temp$parents = parents,
							$temp$trees = rest,
							$temp$nextSets = nextSets;
						f = $temp$f;
						acc = $temp$acc;
						parents = $temp$parents;
						trees = $temp$trees;
						nextSets = $temp$nextSets;
						continue depthFirstFoldHelp;
					} else {
						var xs = ch;
						var $temp$f = f,
							$temp$acc = a,
							$temp$parents = A2($elm$core$List$cons, d, parents),
							$temp$trees = xs,
							$temp$nextSets = A2(
							$elm$core$List$cons,
							_Utils_Tuple2(parents, rest),
							nextSets);
						f = $temp$f;
						acc = $temp$acc;
						parents = $temp$parents;
						trees = $temp$trees;
						nextSets = $temp$nextSets;
						continue depthFirstFoldHelp;
					}
				} else {
					var a = _v4.a;
					return a;
				}
			}
		}
	});
var $gampleman$elm_rosetree$Tree$depthFirstFold = F3(
	function (f, acc, t) {
		return A5(
			$gampleman$elm_rosetree$Tree$depthFirstFoldHelp,
			f,
			acc,
			_List_Nil,
			_List_fromArray(
				[t]),
			_List_Nil);
	});
var $gampleman$elm_rosetree$Tree$foldl = F3(
	function (f, acc, t) {
		return A3(
			$gampleman$elm_rosetree$Tree$depthFirstFold,
			F4(
				function (s, _v0, l, _v1) {
					return $gampleman$elm_rosetree$Tree$Continue(
						A2(f, l, s));
				}),
			acc,
			t);
	});
var $gampleman$elm_rosetree$Tree$breadthFirstFoldHelp = F5(
	function (f, acc, parents, trees, nextSets) {
		breadthFirstFoldHelp:
		while (true) {
			if (!trees.b) {
				if (nextSets.b) {
					var _v2 = nextSets.a;
					var p = _v2.a;
					var set = _v2.b;
					var sets = nextSets.b;
					var $temp$f = f,
						$temp$acc = acc,
						$temp$parents = p,
						$temp$trees = set,
						$temp$nextSets = sets;
					f = $temp$f;
					acc = $temp$acc;
					parents = $temp$parents;
					trees = $temp$trees;
					nextSets = $temp$nextSets;
					continue breadthFirstFoldHelp;
				} else {
					return acc;
				}
			} else {
				var _v3 = trees.a;
				var d = _v3.a;
				var ch = _v3.b;
				var rest = trees.b;
				var _v4 = A4(f, acc, parents, d, ch);
				if (!_v4.$) {
					var a = _v4.a;
					if (!ch.b) {
						var $temp$f = f,
							$temp$acc = a,
							$temp$parents = parents,
							$temp$trees = rest,
							$temp$nextSets = nextSets;
						f = $temp$f;
						acc = $temp$acc;
						parents = $temp$parents;
						trees = $temp$trees;
						nextSets = $temp$nextSets;
						continue breadthFirstFoldHelp;
					} else {
						var xs = ch;
						var $temp$f = f,
							$temp$acc = a,
							$temp$parents = parents,
							$temp$trees = rest,
							$temp$nextSets = A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								A2($elm$core$List$cons, d, parents),
								xs),
							nextSets);
						f = $temp$f;
						acc = $temp$acc;
						parents = $temp$parents;
						trees = $temp$trees;
						nextSets = $temp$nextSets;
						continue breadthFirstFoldHelp;
					}
				} else {
					var a = _v4.a;
					return a;
				}
			}
		}
	});
var $gampleman$elm_rosetree$Tree$breadthFirstFold = F3(
	function (f, acc, t) {
		return A5(
			$gampleman$elm_rosetree$Tree$breadthFirstFoldHelp,
			f,
			acc,
			_List_Nil,
			_List_fromArray(
				[t]),
			_List_Nil);
	});
var $gampleman$elm_rosetree$Tree$links = function (t) {
	return $elm$core$List$reverse(
		A3(
			$gampleman$elm_rosetree$Tree$breadthFirstFold,
			F4(
				function (s, a, l, _v0) {
					if (a.b) {
						var parent = a.a;
						return $gampleman$elm_rosetree$Tree$Continue(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(parent, l),
								s));
					} else {
						return $gampleman$elm_rosetree$Tree$Continue(s);
					}
				}),
			_List_Nil,
			t));
};
var $author$project$GMachine$mainRedexRoot = 0;
var $gampleman$elm_visualization$Hierarchy$NodeSize = function (a) {
	return {$: 4, a: a};
};
var $gampleman$elm_visualization$Hierarchy$nodeSize = $gampleman$elm_visualization$Hierarchy$NodeSize;
var $author$project$Main$nodeSize = 10;
var $gampleman$elm_visualization$Hierarchy$ParentChildMargin = function (a) {
	return {$: 2, a: a};
};
var $gampleman$elm_visualization$Hierarchy$parentChildMargin = $gampleman$elm_visualization$Hierarchy$ParentChildMargin;
var $gampleman$elm_visualization$Hierarchy$PeerMargin = function (a) {
	return {$: 3, a: a};
};
var $gampleman$elm_visualization$Hierarchy$peerMargin = $gampleman$elm_visualization$Hierarchy$PeerMargin;
var $author$project$Main$Left = 0;
var $gampleman$elm_rosetree$Tree$Tree = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm_community$graph$Graph$get = function (nodeId) {
	return A2(
		$elm$core$Basics$composeR,
		$elm_community$graph$Graph$unGraph,
		$elm_community$intdict$IntDict$get(nodeId));
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm_community$intdict$IntDict$foldr = F3(
	function (f, acc, dict) {
		foldr:
		while (true) {
			switch (dict.$) {
				case 0:
					return acc;
				case 1:
					var l = dict.a;
					return A3(f, l.ha, l.iz, acc);
				default:
					var i = dict.a;
					var $temp$f = f,
						$temp$acc = A3($elm_community$intdict$IntDict$foldr, f, acc, i.g),
						$temp$dict = i.f;
					f = $temp$f;
					acc = $temp$acc;
					dict = $temp$dict;
					continue foldr;
			}
		}
	});
var $elm_community$intdict$IntDict$toList = function (dict) {
	return A3(
		$elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $author$project$Main$takeTree = F3(
	function (root, seen, graph) {
		if (A2($elm$core$Set$member, root, seen)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm_community$graph$Graph$get, root, graph);
			if (!_v0.$) {
				var node = _v0.a.bm;
				var outgoing = _v0.a.fz;
				var children = A2(
					$elm$core$List$map,
					$elm$core$Tuple$first,
					A2(
						$elm$core$List$sortBy,
						function (_v1) {
							var side = _v1.b;
							return (!side) ? 0 : 1;
						},
						$elm_community$intdict$IntDict$toList(outgoing)));
				return $elm$core$Maybe$Just(
					A2(
						$gampleman$elm_rosetree$Tree$Tree,
						node.cg,
						A2(
							$elm$core$List$filterMap,
							function (child) {
								return A3(
									$author$project$Main$takeTree,
									child,
									A2($elm$core$Set$insert, root, seen),
									graph);
							},
							children)));
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}
	});
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData = F2(
	function (l, id) {
		return A2($elm$core$Array$get, id, l);
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData = F3(
	function (fn, id, l) {
		var _v0 = A2($elm$core$Array$get, id, l);
		if (!_v0.$) {
			var td = _v0.a;
			return A3(
				$elm$core$Array$set,
				id,
				fn(td),
				l);
		} else {
			return l;
		}
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$addChildSpacing = F2(
	function (children, layout_) {
		return function (_v2) {
			var a = _v2.a;
			return a;
		}(
			A3(
				$elm$core$Array$foldl,
				F2(
					function (idx, _v0) {
						var lay = _v0.a;
						var speed = _v0.b;
						var delta = _v0.c;
						var _v1 = A2(
							$elm$core$Maybe$withDefault,
							_Utils_Tuple2(0, 0),
							A2(
								$elm$core$Maybe$map,
								function (c) {
									return _Utils_Tuple2(c.bu, c.cx);
								},
								A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, idx)));
						var childShiftAcceleration = _v1.a;
						var shiftChange = _v1.b;
						return _Utils_Tuple3(
							A3(
								$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
								function (child) {
									return _Utils_update(
										child,
										{q: (((child.q + speed) + childShiftAcceleration) + delta) + shiftChange, bu: 0, cx: 0});
								},
								idx,
								lay),
							speed + childShiftAcceleration,
							((delta + speed) + childShiftAcceleration) + shiftChange);
					}),
				_Utils_Tuple3(layout_, 0, 0),
				children));
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$derefBottom = F2(
	function (id, l) {
		return A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Maybe$map,
				function (_v0) {
					var height = _v0.bL;
					var y = _v0.R;
					return height + y;
				},
				A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, l, id)));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{J: nodeList, B: nodeListSize, F: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $gampleman$elm_rosetree$Tree$tree = $gampleman$elm_rosetree$Tree$Tree;
var $gampleman$elm_rosetree$Tree$defaultBottomUp = F4(
	function (s, _v0, l, c) {
		return _Utils_Tuple2(
			s,
			A2($gampleman$elm_rosetree$Tree$tree, l, c));
	});
var $gampleman$elm_rosetree$Tree$depthFirstTraversalHelp = F5(
	function (fLabel, fTree, state, acc, stack) {
		depthFirstTraversalHelp:
		while (true) {
			var _v0 = acc.cE;
			if (!_v0.b) {
				var _v1 = A4(
					fTree,
					state,
					A2(
						$elm$core$List$map,
						function ($) {
							return $.ar;
						},
						stack),
					acc.ar,
					$elm$core$List$reverse(acc.H));
				var state_ = _v1.a;
				var node = _v1.b;
				if (!stack.b) {
					return _Utils_Tuple2(state_, node);
				} else {
					var top = stack.a;
					var rest = stack.b;
					var $temp$fLabel = fLabel,
						$temp$fTree = fTree,
						$temp$state = state_,
						$temp$acc = _Utils_update(
						top,
						{
							H: A2($elm$core$List$cons, node, top.H)
						}),
						$temp$stack = rest;
					fLabel = $temp$fLabel;
					fTree = $temp$fTree;
					state = $temp$state;
					acc = $temp$acc;
					stack = $temp$stack;
					continue depthFirstTraversalHelp;
				}
			} else {
				var _v3 = _v0.a;
				var l = _v3.a;
				var chs = _v3.b;
				var rest = _v0.b;
				var ancestors = A2(
					$elm$core$List$cons,
					acc.ar,
					A2(
						$elm$core$List$map,
						function ($) {
							return $.ar;
						},
						stack));
				var _v4 = A4(fLabel, state, ancestors, l, chs);
				var state0 = _v4.a;
				var label_ = _v4.b;
				var children_ = _v4.c;
				if (!children_.b) {
					var _v6 = A4(fTree, state0, ancestors, label_, _List_Nil);
					var state_ = _v6.a;
					var newTree = _v6.b;
					var $temp$fLabel = fLabel,
						$temp$fTree = fTree,
						$temp$state = state_,
						$temp$acc = _Utils_update(
						acc,
						{
							H: A2($elm$core$List$cons, newTree, acc.H),
							cE: rest
						}),
						$temp$stack = stack;
					fLabel = $temp$fLabel;
					fTree = $temp$fTree;
					state = $temp$state;
					acc = $temp$acc;
					stack = $temp$stack;
					continue depthFirstTraversalHelp;
				} else {
					var cs = children_;
					var $temp$fLabel = fLabel,
						$temp$fTree = fTree,
						$temp$state = state0,
						$temp$acc = {H: _List_Nil, ar: label_, cE: cs},
						$temp$stack = A2(
						$elm$core$List$cons,
						_Utils_update(
							acc,
							{cE: rest}),
						stack);
					fLabel = $temp$fLabel;
					fTree = $temp$fTree;
					state = $temp$state;
					acc = $temp$acc;
					stack = $temp$stack;
					continue depthFirstTraversalHelp;
				}
			}
		}
	});
var $gampleman$elm_rosetree$Tree$depthFirstTraversal = F4(
	function (convertLabel, convertTree, s, _v0) {
		var l = _v0.a;
		var c = _v0.b;
		var _v1 = A4(convertLabel, s, _List_Nil, l, c);
		var state_ = _v1.a;
		var label_ = _v1.b;
		var children_ = _v1.c;
		return A5(
			$gampleman$elm_rosetree$Tree$depthFirstTraversalHelp,
			convertLabel,
			convertTree,
			state_,
			{H: _List_Nil, ar: label_, cE: children_},
			_List_Nil);
	});
var $gampleman$elm_rosetree$Tree$mapAccumulate = F3(
	function (f, state, t) {
		return A4(
			$gampleman$elm_rosetree$Tree$depthFirstTraversal,
			F4(
				function (s, _v0, l, c) {
					var _v1 = A2(f, s, l);
					var s_ = _v1.a;
					var l_ = _v1.b;
					return _Utils_Tuple3(s_, l_, c);
				}),
			$gampleman$elm_rosetree$Tree$defaultBottomUp,
			state,
			t);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $gampleman$elm_rosetree$Tree$indexedMap = F2(
	function (f, t) {
		return A3(
			$gampleman$elm_rosetree$Tree$mapAccumulate,
			F2(
				function (idx, elem) {
					return _Utils_Tuple2(
						idx + 1,
						A2(f, idx, elem));
				}),
			0,
			t).b;
	});
var $gampleman$elm_rosetree$Tree$label = function (_v0) {
	var v = _v0.a;
	return v;
};
var $gampleman$elm_visualization$Hierarchy$Tidy$initialize = F2(
	function (nodeSize, tree) {
		return $elm$core$Array$fromList(
			A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.cg;
				},
				A3(
					$gampleman$elm_rosetree$Tree$depthFirstFold,
					F4(
						function (lst, _v0, node, children) {
							var _v1 = nodeSize(node.b);
							var w = _v1.a;
							var h = _v1.b;
							return $gampleman$elm_rosetree$Tree$Continue(
								A2(
									$elm$core$List$cons,
									{
										jn: $elm$core$Array$fromList(
											A2(
												$elm$core$List$map,
												A2($elm$core$Basics$composeR, $gampleman$elm_rosetree$Tree$label, $elm$core$Tuple$first),
												children)),
										a0: -1,
										a1: -1,
										bL: h,
										cg: node.a,
										bj: 0,
										bk: 0,
										d1: 0,
										d2: 0,
										q: 0,
										br: 0,
										h8: 0,
										bu: 0,
										cx: 0,
										eq: -1,
										er: -1,
										iz: node.b,
										cI: w,
										z: 0,
										R: 0
									},
									lst));
						}),
					_List_Nil,
					A2($gampleman$elm_rosetree$Tree$indexedMap, $elm$core$Tuple$pair, tree))));
	});
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$positionRoot = F2(
	function (nodeId, lay) {
		var _v0 = A2(
			$elm$core$Maybe$andThen,
			function (c) {
				return A3(
					$elm$core$Maybe$map2,
					$elm$core$Tuple$pair,
					A2(
						$elm$core$Maybe$andThen,
						$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
						A2($elm$core$Array$get, 0, c)),
					A2(
						$elm$core$Maybe$andThen,
						$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
						A2(
							$elm$core$Array$get,
							$elm$core$Array$length(c) - 1,
							c)));
			},
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.jn;
				},
				A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, nodeId)));
		if (!_v0.$) {
			var _v1 = _v0.a;
			var first = _v1.a;
			var last = _v1.b;
			var relativeX = (((first.br + first.q) + last.br) + last.q) / 2;
			return A3(
				$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
				function (self) {
					return _Utils_update(
						self,
						{q: -relativeX, br: relativeX});
				},
				nodeId,
				lay);
		} else {
			return lay;
		}
	});
var $elm$core$Array$isEmpty = function (_v0) {
	var len = _v0.a;
	return !len;
};
var $gampleman$elm_visualization$Hierarchy$Tidy$refToMaybe = F2(
	function (ref, lay) {
		return ((ref >= 0) && (_Utils_cmp(
			ref,
			$elm$core$Array$length(lay)) < 0)) ? $elm$core$Maybe$Just(ref) : $elm$core$Maybe$Nothing;
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$contourNext = F2(
	function (lay, contour) {
		var node = contour.bm;
		var isLeft = contour.g9;
		var modifierSum = contour.at;
		var _v0 = A2(
			$elm$core$Maybe$andThen,
			$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
			node);
		if (!_v0.$) {
			var current = _v0.a;
			if (isLeft) {
				if ($elm$core$Array$isEmpty(current.jn)) {
					return _Utils_update(
						contour,
						{
							at: modifierSum + current.d1,
							bm: A2($gampleman$elm_visualization$Hierarchy$Tidy$refToMaybe, current.eq, lay)
						});
				} else {
					var newNode = A2($elm$core$Array$get, 0, current.jn);
					var mod = A2(
						$elm$core$Maybe$withDefault,
						0,
						A2(
							$elm$core$Maybe$map,
							function (c) {
								return c.q;
							},
							A2(
								$elm$core$Maybe$andThen,
								$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
								newNode)));
					return _Utils_update(
						contour,
						{at: modifierSum + mod, bm: newNode});
				}
			} else {
				if ($elm$core$Array$isEmpty(current.jn)) {
					return _Utils_update(
						contour,
						{
							at: modifierSum + current.d2,
							bm: A2($gampleman$elm_visualization$Hierarchy$Tidy$refToMaybe, current.er, lay)
						});
				} else {
					var newNode = A2(
						$elm$core$Array$get,
						$elm$core$Array$length(current.jn) - 1,
						current.jn);
					var mod = A2(
						$elm$core$Maybe$withDefault,
						0,
						A2(
							$elm$core$Maybe$map,
							function (c) {
								return c.q;
							},
							A2(
								$elm$core$Maybe$andThen,
								$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
								newNode)));
					return _Utils_update(
						contour,
						{at: modifierSum + mod, bm: newNode});
				}
			}
		} else {
			return contour;
		}
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$moveSubtree = F5(
	function (currentIndex, fromMaybe, currentId, dist, lay) {
		if (!fromMaybe.$) {
			var from = fromMaybe.a;
			if (!_Utils_eq(from.j3, currentIndex - 1)) {
				var normDist = dist / (currentIndex - from.j3);
				return A3(
					$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
					function (from_) {
						return _Utils_update(
							from_,
							{bu: from_.bu + normDist});
					},
					from.cg,
					A3(
						$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
						function (current) {
							return _Utils_update(
								current,
								{q: current.q + dist, bu: current.bu - normDist, cx: current.cx - (dist - normDist)});
						},
						currentId,
						lay));
			} else {
				return A3(
					$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
					function (current) {
						return _Utils_update(
							current,
							{q: current.q + dist});
					},
					currentId,
					lay);
			}
		} else {
			return A3(
				$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
				function (current) {
					return _Utils_update(
						current,
						{q: current.q + dist});
				},
				currentId,
				lay);
		}
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$setLeftThread = F5(
	function (modifier, nodeId, targetId, currentIndex, lay) {
		var _v0 = A2(
			$elm$core$Maybe$andThen,
			function (c) {
				return A3(
					$elm$core$Maybe$map2,
					$elm$core$Tuple$pair,
					A2(
						$elm$core$Maybe$andThen,
						$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
						A2($elm$core$Array$get, 0, c)),
					A2(
						$elm$core$Maybe$andThen,
						$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
						A2($elm$core$Array$get, currentIndex, c)));
			},
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.jn;
				},
				A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, nodeId)));
		if (!_v0.$) {
			var _v1 = _v0.a;
			var first = _v1.a;
			var current = _v1.b;
			var diff = (modifier - first.bj) - first.q;
			return A3(
				$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
				function (first_) {
					return _Utils_update(
						first_,
						{a0: current.a0, bj: (current.bj + current.q) - first_.q});
				},
				first.cg,
				A3(
					$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
					function (extremeLeft) {
						return _Utils_update(
							extremeLeft,
							{d1: diff, eq: targetId});
					},
					first.a0,
					lay));
		} else {
			return lay;
		}
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$setRightThread = F5(
	function (modifier, nodeId, targetId, currentIndex, lay) {
		var _v0 = A2(
			$elm$core$Maybe$andThen,
			function (c) {
				return A3(
					$elm$core$Maybe$map2,
					$elm$core$Tuple$pair,
					A2(
						$elm$core$Maybe$andThen,
						$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
						A2($elm$core$Array$get, currentIndex - 1, c)),
					A2(
						$elm$core$Maybe$andThen,
						$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
						A2($elm$core$Array$get, currentIndex, c)));
			},
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.jn;
				},
				A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, nodeId)));
		if (!_v0.$) {
			var _v1 = _v0.a;
			var prev = _v1.a;
			var current = _v1.b;
			var diff = (modifier - current.bk) - current.q;
			return A3(
				$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
				function (current_) {
					return _Utils_update(
						current_,
						{a1: prev.a1, bk: (prev.bk + prev.q) - current_.q});
				},
				current.cg,
				A3(
					$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
					function (extremeRight) {
						return _Utils_update(
							extremeRight,
							{d2: diff, er: targetId});
					},
					current.a1,
					lay));
		} else {
			return lay;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $gampleman$elm_visualization$Hierarchy$Tidy$separate = F5(
	function (peerMargin, childIndex, nodeId, lay_, ylist_) {
		var nodeChildren = A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.jn;
			},
			A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay_, nodeId));
		var newContour = F2(
			function (isLeft, index) {
				var node = A2(
					$elm$core$Maybe$andThen,
					$elm$core$Array$get(index),
					nodeChildren);
				return {
					g9: isLeft,
					at: A2(
						$elm$core$Maybe$withDefault,
						0,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.q;
							},
							A2(
								$elm$core$Maybe$andThen,
								$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay_),
								node))),
					bm: node
				};
			});
		var go = F4(
			function (leftContour, rightContour, lay, yList) {
				go:
				while (true) {
					var _v0 = _Utils_Tuple2(leftContour.bm, rightContour.bm);
					if (!_v0.a.$) {
						if (!_v0.b.$) {
							var left = _v0.a.a;
							var right = _v0.b.a;
							var yList2 = (_Utils_cmp(
								A2($gampleman$elm_visualization$Hierarchy$Tidy$derefBottom, left, lay),
								A2(
									$elm$core$Maybe$withDefault,
									0,
									A2(
										$elm$core$Maybe$map,
										function ($) {
											return $.R;
										},
										$elm$core$List$head(yList)))) > 0) ? A2(
								$elm$core$Maybe$withDefault,
								_List_Nil,
								$elm$core$List$tail(yList)) : yList;
							var dist = (A2(
								$elm$core$Maybe$withDefault,
								0,
								A2(
									$elm$core$Maybe$map,
									function (_v2) {
										var relativeX = _v2.br;
										var width = _v2.cI;
										return (leftContour.at + relativeX) + (width / 2);
									},
									A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, left))) - A2(
								$elm$core$Maybe$withDefault,
								0,
								A2(
									$elm$core$Maybe$map,
									function (_v3) {
										var relativeX = _v3.br;
										var width = _v3.cI;
										return (rightContour.at + relativeX) - (width / 2);
									},
									A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, right)))) + peerMargin;
							var _v1 = (dist > 0) ? _Utils_Tuple2(
								_Utils_update(
									rightContour,
									{at: rightContour.at + dist}),
								A5(
									$gampleman$elm_visualization$Hierarchy$Tidy$moveSubtree,
									childIndex,
									$elm$core$List$head(yList2),
									A2(
										$elm$core$Maybe$withDefault,
										-1,
										A2(
											$elm$core$Maybe$andThen,
											$elm$core$Array$get(childIndex),
											nodeChildren)),
									dist,
									lay)) : _Utils_Tuple2(rightContour, lay);
							var rightContour1 = _v1.a;
							var lay1 = _v1.b;
							var leftBottom = A2($gampleman$elm_visualization$Hierarchy$Tidy$derefBottom, left, lay1);
							var rightBottom = A2($gampleman$elm_visualization$Hierarchy$Tidy$derefBottom, right, lay1);
							if (_Utils_cmp(leftBottom, rightBottom) < 0) {
								var $temp$leftContour = A2($gampleman$elm_visualization$Hierarchy$Tidy$contourNext, lay1, leftContour),
									$temp$rightContour = rightContour1,
									$temp$lay = lay1,
									$temp$yList = yList2;
								leftContour = $temp$leftContour;
								rightContour = $temp$rightContour;
								lay = $temp$lay;
								yList = $temp$yList;
								continue go;
							} else {
								if (_Utils_cmp(leftBottom, rightBottom) > 0) {
									var $temp$leftContour = leftContour,
										$temp$rightContour = A2($gampleman$elm_visualization$Hierarchy$Tidy$contourNext, lay1, rightContour1),
										$temp$lay = lay1,
										$temp$yList = yList2;
									leftContour = $temp$leftContour;
									rightContour = $temp$rightContour;
									lay = $temp$lay;
									yList = $temp$yList;
									continue go;
								} else {
									var $temp$leftContour = A2($gampleman$elm_visualization$Hierarchy$Tidy$contourNext, lay1, leftContour),
										$temp$rightContour = A2($gampleman$elm_visualization$Hierarchy$Tidy$contourNext, lay1, rightContour1),
										$temp$lay = lay1,
										$temp$yList = yList2;
									leftContour = $temp$leftContour;
									rightContour = $temp$rightContour;
									lay = $temp$lay;
									yList = $temp$yList;
									continue go;
								}
							}
						} else {
							var left = _v0.a.a;
							var _v5 = _v0.b;
							return _Utils_Tuple2(
								A5($gampleman$elm_visualization$Hierarchy$Tidy$setRightThread, leftContour.at, nodeId, left, childIndex, lay),
								yList);
						}
					} else {
						if (!_v0.b.$) {
							var _v4 = _v0.a;
							var right = _v0.b.a;
							return _Utils_Tuple2(
								A5($gampleman$elm_visualization$Hierarchy$Tidy$setLeftThread, rightContour.at, nodeId, right, childIndex, lay),
								yList);
						} else {
							var _v6 = _v0.a;
							var _v7 = _v0.b;
							return _Utils_Tuple2(lay, yList);
						}
					}
				}
			});
		return A4(
			go,
			A2(newContour, false, childIndex - 1),
			A2(newContour, true, childIndex),
			lay_,
			ylist_);
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$firstChild = F2(
	function (idx, lay) {
		return A2(
			$elm$core$Maybe$andThen,
			$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
			A2(
				$elm$core$Maybe$andThen,
				function (td) {
					return A2($elm$core$Array$get, 0, td.jn);
				},
				A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, idx)));
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$lastChild = F2(
	function (idx, lay) {
		return A2(
			$elm$core$Maybe$andThen,
			$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(lay),
			A2(
				$elm$core$Maybe$andThen,
				function (td) {
					return A2(
						$elm$core$Array$get,
						$elm$core$Array$length(td.jn) - 1,
						td.jn);
				},
				A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, idx)));
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$setExtreme = F2(
	function (id, tidyLayout) {
		return A3(
			$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
			function (tidy) {
				var _v0 = A3(
					$elm$core$Maybe$map2,
					$elm$core$Tuple$pair,
					A2($gampleman$elm_visualization$Hierarchy$Tidy$firstChild, id, tidyLayout),
					A2($gampleman$elm_visualization$Hierarchy$Tidy$lastChild, id, tidyLayout));
				if (_v0.$ === 1) {
					return _Utils_update(
						tidy,
						{a0: tidy.cg, a1: tidy.cg, bj: 0, bk: 0});
				} else {
					var _v1 = _v0.a;
					var first = _v1.a;
					var last = _v1.b;
					return _Utils_update(
						tidy,
						{a0: first.a0, a1: last.a1, bj: first.q + first.bj, bk: last.q + last.bk});
				}
			},
			id,
			tidyLayout);
	});
var $gampleman$elm_rosetree$Tree$singleton = function (v) {
	return A2($gampleman$elm_rosetree$Tree$Tree, v, _List_Nil);
};
var $gampleman$elm_visualization$Hierarchy$Tidy$traverseBFSWithDepth = F3(
	function (fn, init, lay) {
		var help = F4(
			function (accu, front, back, l) {
				help:
				while (true) {
					if (!front.b) {
						if (!back.b) {
							return l;
						} else {
							var $temp$accu = accu,
								$temp$front = $elm$core$List$reverse(back),
								$temp$back = _List_Nil,
								$temp$l = l;
							accu = $temp$accu;
							front = $temp$front;
							back = $temp$back;
							l = $temp$l;
							continue help;
						}
					} else {
						var _v2 = front.a;
						var depth = _v2.a;
						var x = _v2.b;
						var xs = front.b;
						var _v3 = A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, l, x);
						if (!_v3.$) {
							var node = _v3.a;
							var _v4 = A3(fn, depth, accu, node);
							var newAccu = _v4.a;
							var newNode = _v4.b;
							var $temp$accu = newAccu,
								$temp$front = xs,
								$temp$back = _Utils_ap(
								A2(
									$elm$core$List$map,
									$elm$core$Tuple$pair(depth + 1),
									$elm$core$List$reverse(
										$elm$core$Array$toList(newNode.jn))),
								back),
								$temp$l = A3($elm$core$Array$set, x, newNode, l);
							accu = $temp$accu;
							front = $temp$front;
							back = $temp$back;
							l = $temp$l;
							continue help;
						} else {
							var $temp$accu = accu,
								$temp$front = xs,
								$temp$back = back,
								$temp$l = l;
							accu = $temp$accu;
							front = $temp$front;
							back = $temp$back;
							l = $temp$l;
							continue help;
						}
					}
				}
			});
		return A4(
			help,
			init,
			_List_fromArray(
				[
					_Utils_Tuple2(0, 0)
				]),
			_List_Nil,
			lay);
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$derefChildren = F2(
	function (l, node) {
		return A2(
			$elm$core$List$filterMap,
			$gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData(l),
			$elm$core$Array$toList(node.jn));
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$traverseWithParent = F2(
	function (fn, l) {
		var help = F3(
			function (maybeParent, val, lay) {
				var newL = A3(
					$gampleman$elm_visualization$Hierarchy$Tidy$updateTidyData,
					function (tidy) {
						return fn(
							{
								bm: tidy,
								hV: A2(
									$elm$core$Maybe$andThen,
									function (parent) {
										return A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, parent.cg);
									},
									maybeParent)
							});
					},
					val.cg,
					lay);
				return A3(
					$elm$core$List$foldl,
					help(
						$elm$core$Maybe$Just(val)),
					newL,
					A2($gampleman$elm_visualization$Hierarchy$Tidy$derefChildren, l, val));
			});
		var _v0 = A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, l, 0);
		if (!_v0.$) {
			var root = _v0.a;
			return A3(help, $elm$core$Maybe$Nothing, root, l);
		} else {
			return l;
		}
	});
var $gampleman$elm_visualization$Hierarchy$Tidy$layout = F2(
	function (getters, tree) {
		var setYRecursive = getters.hd ? A2(
			$gampleman$elm_visualization$Hierarchy$Tidy$traverseBFSWithDepth,
			F3(
				function (depth, depths, tidy) {
					var _v8 = A2($elm$core$Dict$get, depth - 1, depths);
					if (!_v8.$) {
						var prevMax = _v8.a;
						return _Utils_Tuple2(
							A3(
								$elm$core$Dict$insert,
								depth,
								A2(
									$elm$core$Basics$max,
									A2(
										$elm$core$Maybe$withDefault,
										0,
										A2($elm$core$Dict$get, depth, depths)),
									(prevMax + tidy.bL) + getters.hW),
								depths),
							_Utils_update(
								tidy,
								{R: prevMax}));
					} else {
						return _Utils_Tuple2(
							A3($elm$core$Dict$insert, depth, tidy.bL + getters.hW, depths),
							_Utils_update(
								tidy,
								{R: 0}));
					}
				}),
			$elm$core$Dict$empty) : $gampleman$elm_visualization$Hierarchy$Tidy$traverseWithParent(
			function (_v9) {
				var parent = _v9.hV;
				var node = _v9.bm;
				return _Utils_update(
					node,
					{
						R: A2(
							$elm$core$Maybe$withDefault,
							0,
							A2(
								$elm$core$Maybe$map,
								function (parents) {
									return (parents.bL + parents.R) + getters.hW;
								},
								parent))
					});
			});
		var runWalk = F2(
			function (fn, lay) {
				return A2(fn, 0, lay);
			});
		var init = $gampleman$elm_visualization$Hierarchy$Tidy$initialize(getters.hM);
		var firstWalk = F2(
			function (idx, lay) {
				var _v0 = A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, idx);
				if (_v0.$ === 1) {
					return lay;
				} else {
					var node = _v0.a;
					var _v1 = $elm$core$Array$toList(node.jn);
					if (!_v1.b) {
						return A2($gampleman$elm_visualization$Hierarchy$Tidy$setExtreme, idx, lay);
					} else {
						var firstChildId = _v1.a;
						var rest = _v1.b;
						var lay1 = A2(firstWalk, firstChildId, lay);
						var _v2 = A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay1, firstChildId);
						if (_v2.$ === 1) {
							return lay1;
						} else {
							var firstChildData = _v2.a;
							var yListInitDatum = A2($gampleman$elm_visualization$Hierarchy$Tidy$derefBottom, firstChildData.a1, lay1);
							var yListInit = _List_fromArray(
								[
									{cg: firstChildId, j3: 0, R: yListInitDatum}
								]);
							var res = A3(
								$elm$core$List$foldl,
								F2(
									function (id, _v3) {
										var yList = _v3.gl;
										var layN = _v3.dX;
										var index = _v3.j3;
										var lay2 = A2(firstWalk, id, layN);
										var maxY = A2(
											$elm$core$Maybe$withDefault,
											0,
											A2(
												$elm$core$Maybe$map,
												function (_v6) {
													var extremeLeft = _v6.a0;
													return A2($gampleman$elm_visualization$Hierarchy$Tidy$derefBottom, extremeLeft, lay2);
												},
												A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay2, id)));
										var update = function (lst) {
											update:
											while (true) {
												if (!lst.b) {
													return _List_fromArray(
														[
															{cg: id, j3: index, R: maxY}
														]);
												} else {
													var head = lst.a;
													var tail = lst.b;
													if (_Utils_cmp(head.R, maxY) < 1) {
														var $temp$lst = tail;
														lst = $temp$lst;
														continue update;
													} else {
														return A2(
															$elm$core$List$cons,
															{cg: id, j3: index, R: maxY},
															tail);
													}
												}
											}
										};
										var _v5 = A5($gampleman$elm_visualization$Hierarchy$Tidy$separate, getters.hY, index, idx, lay2, yList);
										var lay3 = _v5.a;
										var yList1 = _v5.b;
										return {
											j3: index + 1,
											dX: lay3,
											gl: update(yList1)
										};
									}),
								{j3: 1, dX: lay1, gl: yListInit},
								rest);
							return A2(
								$gampleman$elm_visualization$Hierarchy$Tidy$setExtreme,
								idx,
								A2($gampleman$elm_visualization$Hierarchy$Tidy$positionRoot, idx, res.dX));
						}
					}
				}
			});
		var defaultValue = $gampleman$elm_rosetree$Tree$label(tree);
		var secondWalk = F3(
			function (modSum, idx, lay) {
				var _v7 = A2($gampleman$elm_visualization$Hierarchy$Tidy$derefTidyData, lay, idx);
				if (!_v7.$) {
					var width = _v7.a.cI;
					var height = _v7.a.bL;
					var y = _v7.a.R;
					var modifierToSubtree = _v7.a.q;
					var relativeX = _v7.a.br;
					var value = _v7.a.iz;
					var children = _v7.a.jn;
					return A2(
						$gampleman$elm_rosetree$Tree$tree,
						{bL: height, bm: value, cI: width, z: ((relativeX + modSum) + modifierToSubtree) - (width / 2), R: y},
						$elm$core$Array$toList(
							A2(
								$elm$core$Array$map,
								function (a) {
									return A3(
										secondWalk,
										modSum + modifierToSubtree,
										a,
										A2($gampleman$elm_visualization$Hierarchy$Tidy$addChildSpacing, children, lay));
								},
								children)));
				} else {
					return $gampleman$elm_rosetree$Tree$singleton(
						{bL: 0 / 0, bm: defaultValue, cI: 0 / 0, z: 0 / 0, R: 0 / 0});
				}
			});
		return A2(
			runWalk,
			secondWalk(0),
			A2(
				runWalk,
				firstWalk,
				setYRecursive(
					init(tree))));
	});
var $gampleman$elm_rosetree$Tree$map = F2(
	function (f, t) {
		return A3(
			$gampleman$elm_rosetree$Tree$mapAccumulate,
			F2(
				function (_v0, e) {
					return _Utils_Tuple2(
						0,
						f(e));
				}),
			0,
			t).b;
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $gampleman$elm_visualization$Hierarchy$processAttributes = function (assigner) {
	return $elm$core$List$foldl(
		F2(
			function (a, d) {
				if (a.$ === 12) {
					var l = a.a;
					return A3($gampleman$elm_visualization$Hierarchy$processAttributes, assigner, d, l);
				} else {
					return A2(assigner, a, d);
				}
			}));
};
var $gampleman$elm_visualization$Hierarchy$tidy = F2(
	function (attrs, t) {
		var _v0 = A3(
			$gampleman$elm_visualization$Hierarchy$processAttributes,
			F2(
				function (attr, _v1) {
					var s = _v1.a;
					var r = _v1.b;
					var a = _v1.c;
					switch (attr.$) {
						case 0:
							var x = attr.a;
							var y = attr.b;
							return _Utils_Tuple3(
								$elm$core$Maybe$Just(
									_Utils_Tuple2(x, y)),
								r,
								a);
						case 1:
							return _Utils_Tuple3(
								s,
								_Utils_update(
									r,
									{hd: true}),
								a);
						case 2:
							var m = attr.a;
							return _Utils_Tuple3(
								s,
								_Utils_update(
									r,
									{hW: m}),
								a);
						case 3:
							var m = attr.a;
							return _Utils_Tuple3(
								s,
								_Utils_update(
									r,
									{hY: m}),
								a);
						case 4:
							var ns = attr.a;
							return _Utils_Tuple3(
								s,
								_Utils_update(
									r,
									{hM: ns}),
								true);
						default:
							return _Utils_Tuple3(s, r, a);
					}
				}),
			_Utils_Tuple3(
				$elm$core$Maybe$Nothing,
				{
					hd: false,
					hM: $elm$core$Basics$always(
						_Utils_Tuple2(1, 1)),
					hW: 1,
					hY: 1
				},
				false),
			attrs);
		var resize = _v0.a;
		var settings = _v0.b;
		var aspectRatio = _v0.c;
		var layout = A2($gampleman$elm_visualization$Hierarchy$Tidy$layout, settings, t);
		if (!resize.$) {
			var _v4 = resize.a;
			var w = _v4.a;
			var h = _v4.b;
			var _v5 = A3(
				$gampleman$elm_rosetree$Tree$foldl,
				F2(
					function (l, _v6) {
						var minX = _v6.a;
						var maxX = _v6.b;
						var maxY = _v6.c;
						return _Utils_Tuple3(
							A2($elm$core$Basics$min, minX, l.z),
							A2($elm$core$Basics$max, maxX, l.z + l.cI),
							A2($elm$core$Basics$max, maxY, l.R + l.bL));
					}),
				_Utils_Tuple3(0, 0, 0),
				layout);
			var minX_ = _v5.a;
			var maxX_ = _v5.b;
			var height = _v5.c;
			var hS_ = h / height;
			var width = maxX_ - minX_;
			var wS_ = w / width;
			var _v7 = aspectRatio ? _Utils_Tuple2(
				A2($elm$core$Basics$min, wS_, hS_),
				A2($elm$core$Basics$min, wS_, hS_)) : _Utils_Tuple2(wS_, hS_);
			var wS = _v7.a;
			var hS = _v7.b;
			return A2(
				$gampleman$elm_rosetree$Tree$map,
				function (l) {
					return aspectRatio ? _Utils_update(
						l,
						{bL: l.bL * hS, cI: l.cI * wS, z: (l.z - minX_) * wS, R: l.R * hS}) : _Utils_update(
						l,
						{bL: 1, cI: 1, z: (((l.z - minX_) + (l.cI / 2)) * wS) - 0.5, R: ((l.R + (l.bL / 2)) * hS) - 0.5});
				},
				layout);
		} else {
			return layout;
		}
	});
var $author$project$Main$hierarchicalLayout = function (layout) {
	var tree = A3($author$project$Main$takeTree, $author$project$GMachine$mainRedexRoot, $elm$core$Set$empty, layout);
	var edges = A2(
		$elm$core$Maybe$withDefault,
		_List_Nil,
		A2($elm$core$Maybe$map, $gampleman$elm_rosetree$Tree$links, tree));
	var applyLayout = $gampleman$elm_visualization$Hierarchy$tidy(
		_List_fromArray(
			[
				$gampleman$elm_visualization$Hierarchy$nodeSize(
				$elm$core$Basics$always(
					_Utils_Tuple2($author$project$Main$nodeSize, $author$project$Main$nodeSize))),
				$gampleman$elm_visualization$Hierarchy$parentChildMargin($author$project$Main$nodeSize * 3),
				$gampleman$elm_visualization$Hierarchy$peerMargin($author$project$Main$nodeSize * 2)
			]));
	var placements = A2(
		$elm$core$Maybe$withDefault,
		$elm$core$Dict$empty,
		A2(
			$elm$core$Maybe$map,
			A2(
				$gampleman$elm_rosetree$Tree$foldl,
				function (_v0) {
					var node = _v0.bm;
					var x = _v0.z;
					var y = _v0.R;
					return A2(
						$elm$core$Dict$insert,
						node,
						_Utils_Tuple2(x, y));
				},
				$elm$core$Dict$empty),
			A2($elm$core$Maybe$map, applyLayout, tree)));
	return {jJ: edges, d8: placements};
};
var $gampleman$elm_visualization$Force$Links = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $gampleman$elm_visualization$Force$customLinks = F2(
	function (iters, list) {
		var counts = A3(
			$elm$core$List$foldr,
			F2(
				function (_v1, d) {
					var source = _v1.ej;
					var target = _v1.bW;
					return A3(
						$elm$core$Dict$update,
						target,
						A2(
							$elm$core$Basics$composeL,
							A2(
								$elm$core$Basics$composeL,
								$elm$core$Maybe$Just,
								$elm$core$Maybe$withDefault(1)),
							$elm$core$Maybe$map(
								$elm$core$Basics$add(1))),
						A3(
							$elm$core$Dict$update,
							source,
							A2(
								$elm$core$Basics$composeL,
								A2(
									$elm$core$Basics$composeL,
									$elm$core$Maybe$Just,
									$elm$core$Maybe$withDefault(1)),
								$elm$core$Maybe$map(
									$elm$core$Basics$add(1))),
							d));
				}),
			$elm$core$Dict$empty,
			list);
		var count = function (key) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				A2($elm$core$Dict$get, key, counts));
		};
		return A2(
			$gampleman$elm_visualization$Force$Links,
			iters,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var source = _v0.ej;
					var target = _v0.bW;
					var distance = _v0.cV;
					var strength = _v0.f6;
					return {
						eG: count(source) / (count(source) + count(target)),
						cV: distance,
						ej: source,
						f6: A2(
							$elm$core$Maybe$withDefault,
							1 / A2(
								$elm$core$Basics$min,
								count(source),
								count(target)),
							strength),
						bW: target
					};
				},
				list));
	});
var $gampleman$elm_visualization$Force$links = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map(
		function (_v0) {
			var source = _v0.a;
			var target = _v0.b;
			return {cV: 30, ej: source, f6: $elm$core$Maybe$Nothing, bW: target};
		}),
	$gampleman$elm_visualization$Force$customLinks(1));
var $gampleman$elm_visualization$Force$ManyBody = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $gampleman$elm_visualization$Force$customManyBody = function (theta) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$Dict$fromList,
		$gampleman$elm_visualization$Force$ManyBody(theta));
};
var $gampleman$elm_visualization$Force$manyBodyStrength = function (strength) {
	return A2(
		$elm$core$Basics$composeL,
		$gampleman$elm_visualization$Force$customManyBody(0.9),
		$elm$core$List$map(
			function (key) {
				return _Utils_Tuple2(key, strength);
			}));
};
var $gampleman$elm_visualization$Force$manyBody = $gampleman$elm_visualization$Force$manyBodyStrength(-30);
var $elm_community$intdict$IntDict$keys = function (dict) {
	return A3(
		$elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm_community$graph$Graph$nodeIds = A2($elm$core$Basics$composeR, $elm_community$graph$Graph$unGraph, $elm_community$intdict$IntDict$keys);
var $gampleman$elm_visualization$Force$X = function (a) {
	return {$: 4, a: a};
};
var $gampleman$elm_visualization$Force$towardsX = function (configs) {
	return $gampleman$elm_visualization$Force$X(
		$elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var node = _v0.bm;
					var strength = _v0.f6;
					var target = _v0.bW;
					return _Utils_Tuple2(
						node,
						{h0: target, f6: strength});
				},
				configs)));
};
var $gampleman$elm_visualization$Force$Y = function (a) {
	return {$: 5, a: a};
};
var $gampleman$elm_visualization$Force$towardsY = function (configs) {
	return $gampleman$elm_visualization$Force$Y(
		$elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var node = _v0.bm;
					var strength = _v0.f6;
					var target = _v0.bW;
					return _Utils_Tuple2(
						node,
						{h0: target, f6: strength});
				},
				configs)));
};
var $author$project$Main$resetForceSim = function (mview) {
	var hierarchy = $author$project$Main$hierarchicalLayout(mview.as);
	var placedNodes = $elm$core$Dict$size(hierarchy.d8);
	var gravitateNodes = A2(
		$elm$core$List$map,
		function (id) {
			return {bm: id, f6: 0.05, bW: 0};
		},
		$elm_community$graph$Graph$nodeIds(mview.as));
	var edges = A2(
		$elm$core$List$map,
		function (_v8) {
			var from = _v8.c$;
			var to = _v8.dn;
			return _Utils_Tuple2(from, to);
		},
		$elm_community$graph$Graph$edges(mview.as));
	var _v0 = A3(
		$elm$core$Dict$foldl,
		F3(
			function (_v1, _v2, _v3) {
				var x = _v2.a;
				var y = _v2.b;
				var sx = _v3.a;
				var sy = _v3.b;
				return _Utils_Tuple2(x + sx, y + sy);
			}),
		_Utils_Tuple2(0, 0),
		hierarchy.d8);
	var sumX = _v0.a;
	var sumY = _v0.b;
	var _v4 = _Utils_Tuple2(sumX / placedNodes, sumY / placedNodes);
	var avgX = _v4.a;
	var avgY = _v4.b;
	var _v5 = A3(
		$elm$core$Dict$foldl,
		F3(
			function (node, _v6, _v7) {
				var x = _v6.a;
				var y = _v6.b;
				var xs = _v7.a;
				var ys = _v7.b;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						{bm: node, f6: 0.5, bW: x - avgX},
						xs),
					A2(
						$elm$core$List$cons,
						{bm: node, f6: 0.5, bW: y - avgY},
						ys));
			}),
		_Utils_Tuple2(_List_Nil, _List_Nil),
		hierarchy.d8);
	var hierarchyXs = _v5.a;
	var hierarchyYs = _v5.b;
	return _Utils_update(
		mview,
		{
			ce: $gampleman$elm_visualization$Force$simulation(
				_List_fromArray(
					[
						$gampleman$elm_visualization$Force$manyBody(
						$elm_community$graph$Graph$nodeIds(mview.as)),
						$gampleman$elm_visualization$Force$links(edges),
						$gampleman$elm_visualization$Force$towardsX(
						_Utils_ap(gravitateNodes, hierarchyXs)),
						$gampleman$elm_visualization$Force$towardsY(
						_Utils_ap(gravitateNodes, hierarchyYs))
					]))
		});
};
var $author$project$Main$deleteNodeFromLayout = function (id) {
	return A2(
		$elm$core$Basics$composeR,
		A2(
			$arturopala$elm_monocle$Monocle$Lens$modify,
			$author$project$Main$accessLayout,
			$elm_community$graph$Graph$remove(id)),
		$author$project$Main$resetForceSim);
};
var $author$project$Main$Right = 1;
var $elm_community$intdict$IntDict$fromList = function (pairs) {
	return A3(
		$elm$core$List$foldl,
		function (_v0) {
			var a = _v0.a;
			var b = _v0.b;
			return A2($elm_community$intdict$IntDict$insert, a, b);
		},
		$elm_community$intdict$IntDict$empty,
		pairs);
};
var $author$project$GMachine$getChildren = function (node) {
	if (!node.$) {
		var left = node.a;
		var right = node.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(left, right));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Main$getOutgoing = function (node) {
	var _v0 = $author$project$GMachine$getChildren(node);
	if (!_v0.$) {
		var _v1 = _v0.a;
		var left = _v1.a;
		var right = _v1.b;
		return $elm_community$intdict$IntDict$fromList(
			_List_fromArray(
				[
					_Utils_Tuple2(left, 0),
					_Utils_Tuple2(right, 1)
				]));
	} else {
		return $elm_community$intdict$IntDict$empty;
	}
};
var $elm_community$graph$Graph$insert = F2(
	function (nodeContext, graph) {
		return A3(
			$elm_community$graph$Graph$update,
			nodeContext.bm.cg,
			$elm$core$Basics$always(
				$elm$core$Maybe$Just(nodeContext)),
			graph);
	});
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $gampleman$elm_visualization$Force$initialAngle = $elm$core$Basics$pi * (3 - $elm$core$Basics$sqrt(5));
var $gampleman$elm_visualization$Force$initialRadius = 10;
var $elm$core$Basics$sin = _Basics_sin;
var $gampleman$elm_visualization$Force$entity = F2(
	function (index, a) {
		var radius = $elm$core$Basics$sqrt(0.5 + index) * $gampleman$elm_visualization$Force$initialRadius;
		var angle = index * $gampleman$elm_visualization$Force$initialAngle;
		return {
			cg: index,
			iz: a,
			Z: 0.0,
			_: 0.0,
			z: radius * $elm$core$Basics$cos(angle),
			R: radius * $elm$core$Basics$sin(angle)
		};
	});
var $author$project$Main$entityPos = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function (_v0) {
		var x = _v0.z;
		var y = _v0.R;
		return _Utils_Tuple2(x, y);
	},
	F2(
		function (_v1, e) {
			var x = _v1.a;
			var y = _v1.b;
			return _Utils_update(
				e,
				{z: x, R: y});
		}));
var $author$project$Main$getEntity = F2(
	function (id, graph) {
		return A2(
			$elm$core$Maybe$map,
			$author$project$Main$accessEntity.eY,
			A2($elm_community$graph$Graph$get, id, graph));
	});
var $author$project$Main$mkNode = F3(
	function (id, node, layout) {
		var e = A2($gampleman$elm_visualization$Force$entity, id, node);
		var avgPosOfChildren = function () {
			var _v0 = $author$project$GMachine$getChildren(node);
			if (!_v0.$) {
				var _v1 = _v0.a;
				var left = _v1.a;
				var right = _v1.b;
				return A3(
					$elm$core$Maybe$map2,
					F2(
						function (l, r) {
							return _Utils_Tuple2((l.z + r.z) / 2, (l.R + r.R) / 2);
						}),
					A2($author$project$Main$getEntity, left, layout),
					A2($author$project$Main$getEntity, right, layout));
			} else {
				return $elm$core$Maybe$Nothing;
			}
		}();
		var initialPos = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Main$entityPos.eY(e),
			avgPosOfChildren);
		return {
			cg: id,
			ar: A2($author$project$Main$entityPos.eh, initialPos, e)
		};
	});
var $author$project$Main$insertNode = F3(
	function (id, node, mview) {
		return $author$project$Main$resetForceSim(
			A3(
				$arturopala$elm_monocle$Monocle$Lens$modify,
				$author$project$Main$accessLayout,
				$elm_community$graph$Graph$insert(
					{
						g4: $elm_community$intdict$IntDict$empty,
						bm: A3($author$project$Main$mkNode, id, node, mview.as),
						fz: $author$project$Main$getOutgoing(node)
					}),
				mview));
	});
var $author$project$Main$updateMachineView = function (machineUpdate) {
	switch (machineUpdate.$) {
		case 0:
			var id = machineUpdate.a;
			var node = machineUpdate.b;
			return A2($author$project$Main$insertNode, id, node);
		case 1:
			var holeNodeIds = machineUpdate.a;
			return function (mv) {
				return A3(
					$elm$core$List$foldl,
					A2($elm_community$basics_extra$Basics$Extra$flip, $author$project$Main$insertNode, $author$project$GMachine$GHole),
					mv,
					holeNodeIds);
			};
		case 9:
			var update1 = machineUpdate.a;
			var update2 = machineUpdate.b;
			return A2(
				$elm$core$Basics$composeR,
				$author$project$Main$updateMachineView(update1),
				$author$project$Main$updateMachineView(update2));
		case 2:
			return $elm$core$Basics$identity;
		case 3:
			return $elm$core$Basics$identity;
		case 4:
			var refs = machineUpdate.a;
			return function (mv) {
				return A3($elm$core$List$foldl, $author$project$Main$deleteNodeFromLayout, mv, refs);
			};
		case 5:
			var _function = machineUpdate.a;
			return $elm$core$Basics$identity;
		case 6:
			var id = machineUpdate.a;
			return $elm$core$Basics$identity;
		case 7:
			var id = machineUpdate.a;
			return $elm$core$Basics$identity;
		case 8:
			var id = machineUpdate.a;
			var reduct = machineUpdate.b;
			var updateNodeEdges = function (ctx) {
				return _Utils_update(
					ctx,
					{
						fz: $author$project$Main$getOutgoing(reduct)
					});
			};
			var setData = A2(
				$arturopala$elm_monocle$Monocle$Lens$modify,
				$author$project$Main$accessEntity,
				function (e) {
					return _Utils_update(
						e,
						{iz: reduct});
				});
			var updateCtx = A2($elm$core$Basics$composeR, setData, updateNodeEdges);
			return A2(
				$elm$core$Basics$composeR,
				A2(
					$arturopala$elm_monocle$Monocle$Lens$modify,
					$author$project$Main$accessLayout,
					A2(
						$elm_community$graph$Graph$update,
						id,
						$elm$core$Maybe$map(updateCtx))),
				$author$project$Main$resetForceSim);
		case 10:
			return $elm$core$Basics$identity;
		default:
			return $elm$core$Basics$identity;
	}
};
var $author$project$Main$initializeProgram = function (_v0) {
	var machine = _v0.a;
	var machineUpdate = _v0.b;
	var machineView = A2(
		$author$project$Main$updateMachineView,
		machineUpdate,
		{
			ce: $gampleman$elm_visualization$Force$simulation(_List_Nil),
			dW: machineUpdate,
			as: $elm_community$graph$Graph$empty,
			c3: machine
		});
	return $author$project$Main$Running(
		$mgold$elm_nonempty_list$List$Nonempty$singleton(machineView));
};
var $elm_community$result_extra$Result$Extra$unpack = F3(
	function (errFunc, okFunc, result) {
		if (!result.$) {
			var ok = result.a;
			return okFunc(ok);
		} else {
			var err = result.a;
			return errFunc(err);
		}
	});
var $author$project$Main$compileSourceCode = function (sourceCode) {
	return A3(
		$elm_community$result_extra$Result$Extra$unpack,
		A2($elm$core$Basics$composeR, $author$project$Main$CompilationError, $author$project$Main$accessProgram.eh),
		A2($elm$core$Basics$composeR, $author$project$Main$initializeProgram, $author$project$Main$accessProgram.eh),
		$author$project$GMachine$createMachine(sourceCode));
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$Main$add1Program = '\nadd1 x = x + 1\nmain = add1 41\n';
var $author$project$Main$initialProgram = $author$project$Main$add1Program;
var $elm$core$Basics$round = _Basics_round;
var $author$project$Main$init = _Utils_Tuple2(
	A2(
		$author$project$Main$compileSourceCode,
		$author$project$Main$initialProgram,
		{
			db: $author$project$Main$Uninitialized,
			dh: $author$project$Main$initialProgram,
			dw: {bL: 0, cI: 0}
		}),
	A2(
		$elm$core$Task$perform,
		function (_v0) {
			var viewport = _v0.dw;
			return A2(
				$author$project$Main$WindowResized,
				$elm$core$Basics$round(viewport.cI),
				$elm$core$Basics$round(viewport.bL));
		},
		$elm$browser$Browser$Dom$getViewport));
var $mdgriffith$elm_ui$Internal$Style$classes = {iM: 'a', ey: 'atv', iQ: 'ab', iR: 'cx', iS: 'cy', iT: 'acb', iU: 'accx', iV: 'accy', iW: 'acr', gr: 'al', gs: 'ar', iX: 'at', ez: 'ah', eA: 'av', iZ: 's', i5: 'bh', i6: 'b', i9: 'w7', jb: 'bd', jc: 'bdt', dy: 'bn', jd: 'bs', dz: 'cpe', jp: 'cp', jq: 'cpx', jr: 'cpy', bc: 'c', dE: 'ctr', dF: 'cb', dG: 'ccx', bd: 'ccy', cQ: 'cl', dH: 'cr', jv: 'ct', jy: 'cptr', jz: 'ctxt', v: 'fcs', gR: 'focus-within', jU: 'fs', jW: 'g', e$: 'hbh', e0: 'hc', gZ: 'he', e1: 'hf', g_: 'hfp', j_: 'hv', j0: 'ic', j2: 'fr', dT: 'lbl', j6: 'iml', j7: 'imlf', j8: 'imlp', j9: 'implw', ka: 'it', ke: 'i', hh: 'lnk', cp: 'nb', hL: 'notxt', kI: 'ol', kJ: 'or', bS: 'oq', kQ: 'oh', hS: 'pg', hT: 'p', kR: 'ppe', k1: 'ui', ib: 'r', k5: 'sb', k6: 'sbx', k7: 'sby', k9: 'sbt', ld: 'e', le: 'cap', lf: 'sev', ll: 'sk', lt: 't', lu: 'tc', lv: 'w8', lw: 'w2', lx: 'w9', ly: 'tj', eo: 'tja', lz: 'tl', lA: 'w3', lB: 'w5', lC: 'w4', lD: 'tr', lE: 'w6', lF: 'w1', lG: 'tun', al: 'ts', bZ: 'clr', lT: 'u', gh: 'wc', iH: 'we', gi: 'wf', iI: 'wfp', gk: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bc);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.jW);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.hS);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.hT);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ib);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ld);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 1:
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 2:
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 3:
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 4:
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$html$Html$div = _VirtualDom_node('div');
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 13:
			var name = style.a;
			return name;
		case 12:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 7:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 6:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 8:
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.k2)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.aX)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.lh.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.lh.b)))))));
		case 9:
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.ib) + ('-' + ($elm$core$String$fromInt(pos.gA) + ('-' + ($elm$core$String$fromInt(pos.cI) + ('-' + $elm$core$String$fromInt(pos.bL)))))));
		case 11:
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector) {
					case 0:
						return 'fs';
					case 1:
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.g6 ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.d.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.d.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.b3) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.ei) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.b5))
				])));
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gR) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.ja),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.i1),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										b3: shadow.b3,
										b5: shadow.b5,
										g6: false,
										d: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.d)),
										ei: shadow.ei
									}));
						},
						focus.lc),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + ':focus .focusable, ') + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + '.focusable:focus, ') + ('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + ' .focusable-thumb'))),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.ja),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.i1),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										b3: shadow.b3,
										b5: shadow.b5,
										g6: false,
										d: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.d)),
										ei: shadow.ei
									}));
						},
						focus.lc),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = 3;
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = 2;
var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
var $mdgriffith$elm_ui$Internal$Style$Top = 0;
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jv);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dF);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dH);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cQ);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dG);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bd);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iX);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iQ);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gs);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gr);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iR);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iS);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(alignment),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e$),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i5),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.k9),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lt),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gi),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e0),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gi),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iI),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gh),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment) {
				case 0:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 1:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 2:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 3:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 4:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = 0;
var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
var $mdgriffith$elm_ui$Internal$Style$Below = 1;
var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
var $mdgriffith$elm_ui$Internal$Style$Within = 4;
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = 0;
	var _v0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ld),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.j0))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gi),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.k1),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.j2),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cp),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cp),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ld),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc) {
							case 0:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iM),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gi),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 1:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i6),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 2:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.kJ),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 3:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.kI),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 4:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.j2),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i5),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gk),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hL),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jz),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.kR),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dz),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bZ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bS),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.j_, $mdgriffith$elm_ui$Internal$Style$classes.bZ)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.j_, $mdgriffith$elm_ui$Internal$Style$classes.bS)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.v, $mdgriffith$elm_ui$Internal$Style$classes.bZ)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.v, $mdgriffith$elm_ui$Internal$Style$classes.bS)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.ey, $mdgriffith$elm_ui$Internal$Style$classes.bZ)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.ey, $mdgriffith$elm_ui$Internal$Style$classes.bS)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.al),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.k5),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.k6),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ib),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.k7),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bc),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ld),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jp),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jr),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gh),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jb),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jc),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jd),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lt),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ka),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ld),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ib),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iH),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hh),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g_),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gi),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dE),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.iW,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.iU,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iR),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.iU,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iR),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.iU,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iS),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.iU + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.iW + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.iU)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lf),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dT),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bc),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0px'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', 'min-content'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gZ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gi),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iI),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gh),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.iT,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.iV,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iS),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.iV,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iS),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.iV,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iS),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.iV + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.iT + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.iV)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dE),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lf),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jW),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 1:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 2:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 3:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 4:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hS),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.iZ + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.iZ))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.iZ + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.iZ))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.j6),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.j9),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ld),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.j8),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.j7),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hT),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e$),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i5),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lt),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hT),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ld),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iH),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.j2),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i5),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iM),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i6),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.kJ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.kI),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lt),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ib),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bc),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jW),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lF),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lw),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lA),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lC),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lB),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lE),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i9),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lv),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lx),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ke),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ll),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lT),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lT),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ll)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lG),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ly),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eo),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lu),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lD),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.lz),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.iZ + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.iZ + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ib) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ib) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dE) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {dC: closing, P: _List_Nil, bp: _List_Nil, aP: selector};
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								bp: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.bp)
							});
					case 3:
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								P: A2(
									$elm$core$List$cons,
									{dC: '\n}', P: _List_Nil, bp: props, aP: '@supports (' + (prop + (':' + (value + (') {' + parent.aP))))},
									rendered.P)
							});
					case 5:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								P: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.aP + (' + ' + selector), ''),
										adjRules),
									rendered.P)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								P: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.aP + (' > ' + child), ''),
										childRules),
									rendered.P)
							});
					case 2:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								P: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.aP + (' ' + child), ''),
										childRules),
									rendered.P)
							});
					case 4:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								P: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.aP, descriptor),
											''),
										descriptorRules),
									rendered.P)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								P: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.aP, ''),
										batched),
									rendered.P)
							});
				}
			});
		return A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.bp;
		if (!_v2.b) {
			return '';
		} else {
			return rule.aP + ('{' + (renderValues(rule.bp) + (rule.dC + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.P)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.cm;
	switch (_v0) {
		case 0:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 1:
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 0:
			return 'serif';
		case 1:
			return 'sans-serif';
		case 2:
			return 'monospace';
		case 3:
			var name = font.a;
			return '\"' + (name + '\"');
		case 4:
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.cn;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return name === 'smcp';
		case 1:
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.iB);
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 1) {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo) {
				case 1:
					var _v2 = options.j_;
					switch (_v2) {
						case 0:
							return _List_Nil;
						case 2:
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 0:
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[
							selector + ('-fs:focus {' + (renderedProps + '\n}')),
							('.' + ($mdgriffith$elm_ui$Internal$Style$classes.iZ + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'),
							(selector + '-fs:focus-within {') + (renderedProps + '\n}'),
							('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iZ) + (' .focusable-thumb' + (selector + '-fs {')))) + (renderedProps + '\n}')
						]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return '\"' + (name + '\"');
		case 1:
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.iB)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 0:
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 13:
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 12:
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 2:
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 1:
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 3:
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 4:
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 5:
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.ld;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.ib;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.gk + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.gs;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.hT;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.hS;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.gr;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.bc;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.iZ;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 7:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 6:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 8:
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 0:
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 1:
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 1) {
										if (_v2.b.$ === 1) {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 1) {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 2:
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 1) {
										if (_v7.b.$ === 1) {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 1) {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 3:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.lh.a);
				var ySpacing = toGridLength(template.lh.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.k2)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.aX)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.aX)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.lh.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.lh.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.aX)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.k2)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.aX)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.lh.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.lh.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 9:
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.ib) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.bL) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.gA) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.cI) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.ib) + (' / ' + ($elm$core$String$fromInt(position.ib + position.bL) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.gA) + (' / ' + ($elm$core$String$fromInt(position.gA + position.cI) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.ib) + ('-' + ($elm$core$String$fromInt(position.gA) + ('-' + ($elm$core$String$fromInt(position.cI) + ('-' + $elm$core$String$fromInt(position.bL)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 11:
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((!_v12.a.$) && (!_v12.b.$)) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.lt + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.lt)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.le, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.jU, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.le + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.le))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.le + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.lt + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.le + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.lt)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {bL: height / size, ei: size, iC: vertical};
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.jj, adjustment.i4, adjustment.jD, adjustment.kk]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.jD,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.i4,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.jj,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		jj: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		gU: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.bL)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.iC) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.ei) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 1) {
					if (face.$ === 5) {
						var _with = face.a;
						var _v2 = _with.iO;
						if (_v2.$ === 1) {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.gU;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.jj;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 4) {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 1) {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 1) {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					eb: _Utils_ap(
						rendered.eb,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					dr: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 1) {
							return rendered.dr;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.dr);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{eb: _List_Nil, dr: _List_Nil},
			stylesheet);
		var topLevel = _v0.dr;
		var rules = _v0.eb;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.cm;
		switch (_v0) {
			case 0:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 1:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.v)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.v)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return keyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return unkeyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 0:
					return A2(createNode, 'div', attributes);
				case 1:
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ld))
									]))
							]));
			}
		}();
		switch (parentContext) {
			case 0:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.iZ, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.dE, $mdgriffith$elm_ui$Internal$Style$classes.bd, $mdgriffith$elm_ui$Internal$Style$classes.iW])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.iZ, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.dE, $mdgriffith$elm_ui$Internal$Style$classes.bd, $mdgriffith$elm_ui$Internal$Style$classes.iU])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.iZ, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.dE, $mdgriffith$elm_ui$Internal$Style$classes.iV])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.iZ, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.dE, $mdgriffith$elm_ui$Internal$Style$classes.iT])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.lt + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.gh + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.e0)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.iZ + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.lt + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.gi + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.e1)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.j$, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.ip : _Utils_ap(styled.ip, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.j$, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.ip : _Utils_ap(styled.ip, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.j$, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.ip : _Utils_ap(styled.ip, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.j$, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.ip : _Utils_ap(styled.ip, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 1) {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.ip : _Utils_ap(rendered.ip, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.bK,
						rendered.bm,
						rendered.bC,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.jn)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						j$: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.bK,
							rendered.bm,
							rendered.bC,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.jn))),
						ip: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.ip : _Utils_ap(rendered.ip, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.bK,
						rendered.bm,
						rendered.bC,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.jn)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						j$: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.bK,
							rendered.bm,
							rendered.bC,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.jn))),
						ip: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 10, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.cp, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.iM]));
							case 1:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.cp, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.i6]));
							case 2:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.cp, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.kJ]));
							case 3:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.cp, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.kI]));
							case 4:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.cp, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.j2]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.cp, $mdgriffith$elm_ui$Internal$Style$classes.ld, $mdgriffith$elm_ui$Internal$Style$classes.i5]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return $elm$virtual_dom$VirtualDom$text('');
						case 2:
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.j$, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 0:
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 1:
				var existingBehind = existing.a;
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 2:
				var existingInFront = existing.a;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.ez + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gr);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.ez + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gs);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.ez + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.iR);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.eA + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.iX);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.eA + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.iQ);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.eA + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.iS);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 0:
				switch (component.$) {
					case 0:
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 1:
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 2:
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 1:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 1:
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 2:
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 1:
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 2:
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 3:
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 4:
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 0:
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.gZ + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.e0,
				_List_Nil);
		case 2:
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.e1,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.g_ + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.iZ + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.bc + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px !important');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 0:
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.iH + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.gh,
				_List_Nil);
		case 2:
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.gi,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.iI + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.iZ + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.ib + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 3) {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 2:
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 7:
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 1) {
					return {
						bC: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						jn: children,
						bK: has,
						bm: node,
						ip: styles
					};
				} else {
					var _class = _v1.a;
					return {
						bC: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						jn: children,
						bK: has,
						bm: node,
						ip: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 0:
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 3:
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 1:
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 4:
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 10:
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 7:
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 0:
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.iH + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gh),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gi),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.iI + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.iZ + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.ib + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 8:
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 0:
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.gZ + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.e0 + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.e1 + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.g_ + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.iZ + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.bc + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 2:
						var description = attribute.a;
						switch (description.$) {
							case 0:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 1:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 2:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 3:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 4:
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 9:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 8:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 5:
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 6:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 9:
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 3:
									return styles;
								case 2:
									var str = elem.a;
									return styles;
								case 0:
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.ip);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 6:
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	i1: $elm$core$Maybe$Nothing,
	ja: $elm$core$Maybe$Nothing,
	lc: $elm$core$Maybe$Just(
		{
			b3: 0,
			b5: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			d: _Utils_Tuple2(0, 0),
			ei: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _v4 = record.j_;
					if (_v4.$ === 1) {
						return _Utils_update(
							record,
							{
								j_: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _v5 = record.v;
					if (_v5.$ === 1) {
						return _Utils_update(
							record,
							{
								v: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.cm;
					if (_v6.$ === 1) {
						return _Utils_update(
							record,
							{
								cm: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			v: function () {
				var _v0 = record.v;
				if (_v0.$ === 1) {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			j_: function () {
				var _v1 = record.j_;
				if (_v1.$ === 1) {
					return 1;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			cm: function () {
				var _v2 = record.cm;
				if (_v2.$ === 1) {
					return 0;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{v: $elm$core$Maybe$Nothing, j_: $elm$core$Maybe$Nothing, cm: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 1:
				var styles = el.a.ip;
				var html = el.a.j$;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 2:
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.cm;
			if (_v0 === 1) {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 4:
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.cn;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.kN;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.k1, $mdgriffith$elm_ui$Internal$Style$classes.iZ, $mdgriffith$elm_ui$Internal$Style$classes.ld]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{kN: _List_Nil});
var $author$project$Main$AnimationFrame = {$: 5};
var $arturopala$elm_monocle$Monocle$Optional$Optional = F2(
	function (getOption, set) {
		return {gW: getOption, eh: set};
	});
var $arturopala$elm_monocle$Monocle$Optional$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var $arturopala$elm_monocle$Monocle$Optional$compose = F2(
	function (outer, inner) {
		var set = F2(
			function (c, a) {
				return A2(
					$elm$core$Maybe$withDefault,
					a,
					A2(
						$elm$core$Maybe$map,
						A2(
							$elm$core$Basics$composeR,
							inner.eh(c),
							A2($arturopala$elm_monocle$Monocle$Optional$flip, outer.eh, a)),
						outer.gW(a)));
			});
		var getOption = function (a) {
			var _v0 = outer.gW(a);
			if (!_v0.$) {
				var x = _v0.a;
				return inner.gW(x);
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		return A2($arturopala$elm_monocle$Monocle$Optional$Optional, getOption, set);
	});
var $arturopala$elm_monocle$Monocle$Optional$fromLens = function (lens) {
	var getOption = function (a) {
		return $elm$core$Maybe$Just(
			lens.eY(a));
	};
	return A2($arturopala$elm_monocle$Monocle$Optional$Optional, getOption, lens.eh);
};
var $author$project$Main$programToMachineView = A2(
	$arturopala$elm_monocle$Monocle$Optional$Optional,
	function (p) {
		if (p.$ === 1) {
			var _v1 = p.a;
			var m = _v1.a;
			return $elm$core$Maybe$Just(m);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	},
	F2(
		function (m, p) {
			if (p.$ === 1) {
				var _v3 = p.a;
				var history = _v3.b;
				return $author$project$Main$Running(
					A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, m, history));
			} else {
				return $author$project$Main$Running(
					A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, m, _List_Nil));
			}
		}));
var $author$project$Main$accessMachineView = A2(
	$arturopala$elm_monocle$Monocle$Optional$compose,
	$arturopala$elm_monocle$Monocle$Optional$fromLens($author$project$Main$accessProgram),
	$author$project$Main$programToMachineView);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $gampleman$elm_visualization$Force$isCompleted = function (_v0) {
	var alpha = _v0.b2;
	var minAlpha = _v0.fp;
	return _Utils_cmp(alpha, minAlpha) < 1;
};
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 0, a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {fv: oldTime, ia: request, iq: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$AnimationManager$now = _Browser_now(0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(0);
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.ia;
		var oldTime = _v0.fv;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 1) {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.iq;
		var oldTime = _v0.fv;
		var send = function (sub) {
			if (!sub.$) {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (!sub.$) {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrame = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Time(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrame = $elm$browser$Browser$AnimationManager$onAnimationFrame;
var $elm$browser$Browser$Events$Window = 1;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {hZ: pids, iq: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {gP: event, ha: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.hZ,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.ha;
		var event = _v0.gP;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.iq);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Main$subscriptions = function (model) {
	var forceSim = A2(
		$elm$core$Maybe$map,
		function ($) {
			return $.ce;
		},
		$author$project$Main$accessMachineView.gW(model));
	var forceSimRunning = A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $gampleman$elm_visualization$Force$isCompleted),
			forceSim));
	var tick = forceSimRunning ? $elm$browser$Browser$Events$onAnimationFrame(
		$elm$core$Basics$always($author$project$Main$AnimationFrame)) : $elm$core$Platform$Sub$none;
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onResize($author$project$Main$WindowResized),
				tick
			]));
};
var $arturopala$elm_monocle$Monocle$Optional$modifyOption = F2(
	function (opt, fx) {
		var mf = function (a) {
			return A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeR,
					fx,
					A2($arturopala$elm_monocle$Monocle$Optional$flip, opt.eh, a)),
				opt.gW(a));
		};
		return mf;
	});
var $arturopala$elm_monocle$Monocle$Optional$modify = F2(
	function (opt, fx) {
		var mf = function (a) {
			return A2(
				$elm$core$Maybe$withDefault,
				a,
				A3($arturopala$elm_monocle$Monocle$Optional$modifyOption, opt, fx, a));
		};
		return mf;
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$programHistory = A2(
	$arturopala$elm_monocle$Monocle$Optional$Optional,
	function (p) {
		if (p.$ === 1) {
			var history = p.a;
			return $elm$core$Maybe$Just(history);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	},
	F2(
		function (newHistory, _v1) {
			return $author$project$Main$Running(newHistory);
		}));
var $author$project$Main$accessHistory = A2(
	$arturopala$elm_monocle$Monocle$Optional$compose,
	$arturopala$elm_monocle$Monocle$Optional$fromLens($author$project$Main$accessProgram),
	$author$project$Main$programHistory);
var $mgold$elm_nonempty_list$List$Nonempty$pop = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	if (!xs.b) {
		return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, xs);
	} else {
		var y = xs.a;
		var ys = xs.b;
		return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, y, ys);
	}
};
var $author$project$Main$stepBackMachineView = A2($arturopala$elm_monocle$Monocle$Optional$modify, $author$project$Main$accessHistory, $mgold$elm_nonempty_list$List$Nonempty$pop);
var $author$project$Main$accessLastUpdate = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function ($) {
		return $.dW;
	},
	F2(
		function (u, v) {
			return _Utils_update(
				v,
				{dW: u});
		}));
var $mgold$elm_nonempty_list$List$Nonempty$cons = F2(
	function (y, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			y,
			A2($elm$core$List$cons, x, xs));
	});
var $author$project$Main$accessGMachine = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function ($) {
		return $.c3;
	},
	F2(
		function (m, v) {
			return _Utils_update(
				v,
				{c3: m});
		}));
var $staeter$ziplist$ZipList$current = function (_v0) {
	var elem = _v0.b;
	return elem;
};
var $staeter$ziplist$ZipList$singleton = function (item) {
	return A3($staeter$ziplist$ZipList$Zipper, _List_Nil, item, _List_Nil);
};
var $author$project$GMachine$accessCode = A2(
	$arturopala$elm_monocle$Monocle$Lens$Lens,
	function (ctx) {
		if (!ctx.$) {
			var frame = ctx.a;
			return frame.dD;
		} else {
			return $staeter$ziplist$ZipList$singleton($author$project$Backend$UNWIND);
		}
	},
	F2(
		function (codePtr, ctx) {
			if (!ctx.$) {
				var frame = ctx.a;
				return $author$project$GMachine$StackFrame(
					_Utils_update(
						frame,
						{dD: codePtr}));
			} else {
				return ctx;
			}
		}));
var $author$project$GMachine$codePtrLens = A2($arturopala$elm_monocle$Monocle$Lens$compose, $author$project$GMachine$accessCtx, $author$project$GMachine$accessCode);
var $author$project$GMachine$getCodePtr = $author$project$GMachine$codePtrLens.eY;
var $author$project$GMachine$currentInstruction = A2($elm$core$Basics$composeR, $author$project$GMachine$getCodePtr, $staeter$ziplist$ZipList$current);
var $author$project$GMachine$GarbageCollection = function (a) {
	return {$: 4, a: a};
};
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $author$project$GMachine$reachableNodes = F3(
	function (root, graph, visited) {
		reachableNodes:
		while (true) {
			if (A2($elm$core$Set$member, root, visited)) {
				return visited;
			} else {
				var newVisitedSet = A2($elm$core$Set$insert, root, visited);
				var _v0 = A2(
					$elm$core$Maybe$andThen,
					$author$project$GMachine$getChildren,
					A2($elm$core$Dict$get, root, graph));
				if (!_v0.$) {
					var _v1 = _v0.a;
					var leftChild = _v1.a;
					var rightChild = _v1.b;
					var $temp$root = rightChild,
						$temp$graph = graph,
						$temp$visited = A3($author$project$GMachine$reachableNodes, leftChild, graph, newVisitedSet);
					root = $temp$root;
					graph = $temp$graph;
					visited = $temp$visited;
					continue reachableNodes;
				} else {
					return newVisitedSet;
				}
			}
		}
	});
var $author$project$GMachine$stackPointers = function (m) {
	return _Utils_ap(
		$author$project$GMachine$getStack(m),
		A2(
			$elm$core$List$concatMap,
			function ($) {
				return $.di;
			},
			m.be));
};
var $author$project$GMachine$garbageCollection = function (gmachine) {
	var graph = gmachine.bJ;
	var reachableCells = A3(
		$elm$core$List$foldl,
		F2(
			function (ref, visited) {
				return A3($author$project$GMachine$reachableNodes, ref, graph, visited);
			}),
		$elm$core$Set$empty,
		$author$project$GMachine$stackPointers(gmachine));
	var removedCells = A2(
		$elm$core$List$filter,
		function (ref) {
			return !A2($elm$core$Set$member, ref, reachableCells);
		},
		$elm$core$Dict$keys(graph));
	var cleanedGraph = A2(
		$elm$core$Dict$filter,
		F2(
			function (ref, data) {
				return A2($elm$core$Set$member, ref, reachableCells);
			}),
		graph);
	return _Utils_Tuple2(
		_Utils_update(
			gmachine,
			{bJ: cleanedGraph}),
		$author$project$GMachine$GarbageCollection(removedCells));
};
var $staeter$ziplist$ZipList$forward = function (zipList) {
	var _v0 = zipList;
	var before = _v0.a;
	var elem = _v0.b;
	var after = _v0.c;
	if (!after.b) {
		return zipList;
	} else {
		var head = after.a;
		var queue = after.b;
		return A3(
			$staeter$ziplist$ZipList$Zipper,
			A2($elm$core$List$cons, elem, before),
			head,
			queue);
	}
};
var $author$project$GMachine$incCodePtr = A2($arturopala$elm_monocle$Monocle$Lens$modify, $author$project$GMachine$codePtrLens, $staeter$ziplist$ZipList$forward);
var $author$project$GMachine$isUnwinding = function (gmachine) {
	var _v0 = gmachine.b7;
	if (_v0.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $author$project$GMachine$StartedUnwind = function (a) {
	return {$: 6, a: a};
};
var $author$project$GMachine$getTopVal = $author$project$GMachine$getFromStack(0);
var $author$project$GMachine$Crash = function (a) {
	return {$: 2, a: a};
};
var $author$project$GMachine$runWith = F3(
	function (extract, procedure, machine) {
		return A3(
			$elm_community$result_extra$Result$Extra$unpack,
			function (err) {
				return _Utils_Tuple2(
					machine,
					$author$project$GMachine$Crash(err));
			},
			function (val) {
				return A2(procedure, val, machine);
			},
			extract(machine));
	});
var $author$project$GMachine$startUnwind = function (gmachine) {
	var newMachine = A3(
		$arturopala$elm_monocle$Monocle$Lens$modify,
		$author$project$GMachine$accessCtx,
		A2($elm$core$Basics$composeR, $author$project$GMachine$accessStack.eY, $author$project$GMachine$Unwinding),
		gmachine);
	return A3(
		$author$project$GMachine$runWith,
		$author$project$GMachine$getTopVal,
		A2(
			$elm$core$Basics$composeR,
			$author$project$GMachine$StartedUnwind,
			$elm_community$basics_extra$Basics$Extra$flip($elm$core$Tuple$pair)),
		newMachine);
};
var $author$project$GMachine$GApp = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$GMachine$GInt = function (a) {
	return {$: 2, a: a};
};
var $author$project$GMachine$NoUpdate = {$: 11};
var $author$project$GMachine$RedexRootReplaced = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $author$project$GMachine$UnexpectedNode = function (a) {
	return {$: 3, a: a};
};
var $author$project$GMachine$Unwound = function (a) {
	return {$: 7, a: a};
};
var $author$project$GMachine$HolesAllocated = function (a) {
	return {$: 1, a: a};
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $author$project$GMachine$allocHoles = F2(
	function (k, machine) {
		var newMachine = A3(
			$elm$core$List$foldl,
			function (_v0) {
				return A2(
					$elm$core$Basics$composeR,
					$author$project$GMachine$mkNodeAndPush($author$project$GMachine$GHole),
					$elm$core$Tuple$first);
			},
			machine,
			A2($elm$core$List$range, 1, k - 1));
		var holeAddrs = A2(
			$elm$core$List$take,
			k,
			$author$project$GMachine$getStack(newMachine));
		return _Utils_Tuple2(
			newMachine,
			$author$project$GMachine$HolesAllocated(holeAddrs));
	});
var $elm_community$result_extra$Result$Extra$combineBoth = function (_v0) {
	var rx = _v0.a;
	var ry = _v0.b;
	return A3($elm$core$Result$map2, $elm$core$Tuple$pair, rx, ry);
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $elm_community$result_extra$Result$Extra$combineMapBoth = F2(
	function (f, g) {
		return A2(
			$elm$core$Basics$composeL,
			$elm_community$result_extra$Result$Extra$combineBoth,
			A2($elm$core$Tuple$mapBoth, f, g));
	});
var $author$project$GMachine$doNothing = function (machine) {
	return _Utils_Tuple2(machine, $author$project$GMachine$NoUpdate);
};
var $author$project$GMachine$JumpedTo = function (a) {
	return {$: 10, a: a};
};
var $author$project$GMachine$MissingLabel = function (a) {
	return {$: 4, a: a};
};
var $staeter$ziplist$ZipList$goToNextSub = F2(
	function (condition, zipList) {
		goToNextSub:
		while (true) {
			var _v0 = zipList;
			var after = _v0.c;
			if (A2($elm$core$List$any, condition, after)) {
				var $temp$condition = condition,
					$temp$zipList = $staeter$ziplist$ZipList$forward(zipList);
				condition = $temp$condition;
				zipList = $temp$zipList;
				continue goToNextSub;
			} else {
				return zipList;
			}
		}
	});
var $staeter$ziplist$ZipList$goToNext = F2(
	function (condition, zipList) {
		var _v0 = zipList;
		var after = _v0.c;
		return A2($elm$core$List$any, condition, after) ? $elm$core$Maybe$Just(
			A2(
				$staeter$ziplist$ZipList$goToNextSub,
				condition,
				$staeter$ziplist$ZipList$forward(zipList))) : $elm$core$Maybe$Nothing;
	});
var $staeter$ziplist$ZipList$backward = function (zipList) {
	var _v0 = zipList;
	var before = _v0.a;
	var elem = _v0.b;
	var after = _v0.c;
	if (!before.b) {
		return zipList;
	} else {
		var head = before.a;
		var queue = before.b;
		return A3(
			$staeter$ziplist$ZipList$Zipper,
			queue,
			head,
			A2($elm$core$List$cons, elem, after));
	}
};
var $staeter$ziplist$ZipList$goToStart = function (zipList) {
	var _v0 = zipList;
	var before = _v0.a;
	if (!before.b) {
		return zipList;
	} else {
		return $staeter$ziplist$ZipList$goToStart(
			$staeter$ziplist$ZipList$backward(zipList));
	}
};
var $staeter$ziplist$ZipList$isCurrent = F2(
	function (condition, _v0) {
		var elem = _v0.b;
		return condition(elem);
	});
var $staeter$ziplist$ZipList$goToFirst = F2(
	function (condition, zipList) {
		var newZipList = $staeter$ziplist$ZipList$goToStart(zipList);
		return A2($staeter$ziplist$ZipList$isCurrent, condition, newZipList) ? $elm$core$Maybe$Just(newZipList) : A2($staeter$ziplist$ZipList$goToNext, condition, newZipList);
	});
var $author$project$GMachine$goto = F2(
	function (label, machine) {
		var newCodePtr = A2(
			$staeter$ziplist$ZipList$goToFirst,
			$elm$core$Basics$eq(
				$author$project$Backend$LABEL(label)),
			$author$project$GMachine$getCodePtr(machine));
		if (!newCodePtr.$) {
			var ptr = newCodePtr.a;
			return _Utils_Tuple2(
				A2($author$project$GMachine$codePtrLens.eh, ptr, machine),
				$author$project$GMachine$JumpedTo(label));
		} else {
			return _Utils_Tuple2(
				machine,
				$author$project$GMachine$Crash(
					$author$project$GMachine$MissingLabel(label)));
		}
	});
var $author$project$GMachine$pop = function (num) {
	return A2(
		$arturopala$elm_monocle$Monocle$Lens$modify,
		$author$project$GMachine$stackLens,
		$elm$core$List$drop(num));
};
var $author$project$GMachine$saveFrame = function (gmachine) {
	var _v0 = gmachine.b7;
	if (_v0.$ === 1) {
		return gmachine;
	} else {
		var frame = _v0.a;
		return _Utils_update(
			gmachine,
			{
				be: A2($elm$core$List$cons, frame, gmachine.be)
			});
	}
};
var $author$project$GMachine$pushContext = A2(
	$author$project$GMachine$runWith,
	$author$project$GMachine$getTopVal,
	F2(
		function (val, m) {
			return _Utils_Tuple2(
				A3(
					$elm$core$Basics$composeR,
					$author$project$GMachine$pop(1),
					A2(
						$elm$core$Basics$composeR,
						$author$project$GMachine$saveFrame,
						$author$project$GMachine$stackLens.eh(
							_List_fromArray(
								[val]))),
					m),
				$author$project$GMachine$NoUpdate);
		}));
var $author$project$GMachine$UndefinedSymbol = function (a) {
	return {$: 0, a: a};
};
var $elm_community$maybe_extra$Maybe$Extra$oneOf = F2(
	function (fmbs, a) {
		oneOf:
		while (true) {
			if (!fmbs.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var fmb = fmbs.a;
				var rest = fmbs.b;
				var _v1 = fmb(a);
				if (!_v1.$) {
					var b = _v1.a;
					return $elm$core$Maybe$Just(b);
				} else {
					var $temp$fmbs = rest,
						$temp$a = a;
					fmbs = $temp$fmbs;
					a = $temp$a;
					continue oneOf;
				}
			}
		}
	});
var $author$project$GMachine$retrieveGlobal = F2(
	function (name, _v0) {
		var env = _v0.eU;
		var builtins = _v0.eL;
		return A2(
			$elm$core$Result$fromMaybe,
			$author$project$GMachine$UndefinedSymbol(name),
			A2(
				$elm_community$maybe_extra$Maybe$Extra$oneOf,
				_List_fromArray(
					[
						A2($elm_community$basics_extra$Basics$Extra$flip, $author$project$Backend$getGlobal, env),
						A2($elm_community$basics_extra$Basics$Extra$flip, $author$project$Backend$getGlobal, builtins)
					]),
				name));
	});
var $author$project$GMachine$Output = function (a) {
	return {$: 3, a: a};
};
var $author$project$GMachine$popDump = function (gmachine) {
	return _Utils_update(
		gmachine,
		{
			be: A2($elm$core$List$drop, 1, gmachine.be)
		});
};
var $author$project$GMachine$restore = function (gmachine) {
	var _v0 = gmachine.be;
	if (_v0.b) {
		var frame = _v0.a;
		return $elm$core$Maybe$Just(
			$author$project$GMachine$popDump(
				A2(
					$author$project$GMachine$accessCtx.eh,
					$author$project$GMachine$StackFrame(frame),
					gmachine)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$GMachine$return = F2(
	function (retVal, gmachine) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(
				gmachine,
				$author$project$GMachine$Output(retVal)),
			A2(
				$elm$core$Maybe$map,
				function (m) {
					return _Utils_Tuple2(
						A2($author$project$GMachine$push, retVal, m),
						$author$project$GMachine$NoUpdate);
				},
				$author$project$GMachine$restore(gmachine)));
	});
var $author$project$GMachine$stateTransition = F2(
	function (instruction, gmachine) {
		var topMostNode = A2($author$project$GMachine$loadStackPointer, 0, gmachine);
		var sndTopMostNode = A2($author$project$GMachine$loadStackPointer, 1, gmachine);
		var _v0 = _Utils_Tuple3(instruction, topMostNode, sndTopMostNode);
		_v0$23:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					var name = _v0.a.a;
					return A3(
						$author$project$GMachine$runWith,
						$author$project$GMachine$retrieveGlobal(name),
						A2($elm$core$Basics$composeR, $author$project$GMachine$GFunc, $author$project$GMachine$mkNodeAndPush),
						gmachine);
				case 4:
					var num = _v0.a.a;
					return A2($author$project$GMachine$allocHoles, num, gmachine);
				case 5:
					if (!_v0.b.$) {
						switch (_v0.b.a.$) {
							case 0:
								var _v1 = _v0.a;
								var _v2 = _v0.b.a;
								return A2(
									$author$project$GMachine$andThen,
									$author$project$GMachine$startUnwind,
									$author$project$GMachine$pushContext(gmachine));
							case 1:
								var _v3 = _v0.a;
								var global = _v0.b.a.a;
								return (!global.hO) ? A2(
									$author$project$GMachine$andThen,
									$author$project$GMachine$enter(global),
									$author$project$GMachine$pushContext(gmachine)) : $author$project$GMachine$doNothing(gmachine);
							case 2:
								var _v4 = _v0.a;
								return $author$project$GMachine$doNothing(gmachine);
							default:
								break _v0$23;
						}
					} else {
						break _v0$23;
					}
				case 6:
					if (!_v0.b.$) {
						switch (_v0.b.a.$) {
							case 0:
								var _v5 = _v0.a;
								var _v6 = _v0.b.a;
								var n1 = _v6.a;
								var n2 = _v6.b;
								return _Utils_Tuple2(
									A2($author$project$GMachine$push, n1, gmachine),
									$author$project$GMachine$Unwound(n1));
							case 1:
								var _v7 = _v0.a;
								var global = _v0.b.a.a;
								var stackLength = $elm$core$List$length(
									$author$project$GMachine$getStack(gmachine));
								var enoughArguments = _Utils_cmp(stackLength, global.hO) > 0;
								if (enoughArguments) {
									return A2($author$project$GMachine$enter, global, gmachine);
								} else {
									var getRedexRoot = $author$project$GMachine$getFromStack(stackLength - 1);
									return A3($author$project$GMachine$runWith, getRedexRoot, $author$project$GMachine$return, gmachine);
								}
							case 2:
								var _v8 = _v0.a;
								return A3($author$project$GMachine$runWith, $author$project$GMachine$getTopVal, $author$project$GMachine$return, gmachine);
							default:
								break _v0$23;
						}
					} else {
						break _v0$23;
					}
				case 7:
					if (!_v0.b.$) {
						var k = _v0.a.a;
						var nodeOnTop = _v0.b.a;
						return A3(
							$author$project$GMachine$runWith,
							$author$project$GMachine$getFromStack(k),
							F2(
								function (addr, m) {
									return _Utils_Tuple2(
										A3(
											$author$project$GMachine$updatePointer,
											addr,
											nodeOnTop,
											A2($author$project$GMachine$pop, 1, m)),
										A2($author$project$GMachine$RedexRootReplaced, addr, nodeOnTop));
								}),
							gmachine);
					} else {
						break _v0$23;
					}
				case 8:
					var k = _v0.a.a;
					return _Utils_Tuple2(
						A2($author$project$GMachine$pop, k, gmachine),
						$author$project$GMachine$NoUpdate);
				case 2:
					var k = _v0.a.a;
					return A3(
						$author$project$GMachine$runWith,
						$author$project$GMachine$getFromStack(k),
						F2(
							function (val, m) {
								return _Utils_Tuple2(
									A2($author$project$GMachine$push, val, m),
									$author$project$GMachine$NoUpdate);
							}),
						gmachine);
				case 3:
					var x = _v0.a.a;
					return A2(
						$author$project$GMachine$mkNodeAndPush,
						$author$project$GMachine$GInt(x),
						gmachine);
				case 1:
					var k = _v0.a.a;
					return A3(
						$author$project$GMachine$runWith,
						$author$project$GMachine$getFromStack(k),
						F2(
							function (addr, m) {
								var _v9 = A2($author$project$GMachine$retrieveNode, addr, m);
								if (!_v9.$) {
									if (!_v9.a.$) {
										var _v10 = _v9.a;
										var arg = _v10.b;
										return _Utils_Tuple2(
											A2($author$project$GMachine$push, arg, m),
											$author$project$GMachine$NoUpdate);
									} else {
										return _Utils_Tuple2(
											m,
											$author$project$GMachine$Crash(
												$author$project$GMachine$UnexpectedNode(addr)));
									}
								} else {
									var err = _v9.a;
									return _Utils_Tuple2(
										m,
										$author$project$GMachine$Crash(err));
								}
							}),
						gmachine);
				case 9:
					var _v11 = _v0.a;
					return A3(
						$author$project$GMachine$runWith,
						function (m) {
							return A3(
								$elm_community$result_extra$Result$Extra$combineMapBoth,
								$author$project$GMachine$getFromStack(0),
								$author$project$GMachine$getFromStack(1),
								_Utils_Tuple2(m, m));
						},
						function (_v12) {
							var n1 = _v12.a;
							var n2 = _v12.b;
							return A2(
								$elm$core$Basics$composeR,
								$author$project$GMachine$pop(2),
								$author$project$GMachine$mkNodeAndPush(
									A2($author$project$GMachine$GApp, n1, n2)));
						},
						gmachine);
				case 11:
					if ((((!_v0.b.$) && (_v0.b.a.$ === 2)) && (!_v0.c.$)) && (_v0.c.a.$ === 2)) {
						var _v13 = _v0.a;
						var x = _v0.b.a.a;
						var y = _v0.c.a.a;
						return A2(
							$author$project$GMachine$mkNodeAndPush,
							$author$project$GMachine$GInt(x + y),
							A2($author$project$GMachine$pop, 2, gmachine));
					} else {
						break _v0$23;
					}
				case 12:
					if ((((!_v0.b.$) && (_v0.b.a.$ === 2)) && (!_v0.c.$)) && (_v0.c.a.$ === 2)) {
						var _v14 = _v0.a;
						var x = _v0.b.a.a;
						var y = _v0.c.a.a;
						return A2(
							$author$project$GMachine$mkNodeAndPush,
							$author$project$GMachine$GInt(x - y),
							A2($author$project$GMachine$pop, 2, gmachine));
					} else {
						break _v0$23;
					}
				case 13:
					if ((((!_v0.b.$) && (_v0.b.a.$ === 2)) && (!_v0.c.$)) && (_v0.c.a.$ === 2)) {
						var _v15 = _v0.a;
						var x = _v0.b.a.a;
						var y = _v0.c.a.a;
						return A2(
							$author$project$GMachine$mkNodeAndPush,
							$author$project$GMachine$GInt(x * y),
							A2($author$project$GMachine$pop, 2, gmachine));
					} else {
						break _v0$23;
					}
				case 14:
					if ((((!_v0.b.$) && (_v0.b.a.$ === 2)) && (!_v0.c.$)) && (_v0.c.a.$ === 2)) {
						var _v16 = _v0.a;
						var x = _v0.b.a.a;
						var y = _v0.c.a.a;
						return A2(
							$author$project$GMachine$mkNodeAndPush,
							$author$project$GMachine$GInt((x / y) | 0),
							A2($author$project$GMachine$pop, 2, gmachine));
					} else {
						break _v0$23;
					}
				case 15:
					if ((((!_v0.b.$) && (_v0.b.a.$ === 2)) && (!_v0.c.$)) && (_v0.c.a.$ === 2)) {
						var _v17 = _v0.a;
						var x = _v0.b.a.a;
						var y = _v0.c.a.a;
						return A2(
							$author$project$GMachine$mkNodeAndPush,
							$author$project$GMachine$GInt(
								_Utils_eq(x, y) ? 1 : 0),
							A2($author$project$GMachine$pop, 2, gmachine));
					} else {
						break _v0$23;
					}
				case 10:
					var k = _v0.a.a;
					return A3(
						$author$project$GMachine$runWith,
						$author$project$GMachine$getTopVal,
						F2(
							function (topVal, m) {
								return _Utils_Tuple2(
									A3(
										$elm$core$Basics$composeR,
										$author$project$GMachine$pop(k + 1),
										$author$project$GMachine$push(topVal),
										m),
									$author$project$GMachine$NoUpdate);
							}),
						gmachine);
				case 18:
					var label = _v0.a.a;
					return A2($author$project$GMachine$goto, label, gmachine);
				case 16:
					return _Utils_Tuple2(gmachine, $author$project$GMachine$NoUpdate);
				default:
					if ((!_v0.b.$) && (_v0.b.a.$ === 2)) {
						var label = _v0.a.a;
						var val = _v0.b.a.a;
						return (!val) ? A2($author$project$GMachine$goto, label, gmachine) : $author$project$GMachine$doNothing(gmachine);
					} else {
						break _v0$23;
					}
			}
		}
		return A3(
			$author$project$GMachine$runWith,
			$author$project$GMachine$getTopVal,
			F2(
				function (val, m) {
					return _Utils_Tuple2(
						m,
						$author$project$GMachine$Crash(
							$author$project$GMachine$UnexpectedNode(val)));
				}),
			gmachine);
	});
var $author$project$GMachine$step = function (machine) {
	if ($author$project$GMachine$isUnwinding(machine)) {
		return A2($author$project$GMachine$stateTransition, $author$project$Backend$UNWIND, machine);
	} else {
		var _v0 = $author$project$GMachine$currentInstruction(machine);
		if (_v0.$ === 6) {
			return $author$project$GMachine$startUnwind(machine);
		} else {
			var instruction = _v0;
			return A2(
				$author$project$GMachine$andThen,
				$author$project$GMachine$garbageCollection,
				A2(
					$author$project$GMachine$stateTransition,
					instruction,
					$author$project$GMachine$incCodePtr(machine)));
		}
	}
};
var $author$project$Main$stepMachineView = function (mview) {
	var _v0 = $author$project$GMachine$step(
		$author$project$Main$accessGMachine.eY(mview));
	var newMachine = _v0.a;
	var machineUpdate = _v0.b;
	return A2(
		$author$project$Main$updateMachineView,
		machineUpdate,
		A2(
			$author$project$Main$accessGMachine.eh,
			newMachine,
			A2($author$project$Main$accessLastUpdate.eh, machineUpdate, mview)));
};
var $author$project$Main$stepForwardMachineView = function (model) {
	var cannotMoveForward = A2(
		$elm$core$Maybe$withDefault,
		true,
		A2(
			$elm$core$Maybe$map,
			$author$project$GMachine$isTermination,
			A2(
				$elm$core$Maybe$map,
				$author$project$Main$accessLastUpdate.eY,
				$author$project$Main$accessMachineView.gW(model))));
	return A3(
		$arturopala$elm_monocle$Monocle$Optional$modify,
		$author$project$Main$accessHistory,
		function (history) {
			var currentState = $mgold$elm_nonempty_list$List$Nonempty$head(history);
			return cannotMoveForward ? history : A2(
				$mgold$elm_nonempty_list$List$Nonempty$cons,
				$author$project$Main$stepMachineView(currentState),
				history);
		},
		model);
};
var $elm_community$intdict$IntDict$values = function (dict) {
	return A3(
		$elm_community$intdict$IntDict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $elm_community$graph$Graph$nodes = A2(
	$elm$core$Basics$composeR,
	$elm_community$graph$Graph$unGraph,
	A2(
		$elm$core$Basics$composeR,
		$elm_community$intdict$IntDict$values,
		$elm$core$List$map(
			function ($) {
				return $.bm;
			})));
var $gampleman$elm_visualization$Force$Jiggle$jiggle = function (v) {
	return (!v) ? 1.0e-6 : v;
};
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $gampleman$elm_visualization$Force$nTimes = F3(
	function (fn, times, input) {
		nTimes:
		while (true) {
			if (times <= 0) {
				return input;
			} else {
				var $temp$fn = fn,
					$temp$times = times - 1,
					$temp$input = fn(input);
				fn = $temp$fn;
				times = $temp$times;
				input = $temp$input;
				continue nTimes;
			}
		}
	});
var $gampleman$elm_visualization$Force$Collision$arrayUpdate = F3(
	function (index, fn, arr) {
		var _v0 = A2($elm$core$Array$get, index, arr);
		if (!_v0.$) {
			var v = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				fn(v),
				arr);
		} else {
			return arr;
		}
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Vector2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector2d$at = F2(
	function (_v0, _v1) {
		var rate = _v0;
		var v = _v1;
		return {z: rate * v.z, R: rate * v.R};
	});
var $ianmackenzie$elm_geometry$Circle2d$centerPoint = function (_v0) {
	var properties = _v0;
	return properties.jl;
};
var $ianmackenzie$elm_geometry$Geometry$Types$BoundingBox2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema = function (given) {
	var _v0 = given.c5;
	var y2 = _v0;
	var _v1 = given.c7;
	var y1 = _v1;
	var _v2 = given.c4;
	var x2 = _v2;
	var _v3 = given.c6;
	var x1 = _v3;
	return {
		c4: A2($elm$core$Basics$max, x1, x2),
		c5: A2($elm$core$Basics$max, y1, y2),
		c6: A2($elm$core$Basics$min, x1, x2),
		c7: A2($elm$core$Basics$min, y1, y2)
	};
};
var $ianmackenzie$elm_units$Quantity$Quantity = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$minus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x - y;
	});
var $ianmackenzie$elm_units$Quantity$plus = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return x + y;
	});
var $ianmackenzie$elm_geometry$Circle2d$radius = function (_v0) {
	var properties = _v0;
	return properties.h6;
};
var $ianmackenzie$elm_geometry$Point2d$xCoordinate = function (_v0) {
	var p = _v0;
	return p.z;
};
var $ianmackenzie$elm_geometry$Point2d$yCoordinate = function (_v0) {
	var p = _v0;
	return p.R;
};
var $ianmackenzie$elm_geometry$Circle2d$boundingBox = function (circle) {
	return $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
		{
			c4: A2(
				$ianmackenzie$elm_units$Quantity$plus,
				$ianmackenzie$elm_geometry$Circle2d$radius(circle),
				$ianmackenzie$elm_geometry$Point2d$xCoordinate(
					$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle))),
			c5: A2(
				$ianmackenzie$elm_units$Quantity$plus,
				$ianmackenzie$elm_geometry$Circle2d$radius(circle),
				$ianmackenzie$elm_geometry$Point2d$yCoordinate(
					$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle))),
			c6: A2(
				$ianmackenzie$elm_units$Quantity$minus,
				$ianmackenzie$elm_geometry$Circle2d$radius(circle),
				$ianmackenzie$elm_geometry$Point2d$xCoordinate(
					$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle))),
			c7: A2(
				$ianmackenzie$elm_units$Quantity$minus,
				$ianmackenzie$elm_geometry$Circle2d$radius(circle),
				$ianmackenzie$elm_geometry$Point2d$yCoordinate(
					$ianmackenzie$elm_geometry$Circle2d$centerPoint(circle)))
		});
};
var $ianmackenzie$elm_geometry$Vector2d$from = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		return {z: p2.z - p1.z, R: p2.R - p1.R};
	});
var $ianmackenzie$elm_geometry$Vector2d$unsafe = function (givenComponents) {
	return givenComponents;
};
var $ianmackenzie$elm_geometry$Vector2d$unwrap = function (_v0) {
	var vectorComponents = _v0;
	return vectorComponents;
};
var $gampleman$elm_visualization$Force$Jiggle$jiggleVector = function (vec) {
	var _v0 = $ianmackenzie$elm_geometry$Vector2d$unwrap(vec);
	var x = _v0.z;
	var y = _v0.R;
	return $ianmackenzie$elm_geometry$Vector2d$unsafe(
		{
			z: $gampleman$elm_visualization$Force$Jiggle$jiggle(x),
			R: $gampleman$elm_visualization$Force$Jiggle$jiggle(y)
		});
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $ianmackenzie$elm_units$Quantity$zero = 0;
var $ianmackenzie$elm_geometry$Vector2d$length = function (_v0) {
	var v = _v0;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.z),
		$elm$core$Basics$abs(v.R));
	if (!largestComponent) {
		return $ianmackenzie$elm_units$Quantity$zero;
	} else {
		var scaledY = v.R / largestComponent;
		var scaledX = v.z / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt((scaledX * scaledX) + (scaledY * scaledY));
		return scaledLength * largestComponent;
	}
};
var $ianmackenzie$elm_units$Quantity$lessThan = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) < 0;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$lessThan = $ianmackenzie$elm_units$Quantity$lessThan;
var $ianmackenzie$elm_units_prefixed$Units$Quantity$minus = $ianmackenzie$elm_units$Quantity$minus;
var $ianmackenzie$elm_geometry$Vector2d$minus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {z: v1.z - v2.z, R: v1.R - v2.R};
	});
var $ianmackenzie$elm_units$Quantity$multiplyBy = F2(
	function (scale, _v0) {
		var value = _v0;
		return scale * value;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$multiplyBy = $ianmackenzie$elm_units$Quantity$multiplyBy;
var $ianmackenzie$elm_units$Quantity$per = F2(
	function (_v0, _v1) {
		var independentValue = _v0;
		var dependentValue = _v1;
		return dependentValue / independentValue;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$per = $ianmackenzie$elm_units$Quantity$per;
var $ianmackenzie$elm_units_prefixed$Units$Quantity$plus = $ianmackenzie$elm_units$Quantity$plus;
var $ianmackenzie$elm_geometry$Vector2d$plus = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return {z: v1.z + v2.z, R: v1.R + v2.R};
	});
var $ianmackenzie$elm_units$Quantity$ratio = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return x / y;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$ratio = $ianmackenzie$elm_units$Quantity$ratio;
var $ianmackenzie$elm_geometry$Vector2d$scaleBy = F2(
	function (k, _v0) {
		var v = _v0;
		return {z: k * v.z, R: k * v.R};
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$separatedByAtLeast = F3(
	function (tolerance, firstBox, secondBox) {
		var _v0 = tolerance;
		var dGiven = _v0;
		var d = A2($elm$core$Basics$max, dGiven, 0);
		var _v1 = secondBox;
		var b2 = _v1;
		var _v2 = firstBox;
		var b1 = _v2;
		var xSeparation = A2($elm$core$Basics$max, b1.c6, b2.c6) - A2($elm$core$Basics$min, b1.c4, b2.c4);
		var ySeparation = A2($elm$core$Basics$max, b1.c7, b2.c7) - A2($elm$core$Basics$min, b1.c5, b2.c5);
		return ((xSeparation > 0) && (ySeparation > 0)) ? (_Utils_cmp((xSeparation * xSeparation) + (ySeparation * ySeparation), d * d) > -1) : ((xSeparation > 0) ? (_Utils_cmp(xSeparation, d) > -1) : ((ySeparation > 0) ? (_Utils_cmp(ySeparation, d) > -1) : (((!xSeparation) && (!ySeparation)) ? (!d) : false)));
	});
var $ianmackenzie$elm_units$Quantity$squared = function (_v0) {
	var value = _v0;
	return value * value;
};
var $ianmackenzie$elm_units_prefixed$Units$Quantity$squared = $ianmackenzie$elm_units$Quantity$squared;
var $ianmackenzie$elm_geometry$Geometry$Types$Point2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Point2d$translateBy = F2(
	function (_v0, _v1) {
		var v = _v0;
		var p = _v1;
		return {z: p.z + v.z, R: p.R + v.R};
	});
var $gampleman$elm_visualization$Force$Collision$updateVelocity = F2(
	function (fn, vert) {
		return _Utils_update(
			vert,
			{
				b$: fn(vert.b$)
			});
	});
var $gampleman$elm_visualization$Force$Collision$applyForce = F4(
	function (strength, qtree, velocities, node) {
		applyForce:
		while (true) {
			switch (qtree.$) {
				case 0:
					return velocities;
				case 1:
					var leaf = qtree.a;
					var _v1 = leaf.jn;
					var head = _v1.a;
					var tail = _v1.b;
					return A3(
						$elm$core$List$foldl,
						F2(
							function (vertex, velos) {
								if (_Utils_cmp(vertex.j3, node.j3) > 0) {
									var rj = $ianmackenzie$elm_geometry$Circle2d$radius(vertex.am);
									var ri = $ianmackenzie$elm_geometry$Circle2d$radius(node.am);
									var r = A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, rj, ri);
									var nodeNextCenterPoint = A2(
										$ianmackenzie$elm_geometry$Point2d$translateBy,
										node.b$,
										$ianmackenzie$elm_geometry$Circle2d$centerPoint(node.am));
									var xy = $gampleman$elm_visualization$Force$Jiggle$jiggleVector(
										A2(
											$ianmackenzie$elm_geometry$Vector2d$from,
											$ianmackenzie$elm_geometry$Circle2d$centerPoint(vertex.am),
											nodeNextCenterPoint));
									var l = $ianmackenzie$elm_geometry$Vector2d$length(xy);
									if (A2($ianmackenzie$elm_units_prefixed$Units$Quantity$lessThan, r, l)) {
										var rp = A2(
											$ianmackenzie$elm_units_prefixed$Units$Quantity$ratio,
											$ianmackenzie$elm_units_prefixed$Units$Quantity$squared(rj),
											A2(
												$ianmackenzie$elm_units_prefixed$Units$Quantity$plus,
												$ianmackenzie$elm_units_prefixed$Units$Quantity$squared(rj),
												$ianmackenzie$elm_units_prefixed$Units$Quantity$squared(ri)));
										var lp = A2(
											$ianmackenzie$elm_units_prefixed$Units$Quantity$multiplyBy,
											strength,
											A2(
												$ianmackenzie$elm_units_prefixed$Units$Quantity$per,
												l,
												A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, l, r)));
										var repelantVector = A2($ianmackenzie$elm_geometry$Vector2d$at, lp, xy);
										return A3(
											$gampleman$elm_visualization$Force$Collision$arrayUpdate,
											vertex.j3,
											$gampleman$elm_visualization$Force$Collision$updateVelocity(
												$ianmackenzie$elm_geometry$Vector2d$minus(
													A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, 1 - rp, repelantVector))),
											A3(
												$gampleman$elm_visualization$Force$Collision$arrayUpdate,
												node.j3,
												$gampleman$elm_visualization$Force$Collision$updateVelocity(
													$ianmackenzie$elm_geometry$Vector2d$plus(
														A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, rp, repelantVector))),
												velos));
									} else {
										return velos;
									}
								} else {
									return velos;
								}
							}),
						velocities,
						A2($elm$core$List$cons, head, tail));
				default:
					var box = qtree.a;
					if (A3(
						$ianmackenzie$elm_geometry$BoundingBox2d$separatedByAtLeast,
						box.iP,
						box.jg,
						$ianmackenzie$elm_geometry$Circle2d$boundingBox(node.am))) {
						return velocities;
					} else {
						var $temp$strength = strength,
							$temp$qtree = box.k8,
							$temp$velocities = A4(
							$gampleman$elm_visualization$Force$Collision$applyForce,
							strength,
							box.lp,
							A4(
								$gampleman$elm_visualization$Force$Collision$applyForce,
								strength,
								box.ku,
								A4($gampleman$elm_visualization$Force$Collision$applyForce, strength, box.kF, velocities, node),
								node),
							node),
							$temp$node = node;
						strength = $temp$strength;
						qtree = $temp$qtree;
						velocities = $temp$velocities;
						node = $temp$node;
						continue applyForce;
					}
			}
		}
	});
var $ianmackenzie$elm_units$Quantity$max = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return A2($elm$core$Basics$max, x, y);
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$max = $ianmackenzie$elm_units$Quantity$max;
var $ianmackenzie$elm_units$Quantity$maximum = function (quantities) {
	if (!quantities.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var first = quantities.a;
		var rest = quantities.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $ianmackenzie$elm_units$Quantity$max, first, rest));
	}
};
var $ianmackenzie$elm_units_prefixed$Units$Quantity$maximum = $ianmackenzie$elm_units$Quantity$maximum;
var $gampleman$elm_visualization$Force$Collision$nonEmptyMaximum = F2(
	function (head, tail) {
		return A2(
			$ianmackenzie$elm_units_prefixed$Units$Quantity$max,
			head,
			A2(
				$elm$core$Maybe$withDefault,
				head,
				$ianmackenzie$elm_units_prefixed$Units$Quantity$maximum(tail)));
	});
var $gampleman$elm_visualization$Force$Collision$toRadius = A2(
	$elm$core$Basics$composeR,
	function ($) {
		return $.am;
	},
	$ianmackenzie$elm_geometry$Circle2d$radius);
var $gampleman$elm_visualization$Force$Collision$config = {
	jt: F2(
		function (radius, radii) {
			return A2($gampleman$elm_visualization$Force$Collision$nonEmptyMaximum, radius, radii);
		}),
	ju: F2(
		function (vertex, vertices) {
			return A2(
				$gampleman$elm_visualization$Force$Collision$nonEmptyMaximum,
				$gampleman$elm_visualization$Force$Collision$toRadius(vertex),
				A2($elm$core$List$map, $gampleman$elm_visualization$Force$Collision$toRadius, vertices));
		}),
	lM: A2(
		$elm$core$Basics$composeR,
		function ($) {
			return $.am;
		},
		$ianmackenzie$elm_geometry$Circle2d$centerPoint)
};
var $gampleman$elm_visualization$Force$QuadTree$Empty = {$: 0};
var $gampleman$elm_visualization$Force$QuadTree$empty = $gampleman$elm_visualization$Force$QuadTree$Empty;
var $gampleman$elm_visualization$Force$QuadTree$Leaf = function (a) {
	return {$: 1, a: a};
};
var $gampleman$elm_visualization$Force$QuadTree$Node = function (a) {
	return {$: 2, a: a};
};
var $ianmackenzie$elm_geometry$BoundingBox2d$contains = F2(
	function (point, boundingBox) {
		var _v0 = point;
		var x = _v0.z;
		var y = _v0.R;
		var _v1 = boundingBox;
		var b = _v1;
		return (_Utils_cmp(x, b.c6) > -1) && ((_Utils_cmp(x, b.c4) < 1) && ((_Utils_cmp(y, b.c7) > -1) && (_Utils_cmp(y, b.c5) < 1)));
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$maxX = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.c4;
};
var $ianmackenzie$elm_geometry$BoundingBox2d$maxY = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.c5;
};
var $ianmackenzie$elm_geometry$BoundingBox2d$minX = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.c6;
};
var $ianmackenzie$elm_geometry$BoundingBox2d$minY = function (_v0) {
	var boundingBox = _v0;
	return boundingBox.c7;
};
var $ianmackenzie$elm_geometry$BoundingBox2d$dimensions = function (boundingBox) {
	return _Utils_Tuple2(
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox2d$minX(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox2d$maxX(boundingBox)),
		A2(
			$ianmackenzie$elm_units$Quantity$minus,
			$ianmackenzie$elm_geometry$BoundingBox2d$minY(boundingBox),
			$ianmackenzie$elm_geometry$BoundingBox2d$maxY(boundingBox)));
};
var $ianmackenzie$elm_geometry$BoundingBox2d$extrema = function (boundingBox) {
	var _v0 = boundingBox;
	var b = _v0;
	return {c4: b.c4, c5: b.c5, c6: b.c6, c7: b.c7};
};
var $gampleman$elm_visualization$Force$QuadTree$NE = 0;
var $gampleman$elm_visualization$Force$QuadTree$NW = 1;
var $gampleman$elm_visualization$Force$QuadTree$SE = 2;
var $gampleman$elm_visualization$Force$QuadTree$SW = 3;
var $ianmackenzie$elm_geometry$BoundingBox2d$centerPoint = function (boundingBox) {
	var _v0 = boundingBox;
	var b = _v0;
	var x1 = b.c6;
	var x2 = b.c4;
	var y1 = b.c7;
	var y2 = b.c5;
	return {z: x1 + (0.5 * (x2 - x1)), R: y1 + (0.5 * (y2 - y1))};
};
var $ianmackenzie$elm_geometry$Point2d$coordinates = function (_v0) {
	var p = _v0;
	return _Utils_Tuple2(p.z, p.R);
};
var $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) > -1;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$greaterThanOrEqualTo = $ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo;
var $gampleman$elm_visualization$Force$QuadTree$quadrant = F2(
	function (boundingBox, point) {
		var _v0 = $ianmackenzie$elm_geometry$Point2d$coordinates(point);
		var x = _v0.a;
		var y = _v0.b;
		var _v1 = $ianmackenzie$elm_geometry$Point2d$coordinates(
			$ianmackenzie$elm_geometry$BoundingBox2d$centerPoint(boundingBox));
		var midX = _v1.a;
		var midY = _v1.b;
		return A2($ianmackenzie$elm_units_prefixed$Units$Quantity$greaterThanOrEqualTo, midY, y) ? (A2($ianmackenzie$elm_units_prefixed$Units$Quantity$greaterThanOrEqualTo, midX, x) ? 0 : 1) : (A2($ianmackenzie$elm_units_prefixed$Units$Quantity$greaterThanOrEqualTo, midX, x) ? 2 : 3);
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$singleton = function (point) {
	var _v0 = point;
	var x = _v0.z;
	var y = _v0.R;
	return {c4: x, c5: y, c6: x, c7: y};
};
var $gampleman$elm_visualization$Force$QuadTree$singleton = F2(
	function (toPoint, vertex) {
		return $gampleman$elm_visualization$Force$QuadTree$Leaf(
			{
				iP: 0,
				jg: $ianmackenzie$elm_geometry$BoundingBox2d$singleton(
					toPoint(vertex)),
				jn: _Utils_Tuple2(vertex, _List_Nil)
			});
	});
var $ianmackenzie$elm_geometry$BoundingBox2d$union = F2(
	function (firstBox, secondBox) {
		var _v0 = secondBox;
		var b2 = _v0;
		var _v1 = firstBox;
		var b1 = _v1;
		return {
			c4: A2($elm$core$Basics$max, b1.c4, b2.c4),
			c5: A2($elm$core$Basics$max, b1.c5, b2.c5),
			c6: A2($elm$core$Basics$min, b1.c6, b2.c6),
			c7: A2($elm$core$Basics$min, b1.c7, b2.c7)
		};
	});
var $gampleman$elm_visualization$Force$QuadTree$insertBy = F3(
	function (toPoint, vertex, qtree) {
		switch (qtree.$) {
			case 0:
				return $gampleman$elm_visualization$Force$QuadTree$Leaf(
					{
						iP: 0,
						jg: $ianmackenzie$elm_geometry$BoundingBox2d$singleton(
							toPoint(vertex)),
						jn: _Utils_Tuple2(vertex, _List_Nil)
					});
			case 1:
				var leaf = qtree.a;
				var maxSize = 32;
				var _v1 = leaf.jn;
				var first = _v1.a;
				var rest = _v1.b;
				var newSize = 2 + $elm$core$List$length(rest);
				if (_Utils_cmp(newSize, maxSize) > -1) {
					var initial = $gampleman$elm_visualization$Force$QuadTree$Node(
						{
							iP: 0,
							jg: A2(
								$ianmackenzie$elm_geometry$BoundingBox2d$union,
								leaf.jg,
								$ianmackenzie$elm_geometry$BoundingBox2d$singleton(
									toPoint(vertex))),
							ku: $gampleman$elm_visualization$Force$QuadTree$Empty,
							kF: $gampleman$elm_visualization$Force$QuadTree$Empty,
							k8: $gampleman$elm_visualization$Force$QuadTree$Empty,
							lp: $gampleman$elm_visualization$Force$QuadTree$Empty
						});
					return A3(
						$elm$core$List$foldl,
						$gampleman$elm_visualization$Force$QuadTree$insertBy(toPoint),
						initial,
						A2($elm$core$List$cons, first, rest));
				} else {
					return $gampleman$elm_visualization$Force$QuadTree$Leaf(
						{
							iP: 0,
							jg: A2(
								$ianmackenzie$elm_geometry$BoundingBox2d$union,
								leaf.jg,
								$ianmackenzie$elm_geometry$BoundingBox2d$singleton(
									toPoint(vertex))),
							jn: _Utils_Tuple2(
								vertex,
								A2($elm$core$List$cons, first, rest))
						});
				}
			default:
				var node = qtree.a;
				var point = toPoint(vertex);
				if (A2($ianmackenzie$elm_geometry$BoundingBox2d$contains, point, node.jg)) {
					var _v2 = A2($gampleman$elm_visualization$Force$QuadTree$quadrant, node.jg, point);
					switch (_v2) {
						case 0:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									iP: node.iP,
									jg: node.jg,
									ku: A3($gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.ku),
									kF: node.kF,
									k8: node.k8,
									lp: node.lp
								});
						case 2:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									iP: node.iP,
									jg: node.jg,
									ku: node.ku,
									kF: node.kF,
									k8: A3($gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.k8),
									lp: node.lp
								});
						case 1:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									iP: node.iP,
									jg: node.jg,
									ku: node.ku,
									kF: A3($gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.kF),
									k8: node.k8,
									lp: node.lp
								});
						default:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									iP: node.iP,
									jg: node.jg,
									ku: node.ku,
									kF: node.kF,
									k8: node.k8,
									lp: A3($gampleman$elm_visualization$Force$QuadTree$insertBy, toPoint, vertex, node.lp)
								});
					}
				} else {
					var _v3 = $ianmackenzie$elm_geometry$BoundingBox2d$extrema(node.jg);
					var minX = _v3.c6;
					var minY = _v3.c7;
					var maxX = _v3.c4;
					var maxY = _v3.c5;
					var _v4 = $ianmackenzie$elm_geometry$BoundingBox2d$dimensions(node.jg);
					var width = _v4.a;
					var height = _v4.b;
					var _v5 = A2($gampleman$elm_visualization$Force$QuadTree$quadrant, node.jg, point);
					switch (_v5) {
						case 0:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									iP: 0,
									jg: $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{
											c4: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, width, maxX),
											c5: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, height, maxY),
											c6: minX,
											c7: minY
										}),
									ku: A2($gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									kF: $gampleman$elm_visualization$Force$QuadTree$Empty,
									k8: $gampleman$elm_visualization$Force$QuadTree$Empty,
									lp: qtree
								});
						case 2:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									iP: 0,
									jg: $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{
											c4: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, width, maxX),
											c5: maxY,
											c6: minX,
											c7: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, height, minY)
										}),
									ku: $gampleman$elm_visualization$Force$QuadTree$Empty,
									kF: qtree,
									k8: A2($gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									lp: $gampleman$elm_visualization$Force$QuadTree$Empty
								});
						case 1:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									iP: 0,
									jg: $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{
											c4: maxX,
											c5: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, height, maxY),
											c6: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, width, minX),
											c7: minY
										}),
									ku: $gampleman$elm_visualization$Force$QuadTree$Empty,
									kF: A2($gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex),
									k8: qtree,
									lp: $gampleman$elm_visualization$Force$QuadTree$Empty
								});
						default:
							return $gampleman$elm_visualization$Force$QuadTree$Node(
								{
									iP: 0,
									jg: $ianmackenzie$elm_geometry$BoundingBox2d$fromExtrema(
										{
											c4: maxX,
											c5: maxY,
											c6: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, width, minX),
											c7: A2($ianmackenzie$elm_units_prefixed$Units$Quantity$minus, height, minY)
										}),
									ku: qtree,
									kF: $gampleman$elm_visualization$Force$QuadTree$Empty,
									k8: $gampleman$elm_visualization$Force$QuadTree$Empty,
									lp: A2($gampleman$elm_visualization$Force$QuadTree$singleton, toPoint, vertex)
								});
					}
				}
		}
	});
var $gampleman$elm_visualization$Force$QuadTree$fromList = function (toPoint) {
	return A2(
		$elm$core$List$foldl,
		$gampleman$elm_visualization$Force$QuadTree$insertBy(toPoint),
		$gampleman$elm_visualization$Force$QuadTree$empty);
};
var $gampleman$elm_visualization$Force$Collision$nTimes = F3(
	function (fn, times, input) {
		nTimes:
		while (true) {
			if (times <= 0) {
				return input;
			} else {
				var $temp$fn = fn,
					$temp$times = times - 1,
					$temp$input = fn(input);
				fn = $temp$fn;
				times = $temp$times;
				input = $temp$input;
				continue nTimes;
			}
		}
	});
var $gampleman$elm_visualization$Force$QuadTree$getAggregate = function (qtree) {
	switch (qtree.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var aggregate = qtree.a.iP;
			return $elm$core$Maybe$Just(aggregate);
		default:
			var aggregate = qtree.a.iP;
			return $elm$core$Maybe$Just(aggregate);
	}
};
var $gampleman$elm_visualization$Force$QuadTree$performAggregate = F2(
	function (config, vanillaQuadTree) {
		var combineAggregates = config.jt;
		var combineVertices = config.ju;
		switch (vanillaQuadTree.$) {
			case 0:
				return $gampleman$elm_visualization$Force$QuadTree$Empty;
			case 1:
				var leaf = vanillaQuadTree.a;
				var _v1 = leaf.jn;
				var first = _v1.a;
				var rest = _v1.b;
				return $gampleman$elm_visualization$Force$QuadTree$Leaf(
					{
						iP: A2(combineVertices, first, rest),
						jg: leaf.jg,
						jn: _Utils_Tuple2(first, rest)
					});
			default:
				var node = vanillaQuadTree.a;
				var newSw = A2($gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.lp);
				var newSe = A2($gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.k8);
				var newNw = A2($gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.kF);
				var newNe = A2($gampleman$elm_visualization$Force$QuadTree$performAggregate, config, node.ku);
				var subresults = A2(
					$elm$core$List$filterMap,
					$gampleman$elm_visualization$Force$QuadTree$getAggregate,
					_List_fromArray(
						[newNw, newSw, newNe, newSe]));
				if (!subresults.b) {
					return $gampleman$elm_visualization$Force$QuadTree$Empty;
				} else {
					var x = subresults.a;
					var xs = subresults.b;
					return $gampleman$elm_visualization$Force$QuadTree$Node(
						{
							iP: A2(combineAggregates, x, xs),
							jg: node.jg,
							ku: newNe,
							kF: newNw,
							k8: newSe,
							lp: newSw
						});
				}
		}
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Circle2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Quantity$abs = function (_v0) {
	var value = _v0;
	return $elm$core$Basics$abs(value);
};
var $ianmackenzie$elm_geometry$Circle2d$withRadius = F2(
	function (givenRadius, givenCenterPoint) {
		return {
			jl: givenCenterPoint,
			h6: $ianmackenzie$elm_units$Quantity$abs(givenRadius)
		};
	});
var $ianmackenzie$elm_geometry$Circle2d$translateBy = F2(
	function (displacement, _v0) {
		var circle = _v0;
		return A2(
			$ianmackenzie$elm_geometry$Circle2d$withRadius,
			circle.h6,
			A2($ianmackenzie$elm_geometry$Point2d$translateBy, displacement, circle.jl));
	});
var $gampleman$elm_visualization$Force$Collision$collision = F3(
	function (strength, iters, vertices) {
		var withAggregates = A2(
			$gampleman$elm_visualization$Force$QuadTree$performAggregate,
			$gampleman$elm_visualization$Force$Collision$config,
			A2(
				$gampleman$elm_visualization$Force$QuadTree$fromList,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.am;
					},
					$ianmackenzie$elm_geometry$Circle2d$centerPoint),
				vertices));
		var apply = F2(
			function (vertex, velocities) {
				return A4(
					$gampleman$elm_visualization$Force$Collision$applyForce,
					strength,
					withAggregates,
					velocities,
					_Utils_update(
						vertex,
						{
							am: A2($ianmackenzie$elm_geometry$Circle2d$translateBy, vertex.b$, vertex.am)
						}));
			});
		return A3(
			$gampleman$elm_visualization$Force$Collision$nTimes,
			function (velocities) {
				return A3($elm$core$List$foldl, apply, velocities, vertices);
			},
			iters,
			$elm$core$Array$fromList(vertices));
	});
var $ianmackenzie$elm_geometry$Point2d$pixels = F2(
	function (x, y) {
		return {z: x, R: y};
	});
var $ianmackenzie$elm_units$Pixels$pixels = function (numPixels) {
	return numPixels;
};
var $ianmackenzie$elm_units_prefixed$Units$Pixels$pixels = $ianmackenzie$elm_units$Pixels$pixels;
var $ianmackenzie$elm_geometry$Vector2d$pixels = F2(
	function (x, y) {
		return {z: x, R: y};
	});
var $ianmackenzie$elm_geometry$Vector2d$toPixels = function (_v0) {
	var vectorComponents = _v0;
	return vectorComponents;
};
var $gampleman$elm_visualization$Force$Collision$wrapper = F4(
	function (strength, iters, radii, points) {
		var vertices = A3(
			$gampleman$elm_visualization$Force$Collision$collision,
			strength,
			iters,
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (index, point) {
						return _Utils_update(
							point,
							{j3: index});
					}),
				A2(
					$elm$core$List$filterMap,
					function (_v0) {
						var key = _v0.a;
						var x = _v0.b.z;
						var y = _v0.b.R;
						var vx = _v0.b.Z;
						var vy = _v0.b._;
						return A2(
							$elm$core$Maybe$map,
							function (radius) {
								return {
									am: A2(
										$ianmackenzie$elm_geometry$Circle2d$withRadius,
										$ianmackenzie$elm_units_prefixed$Units$Pixels$pixels(radius),
										A2($ianmackenzie$elm_geometry$Point2d$pixels, x, y)),
									j3: 0,
									ha: key,
									b$: A2($ianmackenzie$elm_geometry$Vector2d$pixels, vx, vy)
								};
							},
							A2($elm$core$Dict$get, key, radii));
					},
					$elm$core$Dict$toList(points))));
		var folder = function (newVertex) {
			return A2(
				$elm$core$Dict$update,
				newVertex.ha,
				$elm$core$Maybe$map(
					function (point) {
						var dv = $ianmackenzie$elm_geometry$Vector2d$toPixels(newVertex.b$);
						return _Utils_update(
							point,
							{Z: dv.z, _: dv.R});
					}));
		};
		return A3($elm$core$Array$foldl, folder, points, vertices);
	});
var $ianmackenzie$elm_geometry$Point2d$distanceFrom = F2(
	function (_v0, _v1) {
		var p1 = _v0;
		var p2 = _v1;
		var deltaY = p2.R - p1.R;
		var deltaX = p2.z - p1.z;
		var largestComponent = A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(deltaX),
			$elm$core$Basics$abs(deltaY));
		if (!largestComponent) {
			return $ianmackenzie$elm_units$Quantity$zero;
		} else {
			var scaledY = deltaY / largestComponent;
			var scaledX = deltaX / largestComponent;
			var scaledLength = $elm$core$Basics$sqrt((scaledX * scaledX) + (scaledY * scaledY));
			return scaledLength * largestComponent;
		}
	});
var $ianmackenzie$elm_units$Pixels$inPixels = function (_v0) {
	var numPixels = _v0;
	return numPixels;
};
var $ianmackenzie$elm_units_prefixed$Units$Pixels$inPixels = $ianmackenzie$elm_units$Pixels$inPixels;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $ianmackenzie$elm_geometry$Vector2d$sumHelp = F3(
	function (sumX, sumY, vectors) {
		sumHelp:
		while (true) {
			if (vectors.b) {
				var x = vectors.a.z;
				var y = vectors.a.R;
				var rest = vectors.b;
				var $temp$sumX = sumX + x,
					$temp$sumY = sumY + y,
					$temp$vectors = rest;
				sumX = $temp$sumX;
				sumY = $temp$sumY;
				vectors = $temp$vectors;
				continue sumHelp;
			} else {
				return {z: sumX, R: sumY};
			}
		}
	});
var $ianmackenzie$elm_geometry$Vector2d$sum = function (vectors) {
	return A3($ianmackenzie$elm_geometry$Vector2d$sumHelp, 0, 0, vectors);
};
var $ianmackenzie$elm_geometry$Vector2d$zero = {z: 0, R: 0};
var $gampleman$elm_visualization$Force$ManyBody$applyForce = F4(
	function (alpha, theta, qtree, vertex) {
		var isFarAway = function (treePart) {
			var distance = A2($ianmackenzie$elm_geometry$Point2d$distanceFrom, vertex.h0, treePart.iP.h0);
			var _v2 = $ianmackenzie$elm_geometry$BoundingBox2d$dimensions(treePart.jg);
			var width = _v2.a;
			return _Utils_cmp(
				A2($ianmackenzie$elm_units_prefixed$Units$Quantity$ratio, width, distance),
				theta) < 0;
		};
		var calculateVelocity = F2(
			function (target, source) {
				var delta = A2($ianmackenzie$elm_geometry$Vector2d$from, target.h0, source.h0);
				var len = $gampleman$elm_visualization$Force$Jiggle$jiggle(
					$ianmackenzie$elm_units_prefixed$Units$Pixels$inPixels(
						$ianmackenzie$elm_geometry$Vector2d$length(delta)));
				var weight = (source.f6 * alpha) / A2($elm$core$Basics$pow, len, 2);
				return $elm$core$Basics$isNaN(weight) ? $ianmackenzie$elm_geometry$Vector2d$zero : A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, weight, delta);
			});
		var useAggregate = function (treePart) {
			return A2(calculateVelocity, vertex, treePart.iP);
		};
		switch (qtree.$) {
			case 0:
				return $ianmackenzie$elm_geometry$Vector2d$zero;
			case 1:
				var leaf = qtree.a;
				if (isFarAway(leaf)) {
					return useAggregate(leaf);
				} else {
					var applyForceFromPoint = F2(
						function (point, accum) {
							return _Utils_eq(point.ha, vertex.ha) ? accum : A2(
								$ianmackenzie$elm_geometry$Vector2d$plus,
								A2(calculateVelocity, vertex, point),
								accum);
						});
					var _v1 = leaf.jn;
					var first = _v1.a;
					var rest = _v1.b;
					return A3(
						$elm$core$List$foldl,
						applyForceFromPoint,
						$ianmackenzie$elm_geometry$Vector2d$zero,
						A2($elm$core$List$cons, first, rest));
				}
			default:
				var node = qtree.a;
				if (isFarAway(node)) {
					return useAggregate(node);
				} else {
					var helper = function (tree) {
						return A4($gampleman$elm_visualization$Force$ManyBody$applyForce, alpha, theta, tree, vertex);
					};
					return $ianmackenzie$elm_geometry$Vector2d$sum(
						_List_fromArray(
							[
								helper(node.kF),
								helper(node.ku),
								helper(node.k8),
								helper(node.lp)
							]));
				}
		}
	});
var $ianmackenzie$elm_units$Quantity$divideBy = F2(
	function (divisor, _v0) {
		var value = _v0;
		return value / divisor;
	});
var $ianmackenzie$elm_units_prefixed$Units$Quantity$divideBy = $ianmackenzie$elm_units$Quantity$divideBy;
var $ianmackenzie$elm_geometry$Point2d$xy = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return {z: x, R: y};
	});
var $gampleman$elm_visualization$Force$ManyBody$constructSuperPoint = F2(
	function (first, rest) {
		var initialStrength = first.f6;
		var initialPoint = $ianmackenzie$elm_geometry$Point2d$coordinates(first.h0);
		var folder = F2(
			function (point, _v3) {
				var _v4 = _v3.a;
				var accumX = _v4.a;
				var accumY = _v4.b;
				var strength = _v3.b;
				var size = _v3.c;
				var _v2 = $ianmackenzie$elm_geometry$Point2d$coordinates(point.h0);
				var x = _v2.a;
				var y = _v2.b;
				return _Utils_Tuple3(
					_Utils_Tuple2(
						A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, x, accumX),
						A2($ianmackenzie$elm_units_prefixed$Units$Quantity$plus, y, accumY)),
					strength + point.f6,
					size + 1);
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			folder,
			_Utils_Tuple3(initialPoint, initialStrength, 1),
			rest);
		var _v1 = _v0.a;
		var totalX = _v1.a;
		var totalY = _v1.b;
		var totalStrength = _v0.b;
		var totalSize = _v0.c;
		return {
			h0: A2(
				$ianmackenzie$elm_geometry$Point2d$xy,
				A2($ianmackenzie$elm_units_prefixed$Units$Quantity$divideBy, totalSize, totalX),
				A2($ianmackenzie$elm_units_prefixed$Units$Quantity$divideBy, totalSize, totalY)),
			f6: totalStrength
		};
	});
var $gampleman$elm_visualization$Force$ManyBody$config = {
	jt: $gampleman$elm_visualization$Force$ManyBody$constructSuperPoint,
	ju: $gampleman$elm_visualization$Force$ManyBody$constructSuperPoint,
	lM: function ($) {
		return $.h0;
	}
};
var $gampleman$elm_visualization$Force$ManyBody$manyBody = F3(
	function (alpha, theta, vertices) {
		var withAggregates = A2(
			$gampleman$elm_visualization$Force$QuadTree$performAggregate,
			$gampleman$elm_visualization$Force$ManyBody$config,
			A2(
				$gampleman$elm_visualization$Force$QuadTree$fromList,
				function ($) {
					return $.h0;
				},
				vertices));
		var updateVertex = function (vertex) {
			return _Utils_update(
				vertex,
				{
					b$: A2(
						$ianmackenzie$elm_geometry$Vector2d$plus,
						vertex.b$,
						A4($gampleman$elm_visualization$Force$ManyBody$applyForce, alpha, theta, withAggregates, vertex))
				});
		};
		return A2($elm$core$List$map, updateVertex, vertices);
	});
var $gampleman$elm_visualization$Force$ManyBody$wrapper = F4(
	function (alpha, theta, strengths, points) {
		var vertices = A2(
			$elm$core$List$map,
			function (_v0) {
				var key = _v0.a;
				var x = _v0.b.z;
				var y = _v0.b.R;
				var strength = A2(
					$elm$core$Maybe$withDefault,
					0,
					A2($elm$core$Dict$get, key, strengths));
				return {
					ha: key,
					h0: A2($ianmackenzie$elm_geometry$Point2d$pixels, x, y),
					f6: strength,
					b$: $ianmackenzie$elm_geometry$Vector2d$zero
				};
			},
			$elm$core$Dict$toList(points));
		var updater = function (newVertex) {
			return $elm$core$Maybe$map(
				function (point) {
					var dv = $ianmackenzie$elm_geometry$Vector2d$toPixels(newVertex.b$);
					return _Utils_update(
						point,
						{Z: point.Z + dv.z, _: point._ + dv.R});
				});
		};
		var newVertices = A3($gampleman$elm_visualization$Force$ManyBody$manyBody, alpha, theta, vertices);
		var folder = F2(
			function (newVertex, pointsDict) {
				return A3(
					$elm$core$Dict$update,
					newVertex.ha,
					updater(newVertex),
					pointsDict);
			});
		return A3($elm$core$List$foldl, folder, points, newVertices);
	});
var $gampleman$elm_visualization$Force$applyForce = F3(
	function (alpha, force, entities) {
		switch (force.$) {
			case 0:
				var x = force.a;
				var y = force.b;
				var n = $elm$core$Dict$size(entities);
				var _v1 = A3(
					$elm$core$Dict$foldr,
					F3(
						function (_v2, ent, _v3) {
							var sx0 = _v3.a;
							var sy0 = _v3.b;
							return _Utils_Tuple2(sx0 + ent.z, sy0 + ent.R);
						}),
					_Utils_Tuple2(0, 0),
					entities);
				var sumx = _v1.a;
				var sumy = _v1.b;
				var sx = (sumx / n) - x;
				var sy = (sumy / n) - y;
				return A2(
					$elm$core$Dict$map,
					F2(
						function (_v4, ent) {
							return _Utils_update(
								ent,
								{z: ent.z - sx, R: ent.R - sy});
						}),
					entities);
			case 1:
				var iters = force.a;
				var strength = force.b;
				var radii = force.c;
				return A4($gampleman$elm_visualization$Force$Collision$wrapper, strength, iters, radii, entities);
			case 2:
				var iters = force.a;
				var lnks = force.b;
				return A3(
					$gampleman$elm_visualization$Force$nTimes,
					function (entitiesList) {
						return A3(
							$elm$core$List$foldl,
							F2(
								function (_v5, ents) {
									var source = _v5.ej;
									var target = _v5.bW;
									var distance = _v5.cV;
									var strength = _v5.f6;
									var bias = _v5.eG;
									var _v6 = _Utils_Tuple2(
										A2($elm$core$Dict$get, source, ents),
										A2($elm$core$Dict$get, target, ents));
									if ((!_v6.a.$) && (!_v6.b.$)) {
										var sourceNode = _v6.a.a;
										var targetNode = _v6.b.a;
										var y = $gampleman$elm_visualization$Force$Jiggle$jiggle(((targetNode.R + targetNode._) - sourceNode.R) - sourceNode._);
										var x = $gampleman$elm_visualization$Force$Jiggle$jiggle(((targetNode.z + targetNode.Z) - sourceNode.z) - sourceNode.Z);
										var d = $elm$core$Basics$sqrt(
											A2($elm$core$Basics$pow, x, 2) + A2($elm$core$Basics$pow, y, 2));
										var l = (((d - distance) / d) * alpha) * strength;
										return A3(
											$elm$core$Dict$update,
											source,
											$elm$core$Maybe$map(
												function (tn) {
													return _Utils_update(
														tn,
														{Z: tn.Z + ((x * l) * (1 - bias)), _: tn._ + ((y * l) * (1 - bias))});
												}),
											A3(
												$elm$core$Dict$update,
												target,
												$elm$core$Maybe$map(
													function (sn) {
														return _Utils_update(
															sn,
															{Z: sn.Z - ((x * l) * bias), _: sn._ - ((y * l) * bias)});
													}),
												ents));
									} else {
										return ents;
									}
								}),
							entitiesList,
							lnks);
					},
					iters,
					entities);
			case 3:
				var theta = force.a;
				var entityStrengths = force.b;
				return A4($gampleman$elm_visualization$Force$ManyBody$wrapper, alpha, theta, entityStrengths, entities);
			case 4:
				var entityConfigs = force.a;
				var mapper = F2(
					function (id, ent) {
						var _v7 = A2($elm$core$Dict$get, id, entityConfigs);
						if (!_v7.$) {
							var strength = _v7.a.f6;
							var position = _v7.a.h0;
							return _Utils_update(
								ent,
								{Z: ent.Z + (((position - ent.z) * strength) * alpha)});
						} else {
							return ent;
						}
					});
				return A2($elm$core$Dict$map, mapper, entities);
			case 5:
				var entityConfigs = force.a;
				var mapper = F2(
					function (id, ent) {
						var _v8 = A2($elm$core$Dict$get, id, entityConfigs);
						if (!_v8.$) {
							var strength = _v8.a.f6;
							var position = _v8.a.h0;
							return _Utils_update(
								ent,
								{_: ent._ + (((position - ent.R) * strength) * alpha)});
						} else {
							return ent;
						}
					});
				return A2($elm$core$Dict$map, mapper, entities);
			default:
				var entityConfigs = force.a;
				var mapper = F2(
					function (id, ent) {
						var _v9 = A2($elm$core$Dict$get, id, entityConfigs);
						if (!_v9.$) {
							var strength = _v9.a.f6;
							var x = _v9.a.z;
							var y = _v9.a.R;
							var radius = _v9.a.h6;
							var dy = $gampleman$elm_visualization$Force$Jiggle$jiggle(ent.R - y);
							var dx = $gampleman$elm_visualization$Force$Jiggle$jiggle(ent.z - x);
							var r = $elm$core$Basics$sqrt(
								A2($elm$core$Basics$pow, dx, 2) + A2($elm$core$Basics$pow, dy, 2));
							var k = (((radius - r) * strength) * alpha) / r;
							return _Utils_update(
								ent,
								{Z: ent.Z + (dx * k), _: ent._ + (dy * k)});
						} else {
							return ent;
						}
					});
				return A2($elm$core$Dict$map, mapper, entities);
		}
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $gampleman$elm_visualization$Force$tick = F2(
	function (_v0, nodes) {
		var state = _v0;
		var updateEntity = function (ent) {
			return _Utils_update(
				ent,
				{Z: ent.Z * state.dv, _: ent._ * state.dv, z: ent.z + (ent.Z * state.dv), R: ent.R + (ent._ * state.dv)});
		};
		var dictNodes = A3(
			$elm$core$List$foldl,
			function (node) {
				return A2($elm$core$Dict$insert, node.cg, node);
			},
			$elm$core$Dict$empty,
			nodes);
		var alpha = state.b2 + ((state.gt - state.b2) * state.eB);
		var newNodes = A3(
			$elm$core$List$foldl,
			$gampleman$elm_visualization$Force$applyForce(alpha),
			dictNodes,
			state.gS);
		return _Utils_Tuple2(
			_Utils_update(
				state,
				{b2: alpha}),
			A2(
				$elm$core$List$map,
				updateEntity,
				$elm$core$Dict$values(newNodes)));
	});
var $author$project$Main$tickForceSim = function (mview) {
	var layout = mview.as;
	var forceSim = mview.ce;
	var updateEntity = function (e) {
		return A2(
			$elm_community$graph$Graph$update,
			e.cg,
			$elm$core$Maybe$map(
				$author$project$Main$accessEntity.eh(e)));
	};
	var entities = A2(
		$elm$core$List$map,
		$author$project$Main$nodeToEntity.eY,
		$elm_community$graph$Graph$nodes(layout));
	var _v0 = A2($gampleman$elm_visualization$Force$tick, forceSim, entities);
	var newSim = _v0.a;
	var newEntities = _v0.b;
	var newLayout = A3($elm$core$List$foldl, updateEntity, layout, newEntities);
	return _Utils_update(
		mview,
		{ce: newSim, as: newLayout});
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					A2($author$project$Main$compileSourceCode, model.dh, model),
					$elm$core$Platform$Cmd$none);
			case 1:
				var src = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{dh: src}),
					$elm$core$Platform$Cmd$none);
			case 2:
				return _Utils_Tuple2(
					$author$project$Main$stepForwardMachineView(model),
					$elm$core$Platform$Cmd$none);
			case 3:
				return _Utils_Tuple2(
					$author$project$Main$stepBackMachineView(model),
					$elm$core$Platform$Cmd$none);
			case 4:
				var w = msg.a;
				var h = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							dw: {bL: h, cI: w}
						}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					A3($arturopala$elm_monocle$Monocle$Optional$modify, $author$project$Main$accessMachineView, $author$project$Main$tickForceSim, model),
					$elm$core$Platform$Cmd$none);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 1};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.jv + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cQ)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$Main$ClickedCompile = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 8};
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 0};
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 4) && (attr.b.$ === 11)) && (!attr.b.a)) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _v0 = lookup(code);
		if (_v0.$ === 1) {
			return $elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _v0.a;
			return $elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		$elm$json$Json$Decode$andThen,
		decode,
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2(
			$elm$html$Html$Events$preventDefaultOn,
			'keydown',
			A2(
				$elm$json$Json$Decode$map,
				function (fired) {
					return _Utils_Tuple2(fired, true);
				},
				isKey)));
};
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.jy);
var $mdgriffith$elm_ui$Element$Input$space = ' ';
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.fw;
		var label = _v0.ar;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dG + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.bd + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.k9 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.hL)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 1) {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onKeyLookup(
															function (code) {
																return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(msg) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing);
															}),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var $phollyer$elm_ui_colors$Colors$Opaque$floralwhite = A3($mdgriffith$elm_ui$Element$rgb255, 255, 250, 240);
var $mdgriffith$elm_ui$Internal$Model$boxShadowClass = function (shadow) {
	return $elm$core$String$concat(
		_List_fromArray(
			[
				shadow.g6 ? 'box-inset' : 'box-',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.d.a) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.d.b) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.b3) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.ei) + 'px',
				$mdgriffith$elm_ui$Internal$Model$formatColorClass(shadow.b5)
			]));
};
var $mdgriffith$elm_ui$Internal$Flag$shadows = $mdgriffith$elm_ui$Internal$Flag$flag(19);
var $mdgriffith$elm_ui$Element$Border$shadow = function (almostShade) {
	var shade = {b3: almostShade.b3, b5: almostShade.b5, g6: false, d: almostShade.d, ei: almostShade.ei};
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$shadows,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			$mdgriffith$elm_ui$Internal$Model$boxShadowClass(shade),
			'box-shadow',
			$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(shade)));
};
var $mdgriffith$elm_ui$Element$Border$glow = F2(
	function (clr, size) {
		return $mdgriffith$elm_ui$Element$Border$shadow(
			{
				b3: size * 2,
				b5: clr,
				d: _Utils_Tuple2(0, 0),
				ei: size
			});
	});
var $phollyer$elm_ui_colors$Colors$Opaque$gray = A3($mdgriffith$elm_ui$Element$rgb255, 128, 128, 128);
var $phollyer$elm_ui_colors$Colors$Opaque$grey = $phollyer$elm_ui_colors$Colors$Opaque$gray;
var $mdgriffith$elm_ui$Internal$Model$Active = 2;
var $mdgriffith$elm_ui$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$active = $mdgriffith$elm_ui$Internal$Flag$flag(32);
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 3};
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $mdgriffith$elm_ui$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 1:
				var styled = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						j$: F2(
							function (add, context) {
								return A2(
									$elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.j$, add, context));
							}),
						ip: styled.ip
					});
			case 0:
				var html = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A2(
						$elm$core$Basics$composeL,
						$elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 2:
				var str = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Text(str);
			default:
				return $mdgriffith$elm_ui$Internal$Model$Empty;
		}
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 2:
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 6:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 5:
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 7:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 8:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 3:
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 4:
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 9:
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 1:
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$removeNever = function (style) {
	return A2($mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle, $elm$core$Basics$never, style);
};
var $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper = F2(
	function (attr, _v0) {
		var styles = _v0.a;
		var trans = _v0.b;
		var _v1 = $mdgriffith$elm_ui$Internal$Model$removeNever(attr);
		switch (_v1.$) {
			case 4:
				var style = _v1.b;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, style, styles),
					trans);
			case 10:
				var flag = _v1.a;
				var component = _v1.b;
				return _Utils_Tuple2(
					styles,
					A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, trans, component));
			default:
				return _Utils_Tuple2(styles, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$unwrapDecorations = function (attrs) {
	var _v0 = A3(
		$elm$core$List$foldl,
		$mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper,
		_Utils_Tuple2(_List_Nil, $mdgriffith$elm_ui$Internal$Model$Untransformed),
		attrs);
	var styles = _v0.a;
	var transform = _v0.b;
	return A2(
		$elm$core$List$cons,
		$mdgriffith$elm_ui$Internal$Model$Transform(transform),
		styles);
};
var $mdgriffith$elm_ui$Element$mouseDown = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$active,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			2,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $mdgriffith$elm_ui$Internal$Model$Hover = 1;
var $mdgriffith$elm_ui$Internal$Flag$hover = $mdgriffith$elm_ui$Internal$Flag$flag(33);
var $mdgriffith$elm_ui$Element$mouseOver = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$hover,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			1,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 7, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Element$padding = function (x) {
	var f = x;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			f,
			f,
			f,
			f));
};
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Internal$Model$Scale = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$scale = $mdgriffith$elm_ui$Internal$Flag$flag(23);
var $mdgriffith$elm_ui$Element$scale = function (n) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$scale,
		$mdgriffith$elm_ui$Internal$Model$Scale(
			_Utils_Tuple3(n, n, 1)));
};
var $mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontSize,
		$mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 6, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $author$project$Main$buttonStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Background$color($phollyer$elm_ui_colors$Colors$Opaque$floralwhite),
		$mdgriffith$elm_ui$Element$Border$width(2),
		$mdgriffith$elm_ui$Element$Border$rounded(2),
		$mdgriffith$elm_ui$Element$padding(3),
		$mdgriffith$elm_ui$Element$Font$size(16),
		$mdgriffith$elm_ui$Element$mouseOver(
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Element$Border$glow, $phollyer$elm_ui_colors$Colors$Opaque$grey, 2)
			])),
		$mdgriffith$elm_ui$Element$mouseDown(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$scale(1.1)
			]))
	]);
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$Main$compileButton = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	$author$project$Main$buttonStyle,
	{
		ar: $mdgriffith$elm_ui$Element$text('compile'),
		fw: $elm$core$Maybe$Just($author$project$Main$ClickedCompile)
	});
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $mdgriffith$elm_ui$Element$Font$family = function (families) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontFamily,
		A2(
			$mdgriffith$elm_ui$Internal$Model$FontFamily,
			A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $author$project$Main$fillHeight = $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill);
var $mdgriffith$elm_ui$Element$fillPortion = $mdgriffith$elm_ui$Internal$Model$Fill;
var $author$project$Main$fillWidth = $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill);
var $mdgriffith$elm_ui$Internal$Model$Monospace = {$: 2};
var $mdgriffith$elm_ui$Element$Font$monospace = $mdgriffith$elm_ui$Internal$Model$Monospace;
var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cQ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bd)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$Main$ChangedSourceCode = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Element$Input$HiddenLabel = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Element$Input$labelHidden = $mdgriffith$elm_ui$Element$Input$HiddenLabel;
var $mdgriffith$elm_ui$Element$Input$TextArea = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 6};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 1) {
			var labelText = label.a;
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asColumn,
				$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
				attrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[input])));
		} else {
			var position = label.a;
			var labelAttrs = label.b;
			var labelChild = label.c;
			var labelElement = A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				labelAttrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[labelChild])));
			switch (position) {
				case 2:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dT),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 3:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dT),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 0:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dT),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				default:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.dT),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
			}
		}
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $mdgriffith$elm_ui$Element$Input$autofill = A2(
	$elm$core$Basics$composeL,
	$mdgriffith$elm_ui$Internal$Model$Attr,
	$elm$html$Html$Attributes$attribute('autocomplete'));
var $mdgriffith$elm_ui$Internal$Model$Behind = 5;
var $mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 3) {
			return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2($mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var $mdgriffith$elm_ui$Element$behindContent = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 5, element);
};
var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
var $mdgriffith$elm_ui$Element$moveUp = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(-y));
};
var $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding = function (attrs) {
	var gatherSpacing = F2(
		function (attr, found) {
			if ((attr.$ === 4) && (attr.b.$ === 5)) {
				var _v2 = attr.b;
				var x = _v2.b;
				var y = _v2.c;
				if (found.$ === 1) {
					return $elm$core$Maybe$Just(y);
				} else {
					return found;
				}
			} else {
				return found;
			}
		});
	var _v0 = A3($elm$core$List$foldr, gatherSpacing, $elm$core$Maybe$Nothing, attrs);
	if (_v0.$ === 1) {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	} else {
		var vSpace = _v0.a;
		return $mdgriffith$elm_ui$Element$moveUp(
			$elm$core$Basics$floor(vSpace / 2));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
var $mdgriffith$elm_ui$Element$clip = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.jp);
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Element$Input$darkGrey = A3($mdgriffith$elm_ui$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var $mdgriffith$elm_ui$Element$paddingXY = F2(
	function (x, y) {
		if (_Utils_eq(x, y)) {
			var f = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + $elm$core$String$fromInt(x),
					f,
					f,
					f,
					f));
		} else {
			var yFloat = y;
			var xFloat = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
					yFloat,
					xFloat,
					yFloat,
					xFloat));
		}
	});
var $mdgriffith$elm_ui$Element$Input$defaultTextPadding = A2($mdgriffith$elm_ui$Element$paddingXY, 12, 12);
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Element$Input$white = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Input$defaultTextPadding,
		$mdgriffith$elm_ui$Element$Border$rounded(3),
		$mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$darkGrey),
		$mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
		$mdgriffith$elm_ui$Element$Border$width(1),
		$mdgriffith$elm_ui$Element$spacing(5),
		$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
		$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
	]);
var $mdgriffith$elm_ui$Element$Input$getHeight = function (attr) {
	if (attr.$ === 8) {
		var h = attr.a;
		return $elm$core$Maybe$Just(h);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 1) {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Internal$Model$InFront = 4;
var $mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 4, element);
};
var $mdgriffith$elm_ui$Element$Input$isConstrained = function (len) {
	isConstrained:
	while (true) {
		switch (len.$) {
			case 1:
				return false;
			case 0:
				return true;
			case 2:
				return true;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isConstrained;
			default:
				var l = len.b;
				return true;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
	if (label.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$isStacked = function (label) {
	if (!label.$) {
		var loc = label.a;
		switch (loc) {
			case 0:
				return false;
			case 1:
				return false;
			case 2:
				return true;
			default:
				return true;
		}
	} else {
		return true;
	}
};
var $mdgriffith$elm_ui$Element$Input$negateBox = function (box) {
	return {b: -box.b, f: -box.f, g: -box.g, c: -box.c};
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left)))))));
	});
var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
	var top = _v0.c;
	var right = _v0.g;
	var bottom = _v0.b;
	var left = _v0.f;
	if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
		var topFloat = top;
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				'p-' + $elm$core$String$fromInt(top),
				topFloat,
				topFloat,
				topFloat,
				topFloat));
	} else {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				A4($mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
				top,
				right,
				bottom,
				left));
	}
};
var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
var $mdgriffith$elm_ui$Element$Input$isFill = function (len) {
	isFill:
	while (true) {
		switch (len.$) {
			case 2:
				return true;
			case 1:
				return false;
			case 0:
				return false;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isPixel = function (len) {
	isPixel:
	while (true) {
		switch (len.$) {
			case 1:
				return false;
			case 0:
				return true;
			case 2:
				return false;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
		}
	}
};
var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
	});
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $mdgriffith$elm_ui$Element$Input$redistributeOver = F4(
	function (isMultiline, stacked, attr, els) {
		switch (attr.$) {
			case 9:
				return _Utils_update(
					els,
					{
						hV: A2($elm$core$List$cons, attr, els.hV)
					});
			case 7:
				var width = attr.a;
				return $mdgriffith$elm_ui$Element$Input$isFill(width) ? _Utils_update(
					els,
					{
						w: A2($elm$core$List$cons, attr, els.w),
						O: A2($elm$core$List$cons, attr, els.O),
						hV: A2($elm$core$List$cons, attr, els.hV)
					}) : (stacked ? _Utils_update(
					els,
					{
						w: A2($elm$core$List$cons, attr, els.w)
					}) : _Utils_update(
					els,
					{
						hV: A2($elm$core$List$cons, attr, els.hV)
					}));
			case 8:
				var height = attr.a;
				return (!stacked) ? _Utils_update(
					els,
					{
						w: A2($elm$core$List$cons, attr, els.w),
						hV: A2($elm$core$List$cons, attr, els.hV)
					}) : ($mdgriffith$elm_ui$Element$Input$isFill(height) ? _Utils_update(
					els,
					{
						w: A2($elm$core$List$cons, attr, els.w),
						hV: A2($elm$core$List$cons, attr, els.hV)
					}) : ($mdgriffith$elm_ui$Element$Input$isPixel(height) ? _Utils_update(
					els,
					{
						hV: A2($elm$core$List$cons, attr, els.hV)
					}) : _Utils_update(
					els,
					{
						hV: A2($elm$core$List$cons, attr, els.hV)
					})));
			case 6:
				return _Utils_update(
					els,
					{
						w: A2($elm$core$List$cons, attr, els.w)
					});
			case 5:
				return _Utils_update(
					els,
					{
						w: A2($elm$core$List$cons, attr, els.w)
					});
			case 4:
				switch (attr.b.$) {
					case 5:
						var _v1 = attr.b;
						return _Utils_update(
							els,
							{
								w: A2($elm$core$List$cons, attr, els.w),
								O: A2($elm$core$List$cons, attr, els.O),
								hV: A2($elm$core$List$cons, attr, els.hV),
								cJ: A2($elm$core$List$cons, attr, els.cJ)
							});
					case 7:
						var cls = attr.a;
						var _v2 = attr.b;
						var pad = _v2.a;
						var t = _v2.b;
						var r = _v2.c;
						var b = _v2.d;
						var l = _v2.e;
						if (isMultiline) {
							return _Utils_update(
								els,
								{
									an: A2($elm$core$List$cons, attr, els.an),
									hV: A2($elm$core$List$cons, attr, els.hV)
								});
						} else {
							var newTop = t - A2($elm$core$Basics$min, t, b);
							var newLineHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'line-height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newBottom = b - A2($elm$core$Basics$min, t, b);
							var reducedVerticalPadding = A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, r, newBottom, l),
									newTop,
									r,
									newBottom,
									l));
							return _Utils_update(
								els,
								{
									an: A2($elm$core$List$cons, attr, els.an),
									O: A2(
										$elm$core$List$cons,
										newHeight,
										A2($elm$core$List$cons, newLineHeight, els.O)),
									hV: A2($elm$core$List$cons, reducedVerticalPadding, els.hV)
								});
						}
					case 6:
						var _v3 = attr.b;
						return _Utils_update(
							els,
							{
								an: A2($elm$core$List$cons, attr, els.an),
								hV: A2($elm$core$List$cons, attr, els.hV)
							});
					case 10:
						return _Utils_update(
							els,
							{
								an: A2($elm$core$List$cons, attr, els.an),
								hV: A2($elm$core$List$cons, attr, els.hV)
							});
					case 2:
						return _Utils_update(
							els,
							{
								w: A2($elm$core$List$cons, attr, els.w)
							});
					case 1:
						var _v4 = attr.b;
						return _Utils_update(
							els,
							{
								w: A2($elm$core$List$cons, attr, els.w)
							});
					default:
						var flag = attr.a;
						var cls = attr.b;
						return _Utils_update(
							els,
							{
								hV: A2($elm$core$List$cons, attr, els.hV)
							});
				}
			case 0:
				return els;
			case 1:
				var a = attr.a;
				return _Utils_update(
					els,
					{
						O: A2($elm$core$List$cons, attr, els.O)
					});
			case 2:
				return _Utils_update(
					els,
					{
						O: A2($elm$core$List$cons, attr, els.O)
					});
			case 3:
				return _Utils_update(
					els,
					{
						hV: A2($elm$core$List$cons, attr, els.hV)
					});
			default:
				return _Utils_update(
					els,
					{
						O: A2($elm$core$List$cons, attr, els.O)
					});
		}
	});
var $mdgriffith$elm_ui$Element$Input$redistribute = F3(
	function (isMultiline, stacked, attrs) {
		return function (redist) {
			return {
				an: $elm$core$List$reverse(redist.an),
				w: $elm$core$List$reverse(redist.w),
				O: $elm$core$List$reverse(redist.O),
				hV: $elm$core$List$reverse(redist.hV),
				cJ: $elm$core$List$reverse(redist.cJ)
			};
		}(
			A3(
				$elm$core$List$foldl,
				A2($mdgriffith$elm_ui$Element$Input$redistributeOver, isMultiline, stacked),
				{an: _List_Nil, w: _List_Nil, O: _List_Nil, hV: _List_Nil, cJ: _List_Nil},
				attrs));
	});
var $mdgriffith$elm_ui$Element$Input$renderBox = function (_v0) {
	var top = _v0.c;
	var right = _v0.g;
	var bottom = _v0.b;
	var left = _v0.f;
	return $elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px'))))));
};
var $mdgriffith$elm_ui$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
var $mdgriffith$elm_ui$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			$elm$core$Basics$min,
			1.0,
			A2($elm$core$Basics$max, 0.0, o)));
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2(
			$mdgriffith$elm_ui$Internal$Model$Transparency,
			'transparency-' + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency),
			transparency));
};
var $mdgriffith$elm_ui$Element$Input$charcoal = A3($mdgriffith$elm_ui$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
var $mdgriffith$elm_ui$Element$Input$renderPlaceholder = F3(
	function (_v0, forPlaceholder, on) {
		var placeholderAttrs = _v0.a;
		var placeholderEl = _v0.b;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_Utils_ap(
				forPlaceholder,
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$charcoal),
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.hL + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.kR)),
							$mdgriffith$elm_ui$Element$clip,
							$mdgriffith$elm_ui$Element$Border$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$Background$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$alpha(
							on ? 1 : 0)
						]),
					placeholderAttrs)),
			placeholderEl);
	});
var $mdgriffith$elm_ui$Element$scrollbarY = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.k7);
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $mdgriffith$elm_ui$Element$Input$spellcheck = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$spellcheck);
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $mdgriffith$elm_ui$Element$Input$value = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$value);
var $mdgriffith$elm_ui$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var withDefaults = _Utils_ap($mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle, attrs);
		var redistributed = A3(
			$mdgriffith$elm_ui$Element$Input$redistribute,
			_Utils_eq(textInput.lS, $mdgriffith$elm_ui$Element$Input$TextArea),
			$mdgriffith$elm_ui$Element$Input$isStacked(textOptions.ar),
			withDefaults);
		var onlySpacing = function (attr) {
			if ((attr.$ === 4) && (attr.b.$ === 5)) {
				var _v9 = attr.b;
				return true;
			} else {
				return false;
			}
		};
		var heightConstrained = function () {
			var _v7 = textInput.lS;
			if (!_v7.$) {
				var inputType = _v7.a;
				return false;
			} else {
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						$mdgriffith$elm_ui$Element$Input$isConstrained,
						$elm$core$List$head(
							$elm$core$List$reverse(
								A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Element$Input$getHeight, withDefaults)))));
			}
		}();
		var getPadding = function (attr) {
			if ((attr.$ === 4) && (attr.b.$ === 7)) {
				var cls = attr.a;
				var _v6 = attr.b;
				var pad = _v6.a;
				var t = _v6.b;
				var r = _v6.c;
				var b = _v6.d;
				var l = _v6.e;
				return $elm$core$Maybe$Just(
					{
						b: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(b - 3)),
						f: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(l - 3)),
						g: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(r - 3)),
						c: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(t - 3))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var parentPadding = A2(
			$elm$core$Maybe$withDefault,
			{b: 0, f: 0, g: 0, c: 0},
			$elm$core$List$head(
				$elm$core$List$reverse(
					A2($elm$core$List$filterMap, getPadding, withDefaults))));
		var inputElement = A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			function () {
				var _v3 = textInput.lS;
				if (!_v3.$) {
					var inputType = _v3.a;
					return $mdgriffith$elm_ui$Internal$Model$NodeName('input');
				} else {
					return $mdgriffith$elm_ui$Internal$Model$NodeName('textarea');
				}
			}(),
			_Utils_ap(
				function () {
					var _v4 = textInput.lS;
					if (!_v4.$) {
						var inputType = _v4.a;
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$type_(inputType)),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.ka)
							]);
					} else {
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$clip,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.j6),
								$mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding(withDefaults),
								$mdgriffith$elm_ui$Element$paddingEach(parentPadding),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2(
									$elm$html$Html$Attributes$style,
									'margin',
									$mdgriffith$elm_ui$Element$Input$renderBox(
										$mdgriffith$elm_ui$Element$Input$negateBox(parentPadding)))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$style, 'box-sizing', 'content-box'))
							]);
					}
				}(),
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Input$value(textOptions.lt),
							$mdgriffith$elm_ui$Internal$Model$Attr(
							$elm$html$Html$Events$onInput(textOptions.kH)),
							$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(textOptions.ar),
							$mdgriffith$elm_ui$Element$Input$spellcheck(textInput.aQ),
							A2(
							$elm$core$Maybe$withDefault,
							$mdgriffith$elm_ui$Internal$Model$NoAttribute,
							A2($elm$core$Maybe$map, $mdgriffith$elm_ui$Element$Input$autofill, textInput.aI))
						]),
					redistributed.O)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil));
		var wrappedInput = function () {
			var _v0 = textInput.lS;
			if (_v0.$ === 1) {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_Utils_ap(
						(heightConstrained ? $elm$core$List$cons($mdgriffith$elm_ui$Element$scrollbarY) : $elm$core$Basics$identity)(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.gR),
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.j9)
								])),
						redistributed.hV),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asParagraph,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Element$inFront(inputElement),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.j8),
												redistributed.cJ)))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(
									function () {
										if (textOptions.lt === '') {
											var _v1 = textOptions.kS;
											if (_v1.$ === 1) {
												return _List_fromArray(
													[
														$mdgriffith$elm_ui$Element$text('\u00A0')
													]);
											} else {
												var place = _v1.a;
												return _List_fromArray(
													[
														A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, _List_Nil, textOptions.lt === '')
													]);
											}
										} else {
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Internal$Model$unstyled(
													A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.j7)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(textOptions.lt + '\u00A0')
															])))
												]);
										}
									}()))
							])));
			} else {
				var inputType = _v0.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						A2(
							$elm$core$List$cons,
							A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.gR),
							$elm$core$List$concat(
								_List_fromArray(
									[
										redistributed.hV,
										function () {
										var _v2 = textOptions.kS;
										if (_v2.$ === 1) {
											return _List_Nil;
										} else {
											var place = _v2.a;
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Element$behindContent(
													A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, redistributed.an, textOptions.lt === ''))
												]);
										}
									}()
									])))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[inputElement])));
			}
		}();
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			A2(
				$elm$core$List$cons,
				A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.jz),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(textOptions.ar) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(5),
					A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Region$announce, redistributed.w))),
			textOptions.ar,
			wrappedInput);
	});
var $mdgriffith$elm_ui$Element$Input$multiline = F2(
	function (attrs, multi) {
		return A3(
			$mdgriffith$elm_ui$Element$Input$textHelper,
			{aI: $elm$core$Maybe$Nothing, aQ: multi.li, lS: $mdgriffith$elm_ui$Element$Input$TextArea},
			attrs,
			{ar: multi.ar, kH: multi.kH, kS: multi.kS, lt: multi.lt});
	});
var $mdgriffith$elm_ui$Element$Input$Placeholder = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$Input$placeholder = $mdgriffith$elm_ui$Element$Input$Placeholder;
var $author$project$Main$sourceCodeTextArea = function (src) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[$mdgriffith$elm_ui$Element$scrollbarY, $author$project$Main$fillHeight, $author$project$Main$fillWidth]),
		A2(
			$mdgriffith$elm_ui$Element$Input$multiline,
			_List_fromArray(
				[$author$project$Main$fillHeight, $author$project$Main$fillWidth]),
			{
				ar: $mdgriffith$elm_ui$Element$Input$labelHidden('source code'),
				kH: $author$project$Main$ChangedSourceCode,
				kS: $elm$core$Maybe$Just(
					A2(
						$mdgriffith$elm_ui$Element$Input$placeholder,
						_List_Nil,
						$mdgriffith$elm_ui$Element$text('source code here'))),
				li: false,
				lt: src
			}));
};
var $author$project$Main$ClickedStepBack = {$: 3};
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $1602$elm_feather$FeatherIcons$Icon = $elm$core$Basics$identity;
var $1602$elm_feather$FeatherIcons$defaultAttributes = function (name) {
	return {
		dB: $elm$core$Maybe$Just('feather feather-' + name),
		ei: 24,
		dg: '',
		el: 2,
		ew: '0 0 24 24'
	};
};
var $1602$elm_feather$FeatherIcons$makeBuilder = F2(
	function (name, src) {
		return {
			ab: $1602$elm_feather$FeatherIcons$defaultAttributes(name),
			aj: src
		};
	});
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $1602$elm_feather$FeatherIcons$xmlns = function (s) {
	return A2(
		$elm$virtual_dom$VirtualDom$property,
		'xmlns',
		$elm$json$Json$Encode$string(s));
};
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $1602$elm_feather$FeatherIcons$arrowLeft = A2(
	$1602$elm_feather$FeatherIcons$makeBuilder,
	'arrow-left',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					$elm$svg$Svg$Attributes$width('24'),
					$elm$svg$Svg$Attributes$height('24'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none'),
					$elm$svg$Svg$Attributes$stroke('currentColor'),
					$elm$svg$Svg$Attributes$strokeWidth('2'),
					$elm$svg$Svg$Attributes$strokeLinecap('round'),
					$elm$svg$Svg$Attributes$strokeLinejoin('round'),
					$elm$svg$Svg$Attributes$class('feather feather-arrow-left')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('19'),
							$elm$svg$Svg$Attributes$y1('12'),
							$elm$svg$Svg$Attributes$x2('5'),
							$elm$svg$Svg$Attributes$y2('12')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$polyline,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$points('12 19 5 12 12 5')
						]),
					_List_Nil)
				]))
		]));
var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
var $elm$svg$Svg$map = $elm$virtual_dom$VirtualDom$map;
var $1602$elm_feather$FeatherIcons$toHtml = F2(
	function (attributes, _v0) {
		var src = _v0.aj;
		var attrs = _v0.ab;
		var strSize = $elm$core$String$fromFloat(attrs.ei);
		var baseAttributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$fill('none'),
				$elm$svg$Svg$Attributes$height(
				_Utils_ap(strSize, attrs.dg)),
				$elm$svg$Svg$Attributes$width(
				_Utils_ap(strSize, attrs.dg)),
				$elm$svg$Svg$Attributes$stroke('currentColor'),
				$elm$svg$Svg$Attributes$strokeLinecap('round'),
				$elm$svg$Svg$Attributes$strokeLinejoin('round'),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(attrs.el)),
				$elm$svg$Svg$Attributes$viewBox(attrs.ew)
			]);
		var combinedAttributes = _Utils_ap(
			function () {
				var _v1 = attrs.dB;
				if (!_v1.$) {
					var c = _v1.a;
					return A2(
						$elm$core$List$cons,
						$elm$svg$Svg$Attributes$class(c),
						baseAttributes);
				} else {
					return baseAttributes;
				}
			}(),
			attributes);
		return A2(
			$elm$svg$Svg$svg,
			combinedAttributes,
			A2(
				$elm$core$List$map,
				$elm$svg$Svg$map($elm$core$Basics$never),
				src));
	});
var $author$project$Main$icon = A2(
	$elm$core$Basics$composeR,
	$1602$elm_feather$FeatherIcons$toHtml(_List_Nil),
	$mdgriffith$elm_ui$Element$html);
var $author$project$Main$stepBackButton = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	$author$project$Main$buttonStyle,
	{
		ar: $author$project$Main$icon($1602$elm_feather$FeatherIcons$arrowLeft),
		fw: $elm$core$Maybe$Just($author$project$Main$ClickedStepBack)
	});
var $author$project$Main$ClickedStepForward = {$: 2};
var $1602$elm_feather$FeatherIcons$arrowRight = A2(
	$1602$elm_feather$FeatherIcons$makeBuilder,
	'arrow-right',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$1602$elm_feather$FeatherIcons$xmlns('http://www.w3.org/2000/svg'),
					$elm$svg$Svg$Attributes$width('24'),
					$elm$svg$Svg$Attributes$height('24'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none'),
					$elm$svg$Svg$Attributes$stroke('currentColor'),
					$elm$svg$Svg$Attributes$strokeWidth('2'),
					$elm$svg$Svg$Attributes$strokeLinecap('round'),
					$elm$svg$Svg$Attributes$strokeLinejoin('round'),
					$elm$svg$Svg$Attributes$class('feather feather-arrow-right')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x1('5'),
							$elm$svg$Svg$Attributes$y1('12'),
							$elm$svg$Svg$Attributes$x2('19'),
							$elm$svg$Svg$Attributes$y2('12')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$polyline,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$points('12 5 19 12 12 19')
						]),
					_List_Nil)
				]))
		]));
var $author$project$Main$stepForwardButton = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	$author$project$Main$buttonStyle,
	{
		ar: $author$project$Main$icon($1602$elm_feather$FeatherIcons$arrowRight),
		fw: $elm$core$Maybe$Just($author$project$Main$ClickedStepForward)
	});
var $mdgriffith$elm_ui$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$maximum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Max, i, l);
	});
var $author$project$Backend$gCodeToString = function (instruction) {
	switch (instruction.$) {
		case 4:
			var n = instruction.a;
			return 'ALLOC ' + $elm$core$String$fromInt(n);
		case 0:
			var name = instruction.a;
			return 'PUSHGLOBAL ' + name;
		case 5:
			return 'EVAL';
		case 6:
			return 'UNWIND';
		case 7:
			var i = instruction.a;
			return 'UPDATE ' + $elm$core$String$fromInt(i);
		case 8:
			var n = instruction.a;
			return 'POP ' + $elm$core$String$fromInt(n);
		case 2:
			var i = instruction.a;
			return 'PUSHLOCAL ' + $elm$core$String$fromInt(i);
		case 1:
			var i = instruction.a;
			return 'PUSHARG ' + $elm$core$String$fromInt(i);
		case 3:
			var i = instruction.a;
			return 'PUSHINT ' + $elm$core$String$fromInt(i);
		case 9:
			return 'MKAP';
		case 10:
			var n = instruction.a;
			return 'SLIDE ' + $elm$core$String$fromInt(n);
		case 11:
			return 'ADD';
		case 12:
			return 'SUB';
		case 13:
			return 'MUL';
		case 14:
			return 'DIV';
		case 15:
			return 'EQU';
		case 16:
			var l = instruction.a;
			return 'LABEL ' + $elm$core$String$fromInt(l);
		case 17:
			var l = instruction.a;
			return 'JFALSE ' + $elm$core$String$fromInt(l);
		default:
			var l = instruction.a;
			return 'JUMP ' + $elm$core$String$fromInt(l);
	}
};
var $phollyer$elm_ui_colors$Colors$Opaque$lime = A3($mdgriffith$elm_ui$Element$rgb255, 0, 255, 0);
var $author$project$Main$viewCode = function (_v0) {
	var past = _v0.a;
	var current = _v0.b;
	var rest = _v0.c;
	var toText = A2($elm$core$Basics$composeR, $author$project$Backend$gCodeToString, $mdgriffith$elm_ui$Element$text);
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[$author$project$Main$fillHeight, $author$project$Main$fillWidth]),
		_Utils_ap(
			A2(
				$elm$core$List$map,
				toText,
				$elm$core$List$reverse(past)),
			_Utils_ap(
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Background$color($phollyer$elm_ui_colors$Colors$Opaque$lime)
							]),
						toText(current))
					]),
				A2($elm$core$List$map, toText, rest))));
};
var $goyalarchit$elm_dagre$Render$StandardDrawers$Types$Spline = 1;
var $goyalarchit$elm_dagre$Render$StandardDrawers$Types$Vee = 2;
var $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$arrowHead = function (ah) {
	return function (edc) {
		return _Utils_update(
			edc,
			{eE: ah});
	};
};
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$linkStyle = function (ls) {
	return function (edc) {
		return _Utils_update(
			edc,
			{hi: ls});
	};
};
var $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$strokeColor = function (f) {
	return function (edc) {
		return _Utils_update(
			edc,
			{Y: f});
	};
};
var $goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$strokeWidth = function (f) {
	return function (edc) {
		return _Utils_update(
			edc,
			{el: f});
	};
};
var $elm_community$typed_svg$TypedSvg$Types$CursorPointer = {$: 3};
var $elm_community$typed_svg$TypedSvg$Types$Paint = function (a) {
	return {$: 0, a: a};
};
var $elm_community$typed_svg$TypedSvg$Types$PaintNone = {$: 5};
var $elm_community$typed_svg$TypedSvg$Types$Px = function (a) {
	return {$: 9, a: a};
};
var $folkertdev$one_true_path_experiment$SubPath$Leaf = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$one_true_path_experiment$SubPath$Node = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$one_true_path_experiment$SubPath$None = {$: 2};
var $ianmackenzie$elm_geometry$CubicSpline2d$arcLengthParameterization = function (_v0) {
	var parameterized = _v0;
	return parameterized.da;
};
var $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd = function (tree) {
	if (!tree.$) {
		var node = tree.a;
		return node.he;
	} else {
		var leaf = tree.a;
		return leaf.dZ;
	}
};
var $ianmackenzie$elm_geometry$ArcLengthParameterization$totalArcLength = function (_v0) {
	var tree = _v0;
	return $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd(tree);
};
var $ianmackenzie$elm_geometry$CubicSpline2d$arcLength = function (parameterizedSpline) {
	return $ianmackenzie$elm_geometry$ArcLengthParameterization$totalArcLength(
		$ianmackenzie$elm_geometry$CubicSpline2d$arcLengthParameterization(parameterizedSpline));
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$arcLengthParameterization = function (_v0) {
	var parameterized = _v0;
	return parameterized.da;
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$arcLength = function (parameterizedArc) {
	return $ianmackenzie$elm_geometry$ArcLengthParameterization$totalArcLength(
		$ianmackenzie$elm_geometry$EllipticalArc2d$arcLengthParameterization(parameterizedArc));
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLengthParameterization = function (_v0) {
	var parameterized = _v0;
	return parameterized.da;
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLength = function (parameterizedSpline) {
	return $ianmackenzie$elm_geometry$ArcLengthParameterization$totalArcLength(
		$ianmackenzie$elm_geometry$QuadraticSpline2d$arcLengthParameterization(parameterizedSpline));
};
var $ianmackenzie$elm_geometry$LineSegment2d$endpoints = function (_v0) {
	var endpoints_ = _v0;
	return endpoints_;
};
var $ianmackenzie$elm_geometry$LineSegment2d$vector = function (lineSegment) {
	var _v0 = $ianmackenzie$elm_geometry$LineSegment2d$endpoints(lineSegment);
	var p1 = _v0.a;
	var p2 = _v0.b;
	return A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
};
var $ianmackenzie$elm_geometry$LineSegment2d$length = function (givenSegment) {
	return $ianmackenzie$elm_geometry$Vector2d$length(
		$ianmackenzie$elm_geometry$LineSegment2d$vector(givenSegment));
};
var $ianmackenzie$elm_units$Quantity$toFloat = function (_v0) {
	var value = _v0;
	return value;
};
var $folkertdev$one_true_path_experiment$Segment$arcLength = function (parameterized) {
	return $ianmackenzie$elm_units$Quantity$toFloat(
		function () {
			switch (parameterized.$) {
				case 0:
					var lineSegment = parameterized.a;
					return $ianmackenzie$elm_geometry$LineSegment2d$length(lineSegment);
				case 1:
					var spline = parameterized.a;
					return $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLength(spline);
				case 2:
					var spline = parameterized.a;
					return $ianmackenzie$elm_geometry$CubicSpline2d$arcLength(spline);
				default:
					var arc = parameterized.a;
					return $ianmackenzie$elm_geometry$EllipticalArc2d$arcLength(arc);
			}
		}());
};
var $folkertdev$one_true_path_experiment$SubPath$arcLength = function (parameterized) {
	switch (parameterized.$) {
		case 2:
			return 0;
		case 1:
			var segment = parameterized.a.eg;
			return $folkertdev$one_true_path_experiment$Segment$arcLength(segment);
		default:
			var totalLength = parameterized.a.es;
			return totalLength;
	}
};
var $folkertdev$one_true_path_experiment$Segment$ParameterizedArc = function (a) {
	return {$: 3, a: a};
};
var $folkertdev$one_true_path_experiment$Segment$ParameterizedCubic = function (a) {
	return {$: 2, a: a};
};
var $folkertdev$one_true_path_experiment$Segment$ParameterizedLineSegment = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$one_true_path_experiment$Segment$ParameterizedQuadratic = function (a) {
	return {$: 1, a: a};
};
var $ianmackenzie$elm_geometry$CubicSpline2d$ArcLengthParameterized = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$ArcLengthParameterization$ArcLengthParameterization = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$ArcLengthParameterization$Leaf = function (a) {
	return {$: 1, a: a};
};
var $ianmackenzie$elm_geometry$ArcLengthParameterization$Node = function (a) {
	return {$: 0, a: a};
};
var $ianmackenzie$elm_geometry$ArcLengthParameterization$buildTree = F5(
	function (derivativeMagnitude, lengthAtStart_, paramAtStart_, paramAtEnd, height) {
		var paramDelta = paramAtEnd - paramAtStart_;
		if (!height) {
			var paramStep = 0.125 * paramDelta;
			var param8 = paramAtEnd;
			var param7 = paramAtEnd - (0.125 * paramDelta);
			var param6 = paramAtEnd - (0.25 * paramDelta);
			var param5 = paramAtEnd - (0.375 * paramDelta);
			var param4 = paramAtStart_ + (0.5 * paramDelta);
			var param3 = paramAtStart_ + (0.375 * paramDelta);
			var param2 = paramAtStart_ + (0.25 * paramDelta);
			var param1 = paramAtStart_ + (0.125 * paramDelta);
			var param0 = paramAtStart_;
			var offset = 0.0625 * paramDelta;
			var length0 = lengthAtStart_;
			var _v0 = derivativeMagnitude(param7 + offset);
			var derivativeMagnitude7 = _v0;
			var _v1 = derivativeMagnitude(param6 + offset);
			var derivativeMagnitude6 = _v1;
			var _v2 = derivativeMagnitude(param5 + offset);
			var derivativeMagnitude5 = _v2;
			var _v3 = derivativeMagnitude(param4 + offset);
			var derivativeMagnitude4 = _v3;
			var _v4 = derivativeMagnitude(param3 + offset);
			var derivativeMagnitude3 = _v4;
			var _v5 = derivativeMagnitude(param2 + offset);
			var derivativeMagnitude2 = _v5;
			var _v6 = derivativeMagnitude(param1 + offset);
			var derivativeMagnitude1 = _v6;
			var _v7 = derivativeMagnitude(param0 + offset);
			var derivativeMagnitude0 = _v7;
			var length1 = length0 + (paramStep * derivativeMagnitude0);
			var length2 = length1 + (paramStep * derivativeMagnitude1);
			var length3 = length2 + (paramStep * derivativeMagnitude2);
			var length4 = length3 + (paramStep * derivativeMagnitude3);
			var length5 = length4 + (paramStep * derivativeMagnitude4);
			var length6 = length5 + (paramStep * derivativeMagnitude5);
			var length7 = length6 + (paramStep * derivativeMagnitude6);
			var length8 = length7 + (paramStep * derivativeMagnitude7);
			return $ianmackenzie$elm_geometry$ArcLengthParameterization$Leaf(
				{dY: length0, fe: length1, ff: length2, fg: length3, fh: length4, fi: length5, fj: length6, fk: length7, dZ: length8, d7: param0, fI: param1, fJ: param2, fK: param3, fL: param4, fM: param5, fN: param6, fO: param7, fP: param8});
		} else {
			var paramAtMid = paramAtStart_ + (0.5 * paramDelta);
			var branchHeight = height - 1;
			var leftBranch = A5($ianmackenzie$elm_geometry$ArcLengthParameterization$buildTree, derivativeMagnitude, lengthAtStart_, paramAtStart_, paramAtMid, branchHeight);
			var lengthAtLeftEnd = $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd(leftBranch);
			var rightBranch = A5($ianmackenzie$elm_geometry$ArcLengthParameterization$buildTree, derivativeMagnitude, lengthAtLeftEnd, paramAtMid, paramAtEnd, branchHeight);
			return $ianmackenzie$elm_geometry$ArcLengthParameterization$Node(
				{
					fc: leftBranch,
					he: $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd(rightBranch),
					hf: lengthAtStart_,
					hU: paramAtStart_,
					fV: rightBranch
				});
		}
	});
var $ianmackenzie$elm_units$Quantity$lessThanOrEqualTo = F2(
	function (_v0, _v1) {
		var y = _v0;
		var x = _v1;
		return _Utils_cmp(x, y) < 1;
	});
var $ianmackenzie$elm_geometry$ArcLengthParameterization$segmentsPerLeaf = 8;
var $ianmackenzie$elm_geometry$ArcLengthParameterization$build = function (_v0) {
	var maxError = _v0.kn;
	var derivativeMagnitude = _v0.jC;
	var maxSecondDerivativeMagnitude = _v0.ko;
	var height = function () {
		if (A2($ianmackenzie$elm_units$Quantity$lessThanOrEqualTo, $ianmackenzie$elm_units$Quantity$zero, maxError)) {
			return 0;
		} else {
			var numSegments = A2(
				$ianmackenzie$elm_units$Quantity$ratio,
				maxSecondDerivativeMagnitude,
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, 8, maxError));
			var numLeaves = numSegments / $ianmackenzie$elm_geometry$ArcLengthParameterization$segmentsPerLeaf;
			return A2(
				$elm$core$Basics$max,
				0,
				$elm$core$Basics$ceiling(
					A2($elm$core$Basics$logBase, 2, numLeaves)));
		}
	}();
	return A5($ianmackenzie$elm_geometry$ArcLengthParameterization$buildTree, derivativeMagnitude, 0, 0, 1, height);
};
var $ianmackenzie$elm_geometry$CubicSpline2d$derivativeMagnitude = function (_v0) {
	var spline = _v0;
	var _v1 = spline.c_;
	var p4 = _v1;
	var x4 = p4.z;
	var y4 = p4.R;
	var _v2 = spline.ep;
	var p3 = _v2;
	var x3 = p3.z;
	var x34 = x4 - x3;
	var y3 = p3.R;
	var y34 = y4 - y3;
	var _v3 = spline.ef;
	var p2 = _v3;
	var x2 = p2.z;
	var x23 = x3 - x2;
	var x234 = x34 - x23;
	var y2 = p2.R;
	var y23 = y3 - y2;
	var y234 = y34 - y23;
	var _v4 = spline.cY;
	var p1 = _v4;
	var x1 = p1.z;
	var x12 = x2 - x1;
	var x123 = x23 - x12;
	var y1 = p1.R;
	var y12 = y2 - y1;
	var y123 = y23 - y12;
	return function (parameterValue) {
		var y24 = y23 + (parameterValue * y234);
		var y13 = y12 + (parameterValue * y123);
		var y14 = y13 + (parameterValue * (y24 - y13));
		var x24 = x23 + (parameterValue * x234);
		var x13 = x12 + (parameterValue * x123);
		var x14 = x13 + (parameterValue * (x24 - x13));
		return 3 * $elm$core$Basics$sqrt((x14 * x14) + (y14 * y14));
	};
};
var $ianmackenzie$elm_geometry$CubicSpline2d$fromNondegenerate = function (nondegenerateSpline) {
	switch (nondegenerateSpline.$) {
		case 0:
			var spline = nondegenerateSpline.a;
			return spline;
		case 1:
			var spline = nondegenerateSpline.a;
			return spline;
		default:
			var spline = nondegenerateSpline.a;
			return spline;
	}
};
var $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint = function (_v0) {
	var spline = _v0;
	return spline.cY;
};
var $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint = function (_v0) {
	var spline = _v0;
	return spline.c_;
};
var $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint = function (_v0) {
	var spline = _v0;
	return spline.ef;
};
var $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint = function (_v0) {
	var spline = _v0;
	return spline.ep;
};
var $ianmackenzie$elm_geometry$CubicSpline2d$maxSecondDerivativeMagnitude = function (spline) {
	var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
	var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
	var u3 = A2($ianmackenzie$elm_geometry$Vector2d$from, p3, p4);
	var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
	var u2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
	var v2 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u2, u3);
	var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
	var u1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
	var v1 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u1, u2);
	return A2(
		$ianmackenzie$elm_units$Quantity$multiplyBy,
		6,
		A2(
			$ianmackenzie$elm_units$Quantity$max,
			$ianmackenzie$elm_geometry$Vector2d$length(v1),
			$ianmackenzie$elm_geometry$Vector2d$length(v2)));
};
var $ianmackenzie$elm_geometry$CubicSpline2d$arcLengthParameterized = F2(
	function (_v0, nondegenerateSpline) {
		var maxError = _v0.kn;
		var spline = $ianmackenzie$elm_geometry$CubicSpline2d$fromNondegenerate(nondegenerateSpline);
		var parameterization = $ianmackenzie$elm_geometry$ArcLengthParameterization$build(
			{
				jC: $ianmackenzie$elm_geometry$CubicSpline2d$derivativeMagnitude(spline),
				kn: maxError,
				ko: $ianmackenzie$elm_geometry$CubicSpline2d$maxSecondDerivativeMagnitude(spline)
			});
		return {fu: nondegenerateSpline, da: parameterization, gf: spline};
	});
var $ianmackenzie$elm_geometry$EllipticalArc2d$ArcLengthParameterized = $elm$core$Basics$identity;
var $ianmackenzie$elm_units$Angle$cos = function (_v0) {
	var angle = _v0;
	return $elm$core$Basics$cos(angle);
};
var $ianmackenzie$elm_geometry$Quantity$Extra$rCosTheta = F2(
	function (r, theta) {
		return A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$cos(theta),
			r);
	});
var $ianmackenzie$elm_units$Angle$sin = function (_v0) {
	var angle = _v0;
	return $elm$core$Basics$sin(angle);
};
var $ianmackenzie$elm_geometry$Quantity$Extra$rSinTheta = F2(
	function (r, theta) {
		return A2(
			$ianmackenzie$elm_units$Quantity$multiplyBy,
			$ianmackenzie$elm_units$Angle$sin(theta),
			r);
	});
var $ianmackenzie$elm_geometry$Quantity$Extra$rTheta = F2(
	function (_v0, _v1) {
		var r = _v0;
		var theta = _v1;
		return r * theta;
	});
var $ianmackenzie$elm_units$Quantity$sqrt = function (_v0) {
	var value = _v0;
	return $elm$core$Basics$sqrt(value);
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$startAngle = function (_v0) {
	var arc = _v0;
	return arc.dj;
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle = function (_v0) {
	var arc = _v0;
	return arc.lq;
};
var $ianmackenzie$elm_geometry$Ellipse2d$xRadius = function (_v0) {
	var ellipse = _v0;
	return ellipse.l1;
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius = function (_v0) {
	var arc = _v0;
	return $ianmackenzie$elm_geometry$Ellipse2d$xRadius(arc.jL);
};
var $ianmackenzie$elm_geometry$Ellipse2d$yRadius = function (_v0) {
	var ellipse = _v0;
	return ellipse.l4;
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius = function (_v0) {
	var arc = _v0;
	return $ianmackenzie$elm_geometry$Ellipse2d$yRadius(arc.jL);
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$derivativeMagnitude = function (arc) {
	var theta0 = $ianmackenzie$elm_geometry$EllipticalArc2d$startAngle(arc);
	var ry = $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius(arc);
	var rx = $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius(arc);
	var dTheta = $ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle(arc);
	var absDTheta = $ianmackenzie$elm_units$Quantity$abs(dTheta);
	return function (parameterValue) {
		var theta = A2(
			$ianmackenzie$elm_units$Quantity$plus,
			A2($ianmackenzie$elm_units$Quantity$multiplyBy, parameterValue, dTheta),
			theta0);
		var dy = A2($ianmackenzie$elm_geometry$Quantity$Extra$rCosTheta, ry, theta);
		var dx = A2($ianmackenzie$elm_geometry$Quantity$Extra$rSinTheta, rx, theta);
		var r = $ianmackenzie$elm_units$Quantity$sqrt(
			A2(
				$ianmackenzie$elm_units$Quantity$plus,
				$ianmackenzie$elm_units$Quantity$squared(dy),
				$ianmackenzie$elm_units$Quantity$squared(dx)));
		return A2($ianmackenzie$elm_geometry$Quantity$Extra$rTheta, r, absDTheta);
	};
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$fromNondegenerate = function (nondegenerateArc) {
	switch (nondegenerateArc.$) {
		case 0:
			var arc = nondegenerateArc.a;
			return arc;
		case 1:
			var arc = nondegenerateArc.a;
			return arc;
		default:
			var arc = nondegenerateArc.a;
			return arc;
	}
};
var $ianmackenzie$elm_units_interval$Quantity$Interval$contains = F2(
	function (_v0, _v1) {
		var x = _v0;
		var _v2 = _v1;
		var a = _v2.a;
		var b = _v2.b;
		return (_Utils_cmp(a, x) < 1) && (_Utils_cmp(x, b) < 1);
	});
var $ianmackenzie$elm_units$Quantity$float = function (value) {
	return value;
};
var $ianmackenzie$elm_units_interval$Quantity$Interval$Interval = $elm$core$Basics$identity;
var $ianmackenzie$elm_units_interval$Quantity$Interval$hull2 = F2(
	function (_v0, _v1) {
		var a = _v0;
		var b = _v1;
		return (_Utils_cmp(a, b) < 1) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
	});
var $ianmackenzie$elm_units_interval$Quantity$Interval$from = $ianmackenzie$elm_units_interval$Quantity$Interval$hull2;
var $ianmackenzie$elm_units_interval$Quantity$Interval$maxValue = function (_v0) {
	var _v1 = _v0;
	var b = _v1.b;
	return b;
};
var $ianmackenzie$elm_units_interval$Quantity$Interval$minValue = function (_v0) {
	var _v1 = _v0;
	var a = _v1.a;
	return a;
};
var $ianmackenzie$elm_units_interval$Quantity$Interval$endpoints = function (_v0) {
	var intervalEndpoints = _v0;
	return intervalEndpoints;
};
var $ianmackenzie$elm_units_interval$Quantity$Interval$isSingleton = function (_v0) {
	var _v1 = _v0;
	var a = _v1.a;
	var b = _v1.b;
	return _Utils_eq(a, b);
};
var $ianmackenzie$elm_units$Angle$radians = function (numRadians) {
	return numRadians;
};
var $ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMax = function (interval) {
	var twoPi = $ianmackenzie$elm_units$Angle$radians(2 * $elm$core$Basics$pi);
	var _v0 = $ianmackenzie$elm_units_interval$Quantity$Interval$endpoints(interval);
	var a = _v0.a;
	var b = _v0.b;
	var minBranch = $elm$core$Basics$floor(
		A2($ianmackenzie$elm_units$Quantity$ratio, a, twoPi));
	var maxBranch = $elm$core$Basics$floor(
		A2($ianmackenzie$elm_units$Quantity$ratio, b, twoPi));
	return !_Utils_eq(minBranch, maxBranch);
};
var $ianmackenzie$elm_units_interval$Quantity$Interval$plus = F2(
	function (_v0, _v1) {
		var delta = _v0;
		var _v2 = _v1;
		var a = _v2.a;
		var b = _v2.b;
		return _Utils_Tuple2(a + delta, b + delta);
	});
var $ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMinMax = function (interval) {
	return _Utils_Tuple2(
		$ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMax(
			A2(
				$ianmackenzie$elm_units_interval$Quantity$Interval$plus,
				$ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi),
				interval)),
		$ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMax(interval));
};
var $ianmackenzie$elm_units_interval$Quantity$Interval$minus = F2(
	function (_v0, _v1) {
		var delta = _v0;
		var _v2 = _v1;
		var a = _v2.a;
		var b = _v2.b;
		return _Utils_Tuple2(a - delta, b - delta);
	});
var $ianmackenzie$elm_units_interval$Angle$Interval$sinIncludesMinMax = function (interval) {
	return $ianmackenzie$elm_units_interval$Angle$Interval$cosIncludesMinMax(
		A2(
			$ianmackenzie$elm_units_interval$Quantity$Interval$minus,
			$ianmackenzie$elm_units$Angle$radians($elm$core$Basics$pi / 2),
			interval));
};
var $ianmackenzie$elm_units_interval$Quantity$Interval$singleton = function (value) {
	return _Utils_Tuple2(value, value);
};
var $ianmackenzie$elm_units_interval$Angle$Interval$sin = function (interval) {
	if ($ianmackenzie$elm_units_interval$Quantity$Interval$isSingleton(interval)) {
		return $ianmackenzie$elm_units_interval$Quantity$Interval$singleton(
			$ianmackenzie$elm_units$Quantity$float(
				$ianmackenzie$elm_units$Angle$sin(
					$ianmackenzie$elm_units_interval$Quantity$Interval$minValue(interval))));
	} else {
		var _v0 = $ianmackenzie$elm_units_interval$Angle$Interval$sinIncludesMinMax(interval);
		var includesMin = _v0.a;
		var includesMax = _v0.b;
		var _v1 = $ianmackenzie$elm_units_interval$Quantity$Interval$endpoints(interval);
		var a = _v1.a;
		var b = _v1.b;
		var newMax = includesMax ? $ianmackenzie$elm_units$Quantity$float(1) : $ianmackenzie$elm_units$Quantity$float(
			A2(
				$elm$core$Basics$max,
				$ianmackenzie$elm_units$Angle$sin(a),
				$ianmackenzie$elm_units$Angle$sin(b)));
		var newMin = includesMin ? $ianmackenzie$elm_units$Quantity$float(-1) : $ianmackenzie$elm_units$Quantity$float(
			A2(
				$elm$core$Basics$min,
				$ianmackenzie$elm_units$Angle$sin(a),
				$ianmackenzie$elm_units$Angle$sin(b)));
		return A2($ianmackenzie$elm_units_interval$Quantity$Interval$from, newMin, newMax);
	}
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$maxSecondDerivativeMagnitude = function (arc) {
	var theta0 = $ianmackenzie$elm_geometry$EllipticalArc2d$startAngle(arc);
	var ry = $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius(arc);
	var rx = $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius(arc);
	var dTheta = $ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle(arc);
	var theta1 = A2($ianmackenzie$elm_units$Quantity$plus, dTheta, theta0);
	var thetaInterval = A2($ianmackenzie$elm_units_interval$Quantity$Interval$from, theta0, theta1);
	var sinThetaInterval = $ianmackenzie$elm_units_interval$Angle$Interval$sin(thetaInterval);
	var includeKx = A2($ianmackenzie$elm_units_interval$Quantity$Interval$contains, $ianmackenzie$elm_units$Quantity$zero, sinThetaInterval);
	var includeKy = _Utils_eq(
		$ianmackenzie$elm_units_interval$Quantity$Interval$maxValue(sinThetaInterval),
		$ianmackenzie$elm_units$Quantity$float(1)) || _Utils_eq(
		$ianmackenzie$elm_units_interval$Quantity$Interval$minValue(sinThetaInterval),
		$ianmackenzie$elm_units$Quantity$float(-1));
	var _v0 = $ianmackenzie$elm_units$Quantity$squared(dTheta);
	var dThetaSquared = _v0;
	var kx = A2($ianmackenzie$elm_units$Quantity$multiplyBy, dThetaSquared, rx);
	var ky = A2($ianmackenzie$elm_units$Quantity$multiplyBy, dThetaSquared, ry);
	if (A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, ky, kx) && includeKx) {
		return kx;
	} else {
		if (A2($ianmackenzie$elm_units$Quantity$greaterThanOrEqualTo, kx, ky) && includeKy) {
			return ky;
		} else {
			var sinTheta1 = $ianmackenzie$elm_units$Angle$sin(theta1);
			var sinTheta0 = $ianmackenzie$elm_units$Angle$sin(theta0);
			var rySquared = $ianmackenzie$elm_units$Quantity$squared(ry);
			var rxSquared = $ianmackenzie$elm_units$Quantity$squared(rx);
			var cosTheta1 = $ianmackenzie$elm_units$Angle$cos(theta1);
			var d1 = A2(
				$ianmackenzie$elm_units$Quantity$plus,
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, sinTheta1 * sinTheta1, rySquared),
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, cosTheta1 * cosTheta1, rxSquared));
			var cosTheta0 = $ianmackenzie$elm_units$Angle$cos(theta0);
			var d0 = A2(
				$ianmackenzie$elm_units$Quantity$plus,
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, sinTheta0 * sinTheta0, rySquared),
				A2($ianmackenzie$elm_units$Quantity$multiplyBy, cosTheta0 * cosTheta0, rxSquared));
			return A2(
				$ianmackenzie$elm_units$Quantity$multiplyBy,
				dThetaSquared,
				$ianmackenzie$elm_units$Quantity$sqrt(
					A2($ianmackenzie$elm_units$Quantity$max, d0, d1)));
		}
	}
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$arcLengthParameterized = F2(
	function (_v0, nondegenerateArc) {
		var maxError = _v0.kn;
		var arc = $ianmackenzie$elm_geometry$EllipticalArc2d$fromNondegenerate(nondegenerateArc);
		var parameterization = $ianmackenzie$elm_geometry$ArcLengthParameterization$build(
			{
				jC: $ianmackenzie$elm_geometry$EllipticalArc2d$derivativeMagnitude(arc),
				kn: maxError,
				ko: $ianmackenzie$elm_geometry$EllipticalArc2d$maxSecondDerivativeMagnitude(arc)
			});
		return {ft: nondegenerateArc, da: parameterization, ge: arc};
	});
var $ianmackenzie$elm_geometry$QuadraticSpline2d$ArcLengthParameterized = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$QuadraticSpline2d$derivativeMagnitude = function (_v0) {
	var spline = _v0;
	var _v1 = spline.ep;
	var p3 = _v1;
	var x3 = p3.z;
	var y3 = p3.R;
	var _v2 = spline.ef;
	var p2 = _v2;
	var x2 = p2.z;
	var x23 = x3 - x2;
	var y2 = p2.R;
	var y23 = y3 - y2;
	var _v3 = spline.cY;
	var p1 = _v3;
	var x1 = p1.z;
	var x12 = x2 - x1;
	var x123 = x23 - x12;
	var y1 = p1.R;
	var y12 = y2 - y1;
	var y123 = y23 - y12;
	return function (parameterValue) {
		var y13 = y12 + (parameterValue * y123);
		var x13 = x12 + (parameterValue * x123);
		return 2 * $elm$core$Basics$sqrt((x13 * x13) + (y13 * y13));
	};
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$fromNondegenerate = function (nondegenerateSpline) {
	if (!nondegenerateSpline.$) {
		var spline = nondegenerateSpline.a;
		return spline;
	} else {
		var spline = nondegenerateSpline.a;
		return spline;
	}
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$firstControlPoint = function (_v0) {
	var spline = _v0;
	return spline.cY;
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint = function (_v0) {
	var spline = _v0;
	return spline.ef;
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$thirdControlPoint = function (_v0) {
	var spline = _v0;
	return spline.ep;
};
var $ianmackenzie$elm_geometry$Vector2d$twice = function (vector) {
	return A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, 2, vector);
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$secondDerivative = function (spline) {
	var p3 = $ianmackenzie$elm_geometry$QuadraticSpline2d$thirdControlPoint(spline);
	var p2 = $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint(spline);
	var v2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
	var p1 = $ianmackenzie$elm_geometry$QuadraticSpline2d$firstControlPoint(spline);
	var v1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
	return $ianmackenzie$elm_geometry$Vector2d$twice(
		A2($ianmackenzie$elm_geometry$Vector2d$minus, v1, v2));
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$arcLengthParameterized = F2(
	function (_v0, nondegenerateSpline) {
		var maxError = _v0.kn;
		var spline = $ianmackenzie$elm_geometry$QuadraticSpline2d$fromNondegenerate(nondegenerateSpline);
		var parameterization = $ianmackenzie$elm_geometry$ArcLengthParameterization$build(
			{
				jC: $ianmackenzie$elm_geometry$QuadraticSpline2d$derivativeMagnitude(spline),
				kn: maxError,
				ko: $ianmackenzie$elm_geometry$Vector2d$length(
					$ianmackenzie$elm_geometry$QuadraticSpline2d$secondDerivative(spline))
			});
		return {fu: nondegenerateSpline, da: parameterization, gf: spline};
	});
var $ianmackenzie$elm_geometry$CubicSpline2d$NonZeroFirstDerivative = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $ianmackenzie$elm_geometry$CubicSpline2d$NonZeroSecondDerivative = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $ianmackenzie$elm_geometry$CubicSpline2d$NonZeroThirdDerivative = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $ianmackenzie$elm_geometry$Geometry$Types$Direction2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector2d$direction = function (_v0) {
	var v = _v0;
	var largestComponent = A2(
		$elm$core$Basics$max,
		$elm$core$Basics$abs(v.z),
		$elm$core$Basics$abs(v.R));
	if (!largestComponent) {
		return $elm$core$Maybe$Nothing;
	} else {
		var scaledY = v.R / largestComponent;
		var scaledX = v.z / largestComponent;
		var scaledLength = $elm$core$Basics$sqrt((scaledX * scaledX) + (scaledY * scaledY));
		return $elm$core$Maybe$Just(
			{z: scaledX / scaledLength, R: scaledY / scaledLength});
	}
};
var $ianmackenzie$elm_units$Quantity$interpolateFrom = F3(
	function (_v0, _v1, parameter) {
		var start = _v0;
		var end = _v1;
		return (parameter <= 0.5) ? (start + (parameter * (end - start))) : (end + ((1 - parameter) * (start - end)));
	});
var $ianmackenzie$elm_geometry$Vector2d$xy = F2(
	function (_v0, _v1) {
		var x = _v0;
		var y = _v1;
		return {z: x, R: y};
	});
var $ianmackenzie$elm_geometry$CubicSpline2d$firstDerivative = F2(
	function (spline, parameterValue) {
		var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
		var x4 = $ianmackenzie$elm_geometry$Point2d$xCoordinate(p4);
		var y4 = $ianmackenzie$elm_geometry$Point2d$yCoordinate(p4);
		var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
		var x3 = $ianmackenzie$elm_geometry$Point2d$xCoordinate(p3);
		var vx3 = A2($ianmackenzie$elm_units$Quantity$minus, x3, x4);
		var y3 = $ianmackenzie$elm_geometry$Point2d$yCoordinate(p3);
		var vy3 = A2($ianmackenzie$elm_units$Quantity$minus, y3, y4);
		var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
		var x2 = $ianmackenzie$elm_geometry$Point2d$xCoordinate(p2);
		var vx2 = A2($ianmackenzie$elm_units$Quantity$minus, x2, x3);
		var wx2 = A3($ianmackenzie$elm_units$Quantity$interpolateFrom, vx2, vx3, parameterValue);
		var y2 = $ianmackenzie$elm_geometry$Point2d$yCoordinate(p2);
		var vy2 = A2($ianmackenzie$elm_units$Quantity$minus, y2, y3);
		var wy2 = A3($ianmackenzie$elm_units$Quantity$interpolateFrom, vy2, vy3, parameterValue);
		var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
		var x1 = $ianmackenzie$elm_geometry$Point2d$xCoordinate(p1);
		var vx1 = A2($ianmackenzie$elm_units$Quantity$minus, x1, x2);
		var wx1 = A3($ianmackenzie$elm_units$Quantity$interpolateFrom, vx1, vx2, parameterValue);
		var y1 = $ianmackenzie$elm_geometry$Point2d$yCoordinate(p1);
		var vy1 = A2($ianmackenzie$elm_units$Quantity$minus, y1, y2);
		var wy1 = A3($ianmackenzie$elm_units$Quantity$interpolateFrom, vy1, vy2, parameterValue);
		return A2(
			$ianmackenzie$elm_geometry$Vector2d$xy,
			A2(
				$ianmackenzie$elm_units$Quantity$multiplyBy,
				3,
				A3($ianmackenzie$elm_units$Quantity$interpolateFrom, wx1, wx2, parameterValue)),
			A2(
				$ianmackenzie$elm_units$Quantity$multiplyBy,
				3,
				A3($ianmackenzie$elm_units$Quantity$interpolateFrom, wy1, wy2, parameterValue)));
	});
var $ianmackenzie$elm_geometry$Vector2d$interpolateFrom = F3(
	function (_v0, _v1, t) {
		var v1 = _v0;
		var v2 = _v1;
		return (t <= 0.5) ? {z: v1.z + (t * (v2.z - v1.z)), R: v1.R + (t * (v2.R - v1.R))} : {z: v2.z + ((1 - t) * (v1.z - v2.z)), R: v2.R + ((1 - t) * (v1.R - v2.R))};
	});
var $ianmackenzie$elm_geometry$CubicSpline2d$secondDerivative = F2(
	function (spline, parameterValue) {
		var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
		var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
		var u3 = A2($ianmackenzie$elm_geometry$Vector2d$from, p3, p4);
		var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
		var u2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
		var v2 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u2, u3);
		var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
		var u1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
		var v1 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u1, u2);
		return A2(
			$ianmackenzie$elm_geometry$Vector2d$scaleBy,
			6,
			A3($ianmackenzie$elm_geometry$Vector2d$interpolateFrom, v1, v2, parameterValue));
	});
var $ianmackenzie$elm_geometry$CubicSpline2d$startPoint = function (_v0) {
	var spline = _v0;
	return spline.cY;
};
var $ianmackenzie$elm_geometry$CubicSpline2d$thirdDerivative = function (spline) {
	var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
	var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
	var u3 = A2($ianmackenzie$elm_geometry$Vector2d$from, p3, p4);
	var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
	var u2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
	var v2 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u2, u3);
	var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
	var u1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
	var v1 = A2($ianmackenzie$elm_geometry$Vector2d$minus, u1, u2);
	return A2(
		$ianmackenzie$elm_geometry$Vector2d$scaleBy,
		6,
		A2($ianmackenzie$elm_geometry$Vector2d$minus, v1, v2));
};
var $ianmackenzie$elm_geometry$CubicSpline2d$nondegenerate = function (spline) {
	var _v0 = $ianmackenzie$elm_geometry$Vector2d$direction(
		$ianmackenzie$elm_geometry$CubicSpline2d$thirdDerivative(spline));
	if (!_v0.$) {
		var direction = _v0.a;
		return $elm$core$Result$Ok(
			A2($ianmackenzie$elm_geometry$CubicSpline2d$NonZeroThirdDerivative, spline, direction));
	} else {
		var secondDerivativeVector = A2($ianmackenzie$elm_geometry$CubicSpline2d$secondDerivative, spline, 0);
		var _v1 = $ianmackenzie$elm_geometry$Vector2d$direction(secondDerivativeVector);
		if (!_v1.$) {
			var direction = _v1.a;
			return $elm$core$Result$Ok(
				A2($ianmackenzie$elm_geometry$CubicSpline2d$NonZeroSecondDerivative, spline, direction));
		} else {
			var firstDerivativeVector = A2($ianmackenzie$elm_geometry$CubicSpline2d$firstDerivative, spline, 0);
			var _v2 = $ianmackenzie$elm_geometry$Vector2d$direction(firstDerivativeVector);
			if (!_v2.$) {
				var direction = _v2.a;
				return $elm$core$Result$Ok(
					A2($ianmackenzie$elm_geometry$CubicSpline2d$NonZeroFirstDerivative, spline, direction));
			} else {
				return $elm$core$Result$Err(
					$ianmackenzie$elm_geometry$CubicSpline2d$startPoint(spline));
			}
		}
	}
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$Curved = function (a) {
	return {$: 0, a: a};
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$Horizontal = function (a) {
	return {$: 1, a: a};
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$Vertical = function (a) {
	return {$: 2, a: a};
};
var $ianmackenzie$elm_geometry$Geometry$Types$Frame2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Frame2d$copy = function (_v0) {
	var properties = _v0;
	return properties;
};
var $ianmackenzie$elm_geometry$Ellipse2d$axes = function (_v0) {
	var ellipse = _v0;
	return $ianmackenzie$elm_geometry$Frame2d$copy(ellipse.i0);
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$axes = function (_v0) {
	var arc = _v0;
	return $ianmackenzie$elm_geometry$Ellipse2d$axes(arc.jL);
};
var $ianmackenzie$elm_geometry$Point2d$xyIn = F3(
	function (_v0, _v1, _v2) {
		var frame = _v0;
		var x = _v1;
		var y = _v2;
		var _v3 = frame.aB;
		var p0 = _v3;
		var _v4 = frame.e;
		var j = _v4;
		var _v5 = frame.l0;
		var i = _v5;
		return {z: (p0.z + (x * i.z)) + (y * j.z), R: (p0.R + (x * i.R)) + (y * j.R)};
	});
var $ianmackenzie$elm_geometry$EllipticalArc2d$pointOn = F2(
	function (arc, parameterValue) {
		var theta = A2(
			$ianmackenzie$elm_units$Quantity$plus,
			A2(
				$ianmackenzie$elm_units$Quantity$multiplyBy,
				parameterValue,
				$ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle(arc)),
			$ianmackenzie$elm_geometry$EllipticalArc2d$startAngle(arc));
		var localY = A2(
			$ianmackenzie$elm_geometry$Quantity$Extra$rSinTheta,
			$ianmackenzie$elm_geometry$EllipticalArc2d$yRadius(arc),
			theta);
		var localX = A2(
			$ianmackenzie$elm_geometry$Quantity$Extra$rCosTheta,
			$ianmackenzie$elm_geometry$EllipticalArc2d$xRadius(arc),
			theta);
		return A3(
			$ianmackenzie$elm_geometry$Point2d$xyIn,
			$ianmackenzie$elm_geometry$EllipticalArc2d$axes(arc),
			localX,
			localY);
	});
var $ianmackenzie$elm_geometry$EllipticalArc2d$startPoint = function (arc) {
	return A2($ianmackenzie$elm_geometry$EllipticalArc2d$pointOn, arc, 0);
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$nondegenerate = function (arc) {
	var ry = $ianmackenzie$elm_geometry$EllipticalArc2d$yRadius(arc);
	var rx = $ianmackenzie$elm_geometry$EllipticalArc2d$xRadius(arc);
	return _Utils_eq(
		$ianmackenzie$elm_geometry$EllipticalArc2d$sweptAngle(arc),
		$ianmackenzie$elm_units$Quantity$zero) ? $elm$core$Result$Err(
		$ianmackenzie$elm_geometry$EllipticalArc2d$startPoint(arc)) : ((_Utils_eq(rx, $ianmackenzie$elm_units$Quantity$zero) && _Utils_eq(ry, $ianmackenzie$elm_units$Quantity$zero)) ? $elm$core$Result$Err(
		$ianmackenzie$elm_geometry$EllipticalArc2d$startPoint(arc)) : (_Utils_eq(rx, $ianmackenzie$elm_units$Quantity$zero) ? $elm$core$Result$Ok(
		$ianmackenzie$elm_geometry$EllipticalArc2d$Vertical(arc)) : (_Utils_eq(ry, $ianmackenzie$elm_units$Quantity$zero) ? $elm$core$Result$Ok(
		$ianmackenzie$elm_geometry$EllipticalArc2d$Horizontal(arc)) : $elm$core$Result$Ok(
		$ianmackenzie$elm_geometry$EllipticalArc2d$Curved(arc)))));
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$NonZeroFirstDerivative = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $ianmackenzie$elm_geometry$QuadraticSpline2d$NonZeroSecondDerivative = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $ianmackenzie$elm_geometry$QuadraticSpline2d$firstDerivative = F2(
	function (spline, parameterValue) {
		var p3 = $ianmackenzie$elm_geometry$QuadraticSpline2d$thirdControlPoint(spline);
		var p2 = $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint(spline);
		var v2 = A2($ianmackenzie$elm_geometry$Vector2d$from, p2, p3);
		var p1 = $ianmackenzie$elm_geometry$QuadraticSpline2d$firstControlPoint(spline);
		var v1 = A2($ianmackenzie$elm_geometry$Vector2d$from, p1, p2);
		return $ianmackenzie$elm_geometry$Vector2d$twice(
			A3($ianmackenzie$elm_geometry$Vector2d$interpolateFrom, v1, v2, parameterValue));
	});
var $ianmackenzie$elm_geometry$QuadraticSpline2d$startPoint = function (_v0) {
	var spline = _v0;
	return spline.cY;
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$nondegenerate = function (spline) {
	var _v0 = $ianmackenzie$elm_geometry$Vector2d$direction(
		$ianmackenzie$elm_geometry$QuadraticSpline2d$secondDerivative(spline));
	if (!_v0.$) {
		var direction = _v0.a;
		return $elm$core$Result$Ok(
			A2($ianmackenzie$elm_geometry$QuadraticSpline2d$NonZeroSecondDerivative, spline, direction));
	} else {
		var firstDerivativeVector = A2($ianmackenzie$elm_geometry$QuadraticSpline2d$firstDerivative, spline, 0);
		var _v1 = $ianmackenzie$elm_geometry$Vector2d$direction(firstDerivativeVector);
		if (!_v1.$) {
			var direction = _v1.a;
			return $elm$core$Result$Ok(
				A2($ianmackenzie$elm_geometry$QuadraticSpline2d$NonZeroFirstDerivative, spline, direction));
		} else {
			return $elm$core$Result$Err(
				$ianmackenzie$elm_geometry$QuadraticSpline2d$startPoint(spline));
		}
	}
};
var $folkertdev$one_true_path_experiment$Segment$arcLengthParameterized = F2(
	function (tolerance, segment) {
		var config = {
			kn: $ianmackenzie$elm_units$Quantity$float(tolerance)
		};
		switch (segment.$) {
			case 0:
				var lineSegment = segment.a;
				return $elm$core$Maybe$Just(
					$folkertdev$one_true_path_experiment$Segment$ParameterizedLineSegment(lineSegment));
			case 1:
				var spline = segment.a;
				return A2(
					$elm$core$Maybe$map,
					A2(
						$elm$core$Basics$composeR,
						$ianmackenzie$elm_geometry$QuadraticSpline2d$arcLengthParameterized(config),
						$folkertdev$one_true_path_experiment$Segment$ParameterizedQuadratic),
					$elm$core$Result$toMaybe(
						$ianmackenzie$elm_geometry$QuadraticSpline2d$nondegenerate(spline)));
			case 2:
				var spline = segment.a;
				return A2(
					$elm$core$Maybe$map,
					A2(
						$elm$core$Basics$composeR,
						$ianmackenzie$elm_geometry$CubicSpline2d$arcLengthParameterized(config),
						$folkertdev$one_true_path_experiment$Segment$ParameterizedCubic),
					$elm$core$Result$toMaybe(
						$ianmackenzie$elm_geometry$CubicSpline2d$nondegenerate(spline)));
			default:
				var arc = segment.a;
				return A2(
					$elm$core$Maybe$map,
					A2(
						$elm$core$Basics$composeR,
						$ianmackenzie$elm_geometry$EllipticalArc2d$arcLengthParameterized(config),
						$folkertdev$one_true_path_experiment$Segment$ParameterizedArc),
					$elm$core$Result$toMaybe(
						$ianmackenzie$elm_geometry$EllipticalArc2d$nondegenerate(arc)));
		}
	});
var $elm_community$list_extra$List$Extra$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2($elm$core$List$take, n, xs),
			A2($elm$core$List$drop, n, xs));
	});
var $folkertdev$one_true_path_experiment$SubPath$arcLengthParameterizedHelper = F2(
	function (tolerance, segments) {
		if (!segments.b) {
			return $folkertdev$one_true_path_experiment$SubPath$None;
		} else {
			if (!segments.b.b) {
				var segment = segments.a;
				var _v1 = A2($folkertdev$one_true_path_experiment$Segment$arcLengthParameterized, tolerance, segment);
				if (_v1.$ === 1) {
					return $folkertdev$one_true_path_experiment$SubPath$None;
				} else {
					var parameterized = _v1.a;
					return $folkertdev$one_true_path_experiment$SubPath$Leaf(
						{eg: parameterized, cF: tolerance});
				}
			} else {
				var _v2 = A2(
					$elm_community$list_extra$List$Extra$splitAt,
					$elm$core$Basics$ceiling(
						$elm$core$List$length(segments) / 2),
					segments);
				var leftSegments = _v2.a;
				var rightSegments = _v2.b;
				var leftParameterized = A2($folkertdev$one_true_path_experiment$SubPath$arcLengthParameterizedHelper, tolerance, leftSegments);
				var rightParameterized = A2($folkertdev$one_true_path_experiment$SubPath$arcLengthParameterizedHelper, tolerance, rightSegments);
				if (rightParameterized.$ === 2) {
					return leftParameterized;
				} else {
					return $folkertdev$one_true_path_experiment$SubPath$Node(
						{
							f: leftParameterized,
							fl: $folkertdev$one_true_path_experiment$SubPath$arcLength(leftParameterized),
							g: rightParameterized,
							cF: tolerance,
							es: $folkertdev$one_true_path_experiment$SubPath$arcLength(leftParameterized) + $folkertdev$one_true_path_experiment$SubPath$arcLength(rightParameterized)
						});
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $ianmackenzie$elm_geometry$CubicSpline2d$endPoint = function (_v0) {
	var spline = _v0;
	return spline.c_;
};
var $ianmackenzie$elm_geometry$QuadraticSpline2d$endPoint = function (_v0) {
	var spline = _v0;
	return spline.ep;
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$endPoint = function (arc) {
	return A2($ianmackenzie$elm_geometry$EllipticalArc2d$pointOn, arc, 1);
};
var $ianmackenzie$elm_geometry$LineSegment2d$endPoint = function (_v0) {
	var _v1 = _v0;
	var end = _v1.b;
	return end;
};
var $ianmackenzie$elm_geometry$Point2d$toTuple = F2(
	function (fromQuantity, point) {
		return _Utils_Tuple2(
			fromQuantity(
				$ianmackenzie$elm_geometry$Point2d$xCoordinate(point)),
			fromQuantity(
				$ianmackenzie$elm_geometry$Point2d$yCoordinate(point)));
	});
var $folkertdev$one_true_path_experiment$Segment$finalPoint = function (segment) {
	return A2(
		$ianmackenzie$elm_geometry$Point2d$toTuple,
		$ianmackenzie$elm_units$Quantity$toFloat,
		function () {
			switch (segment.$) {
				case 0:
					var lineSegment = segment.a;
					return $ianmackenzie$elm_geometry$LineSegment2d$endPoint(lineSegment);
				case 1:
					var spline = segment.a;
					return $ianmackenzie$elm_geometry$QuadraticSpline2d$endPoint(spline);
				case 2:
					var spline = segment.a;
					return $ianmackenzie$elm_geometry$CubicSpline2d$endPoint(spline);
				default:
					var arc = segment.a;
					return $ianmackenzie$elm_geometry$EllipticalArc2d$endPoint(arc);
			}
		}());
};
var $ianmackenzie$elm_geometry$LineSegment2d$startPoint = function (_v0) {
	var _v1 = _v0;
	var start = _v1.a;
	return start;
};
var $folkertdev$one_true_path_experiment$Segment$firstPoint = function (segment) {
	return A2(
		$ianmackenzie$elm_geometry$Point2d$toTuple,
		$ianmackenzie$elm_units$Quantity$toFloat,
		function () {
			switch (segment.$) {
				case 0:
					var lineSegment = segment.a;
					return $ianmackenzie$elm_geometry$LineSegment2d$startPoint(lineSegment);
				case 1:
					var spline = segment.a;
					return $ianmackenzie$elm_geometry$QuadraticSpline2d$startPoint(spline);
				case 2:
					var spline = segment.a;
					return $ianmackenzie$elm_geometry$CubicSpline2d$startPoint(spline);
				default:
					var arc = segment.a;
					return $ianmackenzie$elm_geometry$EllipticalArc2d$startPoint(arc);
			}
		}());
};
var $folkertdev$one_true_path_experiment$Segment$toCursorState = function (segment) {
	switch (segment.$) {
		case 2:
			var curve = segment.a;
			var start = A2(
				$ianmackenzie$elm_geometry$Point2d$toTuple,
				$ianmackenzie$elm_units$Quantity$toFloat,
				$ianmackenzie$elm_geometry$CubicSpline2d$startPoint(curve));
			var end = A2(
				$ianmackenzie$elm_geometry$Point2d$toTuple,
				$ianmackenzie$elm_units$Quantity$toFloat,
				$ianmackenzie$elm_geometry$CubicSpline2d$endPoint(curve));
			var control = A2(
				$ianmackenzie$elm_geometry$Point2d$toTuple,
				$ianmackenzie$elm_units$Quantity$toFloat,
				$ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(curve));
			return {
				p: end,
				Q: $elm$core$Maybe$Just(control),
				$9: start
			};
		case 1:
			var curve = segment.a;
			var start = A2(
				$ianmackenzie$elm_geometry$Point2d$toTuple,
				$ianmackenzie$elm_units$Quantity$toFloat,
				$ianmackenzie$elm_geometry$QuadraticSpline2d$startPoint(curve));
			var end = A2(
				$ianmackenzie$elm_geometry$Point2d$toTuple,
				$ianmackenzie$elm_units$Quantity$toFloat,
				$ianmackenzie$elm_geometry$QuadraticSpline2d$endPoint(curve));
			var control = A2(
				$ianmackenzie$elm_geometry$Point2d$toTuple,
				$ianmackenzie$elm_units$Quantity$toFloat,
				$ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint(curve));
			return {
				p: end,
				Q: $elm$core$Maybe$Just(control),
				$9: start
			};
		default:
			return {
				p: $folkertdev$one_true_path_experiment$Segment$finalPoint(segment),
				Q: $elm$core$Maybe$Nothing,
				$9: $folkertdev$one_true_path_experiment$Segment$firstPoint(segment)
			};
	}
};
var $folkertdev$elm_deque$Internal$toList = function (deque) {
	return _Utils_ap(
		deque.aq,
		$elm$core$List$reverse(deque.au));
};
var $folkertdev$elm_deque$Deque$unwrap = function (_v0) {
	var boundedDeque = _v0;
	return boundedDeque;
};
var $folkertdev$elm_deque$Deque$toList = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Internal$toList, $folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$one_true_path_experiment$Segment$Cubic = function (a) {
	return {$: 2, a: a};
};
var $folkertdev$one_true_path_experiment$Segment$LineSegment = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$one_true_path_experiment$Segment$Quadratic = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$one_true_path_experiment$Segment$Arc = function (a) {
	return {$: 3, a: a};
};
var $folkertdev$one_true_path_experiment$Geometry$Ellipse$conversionMatrix = function (xAxisRotate) {
	return _Utils_Tuple2(
		_Utils_Tuple2(
			$elm$core$Basics$cos(xAxisRotate),
			(-1) * $elm$core$Basics$sin(xAxisRotate)),
		_Utils_Tuple2(
			$elm$core$Basics$sin(xAxisRotate),
			$elm$core$Basics$cos(xAxisRotate)));
};
var $ianmackenzie$elm_geometry$Vector2d$fromTuple = F2(
	function (toQuantity, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return A2(
			$ianmackenzie$elm_geometry$Vector2d$xy,
			toQuantity(x),
			toQuantity(y));
	});
var $folkertdev$one_true_path_experiment$Geometry$Ellipse$inverseConversionMatrix = function (xAxisRotate) {
	return _Utils_Tuple2(
		_Utils_Tuple2(
			$elm$core$Basics$cos(xAxisRotate),
			$elm$core$Basics$sin(xAxisRotate)),
		_Utils_Tuple2(
			(-1) * $elm$core$Basics$sin(xAxisRotate),
			$elm$core$Basics$cos(xAxisRotate)));
};
var $ianmackenzie$elm_geometry$Vector2d$dot = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return (v1.z * v2.z) + (v1.R * v2.R);
	});
var $folkertdev$one_true_path_experiment$Geometry$Ellipse$matrixMulVector = F2(
	function (_v0, vec) {
		var ab = _v0.a;
		var cd = _v0.b;
		var vector = A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, vec);
		var row2 = A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, cd);
		var row1 = A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, ab);
		var _v1 = A2($ianmackenzie$elm_geometry$Vector2d$dot, row2, vector);
		var dot2 = _v1;
		var _v2 = A2($ianmackenzie$elm_geometry$Vector2d$dot, row1, vector);
		var dot1 = _v2;
		return A2(
			$ianmackenzie$elm_geometry$Vector2d$fromTuple,
			$ianmackenzie$elm_units$Quantity$float,
			_Utils_Tuple2(dot1, dot2));
	});
var $ianmackenzie$elm_geometry$Vector2d$xComponent = function (_v0) {
	var v = _v0;
	return v.z;
};
var $ianmackenzie$elm_geometry$Vector2d$yComponent = function (_v0) {
	var v = _v0;
	return v.R;
};
var $ianmackenzie$elm_geometry$Vector2d$toTuple = F2(
	function (fromQuantity, vector) {
		return _Utils_Tuple2(
			fromQuantity(
				$ianmackenzie$elm_geometry$Vector2d$xComponent(vector)),
			fromQuantity(
				$ianmackenzie$elm_geometry$Vector2d$yComponent(vector)));
	});
var $folkertdev$one_true_path_experiment$Geometry$Ellipse$coordinatePrime = function (_v0) {
	var start = _v0.$9;
	var end = _v0.jM;
	var xAxisRotate = _v0.a9;
	var rotate = $folkertdev$one_true_path_experiment$Geometry$Ellipse$inverseConversionMatrix(xAxisRotate);
	return A2(
		$ianmackenzie$elm_geometry$Vector2d$toTuple,
		$ianmackenzie$elm_units$Quantity$toFloat,
		A2(
			$folkertdev$one_true_path_experiment$Geometry$Ellipse$matrixMulVector,
			rotate,
			A2(
				$ianmackenzie$elm_geometry$Vector2d$toTuple,
				$ianmackenzie$elm_units$Quantity$toFloat,
				A2(
					$ianmackenzie$elm_geometry$Vector2d$scaleBy,
					0.5,
					A2(
						$ianmackenzie$elm_geometry$Vector2d$minus,
						A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, end),
						A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, start))))));
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags = function (_v0) {
	var arcFlag = _v0.a;
	var direction = _v0.b;
	var _v1 = _Utils_Tuple2(arcFlag, direction);
	if (_v1.a === 1) {
		if (!_v1.b) {
			var _v2 = _v1.a;
			var _v3 = _v1.b;
			return _Utils_Tuple2(1, 0);
		} else {
			var _v6 = _v1.a;
			var _v7 = _v1.b;
			return _Utils_Tuple2(1, 1);
		}
	} else {
		if (!_v1.b) {
			var _v4 = _v1.a;
			var _v5 = _v1.b;
			return _Utils_Tuple2(0, 0);
		} else {
			var _v8 = _v1.a;
			var _v9 = _v1.b;
			return _Utils_Tuple2(0, 1);
		}
	}
};
var $elm$core$Basics$truncate = _Basics_truncate;
var $folkertdev$one_true_path_experiment$Geometry$Ellipse$mod2pi_ = function (x) {
	return x - ((((x / (2 * $elm$core$Basics$pi)) | 0) * 2) * $elm$core$Basics$pi);
};
var $elm$core$Basics$acos = _Basics_acos;
var $ianmackenzie$elm_geometry$Vector2d$cross = F2(
	function (_v0, _v1) {
		var v2 = _v0;
		var v1 = _v1;
		return (v1.z * v2.R) - (v1.R * v2.z);
	});
var $folkertdev$one_true_path_experiment$Geometry$Ellipse$signedAngle = F2(
	function (u, v) {
		var _v0 = $ianmackenzie$elm_geometry$Vector2d$length(v);
		var lengthV = _v0;
		var _v1 = $ianmackenzie$elm_geometry$Vector2d$length(u);
		var lengthU = _v1;
		var _v2 = A2($ianmackenzie$elm_geometry$Vector2d$dot, u, v);
		var dot = _v2;
		var _v3 = A2($ianmackenzie$elm_geometry$Vector2d$cross, v, u);
		var cross = _v3;
		var sign = (cross < 0) ? (-1) : 1;
		return sign * $elm$core$Basics$abs(
			$elm$core$Basics$acos(dot / (lengthU * lengthV)));
	});
var $folkertdev$one_true_path_experiment$Geometry$Ellipse$tau = 2 * $elm$core$Basics$pi;
var $folkertdev$one_true_path_experiment$Geometry$Ellipse$endpointToCenter = function (parameterization) {
	var start = parameterization.$9;
	var end = parameterization.jM;
	var radii = parameterization.bq;
	var xAxisRotate = parameterization.a9;
	var arcFlag = parameterization.eD;
	var direction = parameterization.eQ;
	var sign = function (_v7) {
		var a = _v7.a;
		var b = _v7.b;
		return _Utils_eq(a, b);
	}(
		$folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
			_Utils_Tuple2(arcFlag, direction))) ? (-1) : 1;
	var _v0 = $folkertdev$one_true_path_experiment$Geometry$Ellipse$coordinatePrime(parameterization);
	var x1_ = _v0.a;
	var y1_ = _v0.b;
	var p1 = A2(
		$ianmackenzie$elm_geometry$Vector2d$fromTuple,
		$ianmackenzie$elm_units$Quantity$float,
		_Utils_Tuple2(x1_, y1_));
	var _v1 = radii;
	var rx = _v1.a;
	var ry = _v1.b;
	var denominator = (A2($elm$core$Basics$pow, rx, 2) * A2($elm$core$Basics$pow, y1_, 2)) + (A2($elm$core$Basics$pow, ry, 2) * A2($elm$core$Basics$pow, x1_, 2));
	var numerator = ((A2($elm$core$Basics$pow, rx, 2) * A2($elm$core$Basics$pow, ry, 2)) - (A2($elm$core$Basics$pow, rx, 2) * A2($elm$core$Basics$pow, y1_, 2))) - (A2($elm$core$Basics$pow, ry, 2) * A2($elm$core$Basics$pow, x1_, 2));
	var root = ((!denominator) || (numerator < 0)) ? 0 : (sign * $elm$core$Basics$sqrt(numerator / denominator));
	var center_ = A2(
		$ianmackenzie$elm_geometry$Vector2d$fromTuple,
		$ianmackenzie$elm_units$Quantity$float,
		_Utils_Tuple2(((rx * y1_) / ry) * root, ((-1) * ((ry * x1_) / rx)) * root));
	var center = A2(
		$ianmackenzie$elm_geometry$Vector2d$plus,
		A2(
			$ianmackenzie$elm_geometry$Vector2d$scaleBy,
			0.5,
			A2(
				$ianmackenzie$elm_geometry$Vector2d$plus,
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, start),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, end))),
		A2(
			$folkertdev$one_true_path_experiment$Geometry$Ellipse$matrixMulVector,
			$folkertdev$one_true_path_experiment$Geometry$Ellipse$conversionMatrix(xAxisRotate),
			A2($ianmackenzie$elm_geometry$Vector2d$toTuple, $ianmackenzie$elm_units$Quantity$toFloat, center_)));
	var _v2 = radii;
	var radiusX = _v2.a;
	var radiusY = _v2.b;
	var deltaTheta = function () {
		var second = A2(
			$ianmackenzie$elm_geometry$Vector2d$fromTuple,
			$ianmackenzie$elm_units$Quantity$float,
			function (_v6) {
				var x = _v6.a;
				var y = _v6.b;
				return _Utils_Tuple2(x / radiusX, y / radiusY);
			}(
				A2(
					$ianmackenzie$elm_geometry$Vector2d$toTuple,
					$ianmackenzie$elm_units$Quantity$toFloat,
					A2(
						$ianmackenzie$elm_geometry$Vector2d$minus,
						center_,
						A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, -1, p1)))));
		var first = A2(
			$ianmackenzie$elm_geometry$Vector2d$fromTuple,
			$ianmackenzie$elm_units$Quantity$float,
			function (_v5) {
				var x = _v5.a;
				var y = _v5.b;
				return _Utils_Tuple2(x / radiusX, y / radiusY);
			}(
				A2(
					$ianmackenzie$elm_geometry$Vector2d$toTuple,
					$ianmackenzie$elm_units$Quantity$toFloat,
					A2($ianmackenzie$elm_geometry$Vector2d$minus, center_, p1))));
		return A2($folkertdev$one_true_path_experiment$Geometry$Ellipse$signedAngle, first, second);
	}();
	var startAngle = function () {
		var temp = A2(
			$folkertdev$one_true_path_experiment$Geometry$Ellipse$signedAngle,
			A2(
				$ianmackenzie$elm_geometry$Vector2d$fromTuple,
				$ianmackenzie$elm_units$Quantity$float,
				_Utils_Tuple2(1, 0)),
			A2(
				$ianmackenzie$elm_geometry$Vector2d$fromTuple,
				$ianmackenzie$elm_units$Quantity$float,
				function (_v4) {
					var x = _v4.a;
					var y = _v4.b;
					return _Utils_Tuple2(x / radiusX, y / radiusY);
				}(
					A2(
						$ianmackenzie$elm_geometry$Vector2d$toTuple,
						$ianmackenzie$elm_units$Quantity$toFloat,
						A2($ianmackenzie$elm_geometry$Vector2d$minus, center_, p1)))));
		var _v3 = $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
			_Utils_Tuple2(arcFlag, direction));
		var fs = _v3.b;
		return $folkertdev$one_true_path_experiment$Geometry$Ellipse$mod2pi_(
			((!fs) && (deltaTheta > 0)) ? (temp - $folkertdev$one_true_path_experiment$Geometry$Ellipse$tau) : (((fs === 1) && (deltaTheta < 0)) ? (temp + $folkertdev$one_true_path_experiment$Geometry$Ellipse$tau) : temp));
	}();
	var result = {
		eM: A2($ianmackenzie$elm_geometry$Vector2d$toTuple, $ianmackenzie$elm_units$Quantity$toFloat, center),
		cU: deltaTheta,
		bq: radii,
		dj: startAngle,
		a9: xAxisRotate
	};
	return result;
};
var $ianmackenzie$elm_geometry$Direction2d$fromAngle = function (_v0) {
	var angle = _v0;
	return {
		z: $elm$core$Basics$cos(angle),
		R: $elm$core$Basics$sin(angle)
	};
};
var $ianmackenzie$elm_geometry$Point2d$fromTuple = F2(
	function (toQuantity, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return A2(
			$ianmackenzie$elm_geometry$Point2d$xy,
			toQuantity(x),
			toQuantity(y));
	});
var $ianmackenzie$elm_geometry$Geometry$Types$EllipticalArc2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Geometry$Types$Ellipse2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Direction2d$rotateCounterclockwise = function (_v0) {
	var d = _v0;
	return {z: -d.R, R: d.z};
};
var $ianmackenzie$elm_geometry$Frame2d$unsafe = function (properties) {
	return properties;
};
var $ianmackenzie$elm_geometry$Frame2d$withXDirection = F2(
	function (givenDirection, givenOrigin) {
		return $ianmackenzie$elm_geometry$Frame2d$unsafe(
			{
				aB: givenOrigin,
				l0: givenDirection,
				e: $ianmackenzie$elm_geometry$Direction2d$rotateCounterclockwise(givenDirection)
			});
	});
var $ianmackenzie$elm_geometry$Ellipse2d$with = function (properties) {
	return {
		i0: A2($ianmackenzie$elm_geometry$Frame2d$withXDirection, properties.l0, properties.jl),
		l1: $ianmackenzie$elm_units$Quantity$abs(properties.l1),
		l4: $ianmackenzie$elm_units$Quantity$abs(properties.l4)
	};
};
var $ianmackenzie$elm_geometry$EllipticalArc2d$with = function (properties) {
	return {
		jL: $ianmackenzie$elm_geometry$Ellipse2d$with(
			{jl: properties.jl, l0: properties.l0, l1: properties.l1, l4: properties.l4}),
		dj: properties.dj,
		lq: properties.lq
	};
};
var $folkertdev$one_true_path_experiment$Segment$ellipticalArc = F2(
	function (start, _v0) {
		var radii = _v0.bq;
		var xAxisRotate = _v0.a9;
		var arcFlag = _v0.eD;
		var direction = _v0.eQ;
		var target = _v0.bW;
		var center = $folkertdev$one_true_path_experiment$Geometry$Ellipse$endpointToCenter(
			{eD: arcFlag, eQ: direction, jM: target, bq: radii, $9: start, a9: xAxisRotate});
		var _v1 = radii;
		var rx = _v1.a;
		var ry = _v1.b;
		return $folkertdev$one_true_path_experiment$Segment$Arc(
			$ianmackenzie$elm_geometry$EllipticalArc2d$with(
				{
					jl: A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, center.eM),
					dj: $ianmackenzie$elm_units$Angle$radians(center.dj),
					lq: $ianmackenzie$elm_units$Angle$radians(center.cU),
					l0: $ianmackenzie$elm_geometry$Direction2d$fromAngle(
						$ianmackenzie$elm_units$Angle$radians(center.a9)),
					l1: $ianmackenzie$elm_units$Quantity$float(center.bq.a),
					l4: $ianmackenzie$elm_units$Quantity$float(center.bq.b)
				}));
	});
var $ianmackenzie$elm_geometry$Geometry$Types$LineSegment2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$LineSegment2d$fromEndpoints = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$LineSegment2d$from = F2(
	function (startPoint_, endPoint_) {
		return $ianmackenzie$elm_geometry$LineSegment2d$fromEndpoints(
			_Utils_Tuple2(startPoint_, endPoint_));
	});
var $ianmackenzie$elm_geometry$Geometry$Types$CubicSpline2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$CubicSpline2d$fromControlPoints = F4(
	function (p1, p2, p3, p4) {
		return {cY: p1, c_: p4, ef: p2, ep: p3};
	});
var $ianmackenzie$elm_geometry$Geometry$Types$QuadraticSpline2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$QuadraticSpline2d$fromControlPoints = F3(
	function (p1, p2, p3) {
		return {cY: p1, ef: p2, ep: p3};
	});
var $folkertdev$one_true_path_experiment$Segment$traverse = F3(
	function (folder, initial, elements) {
		return $elm$core$List$reverse(
			A3(
				$elm$core$List$foldl,
				folder,
				_Utils_Tuple2(initial, _List_Nil),
				elements).b);
	});
var $folkertdev$one_true_path_experiment$Segment$toSegment = F2(
	function (state, drawto) {
		var start = A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, state.p);
		var _v0 = A2($ianmackenzie$elm_geometry$Point2d$toTuple, $ianmackenzie$elm_units$Quantity$toFloat, start);
		var startX = _v0.a;
		var startY = _v0.b;
		switch (drawto.$) {
			case 0:
				var coordinates_ = drawto.a;
				var coordinates = A2(
					$elm$core$List$map,
					$ianmackenzie$elm_geometry$Point2d$fromTuple($ianmackenzie$elm_units$Quantity$float),
					coordinates_);
				return A3(
					$elm$core$List$map2,
					F2(
						function (f, t) {
							return $folkertdev$one_true_path_experiment$Segment$LineSegment(
								A2($ianmackenzie$elm_geometry$LineSegment2d$from, f, t));
						}),
					A2($elm$core$List$cons, start, coordinates),
					coordinates);
			case 1:
				var coordinates = drawto.a;
				var toPoint2ds = function (_v4) {
					var startControlPoint = _v4.a;
					var endControlPoint = _v4.b;
					var endPoint = _v4.c;
					return _Utils_Tuple3(
						A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, startControlPoint),
						A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, endControlPoint),
						A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, endPoint));
				};
				var folder = F2(
					function (_v2, _v3) {
						var c1 = _v2.a;
						var c2 = _v2.b;
						var p = _v2.c;
						var segmentStart = _v3.a;
						var accum = _v3.b;
						return _Utils_Tuple2(
							p,
							A2(
								$elm$core$List$cons,
								$folkertdev$one_true_path_experiment$Segment$Cubic(
									A4($ianmackenzie$elm_geometry$CubicSpline2d$fromControlPoints, segmentStart, c1, c2, p)),
								accum));
					});
				return A3(
					$folkertdev$one_true_path_experiment$Segment$traverse,
					folder,
					start,
					A2($elm$core$List$map, toPoint2ds, coordinates));
			case 2:
				var coordinates = drawto.a;
				var toPoint2ds = function (_v7) {
					var controlPoint = _v7.a;
					var endPoint = _v7.b;
					return _Utils_Tuple2(
						A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, controlPoint),
						A2($ianmackenzie$elm_geometry$Point2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, endPoint));
				};
				var folder = F2(
					function (_v5, _v6) {
						var c = _v5.a;
						var p = _v5.b;
						var segmentStart = _v6.a;
						var accum = _v6.b;
						return _Utils_Tuple2(
							p,
							A2(
								$elm$core$List$cons,
								$folkertdev$one_true_path_experiment$Segment$Quadratic(
									A3($ianmackenzie$elm_geometry$QuadraticSpline2d$fromControlPoints, segmentStart, c, p)),
								accum));
					});
				return A3(
					$folkertdev$one_true_path_experiment$Segment$traverse,
					folder,
					start,
					A2($elm$core$List$map, toPoint2ds, coordinates));
			case 3:
				var _arguments = drawto.a;
				var folder = F2(
					function (args, _v8) {
						var segmentStart = _v8.a;
						var accum = _v8.b;
						return _Utils_Tuple2(
							args.bW,
							A2(
								$elm$core$List$cons,
								A2($folkertdev$one_true_path_experiment$Segment$ellipticalArc, segmentStart, args),
								accum));
					});
				return A3(
					$folkertdev$one_true_path_experiment$Segment$traverse,
					folder,
					A2($ianmackenzie$elm_geometry$Point2d$toTuple, $ianmackenzie$elm_units$Quantity$toFloat, start),
					_arguments);
			default:
				return _List_Nil;
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$toSegments = function (subpath) {
	if (subpath.$ === 1) {
		return _List_Nil;
	} else {
		var moveto = subpath.a.hG;
		var drawtos = subpath.a.gL;
		var coordinate = moveto;
		var folder = F2(
			function (drawto, _v2) {
				var previousState = _v2.a;
				var accum = _v2.b;
				var newSegments = A2($folkertdev$one_true_path_experiment$Segment$toSegment, previousState, drawto);
				var finalNewSegment = A2(
					$elm$core$Maybe$withDefault,
					previousState,
					A2(
						$elm$core$Maybe$map,
						$folkertdev$one_true_path_experiment$Segment$toCursorState,
						$elm_community$list_extra$List$Extra$last(newSegments)));
				return _Utils_Tuple2(
					finalNewSegment,
					_Utils_ap(accum, newSegments));
			});
		var cursorState = {p: coordinate, Q: $elm$core$Maybe$Nothing, $9: coordinate};
		return A3(
			$elm$core$List$foldl,
			folder,
			_Utils_Tuple2(cursorState, _List_Nil),
			$folkertdev$elm_deque$Deque$toList(drawtos)).b;
	}
};
var $folkertdev$one_true_path_experiment$SubPath$arcLengthParameterized = F2(
	function (tolerance, subpath) {
		return A2(
			$folkertdev$one_true_path_experiment$SubPath$arcLengthParameterizedHelper,
			tolerance,
			$folkertdev$one_true_path_experiment$SubPath$toSegments(subpath));
	});
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm_community$typed_svg$TypedSvg$Core$node = $elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var $elm_community$typed_svg$TypedSvg$defs = $elm_community$typed_svg$TypedSvg$Core$node('defs');
var $elm_community$typed_svg$TypedSvg$Types$MarkerCoordinateSystemStrokeWidth = 1;
var $elm_community$typed_svg$TypedSvg$Core$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString = function (paint) {
	switch (paint.$) {
		case 0:
			var color = paint.a;
			return $avh4$elm_color$Color$toCssString(color);
		case 1:
			var string = paint.a;
			return $elm$core$String$concat(
				_List_fromArray(
					['var(' + (string + ')')]));
		case 2:
			var string = paint.a;
			return $elm$core$String$concat(
				_List_fromArray(
					['url(#', string, ')']));
		case 3:
			return 'context-fill';
		case 4:
			return 'context-stroke';
		default:
			return 'none';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$fill = A2(
	$elm$core$Basics$composeL,
	$elm_community$typed_svg$TypedSvg$Core$attribute('fill'),
	$elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString);
var $elm_community$typed_svg$TypedSvg$Attributes$id = $elm_community$typed_svg$TypedSvg$Core$attribute('id');
var $elm_community$typed_svg$TypedSvg$marker = $elm_community$typed_svg$TypedSvg$Core$node('marker');
var $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString = function (length) {
	switch (length.$) {
		case 0:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'cm';
		case 1:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'em';
		case 2:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'ex';
		case 3:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'in';
		case 4:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'mm';
		case 5:
			var x = length.a;
			return $elm$core$String$fromFloat(x);
		case 6:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'pc';
		case 7:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + '%';
		case 8:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'pt';
		case 9:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'px';
		default:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'rem';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$markerHeight = function (mHeight) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'markerHeight',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(mHeight));
};
var $elm_community$typed_svg$TypedSvg$TypesToStrings$markerCoordinateSystemToString = function (markerCoordinateSystem) {
	if (!markerCoordinateSystem) {
		return 'userSpaceOnUse';
	} else {
		return 'strokeWidth';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$markerUnits = function (markerCoordinateSystem) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'markerUnits',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$markerCoordinateSystemToString(markerCoordinateSystem));
};
var $elm_community$typed_svg$TypedSvg$Attributes$markerWidth = function (mWidth) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'markerWidth',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(mWidth));
};
var $elm_community$typed_svg$TypedSvg$Attributes$orient = $elm_community$typed_svg$TypedSvg$Core$attribute('orient');
var $elm_community$typed_svg$TypedSvg$Attributes$points = function (pts) {
	var pointToString = function (_v0) {
		var xx = _v0.a;
		var yy = _v0.b;
		return $elm$core$String$fromFloat(xx) + (', ' + $elm$core$String$fromFloat(yy));
	};
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'points',
		A2(
			$elm$core$String$join,
			' ',
			A2($elm$core$List$map, pointToString, pts)));
};
var $elm_community$typed_svg$TypedSvg$polygon = $elm_community$typed_svg$TypedSvg$Core$node('polygon');
var $elm_community$typed_svg$TypedSvg$Attributes$refX = $elm_community$typed_svg$TypedSvg$Core$attribute('refX');
var $elm_community$typed_svg$TypedSvg$Attributes$refY = $elm_community$typed_svg$TypedSvg$Core$attribute('refY');
var $elm_community$typed_svg$TypedSvg$Attributes$stroke = A2(
	$elm$core$Basics$composeL,
	$elm_community$typed_svg$TypedSvg$Core$attribute('stroke'),
	$elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString);
var $elm_community$typed_svg$TypedSvg$Attributes$viewBox = F4(
	function (minX, minY, vWidth, vHeight) {
		return A2(
			$elm_community$typed_svg$TypedSvg$Core$attribute,
			'viewBox',
			A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromFloat,
					_List_fromArray(
						[minX, minY, vWidth, vHeight]))));
	});
var $goyalarchit$elm_dagre$Render$StandardDrawers$triangleHeadElement = function (stroke) {
	return A2(
		$elm_community$typed_svg$TypedSvg$marker,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$id('triangle-head'),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 9, 6),
				$elm_community$typed_svg$TypedSvg$Attributes$markerWidth(
				$elm_community$typed_svg$TypedSvg$Types$Px(4.5)),
				$elm_community$typed_svg$TypedSvg$Attributes$markerHeight(
				$elm_community$typed_svg$TypedSvg$Types$Px(3)),
				$elm_community$typed_svg$TypedSvg$Attributes$refX('6'),
				$elm_community$typed_svg$TypedSvg$Attributes$refY('3'),
				$elm_community$typed_svg$TypedSvg$Attributes$orient('auto'),
				$elm_community$typed_svg$TypedSvg$Attributes$markerUnits(1)
			]),
		_List_fromArray(
			[
				A2(
				$elm_community$typed_svg$TypedSvg$polygon,
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$points(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 0),
								_Utils_Tuple2(0, 6),
								_Utils_Tuple2(9, 3)
							])),
						$elm_community$typed_svg$TypedSvg$Attributes$stroke(
						$elm_community$typed_svg$TypedSvg$Types$Paint(stroke)),
						$elm_community$typed_svg$TypedSvg$Attributes$fill(
						$elm_community$typed_svg$TypedSvg$Types$Paint(stroke))
					]),
				_List_Nil)
			]));
};
var $goyalarchit$elm_dagre$Render$StandardDrawers$veeHeadElement = function (stroke) {
	return A2(
		$elm_community$typed_svg$TypedSvg$marker,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$id('vee-head'),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 9, 6),
				$elm_community$typed_svg$TypedSvg$Attributes$markerWidth(
				$elm_community$typed_svg$TypedSvg$Types$Px(4.5)),
				$elm_community$typed_svg$TypedSvg$Attributes$markerHeight(
				$elm_community$typed_svg$TypedSvg$Types$Px(3)),
				$elm_community$typed_svg$TypedSvg$Attributes$refX('6'),
				$elm_community$typed_svg$TypedSvg$Attributes$refY('3'),
				$elm_community$typed_svg$TypedSvg$Attributes$orient('auto'),
				$elm_community$typed_svg$TypedSvg$Attributes$markerUnits(1)
			]),
		_List_fromArray(
			[
				A2(
				$elm_community$typed_svg$TypedSvg$polygon,
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$points(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 0),
								_Utils_Tuple2(4.5, 3),
								_Utils_Tuple2(0, 6),
								_Utils_Tuple2(9, 3)
							])),
						$elm_community$typed_svg$TypedSvg$Attributes$stroke(
						$elm_community$typed_svg$TypedSvg$Types$Paint(stroke)),
						$elm_community$typed_svg$TypedSvg$Attributes$fill(
						$elm_community$typed_svg$TypedSvg$Types$Paint(stroke))
					]),
				_List_Nil)
			]));
};
var $goyalarchit$elm_dagre$Render$StandardDrawers$arrowHeadDef = F2(
	function (ahs, stroke) {
		switch (ahs) {
			case 1:
				return A2(
					$elm_community$typed_svg$TypedSvg$defs,
					_List_Nil,
					_List_fromArray(
						[
							$goyalarchit$elm_dagre$Render$StandardDrawers$triangleHeadElement(stroke)
						]));
			case 2:
				return A2(
					$elm_community$typed_svg$TypedSvg$defs,
					_List_Nil,
					_List_fromArray(
						[
							$goyalarchit$elm_dagre$Render$StandardDrawers$veeHeadElement(stroke)
						]));
			default:
				return A2($elm_community$typed_svg$TypedSvg$defs, _List_Nil, _List_Nil);
		}
	});
var $goyalarchit$elm_dagre$Render$StandardDrawers$arrowHeadId = function (ah) {
	switch (ah) {
		case 0:
			return '';
		case 1:
			return 'url(#triangle-head)';
		default:
			return 'url(#vee-head)';
	}
};
var $folkertdev$one_true_path_experiment$Curve$cardinalPointHelper = F5(
	function (k, p0, p1, p2, p) {
		return _Utils_Tuple3(
			A2(
				$ianmackenzie$elm_geometry$Vector2d$plus,
				p1,
				A2(
					$ianmackenzie$elm_geometry$Vector2d$scaleBy,
					k,
					A2($ianmackenzie$elm_geometry$Vector2d$minus, p0, p2))),
			A2(
				$ianmackenzie$elm_geometry$Vector2d$plus,
				p2,
				A2(
					$ianmackenzie$elm_geometry$Vector2d$scaleBy,
					k,
					A2($ianmackenzie$elm_geometry$Vector2d$minus, p, p1))),
			p2);
	});
var $folkertdev$one_true_path_experiment$Curve$mapTriplet = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		return _Utils_Tuple3(
			f(a),
			f(b),
			f(c));
	});
var $folkertdev$one_true_path_experiment$Curve$cardinalPoint = F5(
	function (k, p0, p1, p2, p) {
		return A2(
			$folkertdev$one_true_path_experiment$Curve$mapTriplet,
			$ianmackenzie$elm_geometry$Vector2d$toTuple($ianmackenzie$elm_units$Quantity$toFloat),
			A5(
				$folkertdev$one_true_path_experiment$Curve$cardinalPointHelper,
				k,
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p0),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p1),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p2),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p)));
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$cubicCurveTo = $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo;
var $folkertdev$one_true_path_experiment$SubPath$Empty = {$: 1};
var $folkertdev$one_true_path_experiment$SubPath$empty = $folkertdev$one_true_path_experiment$SubPath$Empty;
var $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$lineTo = $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo;
var $folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$SubPath$SubPath = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$elm_deque$Deque$Deque = $elm$core$Basics$identity;
var $folkertdev$elm_deque$Internal$rebalance = function (deque) {
	var sizeF = deque.ag;
	var sizeR = deque.ah;
	var front = deque.aq;
	var rear = deque.au;
	var size1 = ((sizeF + sizeR) / 2) | 0;
	var size2 = (sizeF + sizeR) - size1;
	var balanceConstant = 4;
	if ((sizeF + sizeR) < 2) {
		return deque;
	} else {
		if (_Utils_cmp(sizeF, (balanceConstant * sizeR) + 1) > 0) {
			var newRear = _Utils_ap(
				rear,
				$elm$core$List$reverse(
					A2($elm$core$List$drop, size1, front)));
			var newFront = A2($elm$core$List$take, size1, front);
			return {aq: newFront, au: newRear, ag: size1, ah: size2};
		} else {
			if (_Utils_cmp(sizeR, (balanceConstant * sizeF) + 1) > 0) {
				var newRear = A2($elm$core$List$take, size1, rear);
				var newFront = _Utils_ap(
					front,
					$elm$core$List$reverse(
						A2($elm$core$List$drop, size1, rear)));
				return {aq: newFront, au: newRear, ag: size1, ah: size2};
			} else {
				return deque;
			}
		}
	}
};
var $folkertdev$elm_deque$Internal$fromList = function (list) {
	return $folkertdev$elm_deque$Internal$rebalance(
		{
			aq: list,
			au: _List_Nil,
			ag: $elm$core$List$length(list),
			ah: 0
		});
};
var $folkertdev$elm_deque$Deque$fromList = A2($elm$core$Basics$composeL, $elm$core$Basics$identity, $folkertdev$elm_deque$Internal$fromList);
var $folkertdev$one_true_path_experiment$SubPath$with = F2(
	function (moveto, drawtos) {
		return $folkertdev$one_true_path_experiment$SubPath$SubPath(
			{
				gL: $folkertdev$elm_deque$Deque$fromList(drawtos),
				hG: moveto
			});
	});
var $folkertdev$one_true_path_experiment$Curve$cardinal = F2(
	function (tension, points) {
		var k = (1 - tension) / 6;
		var helper = F2(
			function (acc, remainingPoints) {
				helper:
				while (true) {
					if ((remainingPoints.b && remainingPoints.b.b) && remainingPoints.b.b.b) {
						if (remainingPoints.b.b.b.b) {
							var p0 = remainingPoints.a;
							var _v1 = remainingPoints.b;
							var p1 = _v1.a;
							var _v2 = _v1.b;
							var p2 = _v2.a;
							var _v3 = _v2.b;
							var p3 = _v3.a;
							var rest = _v3.b;
							var $temp$acc = A2(
								$elm$core$List$cons,
								A5($folkertdev$one_true_path_experiment$Curve$cardinalPoint, k, p0, p1, p2, p3),
								acc),
								$temp$remainingPoints = A2(
								$elm$core$List$cons,
								p1,
								A2(
									$elm$core$List$cons,
									p2,
									A2($elm$core$List$cons, p3, rest)));
							acc = $temp$acc;
							remainingPoints = $temp$remainingPoints;
							continue helper;
						} else {
							var p0 = remainingPoints.a;
							var _v4 = remainingPoints.b;
							var p1 = _v4.a;
							var _v5 = _v4.b;
							var p2 = _v5.a;
							return $elm$core$List$reverse(
								A2(
									$elm$core$List$cons,
									A5($folkertdev$one_true_path_experiment$Curve$cardinalPoint, k, p0, p1, p2, p1),
									acc));
						}
					} else {
						return _List_Nil;
					}
				}
			});
		if (points.b && points.b.b) {
			if (!points.b.b.b) {
				var p0 = points.a;
				var _v7 = points.b;
				var p1 = _v7.a;
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p0),
					_List_fromArray(
						[
							$folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
							_List_fromArray(
								[p1]))
						]));
			} else {
				var p0 = points.a;
				var _v8 = points.b;
				var p1 = _v8.a;
				var _v9 = _v8.b;
				var p2 = _v9.a;
				var rest = _v9.b;
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p0),
					_List_fromArray(
						[
							$folkertdev$one_true_path_experiment$LowLevel$Command$cubicCurveTo(
							A2(
								$elm$core$List$cons,
								A5($folkertdev$one_true_path_experiment$Curve$cardinalPoint, k, p1, p0, p1, p2),
								A2(helper, _List_Nil, points)))
						]));
			}
		} else {
			return $folkertdev$one_true_path_experiment$SubPath$empty;
		}
	});
var $folkertdev$one_true_path_experiment$Curve$catmullRomDistance = F3(
	function (alpha, p1, p2) {
		var _v0 = $ianmackenzie$elm_geometry$Vector2d$length(
			A2($ianmackenzie$elm_geometry$Vector2d$minus, p2, p1));
		var length = _v0;
		var l23_2a = A2($elm$core$Basics$pow, length * length, alpha);
		return _Utils_Tuple2(
			$elm$core$Basics$sqrt(l23_2a),
			l23_2a);
	});
var $folkertdev$one_true_path_experiment$Curve$epsilon = 1.0e-12;
var $folkertdev$one_true_path_experiment$Curve$catmullRomPointHelper = F5(
	function (alpha, p0, p1, p2, p3) {
		var _v0 = A3($folkertdev$one_true_path_experiment$Curve$catmullRomDistance, alpha, p2, p3);
		var l23_a = _v0.a;
		var l23_2a = _v0.b;
		var _v1 = A3($folkertdev$one_true_path_experiment$Curve$catmullRomDistance, alpha, p1, p2);
		var l12_a = _v1.a;
		var l12_2a = _v1.b;
		var helper2 = function (p) {
			var m = (3 * l23_a) * (l23_a + l12_a);
			var b = ((2 * l23_2a) + ((3 * l23_a) * l12_a)) + l12_2a;
			return A2(
				$ianmackenzie$elm_geometry$Vector2d$scaleBy,
				1 / m,
				A2(
					$ianmackenzie$elm_geometry$Vector2d$plus,
					A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, -l12_2a, p3),
					A2(
						$ianmackenzie$elm_geometry$Vector2d$plus,
						A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, l23_2a, p1),
						A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, b, p))));
		};
		var control2 = (_Utils_cmp(l23_a, $folkertdev$one_true_path_experiment$Curve$epsilon) > 0) ? helper2(p2) : p2;
		var _v2 = A3($folkertdev$one_true_path_experiment$Curve$catmullRomDistance, alpha, p0, p1);
		var l01_a = _v2.a;
		var l01_2a = _v2.b;
		var helper1 = function (p) {
			var n = (3 * l01_a) * (l01_a + l12_a);
			var a = ((2 * l01_2a) + ((3 * l01_a) * l12_a)) + l12_2a;
			return A2(
				$ianmackenzie$elm_geometry$Vector2d$scaleBy,
				1 / n,
				A2(
					$ianmackenzie$elm_geometry$Vector2d$plus,
					A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, l01_2a, p2),
					A2(
						$ianmackenzie$elm_geometry$Vector2d$minus,
						A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, l12_2a, p0),
						A2($ianmackenzie$elm_geometry$Vector2d$scaleBy, a, p))));
		};
		var control1 = (_Utils_cmp(l01_a, $folkertdev$one_true_path_experiment$Curve$epsilon) > 0) ? helper1(p1) : p1;
		return _Utils_Tuple3(control1, control2, p2);
	});
var $folkertdev$one_true_path_experiment$Curve$catmullRomPoint = F5(
	function (alpha, p0, p1, p2, p3) {
		return A2(
			$folkertdev$one_true_path_experiment$Curve$mapTriplet,
			$ianmackenzie$elm_geometry$Vector2d$toTuple($ianmackenzie$elm_units$Quantity$toFloat),
			A5(
				$folkertdev$one_true_path_experiment$Curve$catmullRomPointHelper,
				alpha,
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p0),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p1),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p2),
				A2($ianmackenzie$elm_geometry$Vector2d$fromTuple, $ianmackenzie$elm_units$Quantity$float, p3)));
	});
var $folkertdev$one_true_path_experiment$Curve$reverseAccumulatorAppendClose = F2(
	function (accumulator, close) {
		return A3($elm$core$List$foldl, $elm$core$List$cons, close, accumulator);
	});
var $folkertdev$one_true_path_experiment$Curve$catmullRomHelper = F4(
	function (alpha, ending, points, accumulator) {
		catmullRomHelper:
		while (true) {
			if ((points.b && points.b.b) && points.b.b.b) {
				if (!points.b.b.b.b) {
					var p0 = points.a;
					var _v1 = points.b;
					var p1 = _v1.a;
					var _v2 = _v1.b;
					var p2 = _v2.a;
					return A2(
						$folkertdev$one_true_path_experiment$Curve$reverseAccumulatorAppendClose,
						accumulator,
						A3(ending, p0, p1, p2));
				} else {
					var p0 = points.a;
					var _v3 = points.b;
					var p1 = _v3.a;
					var _v4 = _v3.b;
					var p2 = _v4.a;
					var _v5 = _v4.b;
					var p = _v5.a;
					var rest = _v5.b;
					var $temp$alpha = alpha,
						$temp$ending = ending,
						$temp$points = A2(
						$elm$core$List$cons,
						p1,
						A2(
							$elm$core$List$cons,
							p2,
							A2($elm$core$List$cons, p, rest))),
						$temp$accumulator = A2(
						$elm$core$List$cons,
						A5($folkertdev$one_true_path_experiment$Curve$catmullRomPoint, alpha, p0, p1, p2, p),
						accumulator);
					alpha = $temp$alpha;
					ending = $temp$ending;
					points = $temp$points;
					accumulator = $temp$accumulator;
					continue catmullRomHelper;
				}
			} else {
				return _List_Nil;
			}
		}
	});
var $folkertdev$one_true_path_experiment$Curve$catmullRom = F2(
	function (alpha, points) {
		if (!alpha) {
			return A2($folkertdev$one_true_path_experiment$Curve$cardinal, 0, points);
		} else {
			if (points.b && points.b.b) {
				if (!points.b.b.b) {
					var p1 = points.a;
					var _v1 = points.b;
					var p2 = _v1.a;
					return A2(
						$folkertdev$one_true_path_experiment$SubPath$with,
						$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p1),
						_List_fromArray(
							[
								$folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
								_List_fromArray(
									[p2]))
							]));
				} else {
					var p0 = points.a;
					var _v2 = points.b;
					var p1 = _v2.a;
					var _v3 = _v2.b;
					var p2 = _v3.a;
					var rest = _v3.b;
					var ending = F3(
						function (q0, q1, q2) {
							return _List_fromArray(
								[
									A5($folkertdev$one_true_path_experiment$Curve$catmullRomPoint, alpha, q0, q1, q2, q2)
								]);
						});
					return A2(
						$folkertdev$one_true_path_experiment$SubPath$with,
						$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(p0),
						_List_fromArray(
							[
								$folkertdev$one_true_path_experiment$LowLevel$Command$cubicCurveTo(
								A4(
									$folkertdev$one_true_path_experiment$Curve$catmullRomHelper,
									alpha,
									ending,
									A2($elm$core$List$cons, p0, points),
									_List_Nil))
							]));
				}
			} else {
				return $folkertdev$one_true_path_experiment$SubPath$empty;
			}
		}
	});
var $elm_community$typed_svg$TypedSvg$Attributes$class = function (names) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'class',
		A2($elm$core$String$join, ' ', names));
};
var $elm_community$typed_svg$TypedSvg$TypesToStrings$cursorToString = function (cursor) {
	switch (cursor.$) {
		case 0:
			return 'auto';
		case 1:
			return 'default';
		case 2:
			return 'crosshair';
		case 3:
			return 'pointer';
		case 4:
			return 'move';
		case 5:
			return 'e-resize';
		case 6:
			return 'ne-resize';
		case 7:
			return 'nw-resize';
		case 8:
			return 'n-resize';
		case 9:
			return 'se-resize';
		case 10:
			return 'sw-resize';
		case 11:
			return 'w-resize';
		case 12:
			return 'text';
		case 13:
			return 'wait';
		case 14:
			return 'help';
		case 15:
			return 'inherit';
		default:
			var funcIRI = cursor.a;
			return funcIRI;
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$cursor = function (csor) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'cursor',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$cursorToString(csor));
};
var $elm_community$typed_svg$TypedSvg$Attributes$d = $elm_community$typed_svg$TypedSvg$Core$attribute('d');
var $goyalarchit$elm_dagre$Render$StandardDrawers$Types$None = 0;
var $avh4$elm_color$Color$darkGrey = A4($avh4$elm_color$Color$RgbaSpace, 186 / 255, 189 / 255, 182 / 255, 1.0);
var $goyalarchit$elm_dagre$Render$StandardDrawers$defEdgeDrawerConfig = function () {
	var f_ = function (_v2) {
		return '';
	};
	var f = function (e) {
		return $elm$core$String$fromInt(e.c$) + (' → ' + $elm$core$String$fromInt(e.dn));
	};
	return {
		b2: 0.5,
		eE: 0,
		cd: 16,
		ar: f_,
		hi: 1,
		d5: $elm$core$Maybe$Nothing,
		hP: false,
		Y: function (_v0) {
			return $avh4$elm_color$Color$darkGrey;
		},
		ak: f_,
		el: function (_v1) {
			return 3;
		},
		em: f_,
		lI: f
	};
}();
var $elm_community$typed_svg$TypedSvg$Types$AnchorMiddle = 2;
var $elm_community$typed_svg$TypedSvg$Types$DominantBaselineCentral = 8;
var $elm_community$typed_svg$TypedSvg$Types$Translate = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $elm_community$typed_svg$TypedSvg$TypesToStrings$dominantBaselineToString = function (dominantBaseline) {
	switch (dominantBaseline) {
		case 0:
			return 'auto';
		case 1:
			return 'use-script';
		case 2:
			return 'no-change';
		case 3:
			return 'reset-size';
		case 4:
			return 'ideographic';
		case 5:
			return 'alphabetic';
		case 6:
			return 'hanging';
		case 7:
			return 'mathematical';
		case 8:
			return 'central';
		case 9:
			return 'middle';
		case 10:
			return 'text-after-edge';
		case 11:
			return 'text-before-edge';
		default:
			return 'inherit';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$dominantBaseline = function (baseline) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'dominant-baseline',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$dominantBaselineToString(baseline));
};
var $elm_community$typed_svg$TypedSvg$Attributes$fontSize = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'font-size',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Core$text = $elm$virtual_dom$VirtualDom$text;
var $elm_community$typed_svg$TypedSvg$TypesToStrings$anchorAlignmentToString = function (anchorAlignment) {
	switch (anchorAlignment) {
		case 0:
			return 'inherit';
		case 1:
			return 'start';
		case 2:
			return 'middle';
		default:
			return 'end';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$textAnchor = function (anchorAlignment) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'text-anchor',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$anchorAlignmentToString(anchorAlignment));
};
var $elm_community$typed_svg$TypedSvg$text_ = $elm_community$typed_svg$TypedSvg$Core$node('text');
var $elm_community$typed_svg$TypedSvg$TypesToStrings$transformToString = function (xform) {
	var tr = F2(
		function (name, args) {
			return $elm$core$String$concat(
				_List_fromArray(
					[
						name,
						'(',
						A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, $elm$core$String$fromFloat, args)),
						')'
					]));
		});
	switch (xform.$) {
		case 0:
			var a = xform.a;
			var b = xform.b;
			var c = xform.c;
			var d = xform.d;
			var e = xform.e;
			var f = xform.f;
			return A2(
				tr,
				'matrix',
				_List_fromArray(
					[a, b, c, d, e, f]));
		case 1:
			var a = xform.a;
			var x = xform.b;
			var y = xform.c;
			return A2(
				tr,
				'rotate',
				_List_fromArray(
					[a, x, y]));
		case 2:
			var x = xform.a;
			var y = xform.b;
			return A2(
				tr,
				'scale',
				_List_fromArray(
					[x, y]));
		case 3:
			var x = xform.a;
			return A2(
				tr,
				'skewX',
				_List_fromArray(
					[x]));
		case 4:
			var y = xform.a;
			return A2(
				tr,
				'skewY',
				_List_fromArray(
					[y]));
		default:
			var x = xform.a;
			var y = xform.b;
			return A2(
				tr,
				'translate',
				_List_fromArray(
					[x, y]));
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$transform = function (transforms) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'transform',
		A2(
			$elm$core$String$join,
			' ',
			A2($elm$core$List$map, $elm_community$typed_svg$TypedSvg$TypesToStrings$transformToString, transforms)));
};
var $goyalarchit$elm_dagre$Render$StandardDrawers$centeredText = F3(
	function (str, fontSize, _v0) {
		var posX = _v0.a;
		var posY = _v0.b;
		return A2(
			$elm_community$typed_svg$TypedSvg$text_,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$textAnchor(2),
					$elm_community$typed_svg$TypedSvg$Attributes$dominantBaseline(8),
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, posX, posY)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$fontSize(
					$elm_community$typed_svg$TypedSvg$Types$Px(fontSize))
				]),
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Core$text(str)
				]));
	});
var $elm_community$typed_svg$TypedSvg$Attributes$href = $elm_community$typed_svg$TypedSvg$Core$attribute('href');
var $folkertdev$one_true_path_experiment$SubPath$fold = F3(
	function (tagger, parameterized, t) {
		fold:
		while (true) {
			var clamp = F3(
				function (totalLength, tolerance, length) {
					return (_Utils_cmp(
						$elm$core$Basics$abs(length - totalLength),
						tolerance) < 1) ? totalLength : ((_Utils_cmp(
						$elm$core$Basics$abs(length),
						tolerance) < 1) ? 0 : length);
				});
			switch (parameterized.$) {
				case 2:
					return $elm$core$Maybe$Nothing;
				case 1:
					var segment = parameterized.a.eg;
					var tolerance = parameterized.a.cF;
					var totalLength = $folkertdev$one_true_path_experiment$Segment$arcLength(segment);
					var answer = A2(
						tagger,
						segment,
						A3(clamp, totalLength, tolerance, t));
					return $elm$core$Maybe$Just(answer);
				default:
					var totalLength = parameterized.a.es;
					var lengthAtSplit = parameterized.a.fl;
					var left = parameterized.a.f;
					var right = parameterized.a.g;
					var tolerance = parameterized.a.cF;
					var clamped = A3(clamp, totalLength, tolerance, t);
					if (_Utils_cmp(clamped, lengthAtSplit) < 1) {
						var $temp$tagger = tagger,
							$temp$parameterized = left,
							$temp$t = clamped;
						tagger = $temp$tagger;
						parameterized = $temp$parameterized;
						t = $temp$t;
						continue fold;
					} else {
						var $temp$tagger = tagger,
							$temp$parameterized = right,
							$temp$t = clamped - lengthAtSplit;
						tagger = $temp$tagger;
						parameterized = $temp$parameterized;
						t = $temp$t;
						continue fold;
					}
			}
		}
	});
var $ianmackenzie$elm_geometry$Point2d$interpolateFrom = F3(
	function (_v0, _v1, t) {
		var p1 = _v0;
		var p2 = _v1;
		return (t <= 0.5) ? {z: p1.z + (t * (p2.z - p1.z)), R: p1.R + (t * (p2.R - p1.R))} : {z: p2.z + ((1 - t) * (p1.z - p2.z)), R: p2.R + ((1 - t) * (p1.R - p2.R))};
	});
var $ianmackenzie$elm_geometry$LineSegment2d$interpolate = F2(
	function (lineSegment, t) {
		var _v0 = $ianmackenzie$elm_geometry$LineSegment2d$endpoints(lineSegment);
		var start = _v0.a;
		var end = _v0.b;
		return A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, start, end, t);
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom = F3(
	function (start, end, parameter) {
		return (parameter <= 0.5) ? (start + (parameter * (end - start))) : (end + ((1 - parameter) * (start - end)));
	});
var $ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtStart = function (tree) {
	if (!tree.$) {
		var node = tree.a;
		return node.hf;
	} else {
		var leaf = tree.a;
		return leaf.dY;
	}
};
var $ianmackenzie$elm_geometry$ArcLengthParameterization$unsafeToParameterValue = F2(
	function (tree, s) {
		unsafeToParameterValue:
		while (true) {
			if (tree.$ === 1) {
				var length0 = tree.a.dY;
				var length1 = tree.a.fe;
				var length2 = tree.a.ff;
				var length3 = tree.a.fg;
				var length4 = tree.a.fh;
				var length5 = tree.a.fi;
				var length6 = tree.a.fj;
				var length7 = tree.a.fk;
				var length8 = tree.a.dZ;
				var param0 = tree.a.d7;
				var param1 = tree.a.fI;
				var param2 = tree.a.fJ;
				var param3 = tree.a.fK;
				var param4 = tree.a.fL;
				var param5 = tree.a.fM;
				var param6 = tree.a.fN;
				var param7 = tree.a.fO;
				var param8 = tree.a.fP;
				if (_Utils_cmp(s, length4) < 1) {
					if (_Utils_cmp(s, length2) < 1) {
						if (_Utils_cmp(s, length1) < 1) {
							var lengthFraction = (s - length0) / (length1 - length0);
							return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param0, param1, lengthFraction);
						} else {
							var lengthFraction = (s - length1) / (length2 - length1);
							return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param1, param2, lengthFraction);
						}
					} else {
						if (_Utils_cmp(s, length3) < 1) {
							var lengthFraction = (s - length2) / (length3 - length2);
							return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param2, param3, lengthFraction);
						} else {
							var lengthFraction = (s - length3) / (length4 - length3);
							return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param3, param4, lengthFraction);
						}
					}
				} else {
					if (_Utils_cmp(s, length6) < 1) {
						if (_Utils_cmp(s, length5) < 1) {
							var lengthFraction = (s - length4) / (length5 - length4);
							return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param4, param5, lengthFraction);
						} else {
							var lengthFraction = (s - length5) / (length6 - length5);
							return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param5, param6, lengthFraction);
						}
					} else {
						if (_Utils_cmp(s, length7) < 1) {
							var lengthFraction = (s - length6) / (length7 - length6);
							return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param6, param7, lengthFraction);
						} else {
							var lengthFraction = (s - length7) / (length8 - length7);
							return A3($ianmackenzie$elm_float_extra$Float$Extra$interpolateFrom, param7, param8, lengthFraction);
						}
					}
				}
			} else {
				var leftBranch = tree.a.fc;
				var rightBranch = tree.a.fV;
				if (_Utils_cmp(
					s,
					$ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtStart(rightBranch)) < 0) {
					var $temp$tree = leftBranch,
						$temp$s = s;
					tree = $temp$tree;
					s = $temp$s;
					continue unsafeToParameterValue;
				} else {
					var $temp$tree = rightBranch,
						$temp$s = s;
					tree = $temp$tree;
					s = $temp$s;
					continue unsafeToParameterValue;
				}
			}
		}
	});
var $ianmackenzie$elm_geometry$ArcLengthParameterization$arcLengthToParameterValue = F2(
	function (_v0, _v1) {
		var s = _v0;
		var tree = _v1;
		return A2(
			$ianmackenzie$elm_geometry$ArcLengthParameterization$unsafeToParameterValue,
			tree,
			A3(
				$elm$core$Basics$clamp,
				0,
				$ianmackenzie$elm_geometry$ArcLengthParameterization$lengthAtEnd(tree),
				s));
	});
var $ianmackenzie$elm_geometry$CubicSpline2d$pointOn = F2(
	function (spline, parameterValue) {
		var p4 = $ianmackenzie$elm_geometry$CubicSpline2d$fourthControlPoint(spline);
		var p3 = $ianmackenzie$elm_geometry$CubicSpline2d$thirdControlPoint(spline);
		var q3 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p3, p4, parameterValue);
		var p2 = $ianmackenzie$elm_geometry$CubicSpline2d$secondControlPoint(spline);
		var q2 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p2, p3, parameterValue);
		var r2 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, q2, q3, parameterValue);
		var p1 = $ianmackenzie$elm_geometry$CubicSpline2d$firstControlPoint(spline);
		var q1 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p1, p2, parameterValue);
		var r1 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, q1, q2, parameterValue);
		return A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, r1, r2, parameterValue);
	});
var $ianmackenzie$elm_geometry$CubicSpline2d$pointAlong = F2(
	function (_v0, distance) {
		var parameterized = _v0;
		return A2(
			$ianmackenzie$elm_geometry$CubicSpline2d$pointOn,
			parameterized.gf,
			A2($ianmackenzie$elm_geometry$ArcLengthParameterization$arcLengthToParameterValue, distance, parameterized.da));
	});
var $ianmackenzie$elm_geometry$EllipticalArc2d$pointAlong = F2(
	function (_v0, distance) {
		var parameterized = _v0;
		return A2(
			$ianmackenzie$elm_geometry$EllipticalArc2d$pointOn,
			parameterized.ge,
			A2($ianmackenzie$elm_geometry$ArcLengthParameterization$arcLengthToParameterValue, distance, parameterized.da));
	});
var $ianmackenzie$elm_geometry$QuadraticSpline2d$pointOn = F2(
	function (spline, parameterValue) {
		var p3 = $ianmackenzie$elm_geometry$QuadraticSpline2d$thirdControlPoint(spline);
		var p2 = $ianmackenzie$elm_geometry$QuadraticSpline2d$secondControlPoint(spline);
		var q2 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p2, p3, parameterValue);
		var p1 = $ianmackenzie$elm_geometry$QuadraticSpline2d$firstControlPoint(spline);
		var q1 = A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, p1, p2, parameterValue);
		return A3($ianmackenzie$elm_geometry$Point2d$interpolateFrom, q1, q2, parameterValue);
	});
var $ianmackenzie$elm_geometry$QuadraticSpline2d$pointAlong = F2(
	function (_v0, distance) {
		var parameterized = _v0;
		return A2(
			$ianmackenzie$elm_geometry$QuadraticSpline2d$pointOn,
			parameterized.gf,
			A2($ianmackenzie$elm_geometry$ArcLengthParameterization$arcLengthToParameterValue, distance, parameterized.da));
	});
var $folkertdev$one_true_path_experiment$Segment$pointAlong = F2(
	function (parameterized, t) {
		var lengthValue = $ianmackenzie$elm_units$Quantity$float(t);
		return A2(
			$ianmackenzie$elm_geometry$Point2d$toTuple,
			$ianmackenzie$elm_units$Quantity$toFloat,
			function () {
				switch (parameterized.$) {
					case 0:
						var lineSegment = parameterized.a;
						return A2(
							$ianmackenzie$elm_geometry$LineSegment2d$interpolate,
							lineSegment,
							t / $ianmackenzie$elm_units$Quantity$toFloat(
								$ianmackenzie$elm_geometry$LineSegment2d$length(lineSegment)));
					case 1:
						var spline = parameterized.a;
						return A2($ianmackenzie$elm_geometry$QuadraticSpline2d$pointAlong, spline, lengthValue);
					case 2:
						var spline = parameterized.a;
						return A2($ianmackenzie$elm_geometry$CubicSpline2d$pointAlong, spline, lengthValue);
					default:
						var arc = parameterized.a;
						return A2($ianmackenzie$elm_geometry$EllipticalArc2d$pointAlong, arc, lengthValue);
				}
			}());
	});
var $folkertdev$one_true_path_experiment$SubPath$pointAlong = F2(
	function (parameterized, t) {
		return A3($folkertdev$one_true_path_experiment$SubPath$fold, $folkertdev$one_true_path_experiment$Segment$pointAlong, parameterized, t);
	});
var $elm_community$typed_svg$TypedSvg$Attributes$startOffset = $elm_community$typed_svg$TypedSvg$Core$attribute('startOffset');
var $elm_community$typed_svg$TypedSvg$textPath = $elm_community$typed_svg$TypedSvg$Core$node('textPath');
var $goyalarchit$elm_dagre$Render$StandardDrawers$edgeLabelDrawer = F5(
	function (lbl, fontSize, orientLabelAlongEdge, edgePathId, curve) {
		if (orientLabelAlongEdge) {
			return A2(
				$elm_community$typed_svg$TypedSvg$text_,
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$textAnchor(2),
						$elm_community$typed_svg$TypedSvg$Attributes$dominantBaseline(8),
						$elm_community$typed_svg$TypedSvg$Attributes$fontSize(
						$elm_community$typed_svg$TypedSvg$Types$Px(fontSize))
					]),
				_List_fromArray(
					[
						A2(
						$elm_community$typed_svg$TypedSvg$textPath,
						_List_fromArray(
							[
								$elm_community$typed_svg$TypedSvg$Attributes$href('#' + edgePathId),
								$elm_community$typed_svg$TypedSvg$Attributes$startOffset('50%')
							]),
						_List_fromArray(
							[
								$elm_community$typed_svg$TypedSvg$Core$text(lbl)
							]))
					]));
		} else {
			var _v0 = A3(
				$elm$core$Tuple$mapBoth,
				function (a) {
					return $elm$core$Basics$isNaN(a) ? (-10) : a;
				},
				function (a) {
					return $elm$core$Basics$isNaN(a) ? (-10) : a;
				},
				function () {
					var _v1 = A2(
						$folkertdev$one_true_path_experiment$SubPath$pointAlong,
						curve,
						$folkertdev$one_true_path_experiment$SubPath$arcLength(curve) / 2);
					if (!_v1.$) {
						var m = _v1.a;
						return m;
					} else {
						return _Utils_Tuple2(-10, -10);
					}
				}());
			var midX = _v0.a;
			var midY = _v0.b;
			return A3(
				$goyalarchit$elm_dagre$Render$StandardDrawers$centeredText,
				lbl,
				fontSize,
				_Utils_Tuple2(midX, midY));
		}
	});
var $elm_community$typed_svg$TypedSvg$g = $elm_community$typed_svg$TypedSvg$Core$node('g');
var $folkertdev$one_true_path_experiment$Curve$linear = function (points) {
	if (!points.b) {
		return $folkertdev$one_true_path_experiment$SubPath$empty;
	} else {
		var x = points.a;
		var xs = points.b;
		return A2(
			$folkertdev$one_true_path_experiment$SubPath$with,
			$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(x),
			_List_fromArray(
				[
					$folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(xs)
				]));
	}
};
var $goyalarchit$elm_dagre$Render$StandardDrawers$tolerance = 1.0;
var $goyalarchit$elm_dagre$Render$StandardDrawers$getAdjustedSrcAndTarget = F3(
	function (edgeAtrib, srcMargin, tgtMargin) {
		var pts = $elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[edgeAtrib.ej]),
					edgeAtrib.gB,
					_List_fromArray(
					[edgeAtrib.bW])
				]));
		var src_to_next = A2($elm$core$List$take, 2, pts);
		var srcSeg = A2(
			$folkertdev$one_true_path_experiment$SubPath$arcLengthParameterized,
			$goyalarchit$elm_dagre$Render$StandardDrawers$tolerance,
			$folkertdev$one_true_path_experiment$Curve$linear(src_to_next));
		var target_from_previous = A2(
			$elm$core$List$drop,
			$elm$core$List$length(pts) - 2,
			pts);
		var tgtSeg = A2(
			$folkertdev$one_true_path_experiment$SubPath$arcLengthParameterized,
			$goyalarchit$elm_dagre$Render$StandardDrawers$tolerance,
			$folkertdev$one_true_path_experiment$Curve$linear(target_from_previous));
		var _v0 = edgeAtrib.is;
		var tw = _v0.a;
		var th = _v0.b;
		var tgtDim = ($elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, tw, 2) + A2($elm$core$Basics$pow, th, 2)) / 2) + tgtMargin;
		var final_tgt = A2(
			$folkertdev$one_true_path_experiment$SubPath$pointAlong,
			tgtSeg,
			$folkertdev$one_true_path_experiment$SubPath$arcLength(tgtSeg) - tgtDim);
		var _v1 = edgeAtrib.im;
		var sw = _v1.a;
		var sh = _v1.b;
		var srcDim = ($elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, sw, 2) + A2($elm$core$Basics$pow, sh, 2)) / 2) + srcMargin;
		var final_src = A2($folkertdev$one_true_path_experiment$SubPath$pointAlong, srcSeg, srcDim);
		if (_Utils_eq(edgeAtrib.gN.c$, edgeAtrib.gN.dn)) {
			return pts;
		} else {
			var _v2 = _Utils_Tuple2(final_src, final_tgt);
			if (!_v2.a.$) {
				if (!_v2.b.$) {
					var s = _v2.a.a;
					var t = _v2.b.a;
					return $elm$core$List$concat(
						_List_fromArray(
							[
								_List_fromArray(
								[s]),
								edgeAtrib.gB,
								_List_fromArray(
								[t])
							]));
				} else {
					var s = _v2.a.a;
					var _v3 = _v2.b;
					return $elm$core$List$concat(
						_List_fromArray(
							[
								_List_fromArray(
								[s]),
								edgeAtrib.gB,
								_List_fromArray(
								[edgeAtrib.bW])
							]));
				}
			} else {
				if (!_v2.b.$) {
					var _v4 = _v2.a;
					var t = _v2.b.a;
					return $elm$core$List$concat(
						_List_fromArray(
							[
								_List_fromArray(
								[edgeAtrib.ej]),
								edgeAtrib.gB,
								_List_fromArray(
								[t])
							]));
				} else {
					var _v5 = _v2.a;
					var _v6 = _v2.b;
					return pts;
				}
			}
		}
	});
var $elm_community$typed_svg$TypedSvg$Attributes$markerEnd = $elm_community$typed_svg$TypedSvg$Core$attribute('marker-end');
var $elm_community$typed_svg$TypedSvg$Events$on = $elm$virtual_dom$VirtualDom$on;
var $elm_community$typed_svg$TypedSvg$Events$simpleOn = function (name) {
	return function (msg) {
		return A2(
			$elm_community$typed_svg$TypedSvg$Events$on,
			name,
			$elm$virtual_dom$VirtualDom$Normal(
				$elm$json$Json$Decode$succeed(msg)));
	};
};
var $elm_community$typed_svg$TypedSvg$Events$onClick = $elm_community$typed_svg$TypedSvg$Events$simpleOn('click');
var $elm_community$typed_svg$TypedSvg$path = $elm_community$typed_svg$TypedSvg$Core$node('path');
var $elm_community$typed_svg$TypedSvg$Attributes$strokeDasharray = $elm_community$typed_svg$TypedSvg$Core$attribute('stroke-dasharray');
var $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'stroke-width',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$style = function (value) {
	return A2($elm_community$typed_svg$TypedSvg$Core$attribute, 'style', value);
};
var $elm_community$typed_svg$TypedSvg$title = $elm_community$typed_svg$TypedSvg$Core$node('title');
var $folkertdev$elm_deque$Internal$empty = {aq: _List_Nil, au: _List_Nil, ag: 0, ah: 0};
var $folkertdev$elm_deque$Deque$empty = $folkertdev$elm_deque$Internal$empty;
var $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath = {$: 4};
var $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc = function (a) {
	return {$: 3, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo = function (a) {
	return {$: 2, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$merge = F2(
	function (instruction1, instruction2) {
		var _v0 = _Utils_Tuple2(instruction1, instruction2);
		_v0$5:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					if (!_v0.b.$) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 1:
					if (_v0.b.$ === 1) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 2:
					if (_v0.b.$ === 2) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 3:
					if (_v0.b.$ === 3) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				default:
					if (_v0.b.$ === 4) {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return $elm$core$Result$Ok($folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath);
					} else {
						break _v0$5;
					}
			}
		}
		return $elm$core$Result$Err(
			_Utils_Tuple2(instruction1, instruction2));
	});
var $folkertdev$one_true_path_experiment$SubPath$compressHelper = function (drawtos) {
	var folder = F2(
		function (instruction, _v3) {
			var previous = _v3.a;
			var accum = _v3.b;
			var _v2 = A2($folkertdev$one_true_path_experiment$LowLevel$Command$merge, previous, instruction);
			if (!_v2.$) {
				var merged = _v2.a;
				return _Utils_Tuple2(merged, accum);
			} else {
				return _Utils_Tuple2(
					instruction,
					A2($elm$core$List$cons, previous, accum));
			}
		});
	var _v0 = $folkertdev$elm_deque$Deque$toList(drawtos);
	if (!_v0.b) {
		return $folkertdev$elm_deque$Deque$empty;
	} else {
		var first = _v0.a;
		var rest = _v0.b;
		return $folkertdev$elm_deque$Deque$fromList(
			$elm$core$List$reverse(
				function (_v1) {
					var a = _v1.a;
					var b = _v1.b;
					return A2($elm$core$List$cons, a, b);
				}(
					A3(
						$elm$core$List$foldl,
						folder,
						_Utils_Tuple2(first, _List_Nil),
						rest))));
	}
};
var $folkertdev$one_true_path_experiment$SubPath$compress = function (subpath) {
	if (subpath.$ === 1) {
		return $folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var data = subpath.a;
		return $folkertdev$one_true_path_experiment$SubPath$SubPath(
			_Utils_update(
				data,
				{
					gL: $folkertdev$one_true_path_experiment$SubPath$compressHelper(data.gL)
				}));
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$DecimalPlaces = $elm$core$Basics$identity;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$SubPath$defaultConfig = {dM: $elm$core$Maybe$Nothing, d0: false};
var $folkertdev$one_true_path_experiment$SubPath$optionFolder = F2(
	function (option, config) {
		if (!option.$) {
			var n = option.a;
			return _Utils_update(
				config,
				{
					dM: $elm$core$Maybe$Just(n)
				});
		} else {
			return _Utils_update(
				config,
				{d0: true});
		}
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute = 1;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath = {$: 8};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo = function (drawto) {
	switch (drawto.$) {
		case 0:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo, 1, coordinates);
		case 1:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo, 1, coordinates);
		case 2:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo, 1, coordinates);
		case 3:
			var _arguments = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc, 1, _arguments);
		default:
			return $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath;
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo = function (_v0) {
	var target = _v0;
	return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo, 1, target);
};
var $folkertdev$one_true_path_experiment$SubPath$toLowLevel = function (subpath) {
	if (subpath.$ === 1) {
		return $elm$core$Maybe$Nothing;
	} else {
		var moveto = subpath.a.hG;
		var drawtos = subpath.a.gL;
		return $elm$core$Maybe$Just(
			{
				gL: A2(
					$elm$core$List$map,
					$folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo,
					$folkertdev$elm_deque$Deque$toList(drawtos)),
				hG: $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo(moveto)
			});
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig = {cZ: $elm$core$String$fromFloat};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo = F2(
	function (n, value) {
		if (!n) {
			return $elm$core$String$fromInt(
				$elm$core$Basics$round(value));
		} else {
			var sign = (value < 0.0) ? '-' : '';
			var exp = A2($elm$core$Basics$pow, 10, n);
			var raised = $elm$core$Basics$abs(
				$elm$core$Basics$round(value * exp));
			var decimals = raised % exp;
			return (!decimals) ? _Utils_ap(
				sign,
				$elm$core$String$fromInt((raised / exp) | 0)) : (sign + ($elm$core$String$fromInt((raised / exp) | 0) + ('.' + $elm$core$String$fromInt(decimals))));
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder = F2(
	function (option, config) {
		var n = option;
		return _Utils_update(
			config,
			{
				cZ: $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo(n)
			});
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions = A2($elm$core$List$foldl, $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder, $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig);
var $folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty = function (command) {
	switch (command.$) {
		case 0:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 1:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 2:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 3:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 4:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 5:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 6:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 7:
			var mode = command.a;
			var _arguments = command.b;
			return $elm$core$List$isEmpty(_arguments);
		default:
			return false;
	}
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Char$toLower = _Char_toLower;
var $elm$core$Char$toUpper = _Char_toUpper;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter = F2(
	function (mode, character) {
		if (mode === 1) {
			return $elm$core$String$fromChar(
				$elm$core$Char$toUpper(character));
		} else {
			return $elm$core$String$fromChar(
				$elm$core$Char$toLower(character));
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate = F2(
	function (config, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return config.cZ(x) + (',' + config.cZ(y));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2 = F2(
	function (config, _v0) {
		var c1 = _v0.a;
		var c2 = _v0.b;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3 = F2(
	function (config, _v0) {
		var c1 = _v0.a;
		var c2 = _v0.b;
		var c3 = _v0.c;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + (A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c3))));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument = F2(
	function (config, _v0) {
		var radii = _v0.bq;
		var xAxisRotate = _v0.a9;
		var arcFlag = _v0.eD;
		var direction = _v0.eQ;
		var target = _v0.bW;
		var _v1 = $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
			_Utils_Tuple2(arcFlag, direction));
		var arc = _v1.a;
		var sweep = _v1.b;
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, radii),
					$elm$core$String$fromFloat(xAxisRotate),
					$elm$core$String$fromInt(arc),
					$elm$core$String$fromInt(sweep),
					A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, target)
				]));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo = F2(
	function (config, command) {
		if ($folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty(command)) {
			return '';
		} else {
			switch (command.$) {
				case 0:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'L'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 1:
					var mode = command.a;
					var coordinates = command.b;
					return $elm$core$List$isEmpty(coordinates) ? '' : _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'H'),
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
				case 2:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'V'),
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
				case 3:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'C'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3(config),
								coordinates)));
				case 4:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'S'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 5:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'Q'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 6:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'T'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 7:
					var mode = command.a;
					var _arguments = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'A'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument(config),
								_arguments)));
				default:
					return 'Z';
			}
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo = F2(
	function (config, _v0) {
		var mode = _v0.a;
		var coordinate = _v0.b;
		if (mode === 1) {
			return 'M' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		} else {
			return 'm' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath = F2(
	function (config, _v0) {
		var moveto = _v0.hG;
		var drawtos = _v0.gL;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo, config, moveto) + (' ' + A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo(config),
				drawtos)));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith = F2(
	function (options, subpaths) {
		var config = $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions(options);
		return A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath(config),
				subpaths));
	});
var $folkertdev$one_true_path_experiment$SubPath$toStringWith = F2(
	function (options, subpath) {
		var config = A3($elm$core$List$foldl, $folkertdev$one_true_path_experiment$SubPath$optionFolder, $folkertdev$one_true_path_experiment$SubPath$defaultConfig, options);
		var lowLevelOptions = function () {
			var _v0 = config.dM;
			if (_v0.$ === 1) {
				return _List_Nil;
			} else {
				var n = _v0.a;
				return _List_fromArray(
					[
						$folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces(n)
					]);
			}
		}();
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeL,
					$folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith(lowLevelOptions),
					$elm$core$List$singleton),
				$folkertdev$one_true_path_experiment$SubPath$toLowLevel(
					(config.d0 ? $folkertdev$one_true_path_experiment$SubPath$compress : $elm$core$Basics$identity)(subpath))));
	});
var $folkertdev$one_true_path_experiment$SubPath$toString = function (subpath) {
	return A2($folkertdev$one_true_path_experiment$SubPath$toStringWith, _List_Nil, subpath);
};
var $goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawEdge = F2(
	function (edits, edgeAtrib) {
		var edge = edgeAtrib.gN;
		var edgeId = 'edge-' + ($elm$core$String$fromInt(edge.c$) + ('-' + $elm$core$String$fromInt(edge.dn)));
		var edgePathId = edgeId + '-path';
		var config = A3(
			$elm$core$List$foldl,
			F2(
				function (f, a) {
					return f(a);
				}),
			$goyalarchit$elm_dagre$Render$StandardDrawers$defEdgeDrawerConfig,
			edits);
		var curve = function () {
			var pts = A3($goyalarchit$elm_dagre$Render$StandardDrawers$getAdjustedSrcAndTarget, edgeAtrib, 1.5, 1.5);
			var _v1 = config.hi;
			if (_v1 === 1) {
				return A2($folkertdev$one_true_path_experiment$Curve$catmullRom, config.b2, pts);
			} else {
				return $folkertdev$one_true_path_experiment$Curve$linear(pts);
			}
		}();
		var parameterizedCurve = A2($folkertdev$one_true_path_experiment$SubPath$arcLengthParameterized, $goyalarchit$elm_dagre$Render$StandardDrawers$tolerance, curve);
		var gAtrib = function () {
			var _v0 = config.d5;
			if (_v0.$ === 1) {
				return _List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$id(edgeId),
						$elm_community$typed_svg$TypedSvg$Attributes$class(
						_List_fromArray(
							['edge'])),
						$elm_community$typed_svg$TypedSvg$Attributes$style(
						config.em(edge))
					]);
			} else {
				var f = _v0.a;
				return _List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$id(edgeId),
						$elm_community$typed_svg$TypedSvg$Attributes$class(
						_List_fromArray(
							['edge'])),
						$elm_community$typed_svg$TypedSvg$Attributes$style(
						config.em(edge)),
						$elm_community$typed_svg$TypedSvg$Events$onClick(
						f(edge)),
						$elm_community$typed_svg$TypedSvg$Attributes$cursor($elm_community$typed_svg$TypedSvg$Types$CursorPointer)
					]);
			}
		}();
		return A2(
			$elm_community$typed_svg$TypedSvg$g,
			gAtrib,
			_List_fromArray(
				[
					A2(
					$goyalarchit$elm_dagre$Render$StandardDrawers$arrowHeadDef,
					config.eE,
					config.Y(edge)),
					A2(
					$elm_community$typed_svg$TypedSvg$title,
					_List_Nil,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Core$text(
							config.lI(edge))
						])),
					A2(
					$elm_community$typed_svg$TypedSvg$path,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$id(edgePathId),
							$elm_community$typed_svg$TypedSvg$Attributes$d(
							$folkertdev$one_true_path_experiment$SubPath$toString(curve)),
							$elm_community$typed_svg$TypedSvg$Attributes$stroke(
							$elm_community$typed_svg$TypedSvg$Types$Paint(
								config.Y(edge))),
							$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
							$elm_community$typed_svg$TypedSvg$Types$Px(
								config.el(edge))),
							$elm_community$typed_svg$TypedSvg$Attributes$strokeDasharray(
							config.ak(edge)),
							$elm_community$typed_svg$TypedSvg$Attributes$fill($elm_community$typed_svg$TypedSvg$Types$PaintNone),
							$elm_community$typed_svg$TypedSvg$Attributes$markerEnd(
							$goyalarchit$elm_dagre$Render$StandardDrawers$arrowHeadId(config.eE))
						]),
					_List_Nil),
					A5(
					$goyalarchit$elm_dagre$Render$StandardDrawers$edgeLabelDrawer,
					config.ar(edge),
					config.cd,
					config.hP,
					edgePathId,
					parameterizedCurve)
				]));
	});
var $author$project$Main$drawEdge = F2(
	function (e, layout) {
		var from = e.c$;
		var to = e.dn;
		var targetCoords = A2($author$project$Main$getEntity, to, layout);
		var sourceCoords = A2($author$project$Main$getEntity, from, layout);
		var _v0 = _Utils_Tuple2(sourceCoords, targetCoords);
		if ((!_v0.a.$) && (!_v0.b.$)) {
			var source = _v0.a.a;
			var target = _v0.b.a;
			return A2(
				$goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawEdge,
				_List_fromArray(
					[
						$goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$arrowHead(2),
						$goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$linkStyle(1),
						$goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$strokeWidth(
						$elm$core$Basics$always(0.5)),
						$goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$strokeColor(
						$elm$core$Basics$always($avh4$elm_color$Color$black))
					]),
				{
					gB: _List_Nil,
					gN: e,
					ej: _Utils_Tuple2(source.z, source.R),
					im: _Utils_Tuple2($author$project$Main$nodeSize, $author$project$Main$nodeSize),
					bW: _Utils_Tuple2(target.z, target.R),
					is: _Utils_Tuple2($author$project$Main$nodeSize, $author$project$Main$nodeSize)
				});
		} else {
			return A2(
				$elm_community$typed_svg$TypedSvg$text_,
				_List_Nil,
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Core$text('failed to draw edge')
					]));
		}
	});
var $elm_community$typed_svg$TypedSvg$Types$DominantBaselineMiddle = 9;
var $elm_community$typed_svg$TypedSvg$Types$Rotate = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $elm_community$typed_svg$TypedSvg$Types$AnchorEnd = 3;
var $elm_community$typed_svg$TypedSvg$Types$AnchorStart = 1;
var $elm_explorations$linear_algebra$Math$Vector2$add = _MJS_v2add;
var $elm_community$basics_extra$Basics$Extra$atLeast = $elm$core$Basics$max;
var $elm_explorations$linear_algebra$Math$Vector2$direction = _MJS_v2direction;
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $author$project$Main$edgeDirection = F2(
	function (_v0, layout) {
		var from = _v0.c$;
		var to = _v0.dn;
		return A3(
			$elm$core$Maybe$map2,
			F2(
				function (u, v) {
					var targetVec = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, v.z, v.R);
					var sourceVec = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, u.z, u.R);
					return A2($elm_explorations$linear_algebra$Math$Vector2$direction, targetVec, sourceVec);
				}),
			A2($author$project$Main$getEntity, from, layout),
			A2($author$project$Main$getEntity, to, layout));
	});
var $author$project$Main$getIncomingEdges = F2(
	function (id, layout) {
		var _v0 = A2($elm_community$graph$Graph$get, id, layout);
		if (!_v0.$) {
			var incoming = _v0.a.g4;
			return A2(
				$elm$core$List$map,
				function (_v1) {
					var p = _v1.a;
					var side = _v1.b;
					return {c$: p, ar: side, dn: id};
				},
				$elm_community$intdict$IntDict$toList(incoming));
		} else {
			return _List_Nil;
		}
	});
var $elm_explorations$linear_algebra$Math$Vector2$scale = _MJS_v2scale;
var $elm_explorations$linear_algebra$Math$Vector2$toRecord = _MJS_v2toRecord;
var $author$project$Main$avgDirOfIncomingEdges = F2(
	function (id, layout) {
		var directions = A2(
			$elm$core$List$filterMap,
			function (e) {
				return A2($author$project$Main$edgeDirection, e, layout);
			},
			A2($author$project$Main$getIncomingEdges, id, layout));
		var numEdges = A2(
			$elm_community$basics_extra$Basics$Extra$atLeast,
			1,
			$elm$core$List$length(directions));
		var avgDir = A2(
			$elm_explorations$linear_algebra$Math$Vector2$scale,
			1 / numEdges,
			A3(
				$elm$core$List$foldl,
				$elm_explorations$linear_algebra$Math$Vector2$add,
				A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
				directions));
		return $elm_explorations$linear_algebra$Math$Vector2$toRecord(avgDir);
	});
var $author$project$Main$nodeData = A2(
	$elm$core$Basics$composeR,
	function ($) {
		return $.ar;
	},
	function ($) {
		return $.iz;
	});
var $author$project$Main$nodeLabelAnchor = F2(
	function (node, layout) {
		var numIncomingEdges = $elm$core$List$length(
			A2($author$project$Main$getIncomingEdges, node.cg, layout));
		var dir = A2($author$project$Main$avgDirOfIncomingEdges, node.cg, layout);
		var pointingLeft = dir.z < 0;
		var _v0 = $author$project$Main$nodeData(node);
		if (_v0.$ === 1) {
			return (!numIncomingEdges) ? 2 : (pointingLeft ? 3 : 1);
		} else {
			return 2;
		}
	});
var $elm$core$Basics$atan2 = _Basics_atan2;
var $author$project$Main$nodeLabelAngle = F2(
	function (node, layout) {
		var dir = A2($author$project$Main$avgDirOfIncomingEdges, node.cg, layout);
		var pointingLeft = dir.z < 0;
		var angle = A2($elm$core$Basics$atan2, dir.R, dir.z);
		var _v0 = $author$project$Main$nodeData(node);
		if (_v0.$ === 1) {
			return pointingLeft ? (angle + $elm$core$Basics$pi) : angle;
		} else {
			return 0;
		}
	});
var $author$project$Main$nodeLabelString = function (node) {
	var _v0 = $author$project$Main$nodeData(node);
	switch (_v0.$) {
		case 1:
			var name = _v0.a.cn;
			return name;
		case 0:
			return '@';
		case 3:
			return '■';
		default:
			var x = _v0.a;
			return $elm$core$String$fromInt(x);
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$x = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $author$project$Main$drawNode = F2(
	function (node, layout) {
		var labelRot = (A2($author$project$Main$nodeLabelAngle, node, layout) * 180) / $elm$core$Basics$pi;
		var _v0 = $author$project$Main$nodeToEntity.eY(node);
		var x = _v0.z;
		var y = _v0.R;
		return A2(
			$elm_community$typed_svg$TypedSvg$text_,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$x(
					$elm_community$typed_svg$TypedSvg$Types$Px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$y(
					$elm_community$typed_svg$TypedSvg$Types$Px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$fontSize(
					$elm_community$typed_svg$TypedSvg$Types$Px($author$project$Main$nodeSize)),
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A3($elm_community$typed_svg$TypedSvg$Types$Rotate, labelRot, x, y)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$textAnchor(
					A2($author$project$Main$nodeLabelAnchor, node, layout)),
					$elm_community$typed_svg$TypedSvg$Attributes$dominantBaseline(9)
				]),
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Core$text(
					$author$project$Main$nodeLabelString(node))
				]));
	});
var $author$project$Main$drawGraph = function (layout) {
	var nodes = A2(
		$elm$core$List$map,
		A2($elm_community$basics_extra$Basics$Extra$flip, $author$project$Main$drawNode, layout),
		$elm_community$graph$Graph$nodes(layout));
	var edges = A2(
		$elm$core$List$map,
		A2($elm_community$basics_extra$Basics$Extra$flip, $author$project$Main$drawEdge, layout),
		$elm_community$graph$Graph$edges(layout));
	return A2(
		$elm_community$typed_svg$TypedSvg$g,
		_List_Nil,
		_Utils_ap(edges, nodes));
};
var $elm_community$typed_svg$TypedSvg$Attributes$height = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'height',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$rect = $elm_community$typed_svg$TypedSvg$Core$node('rect');
var $elm_community$typed_svg$TypedSvg$Attributes$width = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'width',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $author$project$Main$drawCell = F4(
	function (x, y, w, h) {
		return A2(
			$elm_community$typed_svg$TypedSvg$rect,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$stroke(
					$elm_community$typed_svg$TypedSvg$Types$Paint($avh4$elm_color$Color$black)),
					$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
					$elm_community$typed_svg$TypedSvg$Types$Px(0.25)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill($elm_community$typed_svg$TypedSvg$Types$PaintNone),
					$elm_community$typed_svg$TypedSvg$Attributes$x(
					$elm_community$typed_svg$TypedSvg$Types$Px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$y(
					$elm_community$typed_svg$TypedSvg$Types$Px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$width(
					$elm_community$typed_svg$TypedSvg$Types$Px(w)),
					$elm_community$typed_svg$TypedSvg$Attributes$height(
					$elm_community$typed_svg$TypedSvg$Types$Px(h))
				]),
			_List_Nil);
	});
var $goyalarchit$elm_dagre$Render$StandardDrawers$Types$Triangle = 1;
var $avh4$elm_color$Color$blue = A4($avh4$elm_color$Color$RgbaSpace, 52 / 255, 101 / 255, 164 / 255, 1.0);
var $author$project$Main$drawPointer = function (_v0) {
	var source = _v0.ej;
	var target = _v0.bW;
	var agletLength = _v0.gp;
	var dummyEdge = {c$: 0, ar: 0, dn: 1};
	return A2(
		$goyalarchit$elm_dagre$Render$StandardDrawers$svgDrawEdge,
		_List_fromArray(
			[
				$goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$arrowHead(1),
				$goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$linkStyle(1),
				$goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$strokeWidth(
				$elm$core$Basics$always(0.2)),
				$goyalarchit$elm_dagre$Render$StandardDrawers$Attributes$strokeColor(
				$elm$core$Basics$always($avh4$elm_color$Color$blue))
			]),
		{
			gB: _List_fromArray(
				[
					_Utils_Tuple2(source.a + agletLength, source.b)
				]),
			gN: dummyEdge,
			ej: source,
			im: _Utils_Tuple2(0, 0),
			bW: target,
			is: _Utils_Tuple2($author$project$Main$nodeSize, $author$project$Main$nodeSize)
		});
};
var $author$project$Main$drawStack = F3(
	function (machine, layout, cellWidth) {
		var cellHeight = cellWidth * 0.5;
		var cells = $elm$core$List$concat(
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, nodeid) {
						var _v0 = A2($author$project$Main$getEntity, nodeid, layout);
						if (!_v0.$) {
							var x = _v0.a.z;
							var y = _v0.a.R;
							return _List_fromArray(
								[
									A4($author$project$Main$drawCell, 0, cellHeight * i, cellWidth, cellHeight),
									$author$project$Main$drawPointer(
									{
										gp: 5,
										ej: _Utils_Tuple2(0 + (cellWidth / 2), (cellHeight * i) + (cellHeight / 2)),
										bW: _Utils_Tuple2(x, y)
									})
								]);
						} else {
							return _List_fromArray(
								[
									A2(
									$elm_community$typed_svg$TypedSvg$text_,
									_List_Nil,
									_List_fromArray(
										[
											$elm_community$typed_svg$TypedSvg$Core$text('Failure drawing cell')
										]))
								]);
						}
					}),
				$elm$core$List$reverse(
					$author$project$GMachine$getStack(machine))));
		return A2($elm_community$typed_svg$TypedSvg$g, _List_Nil, cells);
	});
var $elm_community$basics_extra$Basics$Extra$atMost = $elm$core$Basics$min;
var $author$project$Main$layoutDimensions = function (layout) {
	var min = A2(
		$elm$core$Basics$composeR,
		$elm$core$List$minimum,
		$elm$core$Maybe$withDefault(0));
	var max = A2(
		$elm$core$Basics$composeR,
		$elm$core$List$maximum,
		$elm$core$Maybe$withDefault(0));
	var entities = $elm_community$graph$Graph$nodes(layout);
	var xvals = A2(
		$elm$core$List$map,
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.ar;
			},
			function ($) {
				return $.z;
			}),
		entities);
	var yvals = A2(
		$elm$core$List$map,
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.ar;
			},
			function ($) {
				return $.z;
			}),
		entities);
	var _v0 = _Utils_Tuple2(
		max(yvals),
		min(yvals));
	var maxY = _v0.a;
	var minY = _v0.b;
	var _v1 = _Utils_Tuple2(
		max(xvals),
		min(xvals));
	var maxX = _v1.a;
	var minX = _v1.b;
	return {bL: (maxY - minY) + $author$project$Main$nodeSize, cI: (maxX - minX) + $author$project$Main$nodeSize};
};
var $elm_community$intdict$IntDict$findMax = function (dict) {
	findMax:
	while (true) {
		switch (dict.$) {
			case 0:
				return $elm$core$Maybe$Nothing;
			case 1:
				var l = dict.a;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(l.ha, l.iz));
			default:
				var i = dict.a;
				var $temp$dict = i.g;
				dict = $temp$dict;
				continue findMax;
		}
	}
};
var $elm_community$intdict$IntDict$findMin = function (dict) {
	findMin:
	while (true) {
		switch (dict.$) {
			case 0:
				return $elm$core$Maybe$Nothing;
			case 1:
				var l = dict.a;
				return $elm$core$Maybe$Just(
					_Utils_Tuple2(l.ha, l.iz));
			default:
				var i = dict.a;
				var $temp$dict = i.f;
				dict = $temp$dict;
				continue findMin;
		}
	}
};
var $elm_community$graph$Graph$nodeIdRange = function (graph) {
	return A2(
		$elm$core$Maybe$andThen,
		function (_v0) {
			var min = _v0.a;
			return A2(
				$elm$core$Maybe$andThen,
				function (_v1) {
					var max = _v1.a;
					return $elm$core$Maybe$Just(
						_Utils_Tuple2(min, max));
				},
				$elm_community$intdict$IntDict$findMax(
					$elm_community$graph$Graph$unGraph(graph)));
		},
		$elm_community$intdict$IntDict$findMin(
			$elm_community$graph$Graph$unGraph(graph)));
};
var $elm_community$graph$Graph$fold = F3(
	function (f, acc, graph) {
		var go = F2(
			function (acc1, graph1) {
				go:
				while (true) {
					var maybeContext = A2(
						$elm$core$Maybe$andThen,
						function (id) {
							return A2($elm_community$graph$Graph$get, id, graph);
						},
						A2(
							$elm$core$Maybe$map,
							$elm$core$Tuple$first,
							$elm_community$graph$Graph$nodeIdRange(graph1)));
					if (!maybeContext.$) {
						var ctx = maybeContext.a;
						var $temp$acc1 = A2(f, ctx, acc1),
							$temp$graph1 = A2($elm_community$graph$Graph$remove, ctx.bm.cg, graph1);
						acc1 = $temp$acc1;
						graph1 = $temp$graph1;
						continue go;
					} else {
						return acc1;
					}
				}
			});
		return A2(go, acc, graph);
	});
var $elm_community$graph$Graph$mapNodes = function (f) {
	return A2(
		$elm_community$graph$Graph$fold,
		function (_v0) {
			var node = _v0.bm;
			var incoming = _v0.g4;
			var outgoing = _v0.fz;
			return $elm_community$graph$Graph$insert(
				{
					g4: incoming,
					bm: {
						cg: node.cg,
						ar: f(node.ar)
					},
					fz: outgoing
				});
		},
		$elm_community$graph$Graph$empty);
};
var $author$project$Main$scaleLayout = F2(
	function (sx, sy) {
		var scale = function (n) {
			return _Utils_update(
				n,
				{z: n.z * sx, R: n.R * sy});
		};
		return $elm_community$graph$Graph$mapNodes(scale);
	});
var $author$project$Main$shrinkToFit = F3(
	function (w, h, layout) {
		var _v0 = $author$project$Main$layoutDimensions(layout);
		var width = _v0.cI;
		var height = _v0.bL;
		var scaleY = A2($elm_community$basics_extra$Basics$Extra$atMost, 1, h / height);
		var scaleX = A2($elm_community$basics_extra$Basics$Extra$atMost, 1, w / width);
		return A3($author$project$Main$scaleLayout, scaleX, scaleY, layout);
	});
var $elm_community$typed_svg$TypedSvg$svg = $elm_community$typed_svg$TypedSvg$Core$node('svg');
var $author$project$Main$translateLayout = F2(
	function (dx, dy) {
		var translate = function (n) {
			return _Utils_update(
				n,
				{z: n.z + dx, R: n.R + dy});
		};
		return $elm_community$graph$Graph$mapNodes(translate);
	});
var $author$project$Main$drawMachine = F2(
	function (machine, layout) {
		var width = 250;
		var stackWidthPct = 0.15;
		var stackWidth = width * stackWidthPct;
		var height = 300;
		var graphWidth = width - stackWidth;
		var layout_ = A3(
			$author$project$Main$translateLayout,
			stackWidth + (graphWidth / 2),
			height / 2,
			A3($author$project$Main$shrinkToFit, graphWidth, height, layout));
		return A2(
			$elm_community$typed_svg$TypedSvg$svg,
			_List_fromArray(
				[
					A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, width, height),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'border', 'solid')
				]),
			_List_fromArray(
				[
					$author$project$Main$drawGraph(layout_),
					A3($author$project$Main$drawStack, machine, layout_, stackWidth)
				]));
	});
var $author$project$Main$viewMachine = function (_v0) {
	var machine = _v0.c3;
	var layout = _v0.as;
	return $mdgriffith$elm_ui$Element$html(
		A2($author$project$Main$drawMachine, machine, layout));
};
var $author$project$Main$viewProgram = F2(
	function (viewport, program) {
		switch (program.$) {
			case 1:
				var _v1 = program.a;
				var machineView = _v1.a;
				var code = A2($elm$core$Basics$composeR, $author$project$Main$accessGMachine.eY, $author$project$GMachine$getCodePtr)(machineView);
				return A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[$author$project$Main$fillHeight, $author$project$Main$fillWidth]),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$author$project$Main$fillHeight,
									$mdgriffith$elm_ui$Element$width(
									$mdgriffith$elm_ui$Element$fillPortion(2))
								]),
							$author$project$Main$viewCode(code)),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									$mdgriffith$elm_ui$Element$fillPortion(5)),
									$mdgriffith$elm_ui$Element$height(
									A2($mdgriffith$elm_ui$Element$maximum, viewport.bL, $mdgriffith$elm_ui$Element$fill))
								]),
							$author$project$Main$viewMachine(machineView))
						]));
			case 2:
				var err = program.a;
				return $mdgriffith$elm_ui$Element$text('compilation error');
			default:
				return $mdgriffith$elm_ui$Element$text('Write a program on the left window and hit compile');
		}
	});
var $author$project$Main$view = function (_v0) {
	var sourceCode = _v0.dh;
	var program = _v0.db;
	var viewport = _v0.dw;
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$author$project$Main$fillWidth,
				$author$project$Main$fillHeight,
				$mdgriffith$elm_ui$Element$Font$family(
				_List_fromArray(
					[$mdgriffith$elm_ui$Element$Font$monospace]))
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width(
						$mdgriffith$elm_ui$Element$fillPortion(2)),
						$author$project$Main$fillHeight
					]),
				_List_fromArray(
					[
						$author$project$Main$sourceCodeTextArea(sourceCode),
						A2(
						$mdgriffith$elm_ui$Element$row,
						_List_Nil,
						_List_fromArray(
							[$author$project$Main$compileButton, $author$project$Main$stepBackButton, $author$project$Main$stepForwardButton]))
					])),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width(
						$mdgriffith$elm_ui$Element$fillPortion(5)),
						$author$project$Main$fillHeight
					]),
				A2($author$project$Main$viewProgram, viewport, program))
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		j4: function (_v0) {
			return $author$project$Main$init;
		},
		lo: $author$project$Main$subscriptions,
		lU: $author$project$Main$update,
		lW: A2(
			$elm$core$Basics$composeL,
			$mdgriffith$elm_ui$Element$layout(_List_Nil),
			$author$project$Main$view)
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));