import React, { useState, useContext } from "react";
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import APIContext from "../../Services/API/APIContext";
import PropTypes from "prop-types";

const useStyle = makeStyles((theme) => ({
    card: {
        width: "280px",
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4),
    },
    input: {
        margin: theme.spacing(1),
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1),
    },
    btnConfirm: {
        background: "#4bbf6b",
        color: "#fff",
        "&:hover": {
            background: fade("#4bbf6b", 0.75),
        },
    },
}));

const CardInput = ({ setOpen, listId, type }) => {
    const classes = useStyle();

    const [title, setTitle] = useState("");
    const { addMoreCard, addMoreList } = useContext(APIContext);

    const handleChangeInput = (e) => {
        setTitle(e.target.value);
    };
    const handleBtnConfirm = () => {
        if (type === "card") {
            addMoreCard(title, listId);
            setTitle("");
            setOpen(false);
        } else {
            addMoreList(title);
            setTitle("");
            setOpen(false);
        }
    };

    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase
                        inputProps={{
                            className: classes.input,
                        }}
                        value={title}
                        placeholder={
                            type === "card"
                                ? "Enter a title of this card.."
                                : "Enter list title..."
                        }
                        fullWidth
                        multiline
                        onChange={handleChangeInput}
                        onBlur={() => setOpen(false)}
                    />
                </Paper>
            </div>
            <div className={classes.confirm}>
                <Button
                    className={classes.btnConfirm}
                    onClick={
                        title !== "" ? handleBtnConfirm : () => setOpen(false)
                    }
                >
                    {type === "card" ? "Add Card" : "Add List"}
                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CardInput;

CardInput.propTypes = {
    setOpen: PropTypes.func,
    listId: PropTypes.any,
    type: PropTypes.string.isRequired,
};
