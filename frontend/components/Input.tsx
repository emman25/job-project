
export default function Input({ value, label, placeholder, onChange, type = 'email', style='', min='' }: {value:string, label: string, placeholder: string, onChange: (x:string)=>void, type?: string, style?: string, min?: string}) {
    return <div className='space-y-2 w-full'>
        <div className='font-bold'>{label}</div>
        <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} className={`py-3 outline outline-1 text-black rounded-lg px-4 w-full ${style}`} min={min} />
    </div>
}