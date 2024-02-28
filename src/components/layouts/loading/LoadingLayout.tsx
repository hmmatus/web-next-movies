import Image from "next/image"

const LoadingComponent = () => {
  return (
    <main>
      <div className="flex items-center justify-center pt-4">
        <Image alt="Loading" src={"/gif/loading.gif"} width={400} height={400} />
      </div>
    </main>
  )
}

export default LoadingComponent;