import { getMonth } from "./components/common/services/service"

Date.prototype.formatFrenchLong = function (no_date = false) {
    const month = this.getMonth() + 1
    return `${no_date ? '' : this.getDate()} ${getMonth(month)} ${this.getFullYear()}`
}

Date.prototype.getNDate = function (n) {
    this.setDate(this.getDate() + n)
    return this
}


Date.prototype.areSameDayTo = function (date) {
    return this.getFullYear() === date.getFullYear() &&
        this.getMonth() === date.getMonth() &&
        this.getDate() === date.getDate()
}

Date.prototype.isWeAreGreatInSameDay = function (day) {
    return this.getDate() > day 
}

Array.prototype.chunk = function (chunkSize) {
    var result = [];
    for (var i = 0; i < this.length; i += chunkSize) {
        result.push(this.slice(i, i + chunkSize));
    }
    return result;
}


