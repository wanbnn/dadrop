class BootstrapDragDrop {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.draggedElement = null;
        this.initDragAndDrop();
    }

    initDragAndDrop() {
        // Configura todos os elementos como arrastáveis e ouvintes de eventos
        const elements = this.container.querySelectorAll('[draggable="true"]');
        elements.forEach(element => {
            element.addEventListener('dragstart', this.handleDragStart.bind(this));
            element.addEventListener('dragend', this.handleDragEnd.bind(this));
        });

        // Configura as colunas e linhas como áreas de drop
        const dropZones = this.container.querySelectorAll('.col, .row');
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', this.handleDragOver.bind(this));
            zone.addEventListener('drop', this.handleDrop.bind(this));
        });
    }

    handleDragStart(event) {
        this.draggedElement = event.target;
        event.dataTransfer.effectAllowed = 'move';
    }

    handleDragOver(event) {
        event.preventDefault(); // Necessário para permitir o drop
        event.dataTransfer.dropEffect = 'move';
    }

    handleDrop(event) {
        event.preventDefault();

        // Identifica a zona de drop (coluna ou linha)
        const dropZone = event.target.closest('.col, .row');

        if (dropZone && this.draggedElement) {
            dropZone.appendChild(this.draggedElement); // Move o elemento para a nova posição
        }
    }

    handleDragEnd() {
        this.draggedElement = null; // Limpa o elemento arrastado
    }
}

// Uso
document.addEventListener('DOMContentLoaded', () => {
    new BootstrapDragDrop('.container'); // Altere '.container' para o seletor do seu container
});
