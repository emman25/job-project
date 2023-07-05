import Link from "next/link";
import DropdownMenuComponent from "./DropdownMenu";
import { signOut } from "next-auth/react";

export default function Header({ access_token = undefined, hidden = false, letter = 'E' }: { access_token?: undefined | string, hidden?: boolean, letter?: string }) {

    let body;

    if (hidden == false) {
        body = <>
            <div>
                {access_token == undefined ? <Link href={'/account/login'}>
                    <div className='px-4 py-3 rounded-xl bg-black text-white font-bold'>
                        Login
                    </div></Link> :
                    <DropdownMenuComponent letter={letter} onClick={async () => {
                        await signOut({ redirect: false })

                        window.location.reload()
                    }}
                    />
                }
            </div>
        </>
    } else {
        body = <>
            <div></div>
        </>
    }

    return (<div className='py-6   bg-white max-w-6xl flex justify-between p-2 md:px-0 items-center w-full'>
        <Link href={'/'}>
            <div className='font-bold text-base md:text-xl'>Entrebyte Technologies</div>
        </Link>
        {body}
    </div>)
}