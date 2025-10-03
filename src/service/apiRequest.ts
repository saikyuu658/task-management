import type { Task } from "../@types/task"

const URL_BASE = 'http://localhost:3000/'


export const getRequest = async (url: string, headers: {})=>{
    try {
        const res = await fetch(URL_BASE+url, {
        method: 'GET',
        headers: headers
        })
        const result = await res.json()
        if(!res.ok){
            throw new Error(result)
        }
        return result
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const postRequest = async (url: string, body: Task, headers: {})=>{
    try {
        const res = await fetch(URL_BASE+url, {
            method: 'POST',
            body: JSON.stringify({task: body}),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        })
        const result = await res.json()
        
        if(!res.ok){
            throw new Error(result)
        }
        return result
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const putRequest = async (url: string, body: Task, headers: {})=>{
     try {
        const res = await fetch(URL_BASE+url, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({task: body}),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        })
        
        const result = await res.json()
        if(!res.ok){
            throw new Error(result)
        }
        return result
    } catch (error:any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const deleteRequest = async (url: string, headers: {})=>{

    try {
        const res = await fetch(URL_BASE+url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                ...headers
            }
        })
        const result = await res.json()
        if(!res.ok){
            throw new Error(result)
        }
    } catch (error:any) {
        throw new Error(error.message)
    }
    
}


