import React, { useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { AnyAction } from "redux";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ShoppingItems } from "../../store/shopping/types";
import { ThunkDispatch } from "redux-thunk";
import {
	createNewShopList,
	createNewSubItem,
	deleteSubItems,
	deleteShopList,
} from "../../store/shopping/action";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

interface PropsFromState {
	data: ShoppingItems[];
}

interface propsFromDispatch {
	createNewShopList: (title: string) => any;
	createNewSubItem: (newItem: any) => any;
	deleteSubItems: (toDelete: any) => any;
	deleteShopList: (id: any) => any;
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 20,
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	paperModal: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	bg: {
		backgroundColor: "white",
		marginTop: 6,
	},
	spacing: {
		margin: 30,
	},
	title: {
		marginLeft: 20,
	},
}));

type AllProps = PropsFromState & propsFromDispatch;

const HomePage: React.FC<AllProps> = ({
	data,
	createNewShopList,
	createNewSubItem,
	deleteSubItems,
	deleteShopList,
}) => {
	const classes = useStyles();
	console.log(data);
	if (data[0] !== undefined) {
		if (typeof data[0] == "string") {
			data.pop();
		}
	}

	let [title, setTitle] = useState("");
	const [open, setOpen] = React.useState(false);
	const [subItemTitle, setsubItemTitle] = React.useState("");
	const [selectedShopId, setselectedShopId] = React.useState("");

	const createNewList = () => {
		console.log("---");
		createNewShopList(title);
	};

	const addNewSubitem = () => {
		var toEdit = {
			id: selectedShopId,
			item: subItemTitle,
		};
		createNewSubItem(toEdit);
		handleClose();
	};

	const handleOpen = (id: any) => {
		setselectedShopId(id);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const deleteSubItem = (toDelete: any) => {
		deleteSubItems(toDelete);
	};

	const deleteShop = (id: any) => {
		deleteShopList({ shopId: id });
	};

	return (
		<div className={classes.spacing}>
			<Grid container spacing={3} alignItems="center" justify="center">
				<div style={{ marginTop: "40px" }}>
					<h4>Add New Shopping List</h4>

					<TextField
						id="outlined-basic"
						style={{ width: 580 }}
						label="Create New Shoping List"
						variant="outlined"
						onChange={(v) => setTitle(v.target.value)}
					/>

					<Grid container spacing={2} style={{ marginTop: 12 }}>
						<Button
							onClick={() => createNewList()}
							variant="contained"
							color="secondary"
						>
							Create
						</Button>
					</Grid>
				</div>
			</Grid>

			<div className={classes.root}>
				<Grid container spacing={3}>
					{data.map((item, index) => {
						return (
							<Grid
								key={index}
								container
								className={classes.bg}
								spacing={2}
								item
								xs={3}
							>
								<div className={classes.root}>
									<List component="nav" aria-label="main mailbox folders">
										<ListItem>
											<Typography variant="h6" gutterBottom>
												{item.title}
											</Typography>
											<ListItemSecondaryAction>
												<Link
													to={{
														pathname: "/edit-shop",
														state: {
															id: item.id,
															title: item.title,
															type: "shopList",
														},
													}}
												>
													<IconButton edge="end" aria-label="delete">
														<EditIcon />
													</IconButton>
												</Link>
											</ListItemSecondaryAction>
										</ListItem>

										<Divider />

										{item.subItems.map((subitem, index) => {
											return (
												<ListItem key={index} button>
													<ListItemIcon
														onClick={() =>
															deleteSubItem({
																shopId: item.id,
																subId: subitem.id,
															})
														}
													>
														<DeleteIcon />
													</ListItemIcon>
													{subitem.item}

													<ListItemSecondaryAction>
														<Link
															to={{
																pathname: "/edit-shop",
																state: {
																	id: item.id,
																	subId: subitem.id,
																	title: subitem.item,
																	type: "subShopItem",
																},
															}}
														>
															<IconButton edge="end" aria-label="delete">
																<EditIcon />
															</IconButton>
														</Link>
													</ListItemSecondaryAction>
												</ListItem>
											);
										})}
									</List>
									<Divider />
									<List component="nav" aria-label="secondary mailbox folders">
										<ListItem onClick={() => handleOpen(item.id)} button>
											<ListItemIcon>
												<AddIcon />
											</ListItemIcon>
											<ListItemText primary="Add new shop item" />
										</ListItem>

										<ListItem onClick={() => deleteShop(item.id)} button>
											<ListItemIcon>
												<DeleteIcon />
											</ListItemIcon>
											<ListItemText primary="Delete" />
										</ListItem>
									</List>
								</div>
							</Grid>
						);
					})}
				</Grid>
			</div>

			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paperModal}>
						<h4>Add new Item</h4>
						<TextField
							id="outlined-basic"
							style={{ width: 240 }}
							label="New Item"
							variant="outlined"
							onChange={(v) => setsubItemTitle(v.target.value)}
						/>
						<br />

						<Button
							style={{ marginTop: 12 }}
							onClick={addNewSubitem}
							variant="contained"
							color="secondary"
						>
							Create
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

const mapStateToProps = ({ shop }: ApplicationState) => ({
	data: shop.data,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		createNewShopList: (title: string) => {
			dispatch(createNewShopList(title));
		},

		createNewSubItem: (newItem: any) => {
			dispatch(createNewSubItem(newItem));
		},
		deleteSubItems: (toDelete: any) => {
			dispatch(deleteSubItems(toDelete));
		},
		deleteShopList: (id: any) => {
			dispatch(deleteShopList(id));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
