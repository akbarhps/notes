class PostCard extends HTMLDivElement {

    id;
    title;
    tags;
    isPinned;
    createdAt;
    updatedAt;

    cardBodyContainer;
    dropdownMenu;

    constructor(post) {
        super();
        this.id = post.id;
        this.title = post.title;
        this.tags = post.tags.split(',');
        this.isPinned = post.isPinned;
        this.createdAt = post.createdAt;
        this.updatedAt = post.updatedAt;
    }

    connectedCallback() {
        if (this.cardBodyContainer != null) {
            return;
        }

        this.className = 'col-lg-4';

        const cardContainer = document.createElement('div');
        cardContainer.className = 'card rounded-2 overflow-hidden hover-img';

        const cardBodyContainer = document.createElement('div');
        cardBodyContainer.className = 'card-body p-4';

        const cardBody = document.createElement('div');
        cardBody.className = 'd-flex align-items-center gap-4 mt-3';
        cardBody.innerHTML = `
            <div class="d-flex align-items-center fs-2">
                <i class="ti ti-point text-dark"></i>
                ${this.createdAt}
            </div>`.trim();

        this.dropdownMenu = new DropdownMenu({
            icon: 'ti-dots-vertical',
            customClass: 'ms-auto',
            items: [
                {
                    text: this.isPinned ? 'Unpin' : 'Pin',
                    icon: 'ti-pin' + (this.isPinned ? 'ned-off' : ''),
                },
                {
                    text: 'Edit',
                    icon: 'ti-edit',
                },
                {
                    text: 'Delete',
                    icon: 'ti-trash',
                },
            ]
        });
        cardBody.appendChild(this.dropdownMenu);
        cardBodyContainer.appendChild(cardBody);

        const titleAnchor = document.createElement('a');
        titleAnchor.className = 'post-title-text my-2 fs-5 text-dark fw-semibold';
        titleAnchor.href = `/posts/${this.id}`;
        titleAnchor.textContent = this.title;
        cardBodyContainer.appendChild(titleAnchor);

        const postTagsContainer = document.createElement('div');
        postTagsContainer.className = 'post-tags';
        this.tags.forEach(tag => {
            const tagChip = new TagChip(tag.trim());
            postTagsContainer.appendChild(tagChip);
        });
        cardBodyContainer.appendChild(postTagsContainer);

        cardContainer.appendChild(cardBodyContainer);
        this.appendChild(cardContainer);

        this.cardBodyContainer = cardBodyContainer;
        this.setPinState(this.isPinned);
        this.setOnEditCallback();
    }

    setPinState(isPinned) {
        this.isPinned = isPinned;
        this.cardBodyContainer.style = isPinned ? 'background-color: rgb(93, 135, 255, 0.15);' : '';
    }

    setOnTogglePinCallback(callback) {
        this.dropdownMenu.addEventCallback(0, 'click', async (e) => {
            const res = await fetch(`/api/v1/posts/${this.id}/pin`, {
                method: 'PUT',
            });
            const json = await res.json();
            this.setPinState(json['data']['isPinned']);
            callback(this.dropdownMenu.getItem(0).firstChild, json);
        });
    }

    setOnEditCallback() {
        this.dropdownMenu.addEventCallback(1, 'click', (e) => {
            window.location.href = `/editor?id=${this.id}`;
        });
    }

    setOnDeleteCallback(callback) {
        this.dropdownMenu.addEventCallback(2, 'click', async (e) => {
            if (!confirm(`Are you sure you want to delete ${this.title}?`)) {
                return;
            }

            const res = await fetch(`/api/v1/posts/${this.id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            callback(e, json);
        });
    }
}

customElements.define('post-card', PostCard, {extends: 'div'});