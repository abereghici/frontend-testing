import * as React from 'react';
import {loadGreeting} from '../api';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function GreetingLoader() {
  const [greeting, setGreeting] = React.useState('');

  async function loadGreetingForInput(e: React.FormEvent<FormElement>) {
    e.preventDefault();
    const {data} = await loadGreeting(e.currentTarget.elements.name.value);
    setGreeting(data.greeting);
  }

  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  );
}
