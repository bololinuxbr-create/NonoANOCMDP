/**
 * APP.JS - LÓGICA PRINCIPAL DO PORTAL CMDP
 * Escrito por Enzo Trentin Cezar
 * Arquitetura em Módulos para evitar bugs de escopo.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- MÓDULO 1: SISTEMA DE DATAS (POP-UP GARANTIDO) ---
    const SistemaDatas = {
        feriados: {
            "12-06": { titulo: "Dia dos Namorados! 💘", msg: "O amor e a amizade estão no ar na turma 2026!" },
            "20-06": { titulo: "Festa Junina CMDP! 🍿", msg: "Hoje é dia de pular fogueira. Bora pra nossa barraca!" },
            "11-08": { titulo: "Dia do Estudante! 📚", msg: "Parabéns para nós que codamos e estudamos!" }
        },
        
        iniciar() {
            const hoje = new Date();
            const dia = String(hoje.getDate()).padStart(2, '0');
            const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Meses em JS começam em 0
            const chaveHoje = `${dia}-${mes}`;
            
            console.log(`[Sistema] Verificando data de hoje: ${chaveHoje}`);

            if (this.feriados[chaveHoje]) {
                this.renderizarPopUp(this.feriados[chaveHoje]);
            }
        },

        renderizarPopUp(dados) {
            // Cria os elementos do zero via JS para não depender do HTML
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;transition:0.5s;';
            
            const card = document.createElement('div');
            card.style.cssText = 'background:#171717;border:2px solid #E23E47;padding:40px;border-radius:20px;text-align:center;color:white;max-width:90%;width:400px;transform:scale(0.8);transition:0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);box-shadow:0 10px 40px rgba(226,62,71,0.3);';
            
            card.innerHTML = `
                <i class="fa-solid fa-gift" style="font-size:3rem;color:#38BDF8;margin-bottom:20px;"></i>
                <h2 style="font-family:'Poppins', sans-serif;margin-bottom:15px;font-size:1.5rem;">${dados.titulo}</h2>
                <p style="color:#a3a3a3;margin-bottom:30px;line-height:1.6;">${dados.msg}</p>
                <button id="fechar-feriado" style="background:#E23E47;color:white;border:none;padding:12px 30px;border-radius:8px;font-weight:bold;cursor:pointer;font-size:1rem;transition:0.2s;">Ir para o Portal</button>
            `;

            overlay.appendChild(card);
            document.body.appendChild(overlay);

            // Animação de entrada
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });

            document.getElementById('fechar-feriado').addEventListener('click', () => {
                overlay.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => overlay.remove(), 500);
            });
        }
    };

    // --- MÓDULO 2: INTERAÇÕES DA UI (Busca, Tema, Modal) ---
    const InterfaceUI = {
        iniciar() {
            this.configurarTema();
            this.configurarBusca();
            this.configurarModalAlunos();
        },

        configurarTema() {
            const btn = document.getElementById('theme-switch');
            const icon = btn.querySelector('i');
            
            btn.addEventListener('click', () => {
                const temaAtual = document.documentElement.getAttribute('data-theme');
                const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', novoTema);
                icon.className = novoTema === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            });
        },

        configurarBusca() {
            const input = document.getElementById('student-filter');
            const cards = document.querySelectorAll('.student-card');

            input.addEventListener('input', (e) => {
                const termo = e.target.value.toLowerCase().trim();
                cards.forEach(card => {
                    const nome = card.getAttribute('data-name');
                    // Usando display flex ao invés de block para não quebrar o CSS Grid no mobile
                    card.style.display = nome.includes(termo) ? "flex" : "none";
                    card.style.flexDirection = "column"; 
                });
            });
        },

        configurarModalAlunos() {
            const cards = document.querySelectorAll('.student-card');
            const modal = document.getElementById('quote-modal');
            const btnFechar = modal.querySelector('.modal-close');
            
            const elNome = document.getElementById('modal-student-name');
            const elQuote = document.getElementById('modal-quote-text');
            const elAvatar = document.getElementById('modal-avatar');

            cards.forEach(card => {
                card.addEventListener('click', () => {
                    elNome.innerText = card.querySelector('.student-name').innerText;
                    elQuote.innerText = `"${card.getAttribute('data-quote')}"`;
                    elAvatar.innerHTML = card.querySelector('.card-avatar').outerHTML;
                    modal.classList.add('active');
                });
            });

            btnFechar.addEventListener('click', () => modal.classList.remove('active'));
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }
    };

    // Inicializa o sistema
    SistemaDatas.iniciar();
    InterfaceUI.iniciar();
});