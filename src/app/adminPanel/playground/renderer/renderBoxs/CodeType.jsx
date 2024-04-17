import React from 'react'

function CodeType({code,language}) {
    return (
        <div>
            <div className=''>
                <pre className={`language-${language} !mt-0`}>
                    <code className={`language-${language} mt-0`}>
                        {
                            code
                        }
                    </code>
                </pre>
            </div>
        </div>
    )
}

export default CodeType