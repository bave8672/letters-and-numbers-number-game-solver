'use strict';

var solve = function solve(target) {
    return function (nums) {
        var ans = {};
        var best = 0;
        var bestExpr = '';
        var n = 0;
        var ops = osr(['+', '-', '*', '/'], nums.length - 1);
        var ords = osnr(nums);
        ords.forEach(function (numbers) {
            return ops.forEach(function (operations) {
                var expr = '' + numbers[0];
                var res = numbers[0];
                operations.forEach(function (op, i) {
                    expr += (op + numbers[i + 1]);
                    res = eval('' + res + op + numbers[i + 1]);
                    if (Math.round(res) !== res) {
                        return;
                    }
                    // console.log(expr, res);
                    if (res === target && !ans[expr]) {
                        ans[expr] = true;
                        console.log(expr);
                        n++;
                    } else {
                        if (Math.abs(res - target) <
                            Math.abs(res - best)
                        ) {
                            best = res;
                            bestExpr = expr;
                        }
                    }
                });
            });
        });
        console.log('Total:', n);
        console.log('Best:', bestExpr, best);
    };
};

// Ordered Selections with Repetition
var osr = function osr(els, n) {
    var res = els.map(function (el) {
        return [el];
    });
    var l = res.length;

    var _loop = function _loop(i) {
        var newRes = [];
        res.forEach(function (arr) {
            return els.forEach(function (el) {
                return newRes.push(arr.concat([el]));
            });
        });
        res = res.concat(newRes);
    };

    for (var i = 1; i < n; i++) {
        _loop(i);
    }
    return res;
};

// Ordered selections with No Repetition
var osnr = function osnr(inputArr) {
    var result = [];

    var permute = function permute(arr) {
        var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (arr.length === 0) {
            result.push(m);
        } else {
            for (var i = 0; i < arr.length; i++) {
                var curr = arr.slice();
                var next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };

    permute(inputArr);

    return result;
};

var main = function() {
    var target = Number(process.argv[2]);
    var nums = process.argv.slice(3).map(Number);
    if (target != null && 
        nums != null && 
        nums.length
    ) {
        console.log('Target:', target, 'Numbers:', nums);
        solve(target)(nums);
    } else {
        console.error('Error: Invalid input');
    }
}

main();