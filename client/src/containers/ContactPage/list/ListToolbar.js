import React from "react";
import Toolbar from "../../shared/styles/Toolbar";
import { Button, Tooltip, Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../selectors";
import actions from "../actions";
import { Link } from "react-router-dom";

const ListToolbar = () => {
    const destroyLoading = useSelector(selectors.selectDestroyLoading);
    const dataLoading = useSelector(selectors.selectDataLoading);
    const exportLoading = useSelector(selectors.selectExportLoading);
    const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys);
    const contacts = useSelector(selectors.selectBranchs);

    const dispatch = useDispatch();
    let doExport = () => {
        dispatch(actions.doExport(contacts));
    };

    let doDestroyAllSelected = () => {
        dispatch(actions.doDestroyAll(selectedRowKeys));
    };

    let renderExportButton = () => {
        const disabled = !contacts || dataLoading;

        const button = (
            <Button
                disabled={disabled}
                icon="file-excel"
                onClick={doExport}
                loading={exportLoading}
            >
                Export to Excel
            </Button>
        );

        if (disabled) {
            return <Tooltip title="Không có dữ liệu">{button}</Tooltip>;
        }

        return button;
    };

    let renderDestroyButton = () => {
        const disabled =
            (selectedRowKeys && !selectedRowKeys.length) || dataLoading;

        const button = (
            <Button
                disabled={disabled}
                loading={destroyLoading}
                type="primary"
                icon="delete"
            >
                Xóa
            </Button>
        );

        const buttonWithConfirm = (
            <Popconfirm
                title="Bạn có chắc chắn muốn xóa?"
                onConfirm={() => doDestroyAllSelected()}
                okText="Chắc chắn"
                cancelText="Hủy"
            >
                {button}
            </Popconfirm>
        );

        if (disabled) {
            return (
                <Tooltip title="Vui lòng chọn những trường muốn xóa">
                    {button}
                </Tooltip>
            );
        }

        return buttonWithConfirm;
    };

    const onReload = () => {
        dispatch(actions.list());
    };

    return (
        <Toolbar>
            <Link to="/contact/new">
                <Button type="primary" icon="plus">
                    Tạo
                </Button>
            </Link>
            {/* <Link to="/pet/importer">
                <Button type="primary" icon="upload">
                    {i18n("common.import")}
                </Button>
            </Link> */}

            {renderDestroyButton()}

            <Button type="primary" onClick={() => onReload()} icon="reload">
                Tải lại
            </Button>

            {renderExportButton()}
        </Toolbar>
    );
};

export default ListToolbar;
