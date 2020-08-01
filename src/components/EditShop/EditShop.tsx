import React, { useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
	updateShopListTitle,
	updateSubShopItemTitle,
} from "../../store/shopping/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface propsFromDispatch {
	updateShopListTitle: (toUpdate: any) => any;
	updateSubShopItemTitle: (toUpdate: any) => any;
}

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(0),
			width: "60ch",
		},
	},
}));

type AllProps = propsFromDispatch;

const EditShop: React.FC<AllProps> = ({
	updateShopListTitle,
	updateSubShopItemTitle,
	children,
}) => {
	const location = useLocation();
	// @ts-ignore: Object is possibly 'null'.
	var title: string = location.state.title;
	// @ts-ignore: Object is possibly 'null'.
	var id: string = location.state.id;
	// @ts-ignore: Object is possibly 'null'.
	var type: string = location.state.type;

	var classes = useStyles();
	const [shopItemTitle, setShopItemTitle] = useState(title);

	const updateItem = () => {
		if (type === "shopList") {
			let toUpate = {
				id,
				newTitle: shopItemTitle,
			};
			updateShopListTitle(toUpate);
		} else {
			// @ts-ignore: Object is possibly 'null'.
			var subId: string = location.state.subId;

			let toUpate = {
				id,
				newItemTitle: shopItemTitle,
				subId,
			};

			updateSubShopItemTitle(toUpate);
		}
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
						{type === "shopList"
							? "Update Shop List Title"
							: "Update Shop Sub item"}
					</Typography>
					<form className={classes.root} noValidate autoComplete="off">
						<TextField
							id="outlined-basic"
							label="shop item"
							variant="outlined"
							defaultValue={shopItemTitle}
							onChange={(v) => setShopItemTitle(v.target.value)}
						/>
					</form>

					<Link to="/shoping-lists" style={{ textDecoration: "none" }}>
						<Button
							style={{ marginTop: "12px" }}
							variant="outlined"
							color="secondary"
							onClick={() => updateItem()}
						>
							Next
						</Button>
					</Link>
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = ({ shop }: ApplicationState) => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		updateShopListTitle: (toDelete: any) => {
			dispatch(updateShopListTitle(toDelete));
		},

		updateSubShopItemTitle: (toUpdate: any) => {
			dispatch(updateSubShopItemTitle(toUpdate));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditShop);
