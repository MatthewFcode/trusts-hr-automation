import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { usePostUser } from '../hooks/useUsers.ts'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'

function Registration() {
  const { getAccessTokenSilently } = useAuth0()
  const addUser = usePostUser()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    position: '',
    profilePhoto: null as File | null,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }
  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.files && evt.target.files[0]) {
      setForm({ ...form, profilePhoto: evt.target.files[0] })
    }
  }
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()
    const formData = new FormData()
    formData.append('username', form.username)
    formData.append('position', form.position)
    if (form.profilePhoto) {
      formData.append('profilePhoto', form.profilePhoto)
    }
    await addUser.mutateAsync({ token, formData })
    navigate('/')
  }
  return (
    <div>
      {/* checking if the user has been through the auth0 login first */}
      <IfAuthenticated>
        <div>
          <img src="/images/The-Trusts-Icon.webp" alt="The-Trusts-logo" />
          <h1>Create your Trusts HR auto account</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <div>
              <label htmlFor="username">Full Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="What is your FullName"
                required
              />
            </div>
            <div>
              <label htmlFor="position">Current Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="What is your current position?"
                required
              />
            </div>
            <div>
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div>
          <img src="/images/The-Trusts-Icon.webp" alt="The Trusts Logo" />
          <h1>Authentication Required</h1>
          <p>
            Please go back and sign in or create an account with auth0 in order
            to register with The Trusts HR Automation system
          </p>
        </div>
      </IfNotAuthenticated>
    </div>
  )
}
export default Registration
