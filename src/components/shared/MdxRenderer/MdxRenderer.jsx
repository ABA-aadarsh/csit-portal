import { useMDXComponents } from "@/mdx-components"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css";

const MdxRenderer = ({mdxData=""}) => {
    return (
        <MDXRemote
                    components={useMDXComponents()}
                    source={mdxData}
                    options={
                        {
                            mdxOptions: {
                                remarkPlugins: [
                                    remarkMath
                                ],
                                rehypePlugins: [
                                    rehypeKatex
                                ],
                            }
                        }
                    }
        />
    )
}

export default MdxRenderer