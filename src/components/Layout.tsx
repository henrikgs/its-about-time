import { ReactNode } from "react"
import { cx } from "../utils/cx"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const Layout = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cx(
        "flex min-h-screen flex-col bg-[rgb(250,225,159)]",
        className,
      )}
    >
      <Header />
      <main className="flex-1 py-4">{children}</main>
      <Footer />
    </div>
  )
}
