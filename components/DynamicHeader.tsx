'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function DynamicHeader() {
  const pathname = usePathname()
  
  const getCurrentPage = () => {
    if (pathname === '/') return 'home'
    if (pathname === '/waitlist/') return 'waitlist'
    if (pathname === '/download/') return 'download'
    return ''
  }

  return <Header currentPage={getCurrentPage()} />
}
