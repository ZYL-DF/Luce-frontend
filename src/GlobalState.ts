const _globalState: GlobalState = {
    server: "http://10.29.20.89:8080",
}

export interface GlobalState {
    server: string,
}

export const setGlobalState = (newState: GlobalState) => {
    setGlobalState(newState)
};

export const getGlobalState = (): GlobalState => {
    return _globalState;
};
