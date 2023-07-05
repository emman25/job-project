export function Tag({ title, className = "" }: { title: string, className?: string }) {
    return <div className={`border border-1 border-gray-600 ${className} px-4 text-sm rounded-lg`}>{title}</div>
  }
  