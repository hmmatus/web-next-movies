import React, { type ReactElement } from "react"
import InputWrapper from "@/components/wrappers/inputWrapper/InputWrapper"
import { InboxOutlined } from "@ant-design/icons"
import Upload, { type DraggerProps } from "antd/es/upload"
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form"
interface InputTextI<T extends FieldValues> extends DraggerProps {
  label: string
  errorMessage: string
  control: Control<T>
  name: Path<T>
}

const { Dragger } = Upload
const InputFile = <T extends FieldValues>(
  props: InputTextI<T>,
): ReactElement => {
  return (
    <InputWrapper label={props.label} error={props.errorMessage}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <Dragger
            name={field.name}
            customRequest={(info) => {
              field.onChange(info.file)
            }}
            beforeUpload={() => {
              return false
            }}
            disabled={field.disabled}
            listType="picture"
            maxCount={1}
            ref={field.ref}
            multiple={false}
          >
            <div>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </div>
          </Dragger>
        )}
      />
    </InputWrapper>
  )
}

export default InputFile
