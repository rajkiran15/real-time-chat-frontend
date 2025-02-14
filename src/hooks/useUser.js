import { useState, useEffect } from "react";
import { api } from "../api/index";
import { endpoints } from "../api/endpoints";


const useUser = () => {
    const [users, setUsers] = useState([]);

    const getAllUsers = () => {
        api.getApi(endpoints.user.getUsers).then((res) => {
            setUsers(res.data);
        });
    }

    useEffect(() => {
        getAllUsers();
    },[]);

   return { users };
}

export default useUser;