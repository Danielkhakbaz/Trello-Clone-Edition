import React from "react";
import Title from "../Title/Title";
import Cards from "../Cards/Cards";
import InputContainer from "../InputContainer/InputContainer";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

const useStyle = makeStyles((theme) => ({
    root: {
        minWidth: "300px",
        backgroundColor: "#EBECF0",
        marginLeft: theme.spacing(1),
    },
    cardContainer: {
        marginTop: theme.spacing(4),
    },
}));

const List = ({ list, index, onHandleDeleteList }) => {
    const classes = useStyle();

    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <Paper
                        className={classes.root}
                        {...provided.dragHandleProps}
                    >
                        <Title
                            title={list.title}
                            listId={list.id}
                            onHandleDeleteList={onHandleDeleteList}
                        />
                        <Droppable droppableId={list.id}>
                            {(provided) => (
                                <div
                                    className={classes.cardContainer}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {list.cards.map((card, index) => (
                                        <Cards
                                            card={card}
                                            index={index}
                                            key={card.id}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <InputContainer listId={list.id} type="card" />
                    </Paper>
                </div>
            )}
        </Draggable>
    );
};

export default List;

List.propTypes = {
    list: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onHandleDeleteList: PropTypes.func.isRequired,
};
