import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Nav from "./components/Nav/Nav";
import List from "./components/List/List";
import InputContainer from "./components/InputContainer/InputContainer";
import StoreApi from "./utils/storeApi";
import store from "./utils/store";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const useStyle = makeStyles(() => ({
    root: {
        width: "100%",
        minHeight: "100vh",
        overflowY: "auto",
    },
    listContainer: {
        display: "flex",
    },
}));

const App = () => {
    const classes = useStyle();

    const [data, setData] = useState(store);
    const [value, setValue] = useState("");

    const addMoreCard = (title, listId) => {
        const newCardId = data.length;
        const newCard = {
            id: newCardId,
            title,
        };
        const list = data.lists[listId];
        list.cards = [...list.cards, newCard];

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };

        setData(newState);
    };
    const addMoreList = (title) => {
        const newListId = data.length;
        const newList = {
            id: newListId,
            title,
            cards: [],
        };

        const newState = {
            listIds: [...data.listIds, newListId],
            lists: {
                ...data.lists,
                [newListId]: newList,
            },
        };

        setData(newState);
    };
    const updateListTitle = (title, listId) => {
        const list = data.lists[listId];
        list.title = title;

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };

        setData(newState);
    };
    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }
        if (type === "list") {
            const newListIds = data.listIds;
            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId);
            return;
        }

        const sourceList = data.lists[source.droppableId];
        const destinationList = data.lists[destination.droppableId];
        const draggingCard = sourceList.cards.filter(
            (card) => card.id === draggableId
        )[0];

        if (source.droppableId === destination.droppableId) {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);
            const newSate = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList,
                },
            };
            setData(newSate);
        } else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList,
                },
            };

            setData(newState);
        }
    };
    const handleTitleInput = (titleValue) => {
        setValue(titleValue);
    };
    const handleDeleteList = (cardID) => {
        const cards = data.lists.cards.filter((card) => card !== cardID);
        setData(cards);
    };

    return (
        <StoreApi.Provider
            value={{ addMoreCard, addMoreList, updateListTitle }}
        >
            <div className={classes.root}>
                <Navbar />
                <Nav inputValue={value} onTitleChange={handleTitleInput} />

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="app"
                        type="list"
                        direction="horizontal"
                    >
                        {(provided) => (
                            <div
                                className={classes.listContainer}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {data.listIds.map((listId, index) => {
                                    const list = data.lists[listId];
                                    return (
                                        <List
                                            index={index}
                                            list={list}
                                            key={listId}
                                            onHandleDeleteList={
                                                handleDeleteList
                                            }
                                        />
                                    );
                                })}
                                <InputContainer type="list" />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </StoreApi.Provider>
    );
};

export default App;
