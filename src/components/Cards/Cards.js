import React, { useState } from "react";
import { Card, CardContent, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

const useStyle = makeStyles(() => ({
    card: {
        borderRadius: "3px",
        margin: "10px",
        "&:hover": {
            backgroundColor: "hsla(0,0%,100%,.32)",
        },
    },
    input: {
        fontSize: "15px",
    },
}));

const Cards = ({ card, index }) => {
    const styles = useStyle();

    const [tastTitleCard, setTaskTitleCard] = useState(card.title);

    const settitleListValue = (titleValue) => {
        setTaskTitleCard(titleValue);
    };
    const controlEnterKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <Card
                    className={styles.card}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <CardContent>
                        <InputBase
                            className={styles.input}
                            value={tastTitleCard}
                            placeholder="Type Task's Title here"
                            fullWidth
                            onChange={(e) =>
                                settitleListValue(e.currentTarget.value)
                            }
                            onKeyDown={controlEnterKey}
                        />
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
};

Cards.propTypes = {
    card: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default Cards;
