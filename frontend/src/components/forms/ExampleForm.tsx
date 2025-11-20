import React from 'react';
import Button from '../ui/Button';

export default function ExampleForm() {
  return (
    <form>
      <label>
        Nombre
        <input name="name" />
      </label>
      <Button type="submit">Enviar</Button>
    </form>
  );
}
