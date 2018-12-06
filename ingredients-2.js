var fs = require('fs');

var recipePath = './recept/';

// var recipeNames = fs.readdirSync(recipePath);
var recipeNames = [
	'wasabi-sill.json',
	// 'walnut-pie.json',
	// 'pie-crust.json',
	// 'pumpkin-pie.json',
	// 'christmas-tree-macaroons.json',
	// 'coconut-tops.json',
	// 'ginger-bread-cookies.json',
	// 'guava-pastry.json',
	// 'gingerbread-cheesecake.json',
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
		{ name: 'potato', amount: 5, unit: 'kg' },
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