const router = require('express').Router()
const Accounts =  require('./accounts-model')
const { checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll()
  res.json(accounts)
  } catch (err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    res.json(account)
  } catch (err){
    next(err)
  }
})

router.post('/', checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body)
    res.json(newAccount)
  } catch (err){
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
