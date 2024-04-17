import React from 'react'

function CodeType({code,language,label}) {
    return (
        <div className='mt-4'>
            <h1 className='text-xl font-semibold mb-3'>{label}</h1>
            <pre className={`language-${language} !mt-0`}>
                <code className={`language-${language} mt-0`}>
                    {
                        code
                    }
                </code>
            </pre>
        </div>
    )
}

export default CodeType