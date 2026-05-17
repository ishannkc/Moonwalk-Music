export async function requireAuth(req, res,next){
    if(!req.session.userId){
        console.log('Access is blocked')
      return  res.status(401).json({error: 'Unauthorized'})
    }
    next()
}