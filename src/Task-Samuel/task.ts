class Button {
    text: string;
    onClick: () => void;

    constructor(text: string, onClick: () => void) {
        this.text = text;
        this.onClick = onClick;
    }

    render() {
        document.body.innerHTML += `<button onClick="${this.onClick}">${this.text}</button>`;
    }
}

class InputField {
    value: string;
    onChange: (value: string) => void;

    constructor(value: string, onChange: (value: string) => void) {
        this.value = value;
        this.onChange = onChange;
    }

    render() {
        document.body.innerHTML += `<input type="text" value="${this.value}" onChange="${this.onChange}" />`;
    }
}

class Table {
    data: any[];

    constructor(data: any[]) {
        this.data = data;
    }

    render() {
        document.body.innerHTML += `<table>${this.data.map(row => `<tr>${row.map((cell: any) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</table>`;
    }
}