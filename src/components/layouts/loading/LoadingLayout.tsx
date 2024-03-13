import { Flex, Spin } from "antd"

const LoadingLayout = () => {
  return (
    <Flex className="items-center justify-center">
      <Spin size="large" tip="loading" />
    </Flex>
  )
}

export default LoadingLayout