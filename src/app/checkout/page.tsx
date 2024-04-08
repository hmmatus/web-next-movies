"use client"
import { CheckoutMovieEnum, type MovieI } from "@/models/movie.model"
import { nextweek } from "@/utils/dateHandlers"
import { useMutation } from "@tanstack/react-query"
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Input,
  InputNumber,
  notification,
} from "antd"
import { useSearchParams } from "next/navigation"
import { useState, type ReactElement } from "react"
async function handlePurchase(): Promise<void> {
  console.log("The api call")
}
export default function Page(): ReactElement {
  const expirationDateFormat = "MM/YYYY"
  const params = useSearchParams()
  const movie: MovieI = JSON.parse(params.get("movie") ?? "")
  const checkoutType: CheckoutMovieEnum =
    (params.get("type") as CheckoutMovieEnum) ?? CheckoutMovieEnum.SALE
  const [qty, setQty] = useState(1)
  const [paymentCardInfo, setPaymentCardInfo] = useState({
    card: "",
    name: "",
    expiration: null,
    cvv: "",
  })
  const nextWeekDate = nextweek()
  const paymentMutation = useMutation({
    mutationFn: handlePurchase,
    onSuccess: () => {
      notification.success({
        message: "Purchase completed successfully",
        placement: "topRight",
      })
    },
    onError: (error) => {
      notification.error({
        message: error.message,
        placement: "topRight",
      })
    },
  })
  const onChangeQty = (value: number | null): void => {
    if (value != null) {
      setQty(value)
    }
  }
  const InfoCard = ({
    label,
    value,
  }: {
    label: string
    value: string | number
  }): ReactElement => {
    return (
      <Flex className="justify-between">
        <h3>{label}</h3>
        <p>{value}</p>
      </Flex>
    )
  }
  return (
    <main className="flex flex-col items-center w-full p-4">
      <section className="flex w-full max-w-lg flex-col md:shadow-md md:rounded-md p-4 mb-4 gap-2">
        <h1>Checkout</h1>
        <Divider />
        <InfoCard label="Title" value={movie.title} />
        <InfoCard label="Amount" value={`${movie[`${checkoutType}Amount`]}$`} />
        <Divider />
        <div className="flex gap-2">
          <label>Quantity</label>
          <InputNumber
            min={1}
            max={movie.stock}
            defaultValue={1}
            value={qty}
            onChange={onChangeQty}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-2">
          <h2>Payment information</h2>
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Credit Card"
              value={paymentCardInfo.card}
              onChange={(e) => {
                setPaymentCardInfo({ ...paymentCardInfo, card: e.target.value })
              }}
            />
            <Input
              placeholder="Owner name"
              value={paymentCardInfo.name}
              onChange={(e) => {
                setPaymentCardInfo({ ...paymentCardInfo, name: e.target.value })
              }}
            />
            <div className="flex items-center justify-center gap-2">
              <DatePicker
                className="flex flex-1"
                format={expirationDateFormat}
                value={paymentCardInfo.expiration}
                picker="month"
                onChange={(date) => {
                  setPaymentCardInfo({
                    ...paymentCardInfo,
                    expiration: date,
                  })
                }}
              />
              <Input
                className="flex flex-1"
                placeholder="Cvv"
                value={paymentCardInfo.cvv}
                onChange={(e) => {
                  setPaymentCardInfo({
                    ...paymentCardInfo,
                    cvv: e.target.value,
                  })
                }}
                max={3}
              />
            </div>
          </div>
        </div>
        <Divider />
        <div
          className={`${checkoutType === CheckoutMovieEnum.RENT ? "flex" : "hidden"} flex-col`}
        >
          <h3>Information about rent</h3>
          <p>{`Deliver before ${`${nextWeekDate.getDay()}/${nextWeekDate.getMonth()}/${nextWeekDate.getFullYear()}`}, You will receive a punishment otherwise`}</p>
        </div>
        <Divider />
        <Button
          type="primary"
          onClick={() => {
            paymentMutation.mutate()
          }}
        >
          Complete Purchase
        </Button>
      </section>
    </main>
  )
}
