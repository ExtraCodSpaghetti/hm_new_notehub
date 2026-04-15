import axios from "axios"
import type { note, NotTag } from "../types/note"

axios.defaults.baseURL = "https://notehub-public.goit.study/api"
axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`

export const fetchNotes = async (currentPage:number, query?:string) => {
    const { data } = await axios.get(`/notes`, {
        params: {
            ...(query?.trim() !== "" && {search:query}),
            page: currentPage,
            perPage: 8
        }
    })
    return data
}
export const createNote = async(newNote: {title:string, content:string, tag:NotTag}) => {
    const { data } = await axios.post<note>(`/notes`, newNote)
    
    return data
 };

export const editNote = async (newDataNote: note) => {
    const { data } = await axios.patch<note>(`/notes/${newDataNote.id}`, newDataNote)
    
    return data
 };

export const deleteNote = async (notesId: string) => {
    const { data } = await axios.delete<note>(`/notes/${notesId}`)
    
    return data
 };
