import React from 'react';

import styles from "@styles/customCheckbox.module.css";

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type RadioProps = {
    key: number,
    label: string,
    name: string,
    value: string,
    handleRadioInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void

} & React.ComponentPropsWithoutRef<'input'>;


export default function CustomRadio({ label, id, name, value, handleRadioInputChange, ...props }: RadioProps) {
    return (
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>
            <input
                id={id}
                name="status"
                type="radio"
                value={value}
                onChange={handleRadioInputChange}
                className={styles.radio}
                {...props}
            />
            <label htmlFor={name} className={`${styles.customRadio} ${props.checked ? styles.checked : ""}`}>
                {props.checked && <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />}
            </label>
        </div>
    )
}
