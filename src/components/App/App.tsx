import { useState } from "react"
import css from "./App.module.css"
import Pagination from "../Pagination/Pagination"
import SearchBox from "../SearchBox/SearchBox"
import { fetchNotes } from "../../services/noteService"
import type { note } from "../../types/note"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useDebouncedCallback } from "use-debounce";
import NoteList from "../NoteList/NoteList"
import Modal from "../Modal/Modal"
import NoteForm from "../NoteForm/NoteForm"

function App() {

    const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreateForm, setIsCreateForm] = useState(false)
 
  const { data } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData

  });
  

  const notes = data?.notes || [];
 const totalPage = data?.totalPages ?? 0;

  const hendleChange = useDebouncedCallback((value: string) => {
    setCurrentPage(1)
    setSearchQuery(value)
  },1000)
  

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={hendleChange}/>
          {totalPage > 1 && <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={setCurrentPage}/>}
          <button className={css.button} onClick={() => { setIsModalOpen(true); setIsCreateForm(true) }}>Create note</button>
        </header>
        {
          notes.length > 0 && <NoteList notes={notes}/>
        }

        {isModalOpen && (
         <Modal onClose={() => setIsModalOpen(false)}>
           <NoteForm onClose={() => setIsModalOpen(false)} />
         </Modal>
          )}
      </div>
    </>
  )
}

export default App
