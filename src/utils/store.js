const cards = [
    {
        id: "card-1",
        title: "First Task",
    },
    {
        id: "card-2",
        title: "Second Task",
    },
    {
        id: "card-3",
        title: "Third Task",
    },
];

const data = {
    lists: {
        "list-1": {
            id: "list-1",
            title: "First Title",
            cards,
        },
        "list-2": {
            id: "list-2",
            title: "Second Title",
            cards: [],
        },
    },
    listIds: ["list-1", "list-2"],
};

export default data;
