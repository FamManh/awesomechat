import { Table, Popconfirm } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React from "react";
import { Link } from "react-router-dom";
import TableWrapper from "../../shared/styles/TableWrapper";
import ButtonLink from "../../shared/styles/ButtonLink";
import { useSelector, useDispatch } from "react-redux";



const ListTable = () => {
    const dispatch = useDispatch();
    const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys)
    const contacts = useSelector(selectors.selectBranchs);
    let doDestroy = id => {
        dispatch(actions.doDestroy(id));
    };

    let columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: "",
            dataIndex: "",
            width: "160px",
            render: (_, record) => (
                <div className="table-actions">
                    <Link to={`/contact/${record.id}/view`}>Xem</Link>
                    <Link to={`/contact/${record.id}/edit`}>Sửa</Link>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa trường này?"
                        onConfirm={() => doDestroy(record.id)}
                        okText="Chắc chắn"
                        cancelText="Hủy"
                    >
                        <ButtonLink>Xóa</ButtonLink>
                    </Popconfirm>
                </div>
            )
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (_selectedRowKeys, _selectedRows) => {
            dispatch(
                actions.doTableRowSelection(_selectedRowKeys, _selectedRows)
            );
        }
    };

    const handleRowClick = record => {
        dispatch(actions.doTableRowClick(record.id, record));
    };

    return (
        <TableWrapper>
            <Table
                rowKey="id"
                loading={useSelector(selectors.selectDataLoading)}
                columns={columns}
                dataSource={contacts}
                rowSelection={rowSelection}
                onRow={record => ({
                    onClick: () => handleRowClick(record)
                })}
                // footer={()=>contacts.length + ' chi nhánh'}
                scroll={{ x: 1000, y: 500 }}
                bordered={true}
                pagination={false}
            />
        </TableWrapper>
    );
}

export default ListTable;
