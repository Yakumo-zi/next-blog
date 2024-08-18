'use server'
import { formatDate } from '@/utils';
import matter from 'gray-matter';
import fs, { read } from 'node:fs'
import path from 'node:path';

export type PostMeta = {
    title: string, published: string, tags: Array<string>, category: string, description: string,
}
export type BlogPost = {
    meta: PostMeta,
    filename: string, content: string
}

async function readPostsDirectory() {
    const fileList: BlogPost[] = []
    fileList.splice(0, fileList.length)
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        fileList.push({ meta: content.meta, filename, content: content.content })
    }
    fileList.sort((a, b) => a.meta.published > b.meta.published ? -1 : 1)
    return fileList
}

async function getAllPosts() {
    return await readPostsDirectory()
}

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
export async function getPostMetadata() {
    const fileList = await getAllPosts()
    return fileList?.map(({ meta, filename }) => ({ meta, filename }))
}

export async function getPagePosts(page: number) {
    const fileList = await getAllPosts()
    return fileList?.slice((page - 1) * 5, page * 5).map(({ meta, filename }) => ({ meta, filename }))
}

export async function getPages() {
    const fileList = await getAllPosts()
    return Math.ceil(fileList!.length / 5)
}
//Get all tags
export async function getTags() {
    const fileList = await getAllPosts()
    const tags = fileList?.map(({ meta }) => meta.tags).flat()
    return Array.from(new Set(tags))
}
//Get all categories
export async function getCategories() {
    const fileList = await getAllPosts()
    const categories = fileList?.map(({ meta }) => meta.category)
    return Array.from(new Set(categories))
}
//Get all posts by tag
export async function getPostsByTag(tag: string) {
    const fileList = await getAllPosts()
    return fileList?.filter(({ meta }) => meta.tags.includes(tag)).map(({ meta, filename }) => ({ meta, filename }))
}
//Get all posts by category
export async function getPostsByCategory(category: string) {
    const fileList = await getAllPosts()
    return fileList?.filter(({ meta }) => meta.category == category)
}

export async function getPostContent(filePath: string): Promise<BlogPost> {
    if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) return {} as any
    if (!fs.existsSync(filePath)) return {} as any
    const fileContent = fs.readFileSync(filePath, "utf8")
    let res = matter(fileContent)
    res.data.published = formatDate(res.data.published)
    return { meta: res.data as PostMeta, filename: filePath, content: res.content }
}