import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "../../services/noteService"
import type { note } from "../../types/note"
import css from "./NoteList.module.css"


interface PostNoteProps{  
  notes: note[]
}



export default function NoteList({ notes }: PostNoteProps) {


  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"]
      })
    }
  })

  

  return (
<ul className={css.list}>
	{/* Набір елементів списку нотаток */}
  {notes.map((note) =>(<li key={note.id} className={css.listItem}>
    <h2 className={css.title}>{note.title}</h2>
    <p className={css.content}>{note.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{note.tag}</span>
      <button onClick={()=>mutation.mutate(note.id)} className={css.delete}>Delete</button>
    </div>
  </li>))}
</ul>
      
      

  );
}
