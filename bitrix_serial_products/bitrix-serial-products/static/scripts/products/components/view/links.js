
export default class LinksView {
    constructor(productService, userService) {
        this.productService = productService;
        this.userService = userService;

        this.container = document.getElementById('elemAppData');
    }

    render() {
        const containerHTML = this.generateLayoutHTML();
        this.container.insertAdjacentHTML('afterbegin', containerHTML);
    }
    
    generateLayoutHTML() {
        const categories = this.getCategories();
        const linksHtml = categories.map(category => this.generateLinkBlock(category, category.links)).join('');
        return `
            <div class="row justify-content-between text-center container-link">
                ${linksHtml}
            </div>
        `;
    }

    // generateLinkBlock(category, links) {
    //     return `
    //         <div class="col-${category.colSize} p-1">
    //             <div class="card">
    //                 <div class="bg-secondary-subtle text-nowrap p-1">${category.title}</div>
    //                 <div class="card-body d-flex justify-content-around p-1">
    //                     ${links.map(link => `
    //                         <div class="col overflow-hidden p-1">
    //                             <a class="btn btn-secondary text-nowrap px-0" href="${link.href || '-'}" role="button" target="_blank" style="display: block;">${link.text}</a>
    //                         </div>
    //                     `).join('')}
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    // }

    generateLinkBlock(category, links) {
        return `
            <div class="col-${category.colSize} p-1">
                <div class="card">
                    <div class="bg-secondary-subtle text-nowrap p-1">${category.title}</div>
                    <div class="card-body d-flex justify-content-around p-1">
                        ${links.map(link => this.generateLinkHTML(link)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    generateLinkHTML(link) {
        if (!link.href) {
            return `
                <div class="col overflow-hidden p-1">
                    <button class="btn btn-secondary text-nowrap px-0" style="display: block;" disabled>${link.text}</button>
                </div>
            `;
        }

        return `
            <div class="col overflow-hidden p-1">
                <a class="btn btn-secondary text-nowrap px-0" href="${link.href}" role="button" target="_blank" style="display: block;">
                    ${link.text}
                </a>
            </div>
        `;
    }

    getCategories() {
        const categories = [
            {
                title: "Разработка",
                colSize: 1,
                links: [
                    { href: this.productService.getValue('tzDevelopment'), text: "Технологии" }
                ]
            },
            {
                title: "Пилка-сборка",
                colSize: 2,
                links: [
                    { href: this.productService.getValue('tzSaw'), text: "Пилка (ЧПУ)" },
                    { href: this.productService.getValue('tzAssembly'), text: "Сборка" }
                ]
            },
            {
                title: "Мякоть",
                colSize: 3,
                links: [
                    { href: this.productService.getValue('tzPPU'), text: "ППУ" },
                    { href: this.productService.getValue('tzSewing'), text: "Швейка" },
                    { href: this.productService.getValue('tzCovering'), text: "Обтяжка" }
                ]
            },
            {
                title: "Столярка-молярка",
                colSize: 3,
                links: [
                    { href: this.productService.getValue('tzCarpentry'), text: "Столярка" },
                    { href: this.productService.getValue('tzGrinding'), text: "Шлифовка" },
                    { href: this.productService.getValue('tzMolar'), text: "Молярка" }
                ]
            },
            {
                title: "Сервис",
                colSize: 2,
                links: [
                    { href: this.productService.getValue('tzPackage'), text: "Упаковка" },
                    { href: this.productService.getValue('tzDelivery'), text: "Доставка" }
                ]
            }
        ];

        return categories;
    }
};
