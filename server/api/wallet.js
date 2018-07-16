const express = require('express');
const router = express.Router();
const { bc, tp, p2pServer } = require('../../server');

const Miner = require('../classes/app/miner');

router.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

router.post('/mine', (req, res) => {
  const { ballot } = req.body;
  const block = bc.addBlock(ballot);
  console.log(`New block added: ${block.toString()}`);

  p2pServer.syncChains();
  res.sendStatus(200);
  // res.redirect('/blocks');
});

router.get('/transactions', (req, res) => {
  res.json(tp.transactions);
});

router.post('/transact', (req, res) => {
  const { recipient, amount, wallet } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);
  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

router.get('/mine-transactions', (req, res) => {
  const { wallet } = req.body;
  const miner = new Miner(bc, tp, wallet, p2pServer);
  const block = miner.mine();
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
});

router.get('/public-key', (req, res) => {
  const { wallet } = req.body;
  res.json({ publicKey: wallet.publicKey });
});

module.exports = router;
