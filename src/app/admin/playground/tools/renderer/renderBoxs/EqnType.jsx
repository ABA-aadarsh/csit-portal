import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import React from 'react'

function EqnType({latex}) {
  return (
    <div className='p-2 mt-4'>
        <Latex>
            {
                latex
            }
        </Latex>
    </div>
  )
}

export default EqnType