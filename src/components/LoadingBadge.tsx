export const LoadingBadge = () => {
  return <div className="flex items-center gap-2 rounded-full border border-[#ece9ff] bg-white/85 px-3 py-2.5 shadow-[0_6px_16px_rgba(84,44,255,0.08)] backdrop-blur dark:border-[#3a3159] dark:bg-[#16122d]/95 dark:shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
    <div className="flex items-center gap-2 rounded-full bg-[#f6f2ff] px-2.5 py-1 text-[11px] font-semibold text-[#542cff] dark:bg-[#2b2351] dark:text-[#e8ddff]">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#542cff] dark:bg-[#cbbfff]" />
      <span>Yükleniyor...</span>
    </div>
  </div>
}
