export const TimeStamp = function () {
    Date.prototype.addHours = function (h) {
        this.setHours(this.getHours() + h);
        return this;
    };
    Date.prototype.addMinutes = function (m) {
        this.setMinutes(this.getMinutes() + m);
        return this;
    };
    var timestamp = Date.now();
    var date = new Date(timestamp);
    date.addHours(5);
    date.addMinutes(30); // converting to IST
    var h = date.getHours().toString();
    var m = date.getMinutes().toString();
    var s = date.getSeconds().toString();
    var month = (date.getMonth() + 1).toString();
    var d = date.getDate().toString();
    if (h.length === 1) h = "0" + h;
    if (m.length === 1) m = "0" + m;
    if (s.length === 1) s = "0" + s;
    if (d.length === 1) d = "0" + d;
    if (month.length === 1) month = "0" + month;
    var datevalue =
        date.getFullYear().toString() +
        "/" +
        month +
        "/" +
        d +
        " " +
        h +
        ":" +
        m +
        ":" +
        s +
        "| ";
    return datevalue;
};