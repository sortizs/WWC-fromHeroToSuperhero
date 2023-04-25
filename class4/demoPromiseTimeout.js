Promise.resolve().then(() => {
    console.log('Resolved');
}).then(() => {
    console.log('Resolved 2');
})

setTimeout(() => {
    console.log('Hello from timeout');
}, 0);

console.log('Hello outside timeout');
