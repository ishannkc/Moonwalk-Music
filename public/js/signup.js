const signupForm = document.getElementById('signup-form')
const errorMessage = document.getElementById('error-message')

signupForm.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const name = document.getElementById('signup-name').value.trim()
    const email = document.getElementById('signup-email').value.trim()
    const username = document.getElementById('signup-username').value.trim()
    const password = document.getElementById('signup-password').value
    const submitBtn = signupForm.querySelector('button')

    errorMessage.textContent = '' //clear old errors
    submitBtn.disabled = true

    if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters.'
        submitBtn.disabled = false
        return
    }

    if (/\s/.test(password)) {
        errorMessage.textContent = 'Password cannot contain spaces.'
        submitBtn.disabled = false
        return
    }

    try{
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, username, password: password.trim()})
        })

        const data = await res.json()

        if(res.ok){
            window.location.href = '/' //after successful sign -up, send user back to homepage
        } else{
            errorMessage.textContent = data.error || 'Registration failed. Please try again'
        }
    }catch(err){
        console.error('Network error: ', err)
        errorMessage.textContent = 'Unable to connect. Please try again'
    }finally{
        submitBtn.disabled = false
    }
})