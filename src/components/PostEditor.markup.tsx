import React from 'react';
import {Navigate} from 'react-router-dom';
import {savePost} from '../api';

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
  tags: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function Editor({user}: {user: {id: string}}) {
  const [redirect, setRedirect] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  function handleSubmit(e: React.ChangeEvent<FormElement>) {
    e.preventDefault();
    const {title, content, tags} = e.currentTarget.elements;
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id,
    };

    setIsSaving(true);
    savePost(newPost).then(() => setRedirect(true));
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <textarea id="tags-input" name="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  );
}
