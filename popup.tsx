import { Button, Input, Table, Tag, type TableProps } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"

interface Data {
  fastestFee: number
  halfHourFee: number
  hourFee: number
  economyFee: number
  minimumFee: number
}

const getPrice = (fee: number) => {
  return ((fee * 180 + 1999 + 546) * 0.0004).toFixed(2)
}

function IndexPopup() {
  const [dataSource, setDataSource] = useState([])
  const [customGasFee, setCustomGasFee] = useState("")

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
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <Tag color="error">{text}</Tag>
            <span>${getPrice(text)}</span>
          </span>
        )
      }
    },
    {
      title: "经济费用",
      key: "economyFee",
      dataIndex: "economyFee",
      render(text) {
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <Tag color="warning">{text}</Tag>
            <span>${getPrice(text)}</span>
          </span>
        )
      }
    },
    {
      title: "最低费用",
      key: "minimumFee",
      dataIndex: "minimumFee",
      render(text) {
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <Tag color="success">{text}</Tag>
            <span>${getPrice(text)}</span>
          </span>
        )
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
      <div
        style={{
          display: "flex",
          gap: 50,
          alignItems: "center",
          marginBottom: 10
        }}>
        <Button onClick={onGetGasFeeOnline}>获取最新数据</Button>
        <Input
          value={customGasFee}
          onChange={({ target }) =>
            setCustomGasFee((target as HTMLInputElement).value)
          }
          placeholder="请输入自定义费用"
        />
      </div>
      {customGasFee && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 10
          }}>
          <Tag>自定义费用</Tag>
          <Tag color="warning">{customGasFee}</Tag>
          <Tag color="success">
            <span>${getPrice(+customGasFee)}</span>
          </Tag>
        </div>
      )}
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default IndexPopup
