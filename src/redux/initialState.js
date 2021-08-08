export let initialState = {
    authState: {
        error: "",
        loading: false,
    },
    editorSettings: {
        theme: "",
        fontSize: "",
        language: "",
    },
    editorCodeValue: {
        codeValue: ""
    },
    editorCodeValueToPull: {
        codeValue: "",
        pushUserId: "",
    },
    users: [],
    chatMessages: [],
    codeChatWith: {
        username: "",
        profileImageURL: "",
        userId: "",
    },
}