export const calculateValuesWithWorktime = (originalInputsValues: Record<string, string>, worktime: number, inputValues: Record<string, string>): Record<string, string> => {
    const updatedValues = { ...inputValues };

    const keys = ["mensuel-brut", "mensuel-net", "annuel-brut", "annuel-net"];
    keys.forEach(key => {
        const keyValue = Number(originalInputsValues[key]);
        updatedValues[key] = Math.round((keyValue * worktime)).toString();
    });
    return updatedValues
}
