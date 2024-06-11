const _globalState: GlobalState = {
    server: "http://47.115.214.246:4060",
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
