import React from 'react';
import ErrorWrapper from './styles/ErrorWrapper';
import {Link} from 'react-router-dom';
import { Button } from 'antd';

const Error403Page = () => {
    return (
    <ErrorWrapper>
        <div className="exception">
            <div className="imgBlock">
                <div
                    className="imgEle"
                    style={{
                        backgroundImage: `url(/images/403.svg)`
                    }}
                />
            </div>
            <div className="content">
                <h1>403</h1>
                <div className="desc">Xin lỗi, bạn không có quyền truy cập vào trang này</div>
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
)};

export default Error403Page;
