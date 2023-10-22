const Header = ({handleOpen}) => {
    return(
        <div className="header">
            <button onClick={handleOpen}>Add new user</button>
        </div>
    );
}

export default Header;