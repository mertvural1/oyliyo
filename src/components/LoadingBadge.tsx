export const LoadingBadge = () => {
  return <div className="flex items-center gap-2">
    <div className="flex items-center gap-2 rounded-full text-xxs">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#542cff] dark:bg-[#cbbfff]" />
      <span>Yükleniyor...</span>
    </div>
  </div>
}
