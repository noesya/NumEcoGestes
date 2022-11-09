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
                        videoconf: { raw: 50, multiplier: 1, total: 50 }
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
                        videoconf: { raw: 50, multiplier: 3, total: 150 },
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
                        teletravail: { raw: 50, multiplier: 1.5, total: 75 },
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
    },
    ecowattValues: [
        { "pas": 0, "hvalue": 1 },
        { "pas": 1, "hvalue": 1 },
        { "pas": 2, "hvalue": 1 },
        { "pas": 3, "hvalue": 1 },
        { "pas": 4, "hvalue": 1 },
        { "pas": 5, "hvalue": 1 },
        { "pas": 6, "hvalue": 1 },
        { "pas": 7, "hvalue": 1 },
        { "pas": 8, "hvalue": 1 },
        { "pas": 9, "hvalue": 1 },
        { "pas": 10, "hvalue": 3 },
        { "pas": 11, "hvalue": 3 },
        { "pas": 12, "hvalue": 2 },
        { "pas": 13, "hvalue": 2 },
        { "pas": 14, "hvalue": 1 },
        { "pas": 15, "hvalue": 1 },
        { "pas": 16, "hvalue": 1 },
        { "pas": 17, "hvalue": 1 },
        { "pas": 18, "hvalue": 2 },
        { "pas": 19, "hvalue": 3 },
        { "pas": 20, "hvalue": 2 },
        { "pas": 21, "hvalue": 1 },
        { "pas": 22, "hvalue": 1 },
        { "pas": 23, "hvalue": 1 }
    ]
}
