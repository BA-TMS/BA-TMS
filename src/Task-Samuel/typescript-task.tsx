import React, { MouseEventHandler } from 'react';

// Button Component
interface ButtonProps {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
};

// Table Component
interface TableProps {
    data: any[][];
}

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <table>
            {data.map((row, index) => (
                <tr key={index}>
                    {row.map((cell, i) => (
                        <td key={i}>{cell}</td>
                    ))}
                </tr>
            ))}
        </table>
    );
};

// InputField Component
interface InputFieldProps {
    label: string;
    type: string;
    id: string;
    name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, id, name }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={name} />
        </div>
    );
};

export { Button, Table, InputField };
