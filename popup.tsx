import { Button, Table, Tag, type TableProps } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"

interface Data {
  fastestFee: number
  halfHourFee: number
  hourFee: number
  economyFee: number
  minimumFee: number
}

function IndexPopup() {
  const [dataSource, setDataSource] = useState([])
  const onGetGasFeeOnline = async () => {
    const { data } = await axios.get<Data>(
      "https://mempool.space/api/v1/fees/recommended"
    )

    console.log("🍔 - onGetGasFeeOnline - data ->", data)
    setDataSource([data])
  }

  const columns: TableProps<Data>["columns"] = [
    {
      title: "最快费用",
      key: "fastestFee",
      dataIndex: "fastestFee",
      render(text) {
        return <Tag color="error">{text}</Tag>
      }
    },
    {
      title: "半小时费用",
      key: "halfHourFee",
      dataIndex: "halfHourFee",
      render(text) {
        return <Tag color="warning">{text}</Tag>
      }
    },
    {
      title: "一小时费用",
      key: "hourFee",
      dataIndex: "hourFee",
      render(text) {
        return <Tag color="warning">{text}</Tag>
      }
    },
    {
      title: "经济费用",
      key: "economyFee",
      dataIndex: "economyFee",
      render(text) {
        return <Tag color="warning">{text}</Tag>
      }
    },
    {
      title: "最低费用",
      key: "minimumFee",
      dataIndex: "minimumFee",
      render(text) {
        return <Tag color="success">{text}</Tag>
      }
    }
  ]

  useEffect(() => {
    onGetGasFeeOnline()
  })

  return (
    <div
      style={{
        width: 400
      }}>
      <Button onClick={onGetGasFeeOnline}>获取最新数据</Button>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default IndexPopup
