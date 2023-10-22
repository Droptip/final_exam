import Header from "../components/Header.jsx";
import UserCard from "../components/UserCard.jsx";
import UserModal from "../components/UserModal.jsx";
import React, {useEffect, useState} from "react";
import {addUser, deleteUser, fetchUsers, modifyUser} from "../api/api.js";

const UsersPage = () => {
    const [open, setOpen] = React.useState(false);
    const [editUser, setEditUser] = useState(null);
    const [userList, setUserList] = useState([]);
    const handleOpen = (user) => {
        setEditUser(user);
        setOpen(true);
    }
    const handleClose = () => {
        setEditUser(null);
        setOpen(false);
    }
    
    const handleDelete = async (id) => {
        await deleteUser(id);
        await getUsers();
    }
    
    const handleCreate = async (user) => {
            if (user.id !== undefined && user.id !== null) {
                await modifyUser(user.id, user.name, user.lastname, user.email, user.birthDate);
            } else {
                await addUser(user.name, user.lastname, user.email, user.birthDate);
            }
            await getUsers();
    }
    
    const getUsers = async () => {
        const data = await fetchUsers();
        setUserList(data);
    };

    useEffect(() => {
        getUsers();
        }, []);
    
    return(
        <div className="wrapper">
            <UserModal open={open} handleCreate={handleCreate} handleClose={handleClose} userData={editUser}></UserModal>
            <Header handleOpen={() => handleOpen(null)}/>
            {userList.map((user) => (
                <UserCard key={user.id} user={user} handleEdit={handleOpen} handleDelete={handleDelete}/>
                ))}
        </div>
        );
}

export default UsersPage;