let _globalState: GlobalState = {
    token: "",
    user: {
        id: 0,
        name: "",
        email: "",
    },
    server: "http://10.29.20.89:8080"
};

export interface GlobalState {
    token: string,
    user: {
        id: number,
        name: string,
        email: string,
    },
    server: string
}

export const setGlobalState = (newState: GlobalState) => {
    _globalState = {..._globalState, ...newState};
};

export const setGlobalStateToken = (token: string) => {
    _globalState = {..._globalState, token: token};
};

export const setGlobalStateUserInfo = (user: {
    id: number,
    name: string,
    email: string,
}) => {
    _globalState = {..._globalState, user: user};
};

export const getGlobalState = (): GlobalState => {
    return _globalState;
};
