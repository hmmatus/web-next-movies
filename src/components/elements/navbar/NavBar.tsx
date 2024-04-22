import { useAppSelector } from "@/redux/hooks"
import { loggedInElements, loggedOutElements } from "@/utils/navbarelements"
import { MenuOutlined } from "@ant-design/icons"
import { Space } from "antd"
import Link from "next/link"
import type React from "react"
import { useState, type ReactElement } from "react"

const NavBar: React.FC = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const listElements = isLoggedIn ? loggedInElements : loggedOutElements
  const [isOpen, setIsOpen] = useState(false)
  const ListOfElements = ({
    className,
  }: {
    className?: string
  }): ReactElement => {
    return (
      <Space className={`${className}`}>
        {listElements.map((element, index) => (
          <Link
            className="text-xl text-white focus:text-white focus:text-bold"
            key={index}
            href={element.href}
            onClick={() => {
              setIsOpen(false)
            }}
          >
            {element.title}
          </Link>
        ))}
      </Space>
    )
  }
  return (
    <>
      <header className={`flex items-center px-2 bg-primary min-h-20`}>
        <nav className="flex flex-1 justify-between">
          <div>
            <h2 className="text-white">Movies</h2>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => {
                setIsOpen(!isOpen)
              }}
              className="text-white focus:text-white focus:text-bold"
            >
              <MenuOutlined width={"1em"} height={"1em"} />
            </button>
          </div>
          <div className="hidden md:flex">
            <ListOfElements />
          </div>
        </nav>
      </header>
      <div
        className={`md:hidden ${isOpen ? "flex" : "hidden"} relative w-full bg-primary flex-col`}
      >
        <ListOfElements className="flex flex-col" />
      </div>
    </>
  )
}

export default NavBar
