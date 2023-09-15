import { BASE_URL } from "./config";

export const METHOD = {
    GET: 'GET',
    POST: 'POST'
};

export const ROUTES = {
    POST: {
        SIGN_UP: `${BASE_URL}/user-signup`,
        LOGIN: `${BASE_URL}/user-login`,
        DYNAMIC_ATTRIBUTES_ADD_EDIT_MODULE_WISE: `${BASE_URL}/add-edit-dynamic-attributes-module-wise`,
        CREATE_DYNAMIC_ATTRIBUTES: `${BASE_URL}/create-dynamic-attributes`,
        HEART_ACTIVITY: `${BASE_URL}/user-heart-activity`
    },
    GET: {
        USER_DETAILS: `${BASE_URL}/user-details`,
        SYMTOMPS_MODULES: `${BASE_URL}/symtomps-module-list`,
        DYNAMIC_ATTRIBUTES_LIST: `${BASE_URL}/dynamic-attribute-list`,
        MODULES: `${BASE_URL}/module-list`,
        USER_LIST: `${BASE_URL}/user-list`,
        ATTRIBUTE_LIST: `${BASE_URL}/attribute-type-list`,
        MODULE: `${BASE_URL}/module`,
        DYNAMIC_ATTRIBUTES_LIST_ML_SUPPORT: `${BASE_URL}/dynamic-attribute-list-ml-support`,
        TYPE_WISE_USER_LIST: `${BASE_URL}/type-wise-user-list`,
        MONTH_WISE_USER_JOINED: `${BASE_URL}/month-wise-user-joined`,
        DYNAMIC_ATTRIBUTE_VIEW: `${BASE_URL}/attribute-view`,
        HEART_PREDICTION_STATUS: `${BASE_URL}/user-heart-prediction-status`,
        ALARM_LIST: `${BASE_URL}/users-alarm-list`
    }
}