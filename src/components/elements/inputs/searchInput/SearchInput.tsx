import { CiSearch } from "react-icons/ci";
interface SearchInputI {
  value: string;
  placeholder?: string;
  handleOnChange(value: string): void;
  onBlur(): void;
}
const SearchInput = ({
  value,
  placeholder,
  handleOnChange,
  onBlur,
}: SearchInputI) => {
  return (
    <div className=" flex items-center border-2 rounded-lg px-2 lg:max-w-100">
      <CiSearch />
      <input
        className="w-full border-none p-2 focus:outline-none"
        type="text"
        placeholder={placeholder || "Type something"}
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  );
};

export default SearchInput;
