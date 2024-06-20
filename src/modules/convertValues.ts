const RoundWithTwoDecimals = (number: number) => (Math.round(number * 100) / 100)

export const horaireToMensuel = (horaire: number): number => (RoundWithTwoDecimals(horaire * 151.67));

export const mensuelToAnnuel = (mensuel: number): number => (RoundWithTwoDecimals(mensuel * 12));

export const horaireToAnnuel = (horaire: number): number => (mensuelToAnnuel(horaireToMensuel(horaire)));

export const mensuelToHoraire = (mensuel: number): number => (RoundWithTwoDecimals(mensuel / 151.67));

export const annuelToMensuel = (annuel: number): number => (RoundWithTwoDecimals(annuel / 12));

export const annuelToHoraire = (annuel: number): number => (mensuelToHoraire(annuelToMensuel(annuel)));

export const brutToNet = (brut: number, rate: number): number => (RoundWithTwoDecimals((brut -= (brut * rate))));

export const netToBrut = (net: number, rate: number): number => (RoundWithTwoDecimals((net / (1 - rate))));


let horaireBrut: number, horaireNet: number, mensuelBrut: number, mensuelNet: number, annuelBrut: number, annuelNet: number;

export const convertAllValues = (targetName: string, value: string, rate: string): Record<string, string> => {

    const newValue = value.length > 0 ? value : 0;
    const rateInPercentage = Number(rate) / 100;

    if (targetName === "horaire-brut") {

        horaireBrut = Number(newValue);
        horaireNet = brutToNet(horaireBrut, rateInPercentage);
        mensuelBrut = horaireToMensuel(horaireBrut);
        mensuelNet = horaireToMensuel(horaireNet);
        annuelBrut = mensuelToAnnuel(mensuelBrut);
        annuelNet = mensuelToAnnuel(mensuelNet);

    };

    if (targetName === "horaire-net") {

        horaireNet = Number(newValue);
        horaireBrut = netToBrut(horaireNet, rateInPercentage);
        mensuelBrut = horaireToMensuel(horaireBrut);
        mensuelNet = horaireToMensuel(horaireNet);
        annuelBrut = mensuelToAnnuel(mensuelBrut);
        annuelNet = mensuelToAnnuel(mensuelNet);

    };

    if (targetName === "mensuel-brut") {

        mensuelBrut = Number(newValue);
        mensuelNet = brutToNet(mensuelBrut, rateInPercentage);
        horaireBrut = mensuelToHoraire(mensuelBrut);
        horaireNet = mensuelToHoraire(mensuelNet);
        annuelBrut = mensuelToAnnuel(mensuelBrut);
        annuelNet = mensuelToAnnuel(mensuelNet);

    };

    if (targetName === "mensuel-net") {

        mensuelNet = Number(newValue);
        mensuelBrut = netToBrut(mensuelNet, rateInPercentage);
        horaireBrut = mensuelToHoraire(mensuelBrut);
        horaireNet = mensuelToHoraire(mensuelNet);
        annuelBrut = mensuelToAnnuel(mensuelBrut);
        annuelNet = mensuelToAnnuel(mensuelNet);

    };

    if (targetName === "annuel-brut") {

        annuelBrut = Number(newValue);
        annuelNet = brutToNet(annuelBrut, rateInPercentage);
        mensuelBrut = annuelToMensuel(annuelBrut);
        mensuelNet = annuelToMensuel(annuelNet);
        horaireBrut = mensuelToHoraire(mensuelBrut);
        horaireNet = mensuelToHoraire(mensuelNet);

    };

    if (targetName === "annuel-net") {

        annuelNet = Number(newValue);
        annuelBrut = netToBrut(annuelNet, rateInPercentage);
        mensuelBrut = annuelToMensuel(annuelBrut);
        mensuelNet = annuelToMensuel(annuelNet);
        horaireBrut = mensuelToHoraire(mensuelBrut);
        horaireNet = mensuelToHoraire(mensuelNet);

    };

    return {
        "horaire-brut": String(horaireBrut),
        "horaire-net": String(horaireNet),
        "mensuel-brut": String(Math.round(mensuelBrut)),
        "mensuel-net": String(Math.round(mensuelNet)),
        "annuel-brut": String(Math.round(annuelBrut)),
        "annuel-net": String(Math.round(annuelNet))
    }

}

export const changingRateValues = (originalValues: Record<string, string>, rate: string): Record<string, string> => {

    const newValues: Record<string, string> = {};
    const rateInPercentage = Number(rate) / 100;

    for (const key in originalValues) {
        if (key.includes("net")) {
            const firstWordKey = key.split('-')[0];
            switch (firstWordKey) {
                case "horaire":
                    newValues[key] = String(brutToNet(Number(originalValues["horaire-brut"]), rateInPercentage));
                    break;

                case "mensuel":
                    newValues[key] = String(Math.round(brutToNet(Number(originalValues["mensuel-brut"]), rateInPercentage)));
                    break;

                case "annuel":
                    newValues[key] = String(Math.round(brutToNet(Number(originalValues["annuel-brut"]), rateInPercentage)));
                    break;
            }
        } else {
            newValues[key] = originalValues[key]
        }
    }

    return newValues
}