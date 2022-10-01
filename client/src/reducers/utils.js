import { ERROR, FORGET_PASSWORD } from "../constants/actionType";

const utils = { status: 0, message: '' }
export default (state = utils, action) => {
    switch (action.type) {
        case ERROR:
            return { ...state, message: action?.message, status: action?.status };
        default:
            return state;
    }
}