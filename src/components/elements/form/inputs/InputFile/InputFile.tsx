import Image from "next/image";
import InputWrapper from "../InputWrapper/InputWrapper";
import { useState } from "react";
import { CustomFileObject } from "@/model/auth/register.model";

type Props = {
  title: string;
  errorMessage?: string;
  value: any;
  onChange(value: any | null): void;
  name: string;
};

const InputFile = ({ title, errorMessage, value, onChange, name }: Props) => {
  const [previewURL, setPreviewUrl] = useState<string | null>("");

  const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    
    if (files && files.length > 0) {
      setPreviewUrl(URL.createObjectURL(files[0]));
      onChange(files[0]);
    }
  };

  if (previewURL) {
    return (
      <InputWrapper title={title} errorMessage={errorMessage || ""}>
        <div className="flex flex-col items-center justify-center mt-2 border border-dashed border-gray-900/25">
          <Image alt="Image url" width={100} height={200} src={previewURL} />
          <p
            className="text-lg font-bold hover:cursor-pointer"
            onClick={() => {
              onChange(null);
              setPreviewUrl(null);
            }}
          >
            Upload another
          </p>
        </div>
      </InputWrapper>
    );
  }
  return (
    <InputWrapper title={title} errorMessage={errorMessage || ""}>
      <div className="col-span-full">
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={onChangeValue}
                  value={value}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
    </InputWrapper>
  );
};

export default InputFile;
