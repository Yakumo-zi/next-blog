'use server'
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'node:fs'
import path from 'node:path';
import { JSXElementConstructor, ReactElement } from 'react';
const fileList = new Array<{
    meta: {
        title: string, published: string, tags: Array<string>, category: string, description: string,
    }, filename: string, content: ReactElement<any, string | JSXElementConstructor<any>>
}>()
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
    if (fileList.length > 0) return fileList.map(({ meta, filename }) => ({ meta, filename }))
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        fileList.push({ meta: content.frontmatter, filename, content: content.content })
    }
    return fileList.map(({ meta, filename }) => ({ meta, filename }))
}

export async function getPagePosts(page: number) {
    if (fileList.length > 0) return fileList.slice((page - 1) * 5, page * 5).map(({ meta, filename }) => ({ meta, filename }))
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        fileList.push({ meta: content.frontmatter, filename, content: content.content })
    }
    return fileList.slice((page - 1) * 5, page * 5).map(({ meta, filename }) => ({ meta, filename }))
}

export async function getPages() {
    if (fileList.length > 0) return Math.ceil(fileList.length / 5)
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        fileList.push({ meta: content.frontmatter, filename, content: content.content })
    }
    return Math.ceil(fileList.length / 5)
}
//Get all tags
export async function getTags() {
    if (fileList.length > 0) {
        const tags = fileList.map(({ meta }) => meta.tags).flat()
        return Array.from(new Set(tags))
    }
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        fileList.push({ meta: content.frontmatter, filename, content: content.content })
    }
    const tags = fileList.map(({ meta }) => meta.tags).flat()
    return Array.from(new Set(tags))
}
//Get all categories
export async function getCategories() {
    if (fileList.length > 0) {
        const categories = fileList.map(({ meta }) => meta.category)
        return Array.from(new Set(categories))
    }
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        fileList.push({ meta: content.frontmatter, filename, content: content.content })
    }
    const categories = fileList.map(({ meta }) => meta.category)
    return Array.from(new Set(categories))
}
//Get all posts by tag
export async function getPostsByTag(tag: string) {
    if (fileList.length > 0) {
        return fileList.filter(({ meta }) => meta.tags.includes(tag)).map(({ meta, filename }) => ({ meta, filename }))
    }
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        fileList.push({ meta: content.frontmatter, filename, content: content.content })
    }
    return fileList.filter(({ meta }) => meta.tags.includes(tag)).map(({ meta, filename }) => ({ meta, filename }))
}
//Get all posts by category
export async function getPostsByCategory(category: string) {
    if (fileList.length > 0) {
        return fileList.filter(({ meta }) => meta.category == category).map(({ meta, filename }) => ({ meta, filename }))
    }
    let res = await getPostLists()
    for (const filename of res) {
        const content = (await getPostContent(filename))
        if (!content) continue
        fileList.push({ meta: content.frontmatter, filename, content: content.content })
    }
    return fileList.filter(({ meta }) => meta.category == category).map(({ meta, filename }) => ({ meta, filename }))
}

export async function getPostContent(filePath: string) {
    if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) return
    if (!fs.existsSync(path.join("posts", filePath))) return
    if (fileList.length > 0) {
        const file = fileList.find(({ filename }) => filename == filePath)
        if (file) return { content: file.content, frontmatter: file.meta }
    }
    const fileContent = fs.readFileSync(path.join("posts", filePath), "utf8")
    return await compileMDX<{ title: string, published: string, tags: Array<string>, category: string, description: string }>({ source: fileContent, options: { parseFrontmatter: true } })
}