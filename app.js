class BootstrapDragDrop {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.draggedElement = null;
        this.initDragAndDrop();
    }

    initDragAndDrop() {
        this.container.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.container.addEventListener('dragover', this.handleDragOver.bind(this));
        this.container.addEventListener('drop', this.handleDrop.bind(this));
        this.container.addEventListener('dragend', this.handleDragEnd.bind(this));

        // Enable dragging for all children elements
        const elements = this.container.querySelectorAll('[draggable]');
        elements.forEach(element => {
            element.addEventListener('dragstart', this.handleDragStart.bind(this));
        });
    }

    handleDragStart(event) {
        this.draggedElement = event.target;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', event.target.outerHTML);
    }

    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }

    handleDrop(event) {
        event.preventDefault();
        if (event.target.closest('.col') && this.draggedElement !== event.target) {
            const closestCol = event.target.closest('.col');
            closestCol.insertAdjacentHTML('beforebegin', event.dataTransfer.getData('text/html'));
            this.draggedElement.remove();
            this.initDragAndDrop(); // Reinitialize drag and drop for new elements
        }
    }

    handleDragEnd() {
        this.draggedElement = null;
    }
}

// Usage Example
document.addEventListener('DOMContentLoaded', () => {
    // Initialize on a container that holds the bootstrap grid (e.g., .container, .row, or .col)
    new BootstrapDragDrop('.row');  // Change '.row' to your specific container selector
});
