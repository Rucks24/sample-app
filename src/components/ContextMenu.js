import React from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

const ContextMenu = ({x, y, isOpen, handleClose, deleteNode, detachNode, handleListKeyDown }) => {
  return (
    <Stack 
			direction="row"
			spacing={2}
			style={{
					top: y,
					left: x,
					position: "absolute"
			}}
    > 
			<>
				<Paper elevation={3}>
					<ClickAwayListener onClickAway={handleClose}>
						<MenuList
							autoFocusItem={isOpen}
							id="composition-menu"
							aria-labelledby="composition-button"
							onKeyDown={handleListKeyDown}
						>
							<MenuItem 
								onClick={deleteNode}
								sx={{ fontSize: 'large' }}
							>
								Delete Node
							</MenuItem>
							<MenuItem 
								onClick={detachNode}
								sx={{ fontSize: 'large' }} 
							>
									Detach Node
							</MenuItem>
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</>
    </Stack>
  );
}

export default ContextMenu;
