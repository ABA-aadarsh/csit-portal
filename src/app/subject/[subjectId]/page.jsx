import Link from 'next/link'
import React from 'react'

function page({params}) {
    return (
        <div>
            <p>This is not necessary I will later deal with this on middleware</p>
            <Link href={`/subject/${params.subjectId}/overview`}>For now got to actual link</Link>
        </div>
    )
}

export default page