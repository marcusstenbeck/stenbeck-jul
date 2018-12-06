var fs = require('fs');

var recipePath = './recept/';

function loadRecipes() {
	var recipeNames = fs.readdirSync(recipePath);

	return recipeNames.map(function(name) {
		try {
			return JSON.parse( fs.readFileSync(recipePath + name, 'utf-8') );
		} catch(e) {
			throw new Error('error: ' + name)
		}
	})
}

// Load recipes
var recipes = loadRecipes();


// Add extra??
recipes.push({
	ingredients: [
		// Random
		{ name: 'egg nog containers', amount: 10, unit: 'liter' },
		{ name: 'pumpkin', amount: 1.5, unit: 'kg' },
		{ name: 'mandarines', amount: 15, unit: 'pc' },
		{ name: 'hazelnut', amount: 1, unit: 'bag' },

		{ name: 'mozart kulor', amount: 1, unit: 'carton' },

		// Snabb pistage godis
		{ name: 'pistagios', amount: 1, unit: 'bag' },
		{ name: 'dark chocolate m. flingsalt', amount: 2, unit: 'pc' },

		// Julskinka
		{ name: 'julskinka', amount: 2, unit: 'kg' },
		{ name: 'kryddpeppar', amount: 1, unit: 'pc' },
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