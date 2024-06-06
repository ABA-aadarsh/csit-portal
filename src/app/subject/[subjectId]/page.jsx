import Link from 'next/link'
import React from 'react'

function page({params}) {
    return (
        <div>
            <Link href={`/subject/${params.subjectId}/overview`}>Go to actual link</Link>
        </div>
    )
}

export default page