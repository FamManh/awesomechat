import React from "react";
import ErrorWrapper from "./styles/ErrorWrapper";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Error404Page = () => {
    return (
        <ErrorWrapper>
            <div className="exception">
                <div className="imgBlock">
                    <div
                        className="imgEle"
                        style={{
                            backgroundImage: `url(/images/404.svg)`
                        }}
                    />
                </div>
                <div className="content">
                    <h1>404</h1>
                    <div className="desc">Xin lỗi, trang bạn đang truy cập không tồn tại</div>
                    <div className="actions">
                        <Link to="/">
                            <Button type="primary">
                                Quay lại trang chủ
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </ErrorWrapper>
    );
};

export default Error404Page;
