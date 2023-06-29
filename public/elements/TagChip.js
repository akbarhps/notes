class TagChip extends HTMLSpanElement {

    id;
    tag = '';

    constructor(tag) {
        super();
        this.tag = tag;
    }

    connectedCallback() {
        this.innerText = this.tag;
        this.className = 'badge text-bg-light py-1 px-2 lh-sm mt-2 me-1';
        this.style = 'cursor: pointer;';
        this.setOnClickCallback();
    }

    setOnClickCallback() {
        const inputSearch = document.getElementById('input-search');
        this.addEventListener('click', e => {
            // callback(e, this.tag);
            inputSearch.value = this.tag;
        })
    }
}

customElements.define('tag-chip', TagChip, {extends: 'span'});