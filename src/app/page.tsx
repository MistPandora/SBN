'use client'

import Image from "next/image";

import { CustomInput } from "@components/CustomInput";
import CustomRadio from "@components/CustomRadio";
import { inputsDefaultContent, inputsLabels } from "@datas/inputsDefaultContent";
import { radioContent, shortcuts } from "@datas/radioContent";
import { calculateValuesWithWorktime, changingRateValues, convertAllValues } from "@modules";
import styles from "@styles/page.module.css";
import { useEffect, useState } from "react";
import { Range } from "react-range";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fullLogo from "@assets/images/full-logo.png";


export default function Home() {

  const [rangeValue, setRangeValue] = useState<number[]>([100]);
  const worktime = rangeValue[0] / 100;

  const [inputs, setInputs] = useState<Record<string, string>>(inputsDefaultContent);
  const [originalValues, setOriginalValues] = useState<Record<string, string>>(inputs);
  const [checkedRadioValue, setCheckedRadioValue] = useState<string>("22");

  useEffect(() => {
    setInputs(changingRateValues(calculateValuesWithWorktime(originalValues, worktime, inputs), checkedRadioValue));
  }, [worktime, originalValues, checkedRadioValue]);


  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const targetName = e.target.name;
    let newValue = e.target.value.replace(',', '.');

    if (/^\d+\.$/g.test(newValue)) {
      setInputs(prevValues => ({ ...prevValues, [targetName]: newValue }));
      return;
    }

    const isHoraireModified = targetName.includes("horaire");

    const isValid = /^\d+(\.)?\d*$/g.test(newValue) || newValue.length === 0;
    if (!isValid) return;

    if (newValue.length > 1 && newValue[0] === "0") newValue = newValue.slice(1);

    setInputs((convertAllValues(targetName, isHoraireModified ? newValue : (Number(newValue) / worktime).toString(), checkedRadioValue)));
    setOriginalValues((convertAllValues(targetName, isHoraireModified ? newValue : (Number(newValue) / worktime).toString(), checkedRadioValue)));
  };

  const handleRadioInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckedRadioValue(e.target.value);
  };

  const inputElements: JSX.Element[] = inputsLabels.map((label, i) => {

    const name: string = label.toLowerCase().replace(' ', '-');
    const value = inputs[name] || "0";

    let infoBlock = name === "mensuel-brut" ? `${shortcuts[checkedRadioValue]} -${checkedRadioValue}%` : null;

    return (
      <CustomInput
        key={i}
        id={name}
        name={name}
        label={label}
        type="text"
        handleTextInputChange={handleTextInputChange}
        value={value}
        infoBlock={infoBlock}
      />
    )
  });

  const radioElements: JSX.Element[] = radioContent.map((radio, i: number) => {
    const { label, name, value } = radio;
    const isChecked = checkedRadioValue === value;

    return (
      <CustomRadio
        key={i}
        label={label}
        id={name}
        name={name}
        value={value}
        handleRadioInputChange={handleRadioInputChange}
        checked={isChecked}
      />
    )
  })


  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.logoContainer}>

          <Image src={fullLogo} alt="logo" />
        </div>
        <h1 className={styles.title}>Salaire Brut en Net</h1>
      </div>
      <main className={styles.main}>
        <div className={styles.inputsContainer}>
          {inputElements}
        </div>

        <div className={styles.rightContainer}>

          <div className={styles.rangeContainer}>

            <p className={styles.rangeLabel}>Temps de travail: {`${rangeValue}%`}</p>
            <Range
              step={5}
              min={5}
              max={100}
              values={rangeValue}
              onChange={(values) => setRangeValue(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{ ...props.style }}
                  className={styles.rangeTrack}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => {
                return (
                  <div
                    {...props}
                    key={props.key}
                    style={{ ...props.style }}
                    className={styles.rangeThumb}
                  >
                    <FontAwesomeIcon icon={faBars} className={styles.rangeIcon} />
                  </div>
                )
              }}
            />
          </div>
          <div className={styles.radiosContainerBorder}>
            <div className={styles.radiosContainer}>
              {radioElements}
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
