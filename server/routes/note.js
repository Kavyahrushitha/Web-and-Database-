const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const notes = await Note.getAllNotes();
      res.send(notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .get('/read', async (req, res) => {
    try {
      let note = await Note.getNote(req.body);
      if(note["0"]){
        res.send({...note})
      }else{
        res.send({error:"Enter a valid noteID"});
      }
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  
  .post('/byUser', async (req, res) => {
    try {
      let note = await Note.getNotesByUser(req.body);
      if(note["0"]){
        res.send({...note})
      }else{
        res.send({});
      }
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/create', async (req, res) => {
    try {
      let note = await Note.create(req.body);
      res.send({...note})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .put('/edit', async (req, res) => {
    try {
      let note = await Note.editNote(req.body);
      res.send({...note});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      Note.deleteNote(req.body);
      res.send({success: "Note Deleted... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })



  
module.exports = router;