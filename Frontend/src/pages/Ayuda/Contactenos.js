import { Form, redirect, useActionData } from "react-router-dom"
import '../../Estilos/Ayuda/Contactenos.css';

export default function Contactenos() {
  const data = useActionData() 

  return (
    <div className="contactenos">
      <h3>Contactenos</h3>
      <Form method="post" action="/Ayuda/Contactenos">
        <label>
          <span>Correo electronico:</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Mensaje:</span>
          <textarea name="message" required></textarea>
        </label>
        <button>Enviar</button>

        {data && data.error && <p>{data.error}</p>}
      </Form>
    </div>
  )
}

export const contactAction = async ({ request }) => {
  const data = await request.formData()

  const submission = {
    email: data.get('email'),
    message: data.get('message')
  }

  console.log(submission)

  // send your post request

  if (submission.message.length < 10) {
    return {error: 'Message must be over 10 chars long.'}
  }

  // redirect the user
  return redirect('/')
}