import { Flex, Spin } from "antd"
import type React from "react"

const LoadingLayout: React.FC = () => {
  return (
    <Flex className="items-center justify-center">
      <Spin size="large" tip="loading" />
    </Flex>
  )
}

export default LoadingLayout
