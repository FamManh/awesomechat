import React from 'react'
import { Upload, Modal, Icon, Avatar } from "antd";
import ImageUploadList from './ImageUploadList';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: "",
        fileList: []
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true
        });
    };

    handleChange = ({ fileList, file }) => {
        this.setState({ fileList });
    };
    
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    // openFileDialogOnClick
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    // onPreview={this.handlePreview}
                    // previewFile={this.previewFile}

                    onChange={this.handleChange}
                    multiple={true}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <ImageUploadList fileList={fileList} />
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                    />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall;
