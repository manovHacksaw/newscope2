import { cookies } from 'next/headers'

export default async function clearCookies(){
    const cookieStore = await cookies()
    cookieStore.delete('token');
}