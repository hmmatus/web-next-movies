import { type TransactionI } from "@/models/transaction.model"
import { Card, type CardProps } from "antd"
interface TransactionCardProps extends CardProps {
  transaction: TransactionI
}
const TransactionCard = (props: TransactionCardProps): JSX.Element => {
  const { transaction } = props
  return (
    <Card
      className={`${props.className} max-w-96 lg:shadow-lg rounded-lg`}
      {...props}
      title={transaction.id}
    >
      <p>{transaction.expirationDate}</p>
      <p>{transaction.type}</p>
      <p>{transaction.description}</p>
    </Card>
  )
}

export default TransactionCard
