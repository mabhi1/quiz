import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const classes = {
    li: "p-2 bg-slate-50 flex justify-between hover:bg-slate-100",
};
const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        (async function getData() {
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/user");
            setUsers(data.users);
        })();
    }, []);
    const handleClick = async (userId) => {
        const input = window.confirm("Are you sure you want to delete the user?");
        if (input === true) {
            try {
                await axios.delete(process.env.REACT_APP_BACKEND_URL + "/user/" + userId);
                setUsers((users) => {
                    return users.filter((user) => {
                        return user._id !== userId;
                    });
                });
                setSearchData((users) => {
                    return users.filter((user) => {
                        return user._id !== userId;
                    });
                });
                alert("User successfully deleted");
            } catch (error) {
                console.log(error);
            }
        }
    };
    const mapUsers = (userList) => {
        return userList.map((user) => {
            return (
                <li className={classes.li} key={user._id}>
                    <details>
                        <summary>{user.firstName ? user.firstName : user.email}</summary>
                        <p>
                            First Name : {user.firstName}
                            <br />
                            Last Name : {user.lastName}
                            <br />
                            Email : {user.email}
                            <br />
                        </p>
                    </details>
                    <MdDelete className="m-1 text-red-600 cursor-pointer" onClick={() => handleClick(user._id)} />
                </li>
            );
        });
    };
    const handleChange = (e) => {
        const str = e.target.value.toLowerCase();
        setSearchTerm(str);
        setSearchData(
            users.filter((user) => {
                return (
                    user.firstName?.toLowerCase().includes(str) ||
                    user.lastName?.toLowerCase().includes(str) ||
                    user.email?.toLowerCase().includes(str)
                );
            })
        );
    };
    return (
        <div className="w-96 bg-slate-200 mr-5 p-1 px-3 min-h-[80vh]">
            <div className="m-5 text-center">Users</div>
            <input type="text" name="search" className="rounded p-2 w-full mb-2" placeholder="Search Users" onChange={handleChange} />
            <ul>{searchTerm.length >= 1 ? mapUsers(searchData) : mapUsers(users)}</ul>
        </div>
    );
};

export default Users;
