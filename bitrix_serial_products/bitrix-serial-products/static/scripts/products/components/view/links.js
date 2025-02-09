export default class LinksView {
    constructor(productService, userService) {
        this.productService = productService;
        this.userService = userService;

        this.categories = this.loadCategories();
        this.container = document.getElementById('elemAppData');
        this.modalElement = null;
        this.modalInstance = null;
    }

    initialize() {
        this.setupModal();
        this.modalElement = document.getElementById('linkViewModal');
        this.modalInstance = new bootstrap.Modal(this.modalElement);

        if (this.modalElement) {
            this.saveButton = this.modalElement.querySelector('#linkViewModalSave');
            this.modalElement.addEventListener('show.bs.modal', this.handleModalShow.bind(this));
        }

        if (this.saveButton) {
            this.saveButton.addEventListener('click', this.handleSaveClick.bind(this));
        }
    }

    handleModalShow(event) {
        const button = event.relatedTarget;
        const fieldAlias = button.getAttribute('data-field');
        const modalTitle = this.modalElement.querySelector('.modal-title strong');
        const inputLink = this.modalElement.querySelector('.input');

        modalTitle.textContent = `"${button.textContent}"`;
        inputLink.value = '';
        this.modalElement.dataset.field = fieldAlias;
    }

    async handleSaveClick() {
        const inputLink = this.modalElement.querySelector('.input');
        const fieldAlias = this.modalElement.dataset.field;
        const fieldValue = inputLink.value;

        if (fieldValue) {
            this.saveButton.disabled = true;
            this.saveButton.querySelector('span').classList.remove('d-none');
            await this.productService.updateField(fieldAlias, fieldValue);
            this.saveButton.disabled = false;
            this.saveButton.querySelector('span').classList.add('d-none');
            this.updateButtonLink(fieldAlias, fieldValue);
        }

        this.modalInstance.hide();
    }

    updateButtonLink(fieldAlias, fieldValue) {
        const button = this.container.querySelector(`[data-field=${fieldAlias}]`)
        if (button) {
            button.outerHTML = `
                <a class="btn btn-secondary text-nowrap px-0" href="${fieldValue}" data-field="${fieldAlias}" role="button" target="_blank" style="display: block;">
                    ${button.textContent}
                </a>
            `;
        }
    }

    render() {
        this.renderCategoryButtons();
    }

    renderCategoryButtons() {
        const linksHTML = this.generateCategoriesHTML();
        this.container.insertAdjacentHTML('afterbegin', linksHTML);
    }

    generateCategoriesHTML() {
        return `
            <div class="row justify-content-between text-center container-link">
                ${this.categories.map(category => this.generateCategoryHTML(category)).join('')}
            </div>
        `;
    }

    generateCategoryHTML(category) {
        return `
            <div class="col-${category.colSize} p-1">
                <div class="card">
                    <div class="bg-secondary-subtle text-nowrap p-1">${category.title}</div>
                    <div class="card-body d-flex justify-content-around p-1">
                        ${category.links.map(link => this.generateLinkHTML(link)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    generateLinkHTML(link) {
        const href = this.productService.getValue(link.field);
        return href ? `
            <div class="col overflow-hidden p-1">
                <a class="btn btn-secondary text-nowrap px-0" href="${href}" data-field="${link.field}" role="button" target="_blank" style="display: block;">
                    ${link.text}
                </a>
            </div>
        ` : `
            <div class="col overflow-hidden p-1">
                <button class="btn btn-light text-nowrap px-0 w-100" style="display: block;" data-bs-toggle="modal" data-bs-target="#linkViewModal" data-field="${link.field}">
                    ${link.text}
                </button>
            </div>
        `;
    }

    loadCategories() {
        return [
            {
                title: "Разработка",
                colSize: 1,
                links: [
                    { field: 'tzDevelopment', text: "Технологии" }
                ]
            },
            {
                title: "Пилка-сборка",
                colSize: 2,
                links: [
                    { field: 'tzSaw', text: "Пилка (ЧПУ)" },
                    { field: 'tzAssembly', text: "Сборка" }
                ]
            },
            {
                title: "Мякоть",
                colSize: 3,
                links: [
                    { field: 'tzPPU', text: "ППУ" },
                    { field: 'tzSewing', text: "Швейка" },
                    { field: 'tzCovering', text: "Обтяжка" }
                ]
            },
            {
                title: "Столярка-молярка",
                colSize: 3,
                links: [
                    { field: 'tzCarpentry', text: "Столярка" },
                    { field: 'tzGrinding', text: "Шлифовка" },
                    { field: 'tzMolar', text: "Молярка" }
                ]
            },
            {
                title: "Сервис",
                colSize: 2,
                links: [
                    { field: 'tzPackage', text: "Упаковка" },
                    { field: 'tzDelivery', text: "Доставка" }
                ]
            }
        ];
    }

    setupModal() {
        const modalHTML = `
            <div class="modal fade" id="linkViewModal" tabindex="-1" aria-labelledby="linkViewModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="linkViewModalLabel">Ссылка для кнопки <strong>"Разработка"</strong></h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="inputLinkView" class="col-form-label">Получатель:</label>
                                    <input type="text" class="form-control input" id="inputLinkView">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            
                            <button class="btn btn-primary" type="button" id="linkViewModalSave">
                                <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", modalHTML);
    }
};



// export default class LinksView {
//     constructor(productService, userService) {
//         this.productService = productService;
//         this.userService = userService;

//         this.categories = this.getCategories();
//         this.container = document.getElementById('elemAppData');
//         this.modalElem = null;
//         this.modal = null;
//     }

//     initialize() {        
//         this.initModalWindow();
//         this.modalElem = document.getElementById('linkViewModal');
//         this.modal = new bootstrap.Modal(this.modalElem);


//         if (this.modalmodalElemWindow) {
//             this.btnSave = this.modalElem.querySelector('#linkViewModalSave');

//             this.modalElem.addEventListener('show.bs.modal', event => {
//                 const button = event.relatedTarget;
//                 const fieldAlias = button.getAttribute('data-field');
//                 const modalTitle = this.modalElem.querySelector('.modal-title strong');
//                 const inputLink = this.modalElem.querySelector('.input');

//                 modalTitle.textContent = `"${button.textContent}"`;
//                 inputLink.value = '';

//                 this.modalElem.dataset.field = fieldAlias;
//             })
//         }

//         if (this.btnSave) {
//             this.btnSave.addEventListener('click', async (event) => {
//                 const inputLink = this.modalElem.querySelector('.input');
//                 const fieldAlias = this.modalElem.dataset.field;
//                 const fieldValue = inputLink.value;

//                 if (fieldValue) {
//                     await this.productService.updateField(fieldAlias, fieldValue);
//                     const btn = document.querySelector(`[data-field=${fieldAlias}]`);
//                     const btnParent = btn.parentNode;
//                     btnParent.innerHTML = `
//                         <a class="btn btn-secondary text-nowrap px-0" href="${link.fieldValue}" data-field="${link.fieldAlias}" role="button" target="_blank" style="display: block;">
//                             ${btn.textContent}
//                         </a>
//                     `;
//                 }

//                 this.modal.hide();
//             })
//         }
//     }

//     render() {
//         this.renderButtonLinks();
//     }

//     renderButtonLinks() {
//         const linksHTML = this.getLinksContainerHTML();
//         this.container.insertAdjacentHTML('afterbegin', linksHTML);
//     }

//     getLinksContainerHTML() {
//         const linksHtml = this.categories.map(
//             category => this.getLinksHTML(category, category.links)
//         ).join('');
//         return `
//             <div class="row justify-content-between text-center container-link">
//                 ${linksHtml}
//             </div>
//         `;
//     }

//     getLinksHTML(category, links) {
//         return `
//             <div class="col-${category.colSize} p-1">
//                 <div class="card">
//                     <div class="bg-secondary-subtle text-nowrap p-1">${category.title}</div>
//                     <div class="card-body d-flex justify-content-around p-1">
//                         ${links.map(link => this.getLinkHTML(link)).join('')}
//                     </div>
//                 </div>
//             </div>
//         `;
//     }

//     getLinkHTML(link) {
//         if (!link.href) {
//             return `
//                 <div class="col overflow-hidden p-1">
//                     <button class="btn btn-secondary text-nowrap px-0 w-100" style="display: block;" data-bs-toggle="modal" data-bs-target="#exampleModal" data-field="${link.id}">${link.text}</button>
//                 </div>
//             `;
//         }

//         return `
//             <div class="col overflow-hidden p-1">
//                 <a class="btn btn-secondary text-nowrap px-0" href="${link.href}" data-field="${link.id}" role="button" target="_blank" style="display: block;">
//                     ${link.text}
//                 </a>
//             </div>
//         `;
//     }

//     getCategories() {
//         const categories = [
//             {
//                 title: "Разработка",
//                 colSize: 1,
//                 links: [
//                     { id: 'tzDevelopment', href: this.productService.getValue('tzDevelopment'), text: "Технологии" }
//                 ]
//             },
//             {
//                 title: "Пилка-сборка",
//                 colSize: 2,
//                 links: [
//                     { id: 'tzSaw', href: this.productService.getValue('tzSaw'), text: "Пилка (ЧПУ)" },
//                     { id: 'tzAssembly', href: this.productService.getValue('tzAssembly'), text: "Сборка" }
//                 ]
//             },
//             {
//                 title: "Мякоть",
//                 colSize: 3,
//                 links: [
//                     { id: 'tzPPU', href: this.productService.getValue('tzPPU'), text: "ППУ" },
//                     { id: 'tzSewing', href: this.productService.getValue('tzSewing'), text: "Швейка" },
//                     { id: 'tzCovering', href: this.productService.getValue('tzCovering'), text: "Обтяжка" }
//                 ]
//             },
//             {
//                 title: "Столярка-молярка",
//                 colSize: 3,
//                 links: [
//                     { id: 'tzCarpentry', href: this.productService.getValue('tzCarpentry'), text: "Столярка" },
//                     { id: 'tzGrinding', href: this.productService.getValue('tzGrinding'), text: "Шлифовка" },
//                     { id: 'tzMolar', href: this.productService.getValue('tzMolar'), text: "Молярка" }
//                 ]
//             },
//             {
//                 title: "Сервис",
//                 colSize: 2,
//                 links: [
//                     { id: 'tzPackage', href: this.productService.getValue('tzPackage'), text: "Упаковка" },
//                     { id: 'tzDelivery', href: this.productService.getValue('tzDelivery'), text: "Доставка" }
//                 ]
//             }
//         ];

//         return categories;
//     }


//     initModalWindow() {
//         const modalHTML = `
//             <div class="modal fade" id="linkViewModal" tabindex="-1" aria-labelledby="linkViewModalLabel" aria-hidden="true">
//                 <div class="modal-dialog">
//                     <div class="modal-content">
//                     <div class="modal-header">
//                         <h1 class="modal-title fs-5" id="linkViewModalLabel">Ссылка для кнопки <strong>"Разработка"</strong></h1>
//                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
//                     </div>
//                     <div class="modal-body">
//                         <form>
//                             <div class="mb-3">
//                                 <label for="inputLinkView" class="col-form-label">Получатель:</label>
//                                 <input type="text" class="form-control" id="inputLinkView">
//                             </div>
//                         </form>
//                     </div>
//                     <div class="modal-footer">
//                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
//                         <button type="button" class="btn btn-primary" id="linkViewModalSave">Сохранить</button>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         `;

//         document.body.insertAdjacentHTML("beforeend", modalHTML);
//     }
// };
