import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { AnyAction } from "redux";
import { saveUserName } from "../../store/shopping/action";

import { ThunkDispatch } from "redux-thunk";
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(0),
			width: "60ch",
		},
	},
}));

interface propsFromDispatch {
	addUsername: (name: string) => any;
}

type Props = propsFromDispatch;

const EnterName: React.FC<Props> = ({ children, addUsername }) => {
	const classes = useStyles();
	let [name, setName] = useState("");

	const AddUserName = (name: string) => {
		addUsername(name);
	};

	return (
		<div>
			<Grid
				container
				spacing={2}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: "100vh" }}
			>
				<Grid container spacing={2} item xs={3}>
					<Typography variant="h4" gutterBottom>
						Please Enter Your Name
					</Typography>
					<form className={classes.root} noValidate autoComplete="off">
						<TextField
							id="outlined-basic"
							label="Please Enter Your Name"
							variant="outlined"
							onChange={(v) => setName(v.target.value)}
						/>
					</form>

					<Link to="/shoping-lists" style={{ textDecoration: "none" }}>
						<Button
							onClick={() => AddUserName(name)}
							style={{ marginTop: "12px" }}
							variant="outlined"
							color="secondary"
						>
							Next
						</Button>
					</Link>
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = () => ({});

const mapDispatchProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		addUsername: (item: string) => {
			dispatch(saveUserName(item));
		},
	};
};

export default connect(mapStateToProps, mapDispatchProps)(EnterName);
