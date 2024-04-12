import { redirect } from 'next/navigation'
import React from 'react'

function page({params}) {
    redirect(`/subject/${params.subjectId}/overview`)
}

export default page