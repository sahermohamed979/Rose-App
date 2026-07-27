
import React from 'react'
interface EmptyStateProps{
    title:string
    description:string
}
export default function EmptyState({title,description}: EmptyStateProps) {
   return (
    <div className="flex flex-col items-center justify-center py-20 text-center ">
        <p className="text-lg font-semibold text-text-plain">{title}</p>
        <p className="text-sm text-text-muted mt-1">{description}</p>
      </div>
  )
}
