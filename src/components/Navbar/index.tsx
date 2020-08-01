import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

interface propsFromState {
	userName?: string;
}

type AllProps = propsFromState;

const Navbar: React.FC<AllProps> = ({ userName, children }) => {
	return (
		<div>
			<div>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">Welcome {userName}</Typography>
					</Toolbar>
				</AppBar>
			</div>

			{children}
		</div>
	);
};

const mapStateToProps = ({ shop }: ApplicationState) => ({
	userName: shop.userName,
});

const mapDispatchProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchProps)(Navbar);
