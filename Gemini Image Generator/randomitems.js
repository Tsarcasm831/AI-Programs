// randomitems.js
// An example list of items to generate icons for.

function generateRandomItems(count) {
    const items = [
        // ----------------------
        // Consumables
        // ----------------------
        {
            name: 'Small Health Potion',
            description: 'Restores 50 health points.',
            type: 'consumable',
            rarity: 'Common',
            value: 25,
            stats: { healthRestore: 50 }
        },
        {
            name: 'Large Health Potion',
            description: 'Restores 150 health points.',
            type: 'consumable',
            rarity: 'Uncommon',
            value: 75,
            stats: { healthRestore: 150 }
        },
        {
            name: 'Elixir of Vitality',
            description: 'Restores 300 health points and increases maximum health temporarily.',
            type: 'consumable',
            rarity: 'Rare',
            value: 200,
            stats: { healthRestore: 300, maxHealthIncrease: 50, duration: '5 minutes' }
        }
        // You can add more items here following the same structure.
    ];

    const randomItems = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * items.length);
        // Clone the item to avoid reference issues
        randomItems.push({ ...items[randomIndex] });
    }
    return randomItems;
}


function addItemsToInventory(items) {
    console.log('Items added to inventory:', items);
    playerInventory.push(...items);
}
