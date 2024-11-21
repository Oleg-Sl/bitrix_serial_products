

export default class Paginator {

    constructor(filterComponent, currentPage = 0, totalItems = 0, pageSize = 50) {
        this.filterComponent = filterComponent;
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.pageSize = pageSize;

        this.paginationContainer = document.querySelector('#paginationContainer');
        this.render();
        this.initHandlers();

        this.process = null;
    }

    initHandlers() {
        this.paginationContainer.addEventListener('click', async (e) => {
            if (e.target.tagName === 'SPAN') {
                e.preventDefault();
                if (this.process) return;
                if (e.target.dataset.page == this.currentPage) return;
                if (e.target.classList.contains('disabled')) return;
                this.process = true;
                try {
                    await this.filterComponent.applyFilter(+e.target.dataset.page);
                } catch (e) {
                    console.error(e);
                }
                this.process = false;
            }
        });
    }

    setCurrentPage(page) {
        this.currentPage = page;
        this.render();
    }

    setPagination(currentPage, totalItems) {
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        this.render();
    }

    getPageCount() {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    render() {
        const pageCount = this.getPageCount();
        let paginationHtml = '';
        for (let i = 1; i <= pageCount; i++) {
            paginationHtml += `<li class="page-item ${i === this.currentPage ? 'active' : ''}"><span class="page-link" style="cursor: pointer;" data-page="${i}">${i}</span></li>`;
        }
        this.paginationContainer.innerHTML = `
            <nav aria-label="Навигации по страницам">
                <ul class="pagination">
                    <li class="page-item ${this.currentPage === 0 || this.currentPage === 1 ? 'disabled' : ''}">
                        <span class="page-link" aria-label="Предыдущая" title="Предыдущая страница" style="cursor: pointer;" data-page="${+this.currentPage - 1}">
                            <span aria-hidden="true" data-page="${+this.currentPage - 1}">&laquo;</span>
                        </span>
                    </li>
                    ${paginationHtml}
                    <li class="page-item ${this.currentPage === pageCount ? 'disabled' : ''}">
                        <span class="page-link" aria-label="Следующая" title="Следующая страница" style="cursor: pointer;" data-page="${+this.currentPage + 1}">
                            <span aria-hidden="true" data-page="${+this.currentPage + 1}">&raquo;</span>
                        </span>
                    </li>
                </ul>
            </nav>
        `;
    }
}
