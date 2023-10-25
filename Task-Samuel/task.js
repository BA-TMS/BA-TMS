var Button = /** @class */ (function () {
    function Button(text, onClick) {
        this.text = text;
        this.onClick = onClick;
    }
    Button.prototype.render = function () {
        document.body.innerHTML += "<button onClick=\"".concat(this.onClick, "\">").concat(this.text, "</button>");
    };
    return Button;
}());
var InputField = /** @class */ (function () {
    function InputField(value, onChange) {
        this.value = value;
        this.onChange = onChange;
    }
    InputField.prototype.render = function () {
        document.body.innerHTML += "<input type=\"text\" value=\"".concat(this.value, "\" onChange=\"").concat(this.onChange, "\" />");
    };
    return InputField;
}());
var Table = /** @class */ (function () {
    function Table(data) {
        this.data = data;
    }
    Table.prototype.render = function () {
        document.body.innerHTML += "<table>".concat(this.data.map(function (row) { return "<tr>".concat(row.map(function (cell) { return "<td>".concat(cell, "</td>"); }).join(''), "</tr>"); }).join(''), "</table>");
    };
    return Table;
}());