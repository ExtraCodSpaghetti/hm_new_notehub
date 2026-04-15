import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "../../services/noteService"
import { Field, Form, Formik, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css"
import { toast } from "react-hot-toast"
import type { NotTag } from "../../types/note";

interface CreatePostFormProps{
  onClose: () => void
}

const PostsSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title must be at least 3 characters").max(30, "Title must be less than 30 characters").required("Title is required"),
  content: Yup.string().max(200, "Content must be less than 200 characters").required("Content is required")
})

export default function NoteForm({ onClose }: CreatePostFormProps) {

const initialValues: FormData = {
  title: "",
  content: "",
  tag: "Todo"
}

interface FormData {
  title: string
  content: string
  tag: NotTag
}
    const queryClient = useQueryClient()
    const mutation = useMutation({
    mutationKey: ["createNote"],
    mutationFn: createNote,
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["notes"],
        })
        toast.success("Note is created")
        onClose()
      }
    })

const handleSubmit = (values: FormData, actions: FormikHelpers<FormData>) => {
  mutation.mutate(
    {
        title: values.title,
        content: values.content,
        tag: values.tag
    },
    {
      onSuccess: () => {
        actions.resetForm()
      }
    }
  )
}

return (
  <Formik
  initialValues={initialValues}
  validationSchema={PostsSchema}
  onSubmit={handleSubmit}
>
  <Form className={css.form}>

    {/* TITLE */}
    <div className={css.formGroup}>
      <label htmlFor="title">Title</label>
      <Field id="title" name="title" className={css.input} />
      <ErrorMessage name="title" component="span" className={css.error} />
    </div>

    {/* CONTENT */}
    <div className={css.formGroup}>
      <label htmlFor="content">Content</label>
      <Field
        as="textarea"
        id="content"
        name="content"
        rows={8}
        className={css.textarea}
      />
      <ErrorMessage name="content" component="span" className={css.error} />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="tag">Tag</label>
      <Field as="select" id="tag" name="tag" className={css.select}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </Field>
      <ErrorMessage name="tag" component="span" className={css.error} />
    </div>

    {/* ACTIONS */}
    <div className={css.actions}>
      <button type="button" className={css.cancelButton} onClick={onClose}>
        Cancel
      </button>

      <button type="submit" className={css.submitButton}>
        Create note
      </button>
    </div>

  </Form>
</Formik>
);
}