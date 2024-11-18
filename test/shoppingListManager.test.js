const { addItem, removeItem, getItems, clearList } = require('../src/shoppingListManager');

test('addItem should add an item to the list', () => {
    addItem('Apples');
    expect(getItems()).toContain('Apples'); // Expect the list to contain 'Apples'
});

test('addItem should ignore invalid inputs', () => {
    // Array of invalid inputs
    const invalidInputs = ['', '   ', null, undefined, 123, {}, []];

    // Pass each invalid input to addItem
    invalidInputs.forEach(input => {
        addItem(input);
    });

    // Verify: Expect none of the invalid inputs to be added to the list
    invalidInputs.forEach(input => {
        expect(getItems()).not.toContain(input);
    });
});

test('addItem should trim whitespace from valid strings', () => {
    // Pass a string with whitespace to addItem
    addItem('  Watermelon    ');

    // Verify: Expect 'Watermelon' to be in the list without extra whitespace
    expect(getItems()).toContain('Watermelon');
});

test('removeItem should remove an item from the list', () => {
    addItem('Grape');
    removeItem(2);
    expect(getItems()).not.toContain('Grape'); // Expect the list not to contain 'Grape' after removal
});

test('No change occurs when an invalid index is used', () => {
    addItem('Mango');
    removeItem(5);
    expect(getItems()).toEqual(['Apples', 'Watermelon', 'Mango']); 
});

test('getItem should return correct list after multiple additions', () => {
    addItem('Banana');
    addItem('Bread');
    addItem('Hamburger');
    expect(getItems()).toContain('Banana'); // Expect the list to contain 'Banana'
    expect(getItems()).toContain('Bread'); // Expect the list to contain 'Bread'
    expect(getItems()).toContain('Hamburger'); // Expect the list to contain 'Hamburger'
});

test('getItem should return correct list after multiple removals', () => {
    addItem('Coke');
    addItem('Pepsi');
    addItem('Redbull');
    removeItem(0);
    removeItem(1);
    expect(getItems()).not.toContain('Apples'); // Expect the list to contain 'Coke'
    expect(getItems()).not.toContain('Apples'); // Expect the list to contain 'Pepsi'
});

test('clearList should remove all items from the list', () => {
    addItem('Milk');
    addItem('Eggs');
    clearList();
    expect(getItems()).toEqual([]);
});