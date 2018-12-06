var fs = require('fs');

var recipePath = './recept/';

var recipeNames = [
  // Food
  'bean-salad.json',
  'creamed-kale.json',
  'meatballs.json',
  'wasabi-sill.json',

  // Cookies & Candy
  'coconut-tops.json',
  'gingerbread-cheesecake.json',
  'guava-pastry.json',
  
  // Nicholas
  // 'christmas-tree-macaroons.json',
  // 'nieman-marcus.json',
  // 'pecan-rounds.json',
  // 'vanilla-cookies.json',
  // 'knäck.json',
  // 'eggnog.json',
]

function loadRecipes(names) {
  return names.map(function(name) {
    try {
      return JSON.parse( fs.readFileSync(recipePath + name, 'utf-8') );
    } catch(e) {
      throw new Error('error: ' + name)
    }
  })
}

// Load recipes
var recipes = loadRecipes(recipeNames);


// Add extra??
recipes.push({
	ingredients: [
		// Random
		{ name: 'egg nog containers', amount: 10, unit: 'liter' },
		{ name: 'mandarines', amount: 15, unit: 'pc' },
		{ name: 'hazelnut', amount: 1, unit: 'bag' },
    { name: 'mozart kulor', amount: 1, unit: 'carton' },
    { name: 'lammkorv mild', amount: 1, unit: 'pkg' },
		{ name: 'lammkorv stark', amount: 1, unit: 'pkg' },
    { name: 'potato', amount: 5, unit: 'kg' },
    { name: 'vörtbröd', amount: 1, unit: 'pkg' },
    { name: 'knäckebröd', amount: 3, unit: 'pkg' },
    { name: 'finn crisp', amount: 1, unit: 'pkg' },

		// Snabb pistage godis
		{ name: 'pistagios', amount: 1, unit: 'bag' },
		{ name: 'dark chocolate m. flingsalt', amount: 2, unit: 'pc' },

		// Julskinka
		{ name: 'julskinka', amount: 2, unit: 'kg' },
    { name: 'kryddpeppar', amount: 1, unit: 'pc' },
    { name: 'ägg', amount: 1, unit: 'pc' },
		{ name: 'grov senap', amount: 1, unit: 'pc' },
	]
})


// Get all ingredients
var ingredients = recipes.reduce(function(acc, recipe) {

	recipe.ingredients.forEach(function(ingredient) {

		var amount = ((recipe.times || 1) * ingredient.amount) + ' ' + ingredient.unit;

		if(!acc[ingredient.name]) {
			acc[ingredient.name] = [ amount ];
		} else {
			acc[ingredient.name].push( amount );
		}
	})

	return acc;
}, {})




// Print it out
Object.keys(ingredients).forEach(function(key) {
	var str = key;
	var strlen = 35;

	if(str.length < strlen) {
		str = str + ( new Array(strlen - str.length).join('-') );
	}

	str += ingredients[key].join(', ');

	console.log( str )
})