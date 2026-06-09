// GitHub Repos
fetch("https://api.github.com/users/NyckzXD/repos?sort=updated&per_page=6")
    .then(r => r.json())
    .then(repos => {
        const container = document.getElementById("reposGithub");
        container.innerHTML = "";
        repos.forEach((repo, i) => {
            const card = document.createElement("div");
            card.className = "repo-card";
            card.style.animationDelay = `${i * 0.07}s`;
            card.innerHTML = `
                <div class="repo-name">
                    <i class="fas fa-book-open"></i>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </div>
                <p class="repo-desc">${repo.description || "Sem descrição"}</p>
                <div class="repo-meta">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    ${repo.language ? `<span><i class="fas fa-circle" style="font-size:0.6rem;color:var(--accent)"></i> ${repo.language}</span>` : ""}
                </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(() => {
        document.getElementById("reposGithub").innerHTML =
            '<p class="repo-loading">Erro ao carregar repositórios.</p>';
    });

// Carreira (carregamento dinâmico)
document.addEventListener("DOMContentLoaded", () => {
    const linkSobre = document.getElementById("linkSobre");
    const secao = document.getElementById("carreira-section");
    const container = document.getElementById("carreira-container");

    if (!linkSobre) return;

    linkSobre.addEventListener("click", (e) => {
        e.preventDefault();

        if (secao.style.display !== "none") {
            secao.style.display = "none";
            linkSobre.style.color = "";
            return;
        }

        fetch("assets/html/sobre.html")
            .then(res => {
                if (!res.ok) throw new Error();
                return res.text();
            })
            .then(html => {
                container.innerHTML = html;
                secao.style.display = "block";
                linkSobre.style.color = "var(--accent2)";
                secao.scrollIntoView({ behavior: "smooth", block: "start" });
            })
            .catch(() => {
                container.innerHTML = "<p>Erro ao carregar carreira.</p>";
                secao.style.display = "block";
            });
    });

    // Hamburger menu
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }
});
