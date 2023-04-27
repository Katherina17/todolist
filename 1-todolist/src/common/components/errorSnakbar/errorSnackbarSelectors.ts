import {useSelector} from "react-redux";
import {AppRootStateType} from "app/store";

export const error = (state: AppRootStateType): null | string => state.app.error