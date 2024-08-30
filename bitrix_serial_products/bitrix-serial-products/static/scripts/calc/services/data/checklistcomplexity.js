import { ID_CHECKLIST_COMPLEXITY, FIELD_CHECKLIST_COMPLEXITY, PRODUCT_TYPES_CHECKLIST_COMPLEXITY } from '../../../configs/calc/checklistcomplexity.js';


export default class ChecklistComplexityService {
    constructor(rawChecklist) {
        this.rawChecklist = rawChecklist;
        this.questions = this.rawChecklist.map(item => this.mapCheckListItem(item));
    }

    reset() {
        this.questions = this.rawChecklist.map(item => this.mapCheckListItem(item));
    }

    setAnswer(id, answer) {
        // console.log("id = ", id);
        let question = this.getQuestion(id);
        question.answer = answer;
        question.isAnswered =  question.isQuestion ? true : answer;
        // console.log("question = ", question);
    }

    getCoefficientWorker(productData, worker) {
        let workerCoefficient = 0;
        for (const question of this.questions) {
            console.log(worker, ' => ', question);

            if (question.isQuestion) {
                if (question.answer) {
                    // console.log(worker, ' => ', question.coefficients[worker]);
                    workerCoefficient += +question.coefficients[worker] || 0;
                }
            } else {
                const isCoefficient = productData.questions?.[question.productField];
                // console.log(isCoefficient);
                if (isCoefficient) {
                    workerCoefficient += +question.coefficients[worker] || 0;
                }
            }
        }
        // console.log('workerCoefficient => ', workerCoefficient);
        return workerCoefficient;
    }

    isAllAnswered() {
        return this.questions.every((item) => item.isAnswered);
    }

    getQuestion(id) {
        // console.log("his.questions = ", this.questions);
        return this.questions.find((item) => item.id == id);
    }

    getQuestions() {
        return this.questions;
    }

    mapCheckListItem(item) {
        return {
            id: item.id,
            title: item?.[FIELD_CHECKLIST_COMPLEXITY.title],
            isQuestion: item?.[FIELD_CHECKLIST_COMPLEXITY.isQuestion] === 'Y',
            question: item?.[FIELD_CHECKLIST_COMPLEXITY.question],
            description: item?.[FIELD_CHECKLIST_COMPLEXITY.description],
            show: item?.[FIELD_CHECKLIST_COMPLEXITY.show] === 'Y',
            isAnswered: item?.[FIELD_CHECKLIST_COMPLEXITY.show] === 'Y' ? false : true,
            answer: null,

            checkFunction: item?.[FIELD_CHECKLIST_COMPLEXITY.checkFunction],   // функция для проверки
            productField: item?.[FIELD_CHECKLIST_COMPLEXITY.productField],   // название поля в объекте полученном из изделия
            controlValue: item?.[FIELD_CHECKLIST_COMPLEXITY.controlValue],   // контрольное значение

            coefficients: {
                development: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.development],
                saw: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.saw],
                assembly: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.assembly],
                foamProcessing: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.foamProcessing],
                sewing: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.sewing],
                upholstery: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.upholstery],
                carpentry: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.carpentry],
                carpentryAssembly: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.carpentryAssembly],
                painting: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.painting],
                paintingPreparation: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.paintingPreparation],
                // service: item?.[FIELD_CHECKLIST_COMPLEXITY.coefficietnts.service],
            }
        };
    }

    // checkPotochka() {
    //     return true;
    // }

    // checkListContainsControlValues(arr, controlValue) {
    //     const controlValues = controlValue.split(',');
    //     return controlValues.some((item) => arr.includes(item));
    // }

    // checkListNotContainsControlValues(arr, controlValue) {
    //     const controlValues = controlValue.split(',');
    //     return !controlValues.some((item) => arr.includes(item));
    // }
}





/*

1. Диван. Индивидуалка
если ПОТОЧКА то учитывается коэф.

2. Рыхлая ткань? требуется оверлог
поля коллекция ткани в Смарт База тканей - Тип ткани?. Если значение Шинилл, Букле или Рогожка - то кож. срабатывает

3. Проверка Механизма
поле Механизм в карточке изделия. Если значение НЕ РОВНО - Без механизма, то коэф. срабатывают

4. Форма РАДИУС
поле Форма в карточки изделия. Если она РОВНА - Радиусная, то коэ. срабатывают

5. Мягкие, рыхлые формы
Если ответ ДА - коэ. считается

6. Проверка типа Шва
поле в карточки изделия с типом шва (в блоках Подлокотник, Сидение, Спинка ). Если хоть в одном есть тип Двухстрочный или Кант, то коэ. срабатывает

7. Кол-во модулей
КЛИКЕР. Считываем поле из карточки изделия Кол-во моделей. Указанное значение умножаем на коэ. по сотрудникам

8. Проверка типа Шва №2
Системная проверка. Проверяем поле в карточки изделия с типом шва (в блоках Подлокотник, Сидение, Спинка ). Если хоть в одном есть тип Шов Наружу, то коэ. срабатывает

9. Деревянные опоры
Проверяем поле в карточки изделия Опоры (материал) и высота. Если материал стоит Деревянные, а значение высоты больше 80, то коэ. срабатывает

10. Деревянная рама и опоры
Проверяем поле в карточки изделия Опоры (материал). Если материал стоит Деревянные с рамой, то коэ. срабатывает

*/
