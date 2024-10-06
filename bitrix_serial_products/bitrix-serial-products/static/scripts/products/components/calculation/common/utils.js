
function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    if (isNaN(dateObj.getTime())) {
        return "";
    }

    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}.${month}.${year}`;
}


function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function roundToTwoDecimals(number) {
    number = number || 0;
    return Math.round(number * 100) / 100;
}

export { formatDate, getCurrentDate, roundToTwoDecimals };
