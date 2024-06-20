
import React from 'react';

import styles from '@styles/customInput.module.css';

type InputProps = {
    id: string;
    label: string;
    value: string;
    handleTextInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    infoBlock: string | null

} & React.ComponentPropsWithoutRef<'input'>

export const CustomInput = ({ label, handleTextInputChange, value, infoBlock, ...props }: InputProps): JSX.Element => {

    return (
        <div className={styles.container}>
            <div>
                <label htmlFor={props.name} className={styles.label}>
                    {label}
                    {infoBlock && <p className={styles.infoBlock}>{infoBlock}</p>}
                </label>
            </div>
            <div className={styles.inputBorder}>
                <input {...props} onChange={e => handleTextInputChange(e)} value={value} />
            </div>
        </div>
    )
}