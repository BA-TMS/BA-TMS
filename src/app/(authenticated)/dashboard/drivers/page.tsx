'use client'

import { ContextProvider } from "@/Context/modalContext"
import Driver from "@/components/Table/Driver"

export default function Drivers() {
  return (
    <ContextProvider>
      <Driver/>
    </ContextProvider>
  )
}