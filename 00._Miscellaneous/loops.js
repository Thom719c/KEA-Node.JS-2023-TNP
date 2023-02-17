const rocks = [
    { name: "Pet Rock", age: 2 },
    { name: "Led Zeppelin", age: 55 },
    { name: "Dwayne Johnson", age: 50 },
    { name: "Neptune", age: 100_000_000 }
];

// Loop method: map, filter, find, reduce, sort, forEach


// assignment make all the rocks one year older and save the value to rocksAgedOneYear

/* This mutate rocks
const rocksAgedOneYear = rocks.map(rock => {
    ++rock.age;
    return rock;
}); */

/* const rocksAgedOneYear = rocks.map(rock => {
    return { ...rock, age: ++rock.age };
}); */

const rocksAgedOneYear = rocks.map(rock => ({ ...rock, age: rock.age + 1 }));
console.log(rocksAgedOneYear);


// assignment give me the 3 rocks that have even ages

const evenAgedRocks = rocks.filter(rock => rock.age % 2 === 0);
console.log(evenAgedRocks);

console.log(rocks)
