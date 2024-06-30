import { SquareArrowOutUpRight } from "lucide-react";


export function useMDXComponents(components) {
    return {
      h1:({children})=>(
        <h1 className="text-center underline my-5 underline-offset-8">{children}</h1>
      ),
      ul:(data)=>(
        <ul className="pl-5 list-disc flex gap-3 flex-col mb-5">
          {data.children}
        </ul>
      ),
      li: ({children,...props})=>(
        <li className="text-red-300">{children}</li>
      ),
      p: ({children})=>(
        <p className="text-base leading-7 mb-5">{children}</p>
      ),
      a: ({children,href,title})=>(
        <a href={href} className="text-blue-500 hover:underline inline-flex gap-2 items-end" title={title}>
          <span>{children}</span>
          <SquareArrowOutUpRight size={30}/>
        </a>
      ),
      ...components,
    }
}