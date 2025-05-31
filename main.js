
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
      const genreLi = document.createElement('li');
      const genreTitle = document.createElement('div');
      genreTitle.innerHTML = `<strong>${genre}</strong>`;
      genreTitle.className = 'genre-title';

      const subList = document.createElement('ul');
      subList.className = 'genre-list';

      grouped[genre].forEach(recipe => {
        const item = document.createElement('li');
        item.innerHTML = `<a href="#${recipe.id}">${recipe.title}</a>`;
        subList.appendChild(item);

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

      genreLi.appendChild(genreTitle);
      genreLi.appendChild(subList);
      toc.appendChild(genreLi);
    }
  });
