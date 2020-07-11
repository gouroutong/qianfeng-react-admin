import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, message, Upload, Icon } from "antd";
import { newProduct, getOneById } from "../../../services/products";
// import { loginApi } from "../../../services/auth";
import { serverUrl } from "../../../utils/config";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

function Edit(props) {
  //props.match.id存在 =》 修改，否则是新增

  const { getFieldDecorator } = props.form;
  const [currentdata, setCurrentdata] = useState({});
  const { params } = props.match;
  const id = params.id * 1;
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorState, SetEditorState] = useState(
    BraftEditor.createEditorState("")
  );

  useEffect(() => {
    if (id) {
      getOneById({ id }).then((res) => {
        setCurrentdata(res);
        setImageUrl(res.cover);
        SetEditorState(BraftEditor.createEditorState(res.content));
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      values.id = id;
      if (!err) {
        newProduct({
          ...values,
          cover: imageUrl,
          content: editorState.toHTML(),
        })
          .then((res) => {
            props.history.push("/admin/products");
          })
          .catch((err) => {});
      } else {
        message.error("请输入正确的内容");
      }
    });
  };

  const priceValidator = (rule, value, callback) => {
    if (value * 1 > 100) {
      callback("价格不能于100");
    } else {
      callback();
    }
  };

  const uploadButton = (
    <div>
      <Icon type={loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      console.log(info)
      setImageUrl(info.file.response.result);
    }
  };

  //富文本编辑器
  const handleEditorChange = (v) => {
    SetEditorState(v);
  };
  console.log(imageUrl)
  return (
    <Card title="商品编辑">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Item label="名字">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入名字" }],
            initialValue: currentdata.name,
          })(<Input placeholder="输入商品名字" />)}
        </Form.Item>
        <Form.Item label="价格">
          {getFieldDecorator("price", {
            rules: [
              { required: true, message: "请输入价格" },
              {
                validator: priceValidator,
              },
            ],
            initialValue: currentdata.price,
          })(<Input placeholder="输入商品价格" />)}
        </Form.Item>
        <Form.Item>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={serverUrl + "/api/admin/upload"}
            onChange={(info) => handleChange(info)}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="详情">
          <BraftEditor
            value={editorState}
            onChange={(v) => handleEditorChange(v)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

//todo
export default Form.create({ name: "productEdit" })(Edit);
