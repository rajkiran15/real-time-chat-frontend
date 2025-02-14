import { useState, useEffect } from "react";
import { api } from "../api";
import { endpoints } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const useInvitation = () => {
    const navigate = useNavigate();

    const sendInvitation = async (data) => {
        api.postApi(endpoints.invite.inviteUsers, data).then((res) => {
           alert("Invitation sent successfully.");
        }).catch((err) => {
           alert("Something went wrong, please try again.");
        });
    }

    const handleAccept = async (id) => {
        api.updateApi(`${endpoints.invite.acceptInvite}/${id}`).then((res) => {
           alert("Invitation accepted successfully.");
           navigate(`/testing/chat/${res.chatId}`);
        }).catch((err) => {
           alert("Something went wrong, please try again.");
        });
    }

    const handleReject = async (id) => {
        api.updateApi(`${endpoints.invite.rejectInvite}/${id}`).then((res) => {
           alert("Invitation sent successfully.");
        }).catch((err) => {
           alert("Something went wrong, please try again.");
        });
    }

    return { sendInvitation, handleAccept, handleReject };
};

export default useInvitation;
