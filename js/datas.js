/**
 * SISTEMA DE DATAS COMEMORATIVAS - PORTAL CMDP (VERSÃO BLINDADA)
 * Desenvolvido por Enzo Trentin Cezar
 */

const DATAS_COMEMORATIVAS = {
    "12-06": { titulo: "Dia dos Namorados! 💘", msg: "O amor (e a amizade) está no ar no Nono Ano!" },
    "20-06": { titulo: "Hoje tem Festa Junina! 🍿", msg: "Esperamos vocês na nossa Barraca de Doces!" },
    "11-08": { titulo: "Dia do Estudante! 🎓", msg: "Parabéns para a melhor turma do CMDP!" },
    "18-12": { titulo: "NOSSA FORMATURA! 🎉", msg: "O grande dia chegou! Vencemos!" }
};

function verificarData() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const chave = `${dia}-${mes}`;

    console.log(`Verificando data: ${chave}`); // Para você debugar no F12

    if (DATAS_COMEMORATIVAS[chave]) {
        // Injeta o CSS diretamente para garantir que não vai bugar
        const style = document.createElement('style');
        style.innerHTML = `
            .super-modal-bg {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.8); backdrop-filter: blur(5px);
                z-index: 99999; display: flex; justify-content: center; align-items: center;
                animation: fadeIn 0.5s;
            }
            .super-modal-card {
                background: #1a1d23; color: white; padding: 40px; border-radius: 20px;
                text-align: center; border: 2px solid #E23E47; max-width: 90%; width: 400px;
                box-shadow: 0 10px 30px rgba(226, 62, 71, 0.4);
            }
            .super-modal-card h2 { color: #38BDF8; margin-bottom: 10px; font-family: sans-serif;}
            .super-modal-card p { margin-bottom: 25px; font-family: sans-serif; color: #ccc;}
            .super-modal-btn {
                background: #E23E47; color: white; border: none; padding: 12px 25px;
                border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px;
            }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `;
        document.head.appendChild(style);

        // Cria o HTML do modal
        const modal = document.createElement('div');
        modal.className = 'super-modal-bg';
        modal.innerHTML = `
            <div class="super-modal-card">
                <h2>${DATAS_COMEMORATIVAS[chave].titulo}</h2>
                <p>${DATAS_COMEMORATIVAS[chave].msg}</p>
                <button class="super-modal-btn" onclick="this.parentElement.parentElement.remove()">Entrar no Portal</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// Roda o script assim que a página carrega
window.addEventListener('DOMContentLoaded', verificarData);