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
    res.json(account[0])
  } catch (err){
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create({
      name: req.body.name.trim(),
      budget: req.body.budget
    })
    res.status(201).json(newAccount[0])
  } catch (err){
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const updatedAccount = await Accounts.updateById(req.params.id, req.body)
  res.status(200).json(updatedAccount[0])
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  const deleteAccount = await Accounts.deleteById(req.params.id)
  res.json(deleteAccount)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
