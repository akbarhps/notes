class DropdownMenu extends HTMLDivElement {

    icon = '';
    items = [];
    customClass = '';

    menuItemElements = [];

    constructor(data) {
        super();
        this.icon = data['icon'];
        this.items = data['items'];
        this.customClass = data['customClass'];
    }

    connectedCallback() {
        if(this.menuItemElements.length > 0) {
            return;
        }

        this.className = 'dropdown dropstart' + (this.customClass ? ' ' + this.customClass : '');

        const dropdownIconContainer = document.createElement('a');
        dropdownIconContainer.href = '#';
        dropdownIconContainer.id = 'dropdownMenuButton';
        dropdownIconContainer.className = 'text-muted';
        dropdownIconContainer.setAttribute('data-bs-toggle', 'dropdown');
        dropdownIconContainer.setAttribute('aria-expanded', 'false');

        const dropdownIcon = document.createElement('i');
        dropdownIcon.className = 'ti fs-5 ' + this.icon;

        const dropdownMenuContainer = document.createElement('ul');
        dropdownMenuContainer.className = 'dropdown-menu';
        dropdownMenuContainer.setAttribute('aria-labelledby', 'dropdownMenuButton');

        this.items.forEach(menuItem => {
            const menuItemContainer = document.createElement('li');
            const menuItemLink = document.createElement('a');
            menuItemLink.className = 'dropdown-item d-flex align-items-center gap-3';
            menuItemLink.style = 'cursor: pointer;';

            const menuItemIcon = document.createElement('i');
            menuItemIcon.className = 'fs-4 ti ' + menuItem.icon;

            const menuItemText = document.createElement('span');
            menuItemText.innerText = menuItem.text;

            menuItemLink.appendChild(menuItemIcon);
            menuItemLink.appendChild(menuItemText);

            menuItemContainer.appendChild(menuItemLink);
            dropdownMenuContainer.appendChild(menuItemContainer);
            this.menuItemElements.push(menuItemContainer);
        });

        dropdownIconContainer.appendChild(dropdownIcon);
        this.appendChild(dropdownIconContainer);
        this.appendChild(dropdownMenuContainer);
    }

    addEventCallback(position, eventName, callback) {
        this.menuItemElements[position].addEventListener(eventName, callback)
    }

    getItem(position) {
        return this.menuItemElements[position];
    }
}

customElements.define('dropdown-menu', DropdownMenu, {extends: 'div'});