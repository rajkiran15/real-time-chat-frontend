
export const endpoints = {
    auth: {
        signIn: "/auth/sign-in",
        signUp: "/auth/sign-up"
    },
    user: {
        getUsers: "/user/users"
    },
    invite: {
        inviteUsers: "/invite/create-invite",
        getAllInvites: "/invite/invites",
        acceptInvite: "/invite/accept",
        rejectInvite: "/invite/reject"
    },
    chat: {
        getMessages: "/chat/messages"
    }
}