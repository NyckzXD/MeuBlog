// ── Typewriter ──
const CODE_LINES = [
    { raw: 'const dev = {',                        html: '<span class="c-keyword">const</span> <span class="c-var">dev</span> = {' },
    { raw: '  nome: "Nycolas Fernandes",',          html: '  <span class="c-prop">nome</span>: <span class="c-str">"Nycolas Fernandes"</span>,' },
    { raw: '  stack: ["Python", "JS", "SQL"],',     html: '  <span class="c-prop">stack</span>: [<span class="c-str">"Python"</span>, <span class="c-str">"JS"</span>, <span class="c-str">"SQL"</span>],' },
    { raw: '  foco: "Full-Stack",',                 html: '  <span class="c-prop">foco</span>: <span class="c-str">"Full-Stack"</span>,' },
    { raw: '  estudando: "Sistemas de Info",',      html: '  <span class="c-prop">estudando</span>: <span class="c-str">"Sistemas de Info"</span>,' },
    { raw: '  café: true,',                         html: '  <span class="c-prop">café</span>: <span class="c-bool">true</span>,' },
    { raw: '};',                                    html: '};' },
];

function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function startTypewriter() {
    const el = document.querySelector('.code-body code');
    if (!el) return;

    let lineIdx = 0, charIdx = 0;
    const done = [];   // lines already completed (store their html)
    let timer = null;

    function render() {
        const partial = escHtml(CODE_LINES[lineIdx].raw.slice(0, charIdx));
        el.innerHTML = [
            ...done,
            partial + '<span class="cursor"></span>'
        ].join('\n');
    }

    function tick() {
        const line = CODE_LINES[lineIdx];

        if (charIdx < line.raw.length) {
            charIdx++;
            render();
            // slight random delay for realistic feel
            timer = setTimeout(tick, 38 + Math.random() * 22);
        } else {
            // line finished — push highlighted version, move to next
            done.push(line.html);
            charIdx = 0;
            lineIdx++;

            if (lineIdx < CODE_LINES.length) {
                timer = setTimeout(tick, 160);   // pause between lines
            } else {
                // all done — show cursor on last line, restart after 5s
                el.innerHTML = done.join('\n') + '<span class="cursor"></span>';
                timer = setTimeout(() => {
                    lineIdx = 0; charIdx = 0; done.length = 0;
                    tick();
                }, 5000);
            }
        }
    }

    tick();
}

document.addEventListener('DOMContentLoaded', startTypewriter);

// ── GitHub Repos
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
