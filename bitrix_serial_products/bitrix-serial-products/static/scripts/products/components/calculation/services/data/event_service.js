

export default class EventService {
    constructor(eventEmitter, calculationService) {
        this.eventEmitter = eventEmitter;
        this.calculationService = calculationService;
    }

    subscribeEvents() {
        this.eventEmitter.on('changeMaterialPrice', this.calculationService.changeMaterialPrice.bind(this.calculationService));
        this.eventEmitter.on('changeMaterialComment', this.calculationService.changeMaterialComment.bind(this.calculationService));
        this.eventEmitter.on('answerQuestion', this.calculationService.changeAnswerToQuestion.bind(this.calculationService));
        // this.eventEmitter.on('changeFotEstimate', this.calculationService.changeFotEstimate.bind(this.calculationService));
        this.eventEmitter.on('changeFotAllocatedHours', this.calculationService.changeFotAllocatedHours.bind(this.calculationService));
        
        this.eventEmitter.on('changeFotCoefficient', this.calculationService.changeFotCoefficient.bind(this.calculationService));
        this.eventEmitter.on('changeFotComment', this.calculationService.changeFotComment.bind(this.calculationService));
        this.eventEmitter.on('changeGeneralComment', this.calculationService.changeGeneralComment.bind(this.calculationService));

        this.eventEmitter.on('changeEconomyMargin', this.calculationService.changeEconomyMargin.bind(this.calculationService));
    }
}
