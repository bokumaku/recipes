
fetch('recipes.json')
  .then(response => response.json())
  .then(data => {
    const toc = document.querySelector('#toc ul');
    const main = document.getElementById('recipes');
    const grouped = {};

    data.forEach(recipe => {
      if (!grouped[recipe.genre]) grouped[recipe.genre] = [];
      grouped[recipe.genre].push(recipe);
    });

    for (const genre in grouped) {
      const genreItem = document.createElement('li');
      genreItem.innerHTML = `<strong>${genre}</strong><ul></ul>`;
      const innerUl = genreItem.querySelector('ul');

      grouped[genre].forEach(recipe => {
        const linkItem = document.createElement('li');
        linkItem.innerHTML = `<a href="#${recipe.id}">${recipe.title}</a>`;
        innerUl.appendChild(linkItem);

        const section = document.createElement('section');
        section.className = 'recipe';
        section.id = recipe.id;

        section.innerHTML = `
          <h2>${recipe.title}</h2>
          <h3>材料</h3>
          <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
          <h3>作り方</h3>
          <ol>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        `;
        main.appendChild(section);
      });

      toc.appendChild(genreItem);
    }
  });
