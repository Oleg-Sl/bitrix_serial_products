
export default class MechanismService {
    constructor(dataService) {
        this.dataService = dataService;

        this.mechanisms = this.dataService.getMechanisms();
    }
}
