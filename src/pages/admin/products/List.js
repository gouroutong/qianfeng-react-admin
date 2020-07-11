import React, { useEffect, useState } from "react";
import { Card, Table, Button, Popconfirm } from "antd";
import {
  delProduct,
  getProducts,
  getProductStatus
} from "../../../services/products";
// import {connect} from 'react-redux'
// import {loadProduct} from '../../../store/actions/products'
import "./list.css";

function List(props) {
  
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage,setCurrentPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)

  // const {list,page_num,total} = props

  useEffect(() => {
    // props.dispatch(loadProduct({page_num:currentPage,page_size:pageSize}))

    getProducts({page_num:currentPage,page_size:pageSize}).then((res) => {
      const {products,count,pageSize}  = res
      setDataSource(products);
      setTotal(count)
      setPageSize(pageSize)
    });
  }, [currentPage,pageSize]);

  const loadData = () => {
    getProducts({page_num:currentPage,page_size:pageSize}).then((res) => {
      const {products,count}  = res
      setDataSource(products);
      setTotal(count)
     
    });
  };

  const changePage = (page) => {
    setCurrentPage(page)
  }

  const columns = [
    {
      title: "序号",
      key: "id",
      width: 80,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "名字",
      dataIndex: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "是否在售",
      dataIndex: "onSale",
      render: (txt, record) => (record.on_sale ? "在售" : "已下架"),
    },
    {
      title: "操作",
      render: (text, record, index) => {
        return (
          <div>
            <Button
              size="small"
              type="primary"
              onClick={() =>
                props.history.push(`/admin/products/edit/${record.id}`)
              }
            >
              修改
            </Button>
            <Popconfirm
              title="确定删除此项？"
              onCancel={() => console.log("用户取消删除")}
              onConfirm={() =>
                delProduct({ id: record.id }).then((res) => {
                  loadData();
                })
              }
            >
              <Button size="small" type="danger" style={{ margin: "0 1rem" }}>
                删除
              </Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={() => {
                getProductStatus({
                  id: record.id,
                  on_sale: !record.on_sale,
                }).then((res) => {
                  loadData();
                });
              }}
            >
              {record.on_sale ? "下架" : "上架"}
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Card
      title="商品列表"
      extra={
        <Button
          type="primary"
          size="small"
          onClick={() => props.history.push("/admin/products/edit/0")}
        >
          新增
        </Button>
      }
    >
      <Table
        columns={columns}
        bordered
        dataSource={dataSource}
        rowKey="id"
        pagination={{ total, defaultPageSize: pageSize, onChange: changePage }}
        rowClassName={(record) => (record.on_sale ? "" : "bg-red")}
      />
    </Card>
  );
}

export default List ;
