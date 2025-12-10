// THIS IS 
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      // ✅ Prepend new client so newest appears first
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [addClient, ...clients] },
      });
    },
    onCompleted() {
      setSuccessMessage('Client added successfully!');
      setErrorMessage('');

      setTimeout(() => setSuccessMessage(''), 3000);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (name === '' || email === '' || phone === '') {
      return setErrorMessage('Please fill in all fields');
    }

    if (name.length > 30) {
      return setErrorMessage('Name cannot be more than 30 characters');
    }

    if (email.length > 30) {
      return setErrorMessage('Email cannot be more than 30 characters');
    }

    if (phone.length > 12) {
      return setErrorMessage('Phone number cannot be more than 12 digits');
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addClientModal'
        aria-labelledby='addClientModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addClientModalLabel'>
                Add Client
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>

            <div className='modal-body'>
              {errorMessage && (
                <p className='text-danger mb-2 fw-bold'>{errorMessage}</p>
              )}

              {successMessage && (
                <p className='text-success mb-2 fw-bold'>{successMessage}</p>
              )}

              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='text'
                    className='form-control'
                    id='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button type='submit' className='btn btn-secondary'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
