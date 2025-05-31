fetch('recipes.json')
  .then(res => res.json())
  .then(data => {
    const toc = document.querySelector('#toc ul');
    const main = document.getElementById('recipes');

    const grouped = {};
    data.forEach(recipe => {
      if (!grouped[recipe.genre]) grouped[recipe.genre] = [];
      grouped[recipe.genre].push(recipe);
    });

    for (const genre in grouped) {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${genre}</strong><ul></ul>`;
      const ul = li.querySelector('ul');

      grouped[genre].forEach(r => {
        const item = document.createElement('li');
        item.innerHTML = `<a href="#${r.id}">${r.title}</a>`;
        ul.appendChild(item);

        const section = document.createElement('section');
        section.className = 'recipe';
        section.id = r.id;

        section.innerHTML = `
          <h2>${r.title}</h2>
          <h3>材料</h3>
          <ul>${r.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
          <h3>作り方</h3>
          <ol>${r.steps.map(s => `<li>${s}</li>`).join('')}</ol>
        `;

        main.appendChild(section);
      });

      toc.appendChild(li);
    }
  });
