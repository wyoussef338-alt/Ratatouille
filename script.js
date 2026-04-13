// ==========================================
// 1. Static Recipes Data (For Menu Slider)
// ==========================================
const recipesData = {
    ratatouille: {
        title: "Classic Ratatouille",
        meta: "<span>⏱ 60 Mins</span><span>👨‍🍳 Medium</span><span>🔥 180°C</span>",
        desc: "A rich, flavorful French Provencal stewed vegetable dish. Perfect as a main or side.",
        img: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=500",
        text: "<b>🛒 Ingredients:</b><br>• 2 Medium Eggplants<br>• 2 Zucchini<br>• 4 Roma Tomatoes<br>• 1 Red Bell Pepper & 1 Yellow Onion<br>• 3 Cloves Garlic (minced)<br>• 2 Cups Crushed Tomatoes (for the base)<br>• Extra Virgin Olive Oil, Fresh Thyme, and Basil<br><br><b>🍳 Preparation & Assembly:</b><br><br>1. <b>The Base:</b> Sauté diced onions, bell peppers, and garlic in olive oil until soft. Pour in crushed tomatoes, season, and simmer. Spread at the bottom of a baking dish.<br><br>2. <b>Slicing:</b> Cut eggplants, zucchini, and tomatoes into thin, even rounds.<br><br>3. <b>Assembly:</b> Arrange slices in an alternating spiral pattern directly on top of the tomato base.<br><br>4. <b>Baking:</b> Drizzle with oil, garlic, and thyme. Cover with parchment and bake at 180°C for 45 mins. Uncover and bake 15 more mins."
    },
    pizza: {
        title: "Chef's Pizza",
        meta: "<span>⏱ 25 Mins</span><span>👨‍🍳 Easy</span><span>🔥 250°C+</span>",
        desc: "Authentic Italian style thin-crust Neapolitan pizza with fresh mozzarella and basil.",
        img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        text: "<b>🛒 Ingredients:</b><br>• 250g '00' Pizza Flour<br>• 160ml Warm Water & 3g Yeast<br>• 1/2 Cup San Marzano Tomato Sauce<br>• 150g Fresh Mozzarella<br>• Fresh Basil & Olive Oil<br><br><b>🍳 Preparation:</b><br><br>1. <b>Dough:</b> Mix flour, yeast, water, salt. Knead 10 mins. Proof for 2 hours.<br><br>2. <b>Stretching:</b> Hand-stretch dough into a 12-inch circle. Don't use a rolling pin.<br><br>3. <b>Base:</b> Spread sauce leaving a border.<br><br>4. <b>Baking:</b> Add cheese. Bake on a hot stone at 250°C+ for 5-7 mins.<br><br>5. <b>Finish:</b> Garnish with basil and olive oil."
    },
    pasta: {
        title: "Creamy Pasta",
        meta: "<span>⏱ 15 Mins</span><span>👨‍🍳 Easy</span><span>🔥 Stovetop</span>",
        desc: "Silky, rich, and perfectly al dente pasta wrapped in a garlic parmesan cream sauce.",
        img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500",
        text: "<b>🛒 Ingredients:</b><br>• 200g Fettuccine<br>• 3 tbsp Butter<br>• 1 Cup Heavy Cream<br>• 1 Cup Parmesan<br>• 3 Cloves Garlic<br><br><b>🍳 Preparation:</b><br><br>1. <b>Boil:</b> Cook pasta until al dente. Reserve pasta water.<br><br>2. <b>Base:</b> Melt butter, sauté garlic for 1 min.<br><br>3. <b>Sauce:</b> Add cream, simmer 2 mins.<br><br>4. <b>Combine:</b> Add pasta to skillet, turn off heat. Gradually toss in Parmesan until silky."
    },
    burger: {
        title: "Master Burger",
        meta: "<span>⏱ 25 Mins</span><span>👨‍🍳 Medium</span><span>🔥 Cast-Iron Grill</span>",
        desc: "The ultimate juicy beef smash-style burger with a toasted brioche bun and melted cheddar.",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        text: "<b>🛒 Ingredients:</b><br>• 200g Ground Beef (80/20)<br>• Brioche Bun<br>• Cheddar Cheese<br>• Lettuce, Tomato, Onion<br>• Secret Sauce<br><br><b>🍳 Preparation:</b><br><br>1. <b>Bun:</b> Toast bun with butter.<br><br>2. <b>Patty:</b> Form loose patty. Sear in a hot cast-iron skillet (season top side only before placing in pan).<br><br>3. <b>Melt:</b> Flip, add cheese, cover pan to melt.<br><br>4. <b>Assemble:</b> Bun, sauce, veggies, patty, top bun."
    }
};

// ==========================================
// 2. Modal Functions (Shared)
// ==========================================
function openStaticRecipe(id) {
    const data = recipesData[id];
    fillModal(data.title, data.meta, data.desc, data.img, data.text);
}

function openRecipe(id) { openStaticRecipe(id); }

function fillModal(title, meta, desc, img, text) {
    const modal = document.getElementById("recipe-modal");
    document.getElementById("recipe-title").innerText = title;
    document.getElementById("recipe-meta").innerHTML = meta;
    document.getElementById("recipe-desc").innerHTML = desc;
    document.getElementById("recipe-img").src = img;
    document.getElementById("recipe-text").innerHTML = text;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeRecipe() {
    document.getElementById("recipe-modal").style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(e) {
    if (e.target.className === "modal") closeRecipe();
}

// ==========================================
// 3. Smart Kitchen API Logic (Spoonacular)
// ==========================================
const API_KEY = '38149011f61d4d40897917ec16a30fcb';
let ingredientsList = [];

document.getElementById('ingredient-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addIngredient();
});

function addIngredient() {
    const input = document.getElementById('ingredient-input');
    const value = input.value.trim().toLowerCase();
    
    if (value && !ingredientsList.includes(value)) {
        ingredientsList.push(value);
        renderTags();
        input.value = '';
        document.getElementById('search-status').innerHTML = ""; 
    }
}

function renderTags() {
    const container = document.getElementById('ingredients-tags');
    container.innerHTML = ingredientsList.map((ing, index) => `
        <div class="tag">
            ${ing} <span onclick="removeIngredient(${index})">×</span>
        </div>
    `).join('');
}

function removeIngredient(index) {
    ingredientsList.splice(index, 1);
    renderTags();
}

async function searchRecipes() {
    const status = document.getElementById('search-status');
    const resultsDiv = document.getElementById('api-results');

    if (ingredientsList.length < 3) {
        status.innerHTML = "⚠️ Please add at least 3 ingredients first!";
        status.style.color = "#e74c3c";
        return;
    }
    
    status.innerHTML = "👨‍🍳 Remy is checking his recipe books...";
    status.style.color = "#666";
    resultsDiv.innerHTML = "";

    try {
        const ingredientsString = ingredientsList.join(',');
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=6&apiKey=${API_KEY}`);
        
        if (!response.ok) throw new Error("API Limit Reached or Network Error");
        
        const recipes = await response.json();

        if (recipes.length === 0) {
            status.innerHTML = "❌ No recipes found. Try different ingredients!";
            return;
        }

        status.innerHTML = `✨ Found ${recipes.length} magical recipes!`;
        status.style.color = "#27ae60";

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'api-card';
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
            `;
            card.onclick = () => getApiRecipeDetails(recipe.id);
            resultsDiv.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        status.innerHTML = "⚠️ Oops! Something went wrong. Maybe API limit reached.";
        status.style.color = "#e74c3c";
    }
}

async function getApiRecipeDetails(id) {
    fillModal("Loading...", "", "Please wait while we fetch the recipe details...", "", "");
    
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        const data = await response.json();

        const title = data.title;
        const meta = `<span>⏱ ${data.readyInMinutes} Mins</span><span>👤 Serves ${data.servings}</span>`;
        const desc = "A delicious recipe found just for you!"; 
        const img = data.image;
        const text = data.instructions ? `<b>🍳 Instructions:</b><br><br>${data.instructions}` : "<b>🍳 Instructions:</b><br><br>No detailed instructions provided by the API, but it looks amazing!";

        fillModal(title, meta, desc, img, text);

    } catch (error) {
        fillModal("Error", "", "Could not load recipe details. Please try again.", "", "");
    }
}