'use server'
import { formatDate } from '@/utils';
import matter from 'gray-matter';
import fs from 'node:fs'
import path from 'node:path';

export type PostMeta = {
    title: string, published: string, tags: Array<string>, category: string, description: string,draft:boolean,
}
export type BlogPost = {
    meta: PostMeta,
    filename: string, 
    content: string
    path:string,
}

const posts=new Map<string,BlogPost>()

// if new file added or deleted or modified then update the posts
fs.watch("public/posts",async (event,filename)=>{
    if(event=="change" || event=="rename"){
        let basename=path.basename(filename!)
        if(!basename.endsWith(".md") && !basename.endsWith(".mdx")) return
        if(posts.has(basename)) posts.delete(basename)
        const content = (await getPostContent(filename!))
        if (!content) return
        posts.set(basename,{ meta: content.meta,filename:basename , content: content.content,path:filename! })
    }
})

async function readPostsDirectory() {
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        let basename=path.basename(filename)
        if(!basename.endsWith(".md") && !basename.endsWith(".mdx") || content.meta.draft) continue
        if(!posts.has(basename)) posts.set(basename,{ meta: content.meta,filename:basename , content: content.content,path:filename })
    }
}

async function getSortedPosts() {
    if(posts.size==0)
        await readPostsDirectory()
    let fileList:BlogPost[]=[]
    posts.forEach((value,_)=>{
        fileList.push(value)
    })
    return fileList.sort((a, b) => new Date(b.meta.published).getTime() - new Date(a.meta.published).getTime())
    
}
export async function getContentByName(name: string) {
    if (posts.has(name)) return posts.get(name)
    return null
}


export async function getPostLists() {
    let res = new Array<string>
    let traverse = (dir: string) => {
        const filenames = fs.readdirSync(dir)
        filenames.forEach(name => {
            if (fs.statSync(path.join(dir, name)).isDirectory()) {
                traverse(path.join(dir, name))
            } else if (name.endsWith(".md") || name.endsWith(".mdx")) {
                if (dir != "public/posts") {
                    res.push(path.join(dir, name))
                } else {
                    res.push(name)
                }
            }
        })
    }
    traverse("public/posts")
    return res
}
export async function getPostMetadata() {
    const fileList = await getSortedPosts()
    return fileList?.map(({ meta, filename }) => ({ meta, filename }))
}

export async function getPagePosts(page: number) {
    const fileList = await getSortedPosts()
    return fileList?.slice((page - 1) * 5, page * 5).map(({ meta, filename ,path}) => ({ meta, filename,path }))
}

export async function getPages() {
    const fileList = await getSortedPosts()
    return Math.ceil(fileList.length / 5)
}
//Get all tags
export async function getTags() {
    const fileList = await getSortedPosts()
    const tags = fileList?.map(({ meta }) => meta.tags).flat()
    return Array.from(new Set(tags))
}
//Get all categories
export async function getCategories() {
    const fileList = await getSortedPosts()
    const categories = fileList?.map(({ meta }) => meta.category)
    return Array.from(new Set(categories))
}
//Get all posts by tag
export async function getPostsByTag(tag: string) {
    const fileList = await getSortedPosts()
    return fileList?.filter(({ meta }) => meta.tags.includes(tag)).map(({ meta, filename }) => ({ meta, filename }))
}
//Get all posts by category
export async function getPostsByCategory(category: string) {
    const fileList = await getSortedPosts()
    return fileList?.filter(({ meta }) => meta.category == category)
}

export async function getPostContent(filename: string): Promise<BlogPost> {
    if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) return {} as any
    if (!fs.existsSync(filename)) return {} as any
    const fileContent = fs.readFileSync(filename, "utf8")
    let res = matter(fileContent)
    res.data.published = formatDate(res.data.published)
    return { meta: res.data as PostMeta, filename: path.basename(filename), content: res.content,path:filename }
}