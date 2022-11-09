export default {
    initialData: {
        "2022-08": {
            label: { month: "Août", year: "2022" },
            score: 250,
            alerts: { red: 0, orange: 0 },
            days: {
                "2022-08-29": {
                    alerts: { red: 0, orange: 0 },
                    ecogestes: {
                        chauffage: { raw: 50, multiplier: 1.5, total: 75 },
                        lumieres: { raw: 70, multiplier: 1.5, total: 105 }
                    },
                    score: 180
                },
                "2022-08-30": {
                    alerts: { red: 0, orange: 0 },
                    ecogestes: {
                        ecrans: { raw: 70, multiplier: 1, total: 70 }
                    },
                    score: 70
                }
            }
        },
        "2022-09": {
            label: { month: "Septembre", year: "2022" },
            score: 850,
            alerts: { red: 3, orange: 31 },
            days: {
                "2022-09-26": {
                    alerts: { red: 0, orange: 8 },
                    ecogestes: {
                        videoconf: { raw: 50, multiplier: 1.5, total: 75 },
                        electromenager: { raw: 30, multiplier: 1.5, total: 45 }
                    },
                    score: 120
                },
                "2022-09-27": {
                    alerts: { red: 0, orange: 6 },
                    ecogestes: {
                        teletravail: { raw: 50, multiplier: 1.5, total: 75 },
                        telephone: { raw: 50, multiplier: 1, total: 50 }
                    },
                    score: 125
                },
                "2022-09-28": {
                    alerts: { red: 0, orange: 4 },
                    ecogestes: {
                        chauffage: { raw: 50, multiplier: 1, total: 50 },
                        lumieres: { raw: 70, multiplier: 1.5, total: 105 }
                    },
                    score: 155
                },
                "2022-09-29": {
                    alerts: { red: 1, orange: 7 },
                    ecogestes: {
                        telephone: { raw: 50, multiplier: 3, total: 150 },
                        chargement: { raw: 30, multiplier: 3, total: 90 }
                    },
                    score: 240
                },
                "2022-09-30": {
                    alerts: { red: 2, orange: 6 },
                    ecogestes: {
                        veille: { raw: 70, multiplier: 3, total: 210 }
                    },
                    score: 210
                }
            }
        },
        "2022-10": {
            label: { month: "Octobre", year: "2022" },
            score: 465,
            alerts: { red: 0, orange: 4 },
            days: {
                "2022-09-28": {
                    alerts: { red: 0, orange: 3 },
                    ecogestes: {
                        chauffage: { raw: 50, multiplier: 1.5, total: 75 },
                        telephone: { raw: 50, multiplier: 1.5, total: 75 },
                        lumieres: { raw: 70, multiplier: 1.5, total: 105 }
                    },
                    score: 255
                },
                "2022-09-29": {
                    alerts: { red: 0, orange: 1 },
                    ecogestes: {
                        teletravail: { raw: 50, multiplier: 1.5, total: 75 },
                        box: { raw: 70, multiplier: 1.5, total: 105 },
                        electromenager: { raw: 30, multiplier: 1, total: 30 }
                    },
                    score: 210
                }
            }
        }
    }
}
