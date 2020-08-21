import React, { useState } from "react";
import { InputBase, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

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
    form: {
        flexGrow: "1",
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
}));

const ListTitle = ({ title }) => {
    const styles = useStyles();

    const [newTitleList, setNewTitleList] = useState(title);

    const handleListTitle = (value) => {
        setNewTitleList(value);
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
                        value={newTitleList}
                        placeholder="Type Task's Title here"
                        fullWidth
                        onChange={(e) => handleListTitle(e.currentTarget.value)}
                        onKeyDown={controlEnterKey}
                    />
                </form>
            </Box>
        </div>
    );
};

ListTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ListTitle;
