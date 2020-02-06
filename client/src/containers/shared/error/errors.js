import Message from "../message";
import { getHistory } from "../../configureStore";

const DEFAULT_ERROR_MESSAGE = "Đã có lỗi xảy ra, vui lòng thử lại sau.";

function selectErrorMessage(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return (
            error.response.data.message + ` .Code: (${selectErrorCode(error)})`
        );
        // console.log(error.response.status);
    }
    // Something happened in setting up the request that triggered an Error
    return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorCode(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.status;
    }
    return 500;
}

export default class Errors {
    static handle(error) {
        if (process.env.NODE_ENV !== "test") {
            console.error(selectErrorMessage(error));
            console.error(error);
        }
        if (selectErrorCode(error) === 401) {
            getHistory().push("/401");
            window.localStorage.removeItem("ssauth");
            return;
        }
        if (selectErrorCode(error) === 403) {
            Message.error(
                "Xin lỗi bạn không có quyền thực hiện hành động này."
            );

            return;
        }

        if (
            selectErrorCode(error) === 400 ||
            selectErrorCode(error) === 409 ||
            selectErrorCode(error) === 404
        ) {
            Message.error(selectErrorMessage(error));
            return;
        }

        // getHistory().push("/500");
        Message.error(selectErrorMessage(error));
    }

    static errorCode(error) {
        return selectErrorCode(error);
    }

    static selectMessage(error) {
        return selectErrorMessage(error);
    }

    static showMessage(error) {
        Message.error(selectErrorMessage(error));
    }
}
