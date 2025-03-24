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
        },
        {
            name: 'Mana Potion',
            description: 'Restores 30 mana points.',
            type: 'consumable',
            rarity: 'Common',
            value: 20,
            stats: { manaRestore: 30 }
        },
        {
            name: 'Greater Mana Potion',
            description: 'Restores 100 mana points.',
            type: 'consumable',
            rarity: 'Uncommon',
            value: 60,
            stats: { manaRestore: 100 }
        },
        {
            name: 'Elixir of Wisdom',
            description: 'Restores 200 mana points and increases intelligence temporarily.',
            type: 'consumable',
            rarity: 'Rare',
            value: 180,
            stats: { manaRestore: 200, intelligenceIncrease: 20, duration: '5 minutes' }
        },
        {
            name: 'Stamina Potion',
            description: 'Replenishes stamina for enhanced physical performance.',
            type: 'consumable',
            rarity: 'Common',
            value: 30,
            stats: { staminaRestore: 40 }
        },
        {
            name: 'Elixir of Strength',
            description: 'Temporarily boosts your strength.',
            type: 'consumable',
            rarity: 'Uncommon',
            value: 90,
            stats: { strengthIncrease: 15, duration: '10 minutes' }
        },
        {
            name: 'Antidote',
            description: 'Cures poison effects.',
            type: 'consumable',
            rarity: 'Common',
            value: 20,
            stats: { poisonCure: true }
        },
        {
            name: 'Rejuvenation Elixir',
            description: 'Gradually restores health and mana over time.',
            type: 'consumable',
            rarity: 'Rare',
            value: 220,
            stats: { healthRestore: 50, manaRestore: 30, duration: '10 minutes' }
        },
        {
            name: 'Healing Herb',
            description: 'A herb used to make health potions.',
            type: 'material',
            rarity: 'Common',
            value: 5,
            stats: { healthRestore: 10 }
        },
        {
            name: 'Mana Crystal',
            description: 'A crystal used to enhance magical items.',
            type: 'material',
            rarity: 'Rare',
            value: 150,
            stats: { magicBoost: 20 }
        },
        {
            name: 'Scroll of Fireball',
            description: 'Casts a powerful fireball spell.',
            type: 'consumable',
            rarity: 'Rare',
            value: 200,
            stats: { spell: 'Fireball', damage: 50 }
        },
        // ----------------------
        // Weapons
        // ----------------------
        {
            name: 'Rusty Sword',
            description: 'A worn-out sword with minimal damage.',
            type: 'equipment',
            rarity: 'Common',
            value: 15,
            stats: { damage: 10, speed: 5 }
        },
        {
            name: 'Iron Sword',
            description: 'A sturdy iron sword dealing moderate damage.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 50,
            stats: { damage: 25, speed: 7 }
        },
        {
            name: 'Steel Sword',
            description: 'A sharp steel sword with high damage.',
            type: 'equipment',
            rarity: 'Rare',
            value: 120,
            stats: { damage: 40, speed: 8 }
        },
        {
            name: 'Longbow',
            description: 'A bow suitable for long-range attacks.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 60,
            stats: { damage: 20, range: 50 }
        },
        {
            name: 'Crossbow',
            description: 'A mechanical bow that fires bolts with precision.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 70,
            stats: { damage: 22, range: 55 }
        },
        {
            name: 'Dagger',
            description: 'A small blade for quick strikes.',
            type: 'equipment',
            rarity: 'Common',
            value: 10,
            stats: { damage: 8, speed: 10 }
        },
        {
            name: 'Battle Axe',
            description: 'A heavy axe capable of dealing significant damage.',
            type: 'equipment',
            rarity: 'Rare',
            value: 150,
            stats: { damage: 45, speed: 6 }
        },
        {
            name: 'War Hammer',
            description: 'A mighty hammer designed to crush armor.',
            type: 'equipment',
            rarity: 'Rare',
            value: 160,
            stats: { damage: 50, armorPenetration: 10 }
        },
        {
            name: 'Short Sword',
            description: 'A versatile sword suitable for both offense and defense.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 40,
            stats: { damage: 18, speed: 8 }
        },
        {
            name: 'Magic Staff',
            description: 'A staff imbued with magical properties for spellcasting.',
            type: 'equipment',
            rarity: 'Rare',
            value: 200,
            stats: { damage: 30, intelligence: 15, magicDamage: 25 }
        },
        {
            name: 'Spear',
            description: 'A long-reaching weapon effective against multiple foes.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 55,
            stats: { damage: 20, range: 40 }
        },
        {
            name: 'Halberd',
            description: 'A versatile polearm useful in both melee and ranged combat.',
            type: 'equipment',
            rarity: 'Rare',
            value: 140,
            stats: { damage: 35, range: 30 }
        },
        {
            name: 'Twin Daggers',
            description: 'A pair of daggers allowing for dual-wielding attacks.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 65,
            stats: { damage: 16, speed: 12 }
        },
        {
            name: 'Greatsword',
            description: 'A massive sword that delivers devastating blows.',
            type: 'special',
            rarity: 'Epic',
            value: 300,
            stats: { damage: 60, speed: 4 }
        },
        {
            name: 'Blunderbuss',
            description: 'A short firearm effective at close range.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 80,
            stats: { damage: 25, range: 35 }
        },
        {
            name: 'Flaming Sword',
            description: 'A sword engulfed in flames, adding fire damage to attacks.',
            type: 'special',
            rarity: 'Epic',
            value: 350,
            stats: { damage: 50, fireDamage: 20 }
        },
        {
            name: 'Frozen Bow',
            description: 'A bow that shoots arrows imbued with ice, slowing targets.',
            type: 'special',
            rarity: 'Epic',
            value: 340,
            stats: { damage: 28, iceDamage: 15, slowEffect: true }
        },
        {
            name: 'Shadow Blade',
            description: 'A blade forged from shadows, dealing dark damage.',
            type: 'special',
            rarity: 'Epic',
            value: 360,
            stats: { damage: 55, darkDamage: 25 }
        },
        {
            name: 'Lightning Staff',
            description: 'A staff that channels lightning to strike enemies.',
            type: 'special',
            rarity: 'Epic',
            value: 380,
            stats: { damage: 35, lightningDamage: 30 }
        },
        {
            name: 'Silver Sword',
            description: 'A shiny sword effective against dark creatures.',
            type: 'special',
            rarity: 'Rare',
            value: 160,
            stats: { damage: 35, darkDamageBonus: 15 }
        },
        {
            name: 'Shadowstep Boots',
            description: 'Allow the wearer to move swiftly and leave behind shadows.',
            type: 'equipment',
            rarity: 'Epic',
            value: 220,
            stats: { speed: 25, stealth: 25 }
        },
        {
            name: 'Ethereal Blade',
            description: 'A blade that exists partially in the ethereal plane, allowing it to bypass armor.',
            type: 'special',
            rarity: 'Legendary',
            value: 450,
            stats: { damage: 60, armorPenetration: 30 }
        },
        {
            name: 'Vampire Dagger',
            description: 'A dagger that steals health from enemies with each hit.',
            type: 'special',
            rarity: 'Epic',
            value: 280,
            stats: { damage: 35, lifeSteal: 10 }
        },
        {
            name: 'Holy Sword',
            description: 'A sword blessed with holy magic, effective against undead.',
            type: 'special',
            rarity: 'Legendary',
            value: 500,
            stats: { damage: 50, holyDamage: 30 }
        },
        {
            name: 'Necromancer\'s Staff',
            description: 'A staff that allows control over the dead.',
            type: 'special',
            rarity: 'Legendary',
            value: 520,
            stats: { damage: 40, necromancy: 25 }
        },
        {
            name: 'Ember Blade',
            description: 'A sword that burns with eternal flames.',
            type: 'special',
            rarity: 'Legendary',
            value: 550,
            stats: { damage: 55, fireDamage: 35 }
        },
        {
            name: 'Scepter of the Archmage',
            description: 'A scepter that amplifies all forms of magic.',
            type: 'special',
            rarity: 'Legendary',
            value: 750,
            stats: { magicDamage: 50, intelligence: 35 }
        },
        {
            name: 'Guardian’s Blade',
            description: 'A blade that summons guardians to fight alongside the bearer.',
            type: 'special',
            rarity: 'Legendary',
            value: 770,
            stats: { damage: 55, summonGuardians: true }
        },
        // ----------------------
        // Armor
        // ----------------------
        {
            name: 'Cloth Armor',
            description: 'Offers minimal defense but allows easy movement.',
            type: 'equipment',
            rarity: 'Common',
            value: 25,
            stats: { defense: 10, agility: 5 }
        },
        {
            name: 'Leather Armor',
            description: 'Provides better protection while maintaining flexibility.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 55,
            stats: { defense: 25, agility: 10 }
        },
        {
            name: 'Chainmail Armor',
            description: 'A robust armor made of interlocking metal rings.',
            type: 'equipment',
            rarity: 'Rare',
            value: 120,
            stats: { defense: 50, agility: -5 }
        },
        {
            name: 'Plate Armor',
            description: 'Heavy armor that offers excellent protection.',
            type: 'special',
            rarity: 'Epic',
            value: 250,
            stats: { defense: 80, agility: -15 }
        },
        {
            name: 'Mage Robes',
            description: 'Light robes that enhance magical abilities.',
            type: 'equipment',
            rarity: 'Rare',
            value: 130,
            stats: { defense: 15, intelligence: 20 }
        },
        {
            name: 'Hunter\'s Garb',
            description: 'Lightweight armor designed for stealth and agility.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 70,
            stats: { defense: 20, agility: 15 }
        },
        {
            name: 'Knight\'s Armor',
            description: 'Standard issue armor for knights, balancing protection and mobility.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 90,
            stats: { defense: 40, agility: -5 }
        },
        {
            name: 'Dragon Scale Armor',
            description: 'Armor made from dragon scales, offering superior protection.',
            type: 'special',
            rarity: 'Epic',
            value: 300,
            stats: { defense: 90, fireResistance: 25 }
        },
        {
            name: 'Shadow Cloak',
            description: 'A cloak that allows the wearer to blend into shadows.',
            type: 'equipment',
            rarity: 'Rare',
            value: 150,
            stats: { defense: 25, stealth: 20 }
        },
        {
            name: 'Guardian Plate',
            description: 'Plate armor imbued with protective magic.',
            type: 'special',
            rarity: 'Epic',
            value: 320,
            stats: { defense: 85, magicDefense: 30 }
        },
        {
            name: 'Golden Armor',
            description: 'Radiant armor that dazzles enemies.',
            type: 'special',
            rarity: 'Epic',
            value: 270,
            stats: { defense: 55, magicDefense: 25, blindingEffect: true }
        },
        {
            name: 'Arcane Robe',
            description: 'Robes that amplify magical spells.',
            type: 'special',
            rarity: 'Epic',
            value: 210,
            stats: { intelligence: 30, magicDamage: 20 }
        },
        {
            name: 'Celestial Robe',
            description: 'Robes that grant celestial protection and amplify light magic.',
            type: 'special',
            rarity: 'Legendary',
            value: 480,
            stats: { defense: 60, magicDamage: 30, lightResistance: 25 }
        },
        {
            name: 'Titanium Armor',
            description: 'Superior armor made from titanium, offering unmatched protection.',
            type: 'special',
            rarity: 'Legendary',
            value: 400,
            stats: { defense: 100, magicDefense: 50 }
        },
        {
            name: 'Ethereal Cloak',
            description: 'A cloak that allows the wearer to phase through solid objects.',
            type: 'special',
            rarity: 'Legendary',
            value: 720,
            stats: { phaseThrough: true, stealth: 30 }
        },
        {
            name: 'Phoenix Feather Cloak',
            description: 'A cloak made from phoenix feathers, granting the ability to resurrect once.',
            type: 'special',
            rarity: 'Legendary',
            value: 700,
            stats: { resurrection: 1, fireResistance: 50 }
        },
        // ----------------------
        // Shields
        // ----------------------
        {
            name: 'Old Shield',
            description: 'Provides basic protection against attacks.',
            type: 'equipment',
            rarity: 'Common',
            value: 20,
            stats: { defense: 15 }
        },
        {
            name: 'Iron Shield',
            description: 'A sturdy iron shield offering good defense.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 40,
            stats: { defense: 25 }
        },
        {
            name: 'Steel Shield',
            description: 'A strong steel shield that can block powerful attacks.',
            type: 'equipment',
            rarity: 'Rare',
            value: 100,
            stats: { defense: 45 }
        },
        {
            name: 'Tower Shield',
            description: 'A large shield providing excellent protection.',
            type: 'special',
            rarity: 'Epic',
            value: 220,
            stats: { defense: 70, blockChance: 15 }
        },
        {
            name: 'Buckler',
            description: 'A small shield offering agility and quick defense.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 35,
            stats: { defense: 20, speed: 5 }
        },
        {
            name: 'Magic Barrier Shield',
            description: 'A shield that can generate magical barriers.',
            type: 'special',
            rarity: 'Epic',
            value: 250,
            stats: { defense: 60, magicDefense: 40, barrier: true }
        },
        {
            name: 'Enchanted Shield',
            description: 'A shield imbued with enchantments to enhance its protective capabilities.',
            type: 'special',
            rarity: 'Epic',
            value: 240,
            stats: { defense: 65, magicDefense: 35 }
        },
        {
            name: 'Reinforced Shield',
            description: 'A shield reinforced with metal plates for extra durability.',
            type: 'equipment',
            rarity: 'Rare',
            value: 130,
            stats: { defense: 50, durability: 100 }
        },
        {
            name: 'Spiked Shield',
            description: 'A shield equipped with spikes to inflict damage upon attackers.',
            type: 'equipment',
            rarity: 'Rare',
            value: 140,
            stats: { defense: 40, damage: 10 }
        },
        {
            name: 'Reflective Shield',
            description: 'A shield that can reflect certain types of magic spells.',
            type: 'special',
            rarity: 'Epic',
            value: 260,
            stats: { defense: 55, magicReflection: 20 }
        },
        {
            name: 'Bronze Shield',
            description: 'A basic shield made of bronze.',
            type: 'equipment',
            rarity: 'Common',
            value: 25,
            stats: { defense: 18 }
        },
        {
            name: 'Crystal Shield',
            description: 'A shield made of crystal that absorbs magic.',
            type: 'special',
            rarity: 'Epic',
            value: 260,
            stats: { defense: 50, magicAbsorption: 30 }
        },
        {
            name: 'Celestial Shield',
            description: 'A shield that harnesses the power of the stars to protect the bearer.',
            type: 'special',
            rarity: 'Legendary',
            value: 600,
            stats: { defense: 85, starPower: 30 }
        },
        {
            name: 'Guardian Angel Wings',
            description: 'Grant the ability to fly and provide a protective aura.',
            type: 'special',
            rarity: 'Legendary',
            value: 600,
            stats: { flightDuration: '60 seconds', defenseAura: 20 }
        },
        {
            name: 'Guardian’s Shield',
            description: 'A shield that summons guardians to protect the bearer.',
            type: 'special',
            rarity: 'Legendary',
            value: 550,
            stats: { defense: 80, summonGuardians: true }
        },
        // ----------------------
        // Boots
        // ----------------------
        {
            name: 'Leather Boots',
            description: 'Increases movement speed slightly.',
            type: 'equipment',
            rarity: 'Common',
            value: 20,
            stats: { speed: 5 }
        },
        {
            name: 'Swift Boots',
            description: 'Greatly increase movement speed.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 60,
            stats: { speed: 20 }
        },
        {
            name: 'Heavy Boots',
            description: 'Provide stability but reduce movement speed.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 50,
            stats: { speed: -5, defense: 10 }
        },
        {
            name: 'Boots of Silence',
            description: 'Reduce the noise you make while moving, enhancing stealth.',
            type: 'equipment',
            rarity: 'Rare',
            value: 110,
            stats: { stealth: 20 }
        },
        {
            name: 'Firewalkers',
            description: 'Allow the wearer to walk on hot surfaces without taking damage.',
            type: 'equipment',
            rarity: 'Rare',
            value: 130,
            stats: { fireResistance: 25 }
        },
        {
            name: 'Boots of the Eagle',
            description: 'Enhance jumping ability and vision.',
            type: 'special',
            rarity: 'Epic',
            value: 200,
            stats: { jumpHeight: 15, visionRange: 10 }
        },
        {
            name: 'Shadowstep Boots',
            description: 'Allow the wearer to move swiftly and leave behind shadows.',
            type: 'special',
            rarity: 'Epic',
            value: 220,
            stats: { speed: 25, stealth: 25 }
        },
        {
            name: 'Frostwalk Boots',
            description: 'Enable the wearer to walk on ice without slipping.',
            type: 'equipment',
            rarity: 'Rare',
            value: 140,
            stats: { iceResistance: 20 }
        },
        {
            name: 'Boots of Fortitude',
            description: 'Increase overall endurance and reduce fatigue.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 75,
            stats: { endurance: 15 }
        },
        {
            name: 'Traveler\'s Boots',
            description: 'Provide comfort and reduce travel fatigue.',
            type: 'equipment',
            rarity: 'Common',
            value: 30,
            stats: { comfort: 10, fatigueReduction: 10 }
        },
        {
            name: 'Dragon Scale Boots',
            description: 'Boots made from dragon scales, providing fire resistance and increased speed.',
            type: 'special',
            rarity: 'Epic',
            value: 240,
            stats: { speed: 15, fireResistance: 25 }
        },
        {
            name: 'Enchanted Boots',
            description: 'Boots that grant the ability to walk on air for short durations.',
            type: 'special',
            rarity: 'Epic',
            value: 250,
            stats: { speed: 20, flightDuration: '10 seconds' }
        },
        // ----------------------
        // Helmets
        // ----------------------
        {
            name: 'Iron Helmet',
            description: 'Protects the head from minor attacks.',
            type: 'equipment',
            rarity: 'Uncommon',
            value: 40,
            stats: { defense: 20 }
        },
        {
            name: 'Steel Helmet',
            description: 'A strong helmet offering good protection.',
            type: 'equipment',
            rarity: 'Rare',
            value: 100,
            stats: { defense: 35 }
        },
        {
            name: 'Wizard Hat',
            description: 'Enhances magical abilities.',
            type: 'equipment',
            rarity: 'Rare',
            value: 90,
            stats: { intelligence: 15 }
        },
        {
            name: 'Helmet of Insight',
            description: 'Grants the wearer enhanced perception and awareness.',
            type: 'special',
            rarity: 'Epic',
            value: 210,
            stats: { perception: 20, intelligence: 10 }
        },
        {
            name: 'Beastmaster Helm',
            description: 'Allows communication with and control over beasts.',
            type: 'special',
            rarity: 'Epic',
            value: 230,
            stats: { animalControl: 25 }
        },
        {
            name: 'Helmet of Fortification',
            description: 'Provides additional defense against physical and magical attacks.',
            type: 'special',
            rarity: 'Epic',
            value: 250,
            stats: { defense: 40, magicDefense: 20 }
        },
        {
            name: 'Shadow Hood',
            description: 'Enhances stealth and dark vision.',
            type: 'equipment',
            rarity: 'Rare',
            value: 120,
            stats: { stealth: 25, darkVision: 15 }
        },
        {
            name: 'Helmet of the Ancients',
            description: 'An ancient helmet that bestows wisdom and power.',
            type: 'special',
            rarity: 'Epic',
            value: 300,
            stats: { wisdom: 30, power: 20 }
        },
        {
            name: 'Nightmare Helm',
            description: 'A helmet that instills fear into the hearts of enemies.',
            type: 'special',
            rarity: 'Epic',
            value: 280,
            stats: { fearInduction: 20 }
        },
        {
            name: 'Helm of the Phoenix',
            description: 'Allows the wearer to resurrect upon death once.',
            type: 'special',
            rarity: 'Legendary',
            value: 500,
            stats: { resurrection: 1 }
        },
        {
            name: 'Berserker Helm',
            description: 'A helmet that boosts attack power at the cost of defense.',
            type: 'equipment',
            rarity: 'Rare',
            value: 170,
            stats: { attackPower: 20, defense: -10 }
        },
        // ----------------------
        // Accessories
        // ----------------------
        {
            name: 'Silver Ring',
            description: 'A simple silver ring.',
            type: 'accessory',
            rarity: 'Common',
            value: 30,
            stats: {}
        },
        {
            name: 'Gold Ring',
            description: 'A shiny gold ring.',
            type: 'accessory',
            rarity: 'Uncommon',
            value: 80,
            stats: {}
        },
        {
            name: 'Ring of Strength',
            description: 'Increases the wearer\'s strength.',
            type: 'accessory',
            rarity: 'Rare',
            value: 150,
            stats: { strength: 10 }
        },
        {
            name: 'Basic Amulet',
            description: 'A simple amulet with no special properties.',
            type: 'accessory',
            rarity: 'Common',
            value: 40,
            stats: {}
        },
        {
            name: 'Amulet of Protection',
            description: 'Provides a shield against magical attacks.',
            type: 'accessory',
            rarity: 'Uncommon',
            value: 100,
            stats: { magicDefense: 20 }
        },
        {
            name: 'Amulet of the Mage',
            description: 'Enhances the wearer\'s magical abilities.',
            type: 'accessory',
            rarity: 'Rare',
            value: 180,
            stats: { intelligence: 20, manaRestore: 10 }
        },
        {
            name: 'Charm Bracelet',
            description: 'A bracelet adorned with various charms for luck.',
            type: 'accessory',
            rarity: 'Common',
            value: 35,
            stats: { luck: 5 }
        },
        {
            name: 'Necklace of Fire',
            description: 'Allows the wearer to unleash fire spells.',
            type: 'accessory',
            rarity: 'Rare',
            value: 200,
            stats: { fireDamage: 25 }
        },
        {
            name: 'Ring of Invisibility',
            description: 'Grants temporary invisibility to the wearer.',
            type: 'special',
            rarity: 'Epic',
            value: 300,
            stats: { invisibilityDuration: '30 seconds' }
        },
        {
            name: 'Pendant of Healing',
            description: 'Gradually restores health over time.',
            type: 'accessory',
            rarity: 'Uncommon',
            value: 120,
            stats: { healthRegen: 5 }
        },
        {
            name: 'Mystic Ring',
            description: 'A ring that enhances magical abilities.',
            type: 'special',
            rarity: 'Rare',
            value: 190,
            stats: { intelligence: 25, manaRestore: 15 }
        },
        {
            name: 'Guardian Pendant',
            description: 'An amulet that provides a protective aura.',
            type: 'accessory',
            rarity: 'Rare',
            value: 160,
            stats: { defense: 20, magicDefense: 15 }
        },
        {
            name: 'Shadow Amulet',
            description: 'An amulet that enhances dark magic.',
            type: 'accessory',
            rarity: 'Epic',
            value: 220,
            stats: { darkDamage: 20, stealth: 15 }
        },
        {
            name: 'Titan Gauntlets',
            description: 'Gauntlets that grant immense strength and durability.',
            type: 'special',
            rarity: 'Legendary',
            value: 400,
            stats: { strength: 40, defense: 30 }
        },
        {
            name: 'Phoenix Wings',
            description: 'Grant the ability to fly for short periods.',
            type: 'special',
            rarity: 'Legendary',
            value: 500,
            stats: { flightDuration: '30 seconds' }
        },
        {
            name: 'Eagle Eye Goggles',
            description: 'Enhance vision, allowing the wearer to see great distances clearly.',
            type: 'accessory',
            rarity: 'Epic',
            value: 200,
            stats: { visionRange: 50 }
        },
        {
            name: 'Berserker Gauntlets',
            description: 'Gauntlets that increase attack speed and damage at the cost of defense.',
            type: 'accessory',
            rarity: 'Rare',
            value: 170,
            stats: { attackSpeed: 20, damage: 15, defense: -10 }
        },
        {
            name: 'Amulet of the Titans',
            description: 'An amulet that significantly boosts strength and endurance.',
            type: 'special',
            rarity: 'Legendary',
            value: 520,
            stats: { strength: 30, endurance: 25 }
        },
        {
            name: 'Ring of the Archmage',
            description: 'Enhances all magical abilities and reduces mana consumption.',
            type: 'special',
            rarity: 'Legendary',
            value: 550,
            stats: { intelligence: 35, manaEfficiency: 20 }
        },
        {
            name: 'Celestial Gauntlets',
            description: 'Gauntlets that harness celestial energy to enhance strength and magic.',
            type: 'special',
            rarity: 'Legendary',
            value: 730,
            stats: { strength: 30, magicDamage: 25 }
        },
        {
            name: 'Infinity Ring',
            description: 'A ring that grants unlimited power to the wearer.',
            type: 'special',
            rarity: 'Legendary',
            value: 800,
            stats: { unlimitedPower: true }
        },
        // ----------------------
        // Miscellaneous Items
        // ----------------------
        {
            name: 'Torch',
            description: 'Provides light in dark areas.',
            type: 'misc',
            rarity: 'Common',
            value: 5,
            stats: { lightRadius: 10 }
        },
        {
            name: 'Lockpick Set',
            description: 'Used to unlock doors and chests.',
            type: 'misc',
            rarity: 'Uncommon',
            value: 25,
            stats: { lockpickingSkill: 15 }
        },
        {
            name: 'Rope',
            description: 'A sturdy rope useful for climbing and tying.',
            type: 'misc',
            rarity: 'Common',
            value: 10,
            stats: { length: '30 meters' }
        },
        {
            name: 'Map',
            description: 'Shows the layout of the surrounding area.',
            type: 'misc',
            rarity: 'Common',
            value: 15,
            stats: { areaCovered: 'Local region' }
        },
        {
            name: 'Compass',
            description: 'Helps in navigation by pointing north.',
            type: 'misc',
            rarity: 'Uncommon',
            value: 20,
            stats: { accuracy: 'High' }
        },
        {
            name: 'Gemstone',
            description: 'A precious gemstone used in crafting.',
            type: 'material',
            rarity: 'Uncommon',
            value: 60,
            stats: { gemType: 'Ruby' }
        },
        {
            name: 'Antique Key',
            description: 'An old key that might unlock a hidden treasure.',
            type: 'misc',
            rarity: 'Rare',
            value: 80,
            stats: { unlocks: 'Unknown' }
        },
        {
            name: 'Orb of Eternity',
            description: 'A mystical orb that grants timelessness to its bearer.',
            type: 'special',
            rarity: 'Legendary',
            value: 700,
            stats: { immortality: true }
        },
        {
            name: 'Arcane Crystal',
            description: 'A crystal that amplifies magical spells.',
            type: 'material',
            rarity: 'Rare',
            value: 180,
            stats: { magicBoost: 25 }
        },
        {
            name: 'Traveler\'s Boots',
            description: 'Provide comfort and reduce travel fatigue.',
            type: 'misc',
            rarity: 'Common',
            value: 30,
            stats: { comfort: 10, fatigueReduction: 10 }
        },
        {
            name: 'Orb of Power',
            description: 'A powerful orb that significantly boosts all attributes.',
            type: 'special',
            rarity: 'Legendary',
            value: 800,
            stats: { strength: 20, intelligence: 20, defense: 20, magicDamage: 20 }
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
