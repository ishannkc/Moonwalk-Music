import validator from 'validator'
import { getDBConnection } from '../db/db.js'
import bcrypt from 'bcryptjs'


export async function registerUser(req, res){
    let{name, email, username, password} = req.body

    if(!name || !email || !username || !password){
        return res.status(400).json({error: 'All fields are required.'})
    }

    name = name.trim()
    email = email.trim()
    username = username.trim()

     if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)){ //regex, only given characters are allowed in the username field
        return res.status(400).json({error: 'Username must be 1–20 characters, using letters, numbers, _ or -.'})
     }

     if (/\s/.test(password)) {
  return res.status(400).json({ error: 'Password cannot contain spaces.' })
}

if (password.trim().length < 8) {
  return res.status(400).json({ error: 'Password must be at least 8 characters.' })
}

     if(!validator.isEmail(email)){
        return res.status(400).json({error: 'Invalid email format'})
     }

     try{
        const db = await getDBConnection()

        const existing = await db.get(`
                SELECT id FROM users
                WHERE email = ? 
                OR username = ?
            `,[email, username]
        )

        if(existing){
            return res.status(400).json({error: 'Email or Username already in use'})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const result = await db.run(`
                INSERT INTO users(name, email, username, password)
                VALUES(?,?,?,?)
            `,[name, email, username, hashPassword]
            )
            console.log(result)

                req.session.userId = result.lastID

            res.status(201).json('User registered')


     } catch(err){
        console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' })
     }
}

export async function loginUser(req,res){
    let{username, password} = req.body
    
     if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' } )
  }

  username = username.trim()

  try{
        const db = await getDBConnection()

        const userExists = await db.get(`
                SELECT * FROM users
                WHERE username =?
            `,[username]
        )

        if(!userExists){
            return res.status(401).json({error: `Invalid credentials or User doesn't exist`})
        }

        const isValidPw = await bcrypt.compare(password, userExists.password)

        if(!isValidPw){
             return res.status(401).json({ error: 'Invalid password'})
        }

        req.session.userId = userExists.id
        res.json({message: 'Logged in'})
        console.log('User logged in')

  } catch(err){
    console.error('Login error:', err.message)
    res.status(500).json({ error: 'Login failed. Please try again.' })
  }
}