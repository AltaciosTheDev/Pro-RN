export default function Container({children}:{children:React.ReactNode}) 
{
  return (
    <div className="flex flex-col min-h-screen max-w-7xl mx-auto bg-white/[2%]">{children}</div>
)
}
