let _globalState: GlobalState = {
    server: "http://10.29.20.89:8080"
};

export interface GlobalState {
    server: string
}

export const setGlobalState = (newState: GlobalState) => {
    _globalState = {..._globalState, ...newState};
};

export const getGlobalState = (): GlobalState => {
    return _globalState;
};
