import * as util from "../../util";

test("map constructor", () => {
    const result = util.transpileAndExecute(`let mymap = new Map(); return mymap.size;`);

    expect(result).toBe(0);
});

test("map iterable constructor", () => {
    const result = util.transpileAndExecute(
        `let mymap = new Map([["a", "c"],["b", "d"]]);
         return mymap.has("a") && mymap.has("b");`
    );

    expect(result).toBe(true);
});

test("map iterable constructor map", () => {
    const result = util.transpileAndExecute(`
        let mymap = new Map(new Map([["a", "c"],["b", "d"]]));
        return mymap.has("a") && mymap.has("b");
    `);

    expect(result).toBe(true);
});

test("map clear", () => {
    const mapTS = `let mymap = new Map([["a", "c"],["b", "d"]]); mymap.clear();`;
    const size = util.transpileAndExecute(mapTS + `return mymap.size;`);
    expect(size).toBe(0);

    const contains = util.transpileAndExecute(mapTS + `return !mymap.has("a") && !mymap.has("b");`);
    expect(contains).toBe(true);
});

test("map delete", () => {
    const mapTS = `let mymap = new Map([["a", "c"],["b", "d"]]); mymap.delete("a");`;
    const contains = util.transpileAndExecute(mapTS + `return mymap.has("b") && !mymap.has("a");`);
    expect(contains).toBe(true);
});

test("map entries", () => {
    const result = util.transpileAndExecute(
        `let mymap = new Map([[5, 2],[6, 3],[7, 4]]);
        let count = 0;
        for (var [key, value] of mymap.entries()) { count += key + value; }
        return count;`
    );
    expect(result).toBe(27);
});

test("map foreach", () => {
    const result = util.transpileAndExecute(
        `let mymap = new Map([["a", 2],["b", 3],["c", 4]]);
        let count = 0;
        mymap.forEach(i => count += i);
        return count;`
    );

    expect(result).toBe(9);
});

test("map foreach keys", () => {
    const result = util.transpileAndExecute(
        `let mymap = new Map([[5, 2],[6, 3],[7, 4]]);
        let count = 0;
        mymap.forEach((value, key) => { count += key; });
        return count;`
    );

    expect(result).toBe(18);
});

test("map get", () => {
    const result = util.transpileAndExecute(`let mymap = new Map([["a", "c"],["b", "d"]]); return mymap.get("a");`);

    expect(result).toBe("c");
});

test("map get missing", () => {
    const result = util.transpileAndExecute(`let mymap = new Map([["a", "c"],["b", "d"]]); return mymap.get("c");`);
    expect(result).toBe(undefined);
});

test("map has", () => {
    const contains = util.transpileAndExecute(`let mymap = new Map([["a", "c"]]); return mymap.has("a");`);
    expect(contains).toBe(true);
});

test("map has false", () => {
    const contains = util.transpileAndExecute(`let mymap = new Map(); return mymap.has("a");`);
    expect(contains).toBe(false);
});

test("map has null", () => {
    const contains = util.transpileAndExecute(`let mymap = new Map([["a", "c"]]); return mymap.has(null);`);
    expect(contains).toBe(false);
});

test("map keys", () => {
    const result = util.transpileAndExecute(
        `let mymap = new Map([[5, 2],[6, 3],[7, 4]]);
        let count = 0;
        for (var key of mymap.keys()) { count += key; }
        return count;`
    );

    expect(result).toBe(18);
});

test("map set", () => {
    const mapTS = `let mymap = new Map(); mymap.set("a", 5);`;
    const has = util.transpileAndExecute(mapTS + `return mymap.has("a");`);
    expect(has).toBe(true);

    const value = util.transpileAndExecute(mapTS + `return mymap.get("a")`);
    expect(value).toBe(5);
});

test("map values", () => {
    const result = util.transpileAndExecute(
        `let mymap = new Map([[5, 2],[6, 3],[7, 4]]);
        let count = 0;
        for (var value of mymap.values()) { count += value; }
        return count;`
    );

    expect(result).toBe(9);
});

test("map size", () => {
    expect(util.transpileAndExecute(`let m = new Map(); return m.size;`)).toBe(0);
    expect(util.transpileAndExecute(`let m = new Map(); m.set(1,3); return m.size;`)).toBe(1);
    expect(util.transpileAndExecute(`let m = new Map([[1,2],[3,4]]); return m.size;`)).toBe(2);
    expect(util.transpileAndExecute(`let m = new Map([[1,2],[3,4]]); m.clear(); return m.size;`)).toBe(0);
    expect(util.transpileAndExecute(`let m = new Map([[1,2],[3,4]]); m.delete(3); return m.size;`)).toBe(1);
});
