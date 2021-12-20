import uniqid from "uniqid";

export const nestedNotes = [
    {
        id: 1,
        name: "Lista Zakupów",
        subList: [
            {
                id: 1,
                name: "Zakupy w Media expert",
                subList: [
                    {
                        id: 1,
                        name: "Komputor",
                        subList: []

                    },

                    {
                        id: 2,
                        name: "Myszek",
                        subList: [],
                    },
                ],

            }
        ],
    },
    {
        id: 2,
        name: "Zakupy w Biedrze",
        subList: [
            {
                id: 1,
                name: "Zakupy obiadowe",
                subList: [
                    {
                        id: 1,
                        name: "Piwo",
                        subList: [],
                    },

                    {
                        id: 2,
                        name: "Pizza serowa",
                        subList: [],

                    },
                ],
            },

            {
                id: 2,
                name: "Zakupy świąteczne",
                subList: [],
            },
        ],

    },
];
