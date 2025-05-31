
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
      const genreButton = document.createElement('button');
      genreButton.className = 'genre-toggle';
      genreButton.setAttribute('aria-expanded', 'true');
      genreButton.innerText = genre;

      const subList = document.createElement('ul');
      subList.className = 'genre-list';
      subList.style.display = 'flex';

      genreButton.addEventListener('click', () => {
        const expanded = genreButton.getAttribute('aria-expanded') === 'true';
        genreButton.setAttribute('aria-expanded', String(!expanded));
        subList.style.display = expanded ? 'none' : 'flex';
      });

      grouped[genre].forEach(recipe => {
        const item = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `#${recipe.id}`;
        anchor.textContent = recipe.title;
        anchor.addEventListener('click', e => {
          e.preventDefault();
          const target = document.getElementById(recipe.id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
        item.appendChild(anchor);
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

      genreLi.appendChild(genreButton);
      genreLi.appendChild(subList);
      toc.appendChild(genreLi);
    }

    // ページ読み込み後にハッシュがあればジャンプ
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  });
