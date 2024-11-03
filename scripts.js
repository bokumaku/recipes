const recipes = {
    "main": [
        { name: "メイン料理1", img: "main1.jpg" },
        { name: "メイン料理2", img: "main2.jpg" },
        { name: "メイン料理3", img: "main3.jpg" }
    ],
    "side": [
        { name: "サイド料理1", img: "side1.jpg" },
        { name: "サイド料理2", img: "side2.jpg" },
        { name: "サイド料理3", img: "side3.jpg" }
    ],
    "soup": [
        { name: "スープ1", img: "soup1.jpg" },
        { name: "スープ2", img: "soup2.jpg" },
        { name: "スープ3", img: "soup3.jpg" }
    ]
};

function getRandomRecipe(type) {
    const recipeList = recipes[type];
    const randomIndex = Math.floor(Math.random() * recipeList.length);
    return recipeList[randomIndex];
}

function displayRecipes() {
    const mainDish = getRandomRecipe("main");
    const sideDish = getRandomRecipe("side");
    const soupDish = getRandomRecipe("soup");

    document.querySelector("#main-dish .recipe-image").src = mainDish.img;
    document.querySelector("#main-dish .recipe-name").textContent = mainDish.name;
    document.querySelector("#side-dish .recipe-image").src = sideDish.img;
    document.querySelector("#side-dish .recipe-name").textContent = sideDish.name;
    document.querySelector("#soup-dish .recipe-image").src = soupDish.img;
    document.querySelector("#soup-dish .recipe-name").textContent = soupDish.name;

    // 料理名をクリックしたらGoogle検索
    document.querySelectorAll('.recipe-name').forEach((element) => {
        element.addEventListener('click', function() {
            const recipeName = this.textContent;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(recipeName)}`;
            window.open(searchUrl, '_blank');
        });
    });
}

function changeRecipe(type) {
    const newRecipe = getRandomRecipe(type);
    document.querySelector(`#${type} .recipe-image`).src = newRecipe.img;
    document.querySelector(`#${type} .recipe-name`).textContent = newRecipe.name;
}

window.onload = displayRecipes;
