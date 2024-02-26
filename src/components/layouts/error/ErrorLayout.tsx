import Image from "next/image";
type ErrorLayoutP = {
  error: Error & { digest?: string }
  reset: () => void
}
const ErrorLayout = ({error}: ErrorLayoutP) => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center flex-1">
        <Image width={200} height={200} alt="Not Found" src={"/images/notFound.png"} />
        <h1>{`${error}`}</h1>
      </div>
    </main>
  );
};

export default ErrorLayout;
