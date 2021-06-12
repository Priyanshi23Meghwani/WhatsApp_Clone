export const initialState = {
    user: null,
    status : 'Hey, there i am using whatsapp',
    showProfile : false
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_STATUS: 'STATUS',
    SET_SHOWPROFILE: "SHOWPROFILE",
};

const reducer = (state, action) => {
    // console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_SHOWPROFILE:
            return {
                ...state,
                showProfile: action.showProfile,
            };

            default:
                return state;
    }
};

export default reducer;