
export default class CalculationsListView {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.container = document.querySelector('#productCalculations');
        this.containerList = this.container.querySelector('tbody');
        // this.productOtherCalculationsList = document.querySelector('#productOtherCalculationsList');
        this.btnNewProductCalculation = document.querySelector('#newProductCalculation');
        // this.btnAddProductCalculation = document.querySelector('#addProductCalculation');
    }

    init(calculationsData, calculationValidityDate, otherCalculations) {
        this.container.classList.remove('d-none');
        this.render(calculationsData, calculationValidityDate);
        // this.renderOtherCalculations(otherCalculations);
        this.initHandlers();
        if (calculationsData.length > 0) {
            this.btnNewProductCalculation.disabled = true;
        }
    }

    update(calculationsData, calculationValidityDate) {
        this.render(calculationsData, calculationValidityDate);
        if (calculationsData.length > 0) {
            this.btnNewProductCalculation.disabled = true;
        }
    }

    remove() {
        this.container.remove();
    }

    initHandlers() {
        // открыть расчет для редактирования
        this.containerList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('show-calculation-window')) {
                const calculationId = target.closest('tr').dataset.calculationId;
                this.eventEmitter.emit("openCalculation", calculationId);
            }
        });
        this.btnNewProductCalculation.addEventListener('click', (event) => {
            this.eventEmitter.emit("openNewCalculation");
        });
        // // Показать окно просмотра расчета
        // this.containerList.addEventListener('click', (event) => {
        //     const target = event.target;
        //     if (target.classList.contains('radio-final-calculation')) {
        //         const smartId = target.closest('tr').dataset.calculationId;
        //         this.eventEmitter.emit("selectedCalculation", smartId);

        //     }
        // });
        // this.productOtherCalculationsList.addEventListener('click', (event) => {
        //     const target = event.target;
        //     const calculationId = target.dataset.calculationId;
        //     if (calculationId) {
        //         this.eventEmitter.emit("copyFromOtherCalculations", +calculationId);
        //     }
        // });
    }

    render(calculations, calculationValidityDate) {
        let calculationHTML = '';
        for (const calculation of calculations) {
            // console.log("calculation = ", calculation, calculation.isNewCalculation);
            if (!calculation.isNewCalculation) {
                calculationHTML += this.getCalculationHTML(calculation, calculationValidityDate);
            }
        }
        this.containerList.innerHTML = calculationHTML;
        // this.renderOtherCalculations(otherCalculations);
    }

    // renderOtherCalculations(otherCalculations) {
    //     let calculationHTML = '';
    //     for (const calculation of otherCalculations) {
    //         if (!calculation.isNewCalculation) {
    //             calculationHTML += `<li style="cursor: pointer; white-space: nowrap;" data-calculation-id="${calculation.calculationId}">${calculation.getTitleOtherCalculation()}</li>`;
    //         }
    //     }
    //     this.productOtherCalculationsList.innerHTML = calculationHTML;
    // }

    getCalculationHTML(calculation, calculationValidityDate) {
        const isActualCalculation = this.calculationDateIsActual(calculation.dateOfCalculation, calculationValidityDate);
        return `
            <tr data-calculation-id="${calculation.calculationId}" class="">
                <td class="p-0 m-0">
                    <strong class="show-calculation-window"style="text-decoration: underline; color: #0e6efd; cursor: pointer;">Ссылка</strong>
                </td>
                <td class="p-0 m-0 ${isActualCalculation ? '' : 'bg-danger'}">
                    ${this.formatDate(calculation.dateOfCalculation)}
                </td>
                <td class="p-0 m-0">
                    <a href="#" data-user-link="${this.getUserLink(calculation.createdBy)}">${this.getUserName(calculation.createdBy)}</a>
                </td>
                <td class="p-0 m-0">
                    ${calculation.comment}
                </td>
                <td class="p-0 m-0 text-end">
                    ${calculation.costPrice.toLocaleString('ru')}
                </td>
                <td class="p-0 m-0">
                    <input class="form-check-input radio-final-calculation" type="radio" name="calculationRadionButton" ${calculation.isSelected ? 'checked' : ''}>
                </td>
            </tr>
        `;
    }

    formatDate(inputDate) {
        const dateObj = new Date(inputDate);
        if (isNaN(dateObj.getTime())) {
            return "";
        }

        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}.${month}.${year}`;
    }

    getUserName(user) {
        return `${user?.LAST_NAME} ${user?.NAME}`;
    }

    getUserLink(user) {
        return `/company/personal/user/${user?.ID}/`;
    }

    calculationDateIsActual(calculationDate, calculationValidityDate) {
        if (!calculationDate || !calculationValidityDate) {
            return false;
        }

        const d1 = new Date(calculationDate);
        const d2 = new Date(calculationValidityDate);    

        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);

        if (d1.getTime() < d2.getTime()) {
            return false;
        }

        return true;
    }
}
