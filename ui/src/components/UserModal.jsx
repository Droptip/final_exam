import {useEffect, useState} from "react";
import {Box, Button, Modal, TextField} from "@mui/material";

const UserModal = ({open, handleCreate, handleClose, userData}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [user, setUser] = useState(userData || { id: null, name: '', lastname: '', birthDate: '', email: '' });
    
    useEffect(() => { setUser(userData || { id: null, name: '', lastname: '', birthDate: '', email: '' }) }, [userData]);
    
    const handleSubmit = () => {
        handleCreate(user);
        handleClose();
    }
    
    return(
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={user.lastname}
                        onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                    />
                    <TextField
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={user.birthDate}
                        onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                    <Button onClick={handleClose}>Close Modal</Button>
                </form>
            </Box>
        </Modal>
        </>
        );
}

export default UserModal;