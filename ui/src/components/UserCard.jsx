import {Avatar} from "@mui/material";

const UserCard = ({user, handleEdit, handleDelete}) => {
    
    return(
        <div className="user-card">
            <Avatar></Avatar>
            <div className="user-item">{user.name}</div>
            <div className="user-item">{user.lastname}</div>
            <div className="user-item">{user.email}</div>
            <div className="user-item">{user.birthDate}</div>
            <div className="user-buttons">
                <button onClick={() => handleEdit(user)}>edit</button>
                <button onClick={() => handleDelete(user.id)}>delete</button>
            </div>
        </div>
        );
}

export default UserCard;