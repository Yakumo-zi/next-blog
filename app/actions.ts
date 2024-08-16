'use server'
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'node:fs'
import path from 'node:path';
export async function getPostLists() {
    let res = new Array<string>
    let traverse = (dir: string) => {
        const filenames = fs.readdirSync(dir)
        filenames.forEach(name => {
            if (fs.statSync(path.join(dir, name)).isDirectory()) {
                traverse(path.join(dir, name))
            } else if (name.endsWith(".md") || name.endsWith(".mdx")) {
                if (dir != "posts") {
                    res.push(path.join(dir, name))
                } else {
                    res.push(name)
                }
            }
        })

    }
    traverse("posts")
    return res
}

export async function getPostContent(filePath: string) {
    const fileContent = fs.readFileSync(path.join("posts", filePath), "utf8")

    return await compileMDX<{ title: string, published: string, tags: Array<string>, category: string, description: string }>({ source: fileContent, options: { parseFrontmatter: true } })
}