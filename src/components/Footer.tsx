import { cx } from "../utils/cx"
import { Content } from "./Content"

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cx("bg-[rgb(76,35,29)] py-2 text-white", className)}>
      <Content className="">
        <p>
          <a
            href="https://www.google.com/search?q=helseplattformen+klokke"
            target="_blank"
            className="mt-2 underline"
          >
            What is that weird HP input??!
          </a>
        </p>
        <p>
          Made by{" "}
          <a
            href="https://github.com/henrikgs"
            target="_blank"
            className="underline"
          >
            henrikgs
          </a>{" "}
          - and thanks to Finn
        </p>
      </Content>
    </footer>
  )
}
