import { ReactNode } from "react"
import { cx } from "../utils/cx"

export const Content = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cx("mx-auto w-full max-w-screen-lg px-4", className)}>
      {children}
    </div>
  )
}
