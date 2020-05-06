import React, { useEffect } from "react";
import { Icon, Collapse } from "antd";
import Search from "antd/lib/input/Search";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import selectors from "../selectors";
import ListContact from "./ListContact";
import ListRequest from "./ListRequest";
import ListRequestSent from "./ListRequestSent";

const { Panel } = Collapse;

const ContactList = () => {
    const dispatch = useDispatch();
    const requests = useSelector(selectors.selectRequests);
    const requestsSent = useSelector(selectors.selectRequestsSent);
    const handleSearch = (term) => {
        dispatch(actions.list({ term }));
    };

    // const searchbar = (
    //     <div className="py-3 px-3" style={{ backgroundColor: "#fff" }}>
    //         <Search placeholder="Search contact" onSearch={handleSearch} />
    //     </div>
    // );

    useEffect(() => {
        dispatch(actions.listContacts());
        dispatch(actions.listRequestsSent());

        return () => {};
    }, []);

    return (
        <div className="scroll-y flex-1">
            {/* {searchbar} */}
            <Collapse
                style={{ overflowY: "auto" }}
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                    <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
            >
                {requests && requests.length > 0 && (
                    <Panel
                        header={`Request (${requests.length})`}
                        key="2"
                        style={{ padding: "10px 0px" }}
                    >
                        <ListRequest />
                    </Panel>
                )}
                {requestsSent && requestsSent.length > 0 && (
                    <Panel
                        header={`Request sent (${requestsSent.length})`}
                        key="3"
                        style={{ padding: "10px 0px" }}
                    >
                        <ListRequestSent />
                    </Panel>
                )}
            </Collapse>
            <ListContact />
        </div>
    );
};
export default ContactList;
