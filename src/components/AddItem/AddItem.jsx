import React, { useState } from "react";
import CardInput from "../CardInput/CardInput.jsx";
import { Paper, Typography, Collapse } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyle = makeStyles((theme) => ({
    root: {
        width: "auto",
        marginTop: theme.spacing(1),
    },
    addCard: {
        background: "#EBECF0",
        margin: theme.spacing(0, 1, 1, 1),
        padding: theme.spacing(1, 1, 1, 2),
        "&:hover": {
            backgroundColor: fade("#000", 0.25),
        },
    },
}));

const AddItem = ({ listId, type }) => {
    const classes = useStyle();

    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <CardInput listId={listId} type={type} setOpen={setOpen} />
            </Collapse>
            <Collapse in={!open}>
                <Paper
                    className={classes.addCard}
                    onClick={() => setOpen(!open)}
                >
                    <Typography>
                        {type === "card" ? "+ Add a Card" : "+ Add a List"}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    );
};

export default AddItem;

AddItem.propTypes = {
    listId: PropTypes.any,
    type: PropTypes.string.isRequired,
};
