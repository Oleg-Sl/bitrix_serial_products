

export class CalculationsListView {
    constructor() {
        this.container = document.querySelector('#productCalculations');
        this.containerList = this.container.querySelector('tbody');
        this.productOtherCalculationsList = document.querySelector('#productOtherCalculationsList');
        this.btnNewProductCalculation = document.querySelector('#newProductCalculation');
        this.btnAddProductCalculation = document.querySelector('#addProductCalculation');
    }

    renderCalculations(calculations, finalyCalculationId, calculationValidityDate, isLockedCreateCalc, otherCalculations) {
        if (isLockedCreateCalc) {
            this.btnNewProductCalculation.disabled = true;
            this.btnAddProductCalculation.disabled = true;
        }
        let calculationHTML = '';
        for (const calculation of calculations) {
            calculationHTML += this.getCalculationHTML(calculation, finalyCalculationId, calculationValidityDate);
        }
        this.containerList.innerHTML = calculationHTML;
        this.renderOtherCalculations(otherCalculations);
    }

    renderOtherCalculations(otherCalculations) {
        let calculationHTML = '';
        for (const calculation of otherCalculations) {
            calculationHTML += `<li style="cursor: pointer; white-space: nowrap;" data-calculation-id="${calculation.id}">${calculation.title}</li>`;
        }
        this.productOtherCalculationsList.innerHTML = calculationHTML;
    }

    getCalculationHTML(calculation, finalyCalculationId, calculationValidityDate) {
        const isActualCalculation = this.calculationDateIsActual(calculation.dateOfCalculation.value, calculationValidityDate);
        return `
            <tr data-id="${calculation.id}" class="">
                <td class="p-0 m-0">
                    <strong class="show-calculation-window"style="text-decoration: underline; color: #0e6efd; cursor: pointer;">Ссылка</strong>
                </td>
                <td class="p-0 m-0 ${isActualCalculation ? '' : 'bg-danger'}">
                    ${this.formatDate(calculation?.dateOfCalculation?.value)}
                </td>
                <td class="p-0 m-0">
                    <a href="#" data-user-link="${this.getUserLink(calculation.createdBy)}">${this.getUserName(calculation.createdBy)}</a>
                </td>
                <td class="p-0 m-0">
                    ${calculation?.generalComment?.value}
                </td>
                <td class="p-0 m-0">
                    ${calculation?.cost?.value?.toLocaleString()}
                </td>
                <td class="p-0 m-0">
                    <input class="form-check-input radio-final-calculation" type="radio" name="calculationRadionButton" ${finalyCalculationId == calculation.id ? 'checked' : ''}>
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
