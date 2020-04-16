import React, { useState, useEffect } from 'react'
import { Modal, Button, AutoComplete, List, Avatar, Input, Divider } from "antd";
import Search from 'antd/lib/input/Search';
import userActions from '../UserPage/actions'
import userSelectors from '../UserPage/selectors'
import { useSelector, useDispatch } from 'react-redux';
import actions from './actions';
const { Option } = AutoComplete;

function ModalCreateGroupchat({visible, doToggle}) {
    let users = useSelector(userSelectors.selectUsers);
    const currentUser = useSelector(userSelectors.selectCurrentUser)
    const [members, setMembers] = useState([])
    const [groupName, setGroupName] = useState("Group name");
    const [term, setTerm] = useState("")
    const dispatch = useDispatch()

    const onSelect = (value, option) => {
        
        const memberExists = members.findIndex((item) => item.id === value);
        if(memberExists === -1) setMembers([...members, option.props.data]);
        
        setTerm("")
    }

    const onDeleteMember = (id) => {
        const tempData = members.filter(item => item.id !== id)
        setMembers(tempData);
    };

    const onSearch = term => {
        if(term.trim() !== ""){
            dispatch(userActions.list({term}));
        }
    };

    const children = users.map((item) => {
        if(item.id !== currentUser.id){
            return (
                <Option data={item} key={item.id}>
                    {item.firstname + " " + item.lastname}
                </Option>
            );
        }
    });

    

    const onCreateGroup = () => {
        if(members.length > 1){
            let membersListId = members.map(item=>item.id);
            dispatch(actions.doCreateGroup({ name: groupName, members:membersListId }));
            setGroupName("Group name");
            setMembers([])
        }
        doToggle();
    }

    const renderList = () => {
        return (
            <List
                className="flex-1 bg-transparent"
                itemLayout="horizontal"
                dataSource={members}
                renderItem={(item, index) => (
                    <List.Item className={`border-0 border-0 px-0 py-3`}>
                        <List.Item.Meta
                            avatar={
                                item.picture ? (
                                    <Avatar
                                        src={
                                            process.env.REACT_APP_STATIC_URI +
                                            "/" +
                                            item.picture
                                        }
                                    />
                                ) : (
                                    <Avatar
                                        size={48}
                                        style={{
                                            color: "#f56a00",
                                            backgroundColor: "#fde3cf",
                                        }}
                                    >
                                        {item.firstname[0].toUpperCase() +
                                            item.lastname[0].toUpperCase()}
                                    </Avatar>
                                )
                            }
                            title={
                                <>
                                    <span
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                        }}
                                    >
                                        {item.firstname + " " + item.lastname}
                                    </span>
                                </>
                            }
                            description={
                                <>
                                    <Button
                                        shape="round"
                                        size="small"
                                        onClick={() => onDeleteMember(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        );
    };

    return (
        <div>
            <Modal
                title="Create Group Chat"
                visible={visible}
                onOk={onCreateGroup}
                okButtonProps={{
                    disabled:
                        members.length > 1 && groupName.trim().length > 0
                            ? false
                            : true,
                }}
                okText="Create group"
                onCancel={doToggle}
            >
                <div
                    style={{ minHeight: "300px", maxHeight: "400px" }}
                    className="scroll-y"
                >
                    <Input
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter name of group"
                    />
                    <Divider orientation="left">Members </Divider>
                    <AutoComplete
                        // dataSource={Users}
                        style={{ width: "100%" }}
                        onSelect={onSelect}
                        onSearch={onSearch}
                        placeholder="Search"
                        onChange={(value) => setTerm(value)}
                        value={term}
                    >
                        {children}
                    </AutoComplete>
                    {renderList()}
                </div>
            </Modal>
        </div>
    );
}

export default ModalCreateGroupchat
