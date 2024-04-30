const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");
let meals = [];
// recherche donnée
async function fetchMeals(search) {
  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
    .then((res) => res.json())
    .then((data) => (meals = data.meals));
  console.log(meals);
}
// affichage donnée
function mealsDisplay() {
  if (meals === null) {
    result.innerHTML = "<h2> Aucun résultat</h2>";
  }
  meals.length = 12;
  result.innerHTML = meals
    .map((meal) => {
      let ingredients = [];
      // boucles for pour tester  les ingredients pour n afficher que les valeurs presentes sur les 21 indexs ingredients
      for (i = 1; i < 21; i++) {
        if (meal[`strIngredient${i}`]) {
          let ingredient = meal[`strIngredient${i}`];
          let measure = meal[`strMeasure${i}`];

          ingredients.push(`<li>${ingredient} - ${measure}</li>`);
        }
      }

      return `
        <li class="card">
           <h2>${meal.strMeal}</h2>
           <h4>${meal.strArea}</h4>
           <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
           <ul>${ingredients.join("")}</ul>
           <br>
           <p>${meal.strInstructions}</p>
        </li>`;
    })
    .join("");
}

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mealsDisplay();
});
