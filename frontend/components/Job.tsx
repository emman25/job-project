import Link from "next/link";
import { Tag } from "./Tag";

export function Job({ id, date, title, tags = [], features = [] }: { id: number, date: string, title: string, tags?: string[], features?: string[] }) {
  return (
    <Link href={`/job/${id}`}>
      <div className='flex justify-between px-8 py-14 bg-white outline outline-1 w-full outline-gray-300 shadow-lg rounded-xl items-center'>
        <div className='flex justify-center items-center space-x-2'>
          <div className='space-y-2'>
            <div className='font-bold text-xl'>{title}</div>
            <div className='flex space-x-2'>
              {features.map((x) => (
                <>
                  <Tag title={x?.name} className='bg-gray-200' />
                </>
              ))}
            </div>
          </div>
        </div>

        <div className=' hidden md:flex space-x-2 min-w-[100px]'>
          {tags.map((x) => (
            <>
              <Tag title={x?.name} />
            </>
          ))}
        </div>

        <div>{date}</div>


        <div className='bg-red-500  text-white w-[100px] rounded-lg py-2 hidden md:block text-center'>Apply</div>
      </div>
    </Link>
  )
}