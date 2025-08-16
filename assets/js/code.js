fetch("https://api.github.com/users/NyckzXD/repos")
    .then(response => response.json())
    .then(repos => {
        const container = document.getElementById("reposGithub");
        container.innerHTML = "";

        repos.forEach(repo => {
            const div = document.createElement("div");
            div.innerHTML = `
                <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong><br>
                <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
                <hr>
            `;
            container.appendChild(div);
        });
    })
    .catch(error => {
        document.getElementById("reposGithub").innerHTML = "Erro ao carregar repositórios.";
        console.error(error);
    });

document.addEventListener("DOMContentLoaded", () => {
  const linkSobre = document.getElementById("linkSobre");
  const conteudo = document.querySelector("main.content");

  if (linkSobre && conteudo) {
    linkSobre.addEventListener("click", (e) => {
      e.preventDefault();
b n
      fetch("assets/html/sobre.html") // Caminho RELATIVO, funciona no GitHub Pages
        .then(res => {
          if (!res.ok) throw new Error("Erro ao carregar conteúdo.");
          return res.text();
        })
        .then(html => {
          conteudo.innerHTML = html;
        })
        .catch(err => {
          console.error(err);
          conteudo.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
        });
    });
  }
});