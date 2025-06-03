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

function carregarConteudo(caminho) {
    fetch(caminho)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao carregar página");
            return res.text();
        })
        .then(html => {
            document.getElementById("conteudoPrincipal").innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("conteudoPrincipal").innerHTML = "<p>Erro ao carregar conteúdo.</p>";
        });
}

// Eventos dos links
document.getElementById("linkSobre").addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/MEUBLOG/assets/html/sobre.html")
    .then(res => res.text())
    .then(html => {
      document.querySelector("main.content").innerHTML = html;
    });
});