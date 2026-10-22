document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.status-check');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.material-card');

    // 1. Atualizar a Barra de Progresso de Estudos automaticamente
    function updateProgress() {
        const totalCards = cards.length;
        const completedCards = document.querySelectorAll('.status-check:checked').length;
        
        const percentage = totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0;
        
        document.getElementById('progress-text').innerText = `${percentage}% Concluído`;
        document.getElementById('progress-fill').style.width = `${percentage}%`;
    }

    // Escuta cliques nos checkboxes para mudar o estado visual do card
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const card = e.target.closest('.material-card');
            if (e.target.checked) {
                card.classList.add('completed');
            } else {
                card.classList.remove('completed');
            }
            updateProgress();
        });
    });

    // 2. Filtros interativos por tipo de mídia
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe ativa de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Controla a exibição dos materiais no grid
            cards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (filterValue === 'all' || cardType === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Inicializa o progresso zerado na primeira carga
    updateProgress();
});
