import { cx } from "../utils/cx"
import { Content } from "./Content"

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cx("bg-[rgb(76,35,29)] py-2 text-white", className)}>
      <Content className="text-right">
        <p>
          Made by{" "}
          <a
            href="https://github.com/henrikgs"
            target="_blank"
            className="underline"
          >
            henrikgs
          </a>
        </p>
      </Content>
    </footer>
  )
}
