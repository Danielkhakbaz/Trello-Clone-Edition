import React, { useState, useContext } from "react";
import { InputBase, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import storeApi from "../../utils/storeApi";

const useStyles = makeStyles((theme) => ({
    list: {
        width: "300px",
        backgroundColor: "#EBECF0",
        margin: theme.spacing(1),
        padding: theme.spacing(0.2),
    },
    box: {
        display: "flex",
        margin: theme.spacing(1, 1, 0, 1),
        padding: theme.spacing(1),
    },
    input: {
        fontSize: "15px",
        fontWeight: "700",
        lineHeight: "32px",
        borderRadius: "3px",
        "&:hover": {
            backgroundColor: "hsla(0,0%,100%,.32)",
        },
    },
    form: {
        flexGrow: "1",
    },
    moreIcon: {
        color: "black",
        flexGrow: "1",
        alignSelf: "center",
    },
    class: {
        margin: theme.spacing(1),
    },
    card: {
        margin: theme.spacing(1),
    },
}));
export default function Title({ title, listId }) {
    const [newTitle, setNewTitle] = useState(title);
    const { updateListTitle } = useContext(storeApi);
    const styles = useStyles();
    const handleOnChange = (value) => {
        setNewTitle(value);
    };

    const controlEnterKey = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    };
    return (
        <div className={styles.list}>
            <Box className={styles.box} p={1}>
                <form className={styles.form} autoComplete="off" noValidate>
                    <InputBase
                        className={styles.input}
                        value={newTitle}
                        placeholder="Type Task's Title here"
                        fullWidth
                        onChange={(e) => handleOnChange(e.currentTarget.value)}
                        onKeyDown={controlEnterKey}
                    />
                </form>
            </Box>
        </div>
    );
}
