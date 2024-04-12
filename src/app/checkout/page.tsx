"use client"
import { CheckoutMovieEnum, type MovieI } from "@/models/movie.model"
import { nextweek } from "@/utils/dateHandlers"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { Button, Divider, Flex, notification } from "antd"
import type * as yup from "yup"
import { useSearchParams } from "next/navigation"
import { type ReactElement } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import checkoutSchema from "./validation"
import InputText from "@/components/elements/form/inputs/inputText/InputText"
import CustomInputNumber from "@/components/elements/form/inputs/inputNumber/InputNumber"
import InputDatePicker from "@/components/elements/form/inputs/inputDatePicker/InputDatePicker"
import transactionService from "@/service/transaction/transactionService"
import {
  type SaveTransactionI,
  type TransactionI,
} from "@/models/transaction.model"
import { useAppSelector } from "@/redux/hooks"
async function handlePurchase(data: SaveTransactionI): Promise<TransactionI> {
  const result = await transactionService.addTransaction(data)
  return result
}

const initialState = {
  card: "",
  name: "",
  expiration: "",
  cvv: "",
  qty: 1,
}
export default function Page(): ReactElement {
  const expirationDateFormat = "MM/YYYY"
  const params = useSearchParams()
  const movie: MovieI = JSON.parse(params.get("movie") ?? "")
  const { id: idUser } = useAppSelector((state) => state.user)
  const checkoutType: CheckoutMovieEnum =
    (params.get("type") as CheckoutMovieEnum) ?? CheckoutMovieEnum.SALE
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    resolver: yupResolver(checkoutSchema),
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

  const onSubmit: SubmitHandler<yup.InferType<typeof checkoutSchema>> = (
    data,
  ) => {
    paymentMutation.mutate({
      type: checkoutType,
      idMovie: movie.id,
      idUser,
      qty: data.qty,
      expirationDate: nextWeekDate.toISOString(),
    })
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <CustomInputNumber
              label="Quantity"
              min={1}
              max={movie.stock}
              defaultValue={1}
              name="qty"
              control={control}
              errorMessage={errors.qty?.message ?? ""}
            />
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <h2>Payment information</h2>
            <div className="flex flex-col gap-2">
              <InputText
                placeholder="Credit Card"
                name="card"
                control={control}
                label="Credit Card"
                errorMessage={errors.card?.message ?? ""}
              />
              <InputText
                placeholder="Owner name"
                name="name"
                control={control}
                label="Owner name"
                errorMessage={errors.name?.message ?? ""}
              />
              <div className="flex gap-2">
                <InputDatePicker
                  placeholder="Expiration"
                  name="expiration"
                  control={control}
                  label="Expiration"
                  errorMessage={errors.expiration?.message ?? ""}
                  format={expirationDateFormat}
                  style={{ width: "100%" }}
                  picker="month"
                />
                <InputText
                  placeholder="Cvv"
                  max={3}
                  name="cvv"
                  control={control}
                  label="CVV"
                  errorMessage={errors.cvv?.message ?? ""}
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
          <Button htmlType="submit" type="primary">
            Complete Purchase
          </Button>
        </form>
      </section>
    </main>
  )
}
