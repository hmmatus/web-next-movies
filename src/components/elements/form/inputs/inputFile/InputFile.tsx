import InputWrapper from "@/components/wrappers/inputWrapper/InputWrapper";
import { InboxOutlined } from "@ant-design/icons";
import Upload, { DraggerProps, UploadProps } from "antd/es/upload";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
interface InputTextI<T extends FieldValues> extends DraggerProps {
  label: string;
  errorMessage: string;
  control: Control<T>;
  name: Path<T>;
}

const { Dragger } = Upload;
const InputFile = <T extends FieldValues>(props: InputTextI<T>) => {
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      console.log("🚀 ~ onChange ~ info:", info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(info.file, info.fileList);
      }
      else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <InputWrapper label={props.label} error={props.errorMessage}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field, fieldState }) => (
          <Dragger
            {...uploadProps}
            onChange={field.onChange}
            disabled={field.disabled}
            name={field.name}
            listType="picture"
            maxCount={1}
            ref={field.ref}
            defaultFileList={field.value || []}
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
  );
};

export default InputFile;
