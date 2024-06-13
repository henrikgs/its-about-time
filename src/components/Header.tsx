import { cx } from "../utils/cx"
import { Content } from "./Content"

export const Header = ({ className }: { className?: string }) => {
  return (
    <header className={cx("bg-[rgb(76,35,29)] py-2", className)}>
      <Content className="flex items-center justify-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[rgb(137,153,162)] bg-black">
          <img src="/timean-head.png" alt="" className="h-20 object-contain" />
        </div>
        <h1 className="relative top-1 font-[Nashville] text-[40px] text-white">
          It's about time
        </h1>
      </Content>
    </header>
  )
}
