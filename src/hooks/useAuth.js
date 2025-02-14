import { useState } from "react";
import { api } from "../api/index";
import { endpoints } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const formInput = {
    username: "",
    password: "",
};

const useAuth = () => {
    const [tab, setTab] = useState(0);
    const [formData, setFormData] = useState({ ...formInput });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleTabChange = (_, newValue) => {
        setTab(newValue);
        setFormData({ ...formInput });
        setErrors({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        return true;
    };

    const handleSignin = () => {
        api.postApi(endpoints.auth.signIn, formData).then((res) => {
            localStorage.setItem("access_token", res.token);
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("userName", res.userName);
            alert("Login successfull.");
            return navigate("/testing");
        }).catch((err) => {
            alert("Something went wrong, please try again.");
        });
    }

    const handleSignup = () => {
        api.postApi(endpoints.auth.signUp, formData).then((res) => {
            alert("Signup successfull.");
        }).catch((err) => {
            alert("Something went wrong, please try again.");
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (tab === 0) handleSignin()
            else handleSignup();
        }
    };

    return {
        tab,
        formData,
        errors,
        showPassword,
        setShowPassword,
        handleTabChange,
        handleSubmit,
        handleChange,
    };
};

export default useAuth;
