import { useState, useEffect } from "react"

interface DimensionsT {
  width: number
  height: number
}
function getWindowDimensions(): DimensionsT {
  const { innerWidth: width, innerHeight: height } =
    typeof window !== "undefined" ? window : { innerWidth: 0, innerHeight: 0 }
  return { width, height }
}

export default function useScreenSize(): DimensionsT {
  const [screenSize, setScreenSize] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize(): void {
      setScreenSize(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return screenSize
}
